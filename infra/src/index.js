const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const pino = require('pino');
const pinoHttp = require('pino-http');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// Logger Setup
const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: process.env.NODE_ENV !== 'production' ? {
    target: 'pino-pretty',
    options: { colorize: true }
  } : undefined
});

const app = express();

// CORS Configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400
};
app.use(cors(corsOptions));

// Request Logging
app.use(pinoHttp({ logger }));

// Body Parser
app.use(express.json({ limit: '1mb' }));

// Rate Limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 60000,
  max: parseInt(process.env.RATE_LIMIT_MAX) || 100,
  message: { error: 'Too many requests, please try again later' },
  standardHeaders: true,
  legacyHeaders: false
});
app.use('/memory', limiter);

// Database Pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: parseInt(process.env.DB_POOL_MAX) || 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
});

pool.on('error', (err) => {
  logger.error({ err }, 'Unexpected database pool error');
});

const API_TOKEN = process.env.API_TOKEN;

// Input Validation Helpers
const validateString = (value, fieldName, minLen = 1, maxLen = 10000) => {
  if (typeof value !== 'string') {
    return `${fieldName} must be a string`;
  }
  if (value.length < minLen) {
    return `${fieldName} must be at least ${minLen} characters`;
  }
  if (value.length > maxLen) {
    return `${fieldName} must be at most ${maxLen} characters`;
  }
  return null;
};

const validateArray = (value, fieldName, maxLen = 50) => {
  if (!Array.isArray(value)) {
    return `${fieldName} must be an array`;
  }
  if (value.length > maxLen) {
    return `${fieldName} must have at most ${maxLen} items`;
  }
  for (const item of value) {
    if (typeof item !== 'string' || item.length > 255) {
      return `Each item in ${fieldName} must be a string with max 255 chars`;
    }
  }
  return null;
};

const VALID_TYPES = ['policy', 'decision', 'learning', 'code', 'error', 'fix', 'note', 'task'];

// Auth middleware
const auth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    if (API_TOKEN) {
      logger.warn({ ip: req.ip }, 'Missing authorization header');
      return res.status(401).json({ error: 'Authorization header required' });
    }
    return next();
  }

  const token = authHeader.replace('Bearer ', '');
  if (API_TOKEN && token !== API_TOKEN) {
    logger.warn({ ip: req.ip }, 'Invalid API token');
    return res.status(401).json({ error: 'Invalid token' });
  }
  next();
};

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Health check (no auth, no rate limit)
app.get('/health', async (req, res) => {
  try {
    const start = Date.now();
    await pool.query('SELECT 1');
    const dbLatency = Date.now() - start;

    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      db: { status: 'connected', latency_ms: dbLatency }
    });
  } catch (err) {
    logger.error({ err }, 'Health check failed');
    res.status(500).json({
      status: 'error',
      timestamp: new Date().toISOString(),
      db: { status: 'disconnected', error: err.message }
    });
  }
});

// Append memory entry
app.post('/memory/append', auth, async (req, res) => {
  try {
    const { type, content, tags = [], refs = [] } = req.body;

    // Validate type
    const typeError = validateString(type, 'type', 1, 50);
    if (typeError) {
      return res.status(400).json({ error: typeError });
    }
    if (!VALID_TYPES.includes(type)) {
      return res.status(400).json({
        error: `Invalid type. Must be one of: ${VALID_TYPES.join(', ')}`
      });
    }

    // Validate content
    const contentError = validateString(content, 'content', 1, 50000);
    if (contentError) {
      return res.status(400).json({ error: contentError });
    }

    // Validate tags
    const tagsError = validateArray(tags, 'tags', 20);
    if (tagsError) {
      return res.status(400).json({ error: tagsError });
    }

    // Validate refs
    const refsError = validateArray(refs, 'refs', 20);
    if (refsError) {
      return res.status(400).json({ error: refsError });
    }

    const result = await pool.query(
      `INSERT INTO memory (type, content, tags, refs)
       VALUES ($1, $2, $3, $4)
       RETURNING id, type, content, tags, refs, created_at`,
      [type, content, tags, refs]
    );

    logger.info({ id: result.rows[0].id, type }, 'Memory entry created');
    res.status(201).json(result.rows[0]);
  } catch (err) {
    logger.error({ err }, 'Failed to append memory');
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get recent memory entries
app.get('/memory/recent', auth, async (req, res) => {
  try {
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 100);
    const type = req.query.type;

    // Validate type if provided
    if (type && !VALID_TYPES.includes(type)) {
      return res.status(400).json({
        error: `Invalid type. Must be one of: ${VALID_TYPES.join(', ')}`
      });
    }

    let query = 'SELECT * FROM memory';
    const params = [];

    if (type) {
      query += ' WHERE type = $1';
      params.push(type);
    }

    query += ' ORDER BY created_at DESC LIMIT $' + (params.length + 1);
    params.push(limit);

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    logger.error({ err }, 'Failed to get recent memories');
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Search memory by tags or text
app.get('/memory/search', auth, async (req, res) => {
  try {
    const { tag, q } = req.query;
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 20, 1), 100);

    // Validate tag if provided
    if (tag && (typeof tag !== 'string' || tag.length > 255)) {
      return res.status(400).json({ error: 'Invalid tag parameter' });
    }

    // Validate q if provided
    if (q && (typeof q !== 'string' || q.length > 500)) {
      return res.status(400).json({ error: 'Search query too long (max 500 chars)' });
    }

    let query = 'SELECT * FROM memory WHERE 1=1';
    const params = [];

    if (tag) {
      params.push(tag);
      query += ` AND $${params.length} = ANY(tags)`;
    }

    if (q) {
      params.push(`%${q}%`);
      query += ` AND content ILIKE $${params.length}`;
    }

    params.push(limit);
    query += ` ORDER BY created_at DESC LIMIT $${params.length}`;

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    logger.error({ err }, 'Failed to search memories');
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Stats
app.get('/memory/stats', auth, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        type,
        COUNT(*) as count,
        MAX(created_at) as last_entry
      FROM memory
      GROUP BY type
      ORDER BY count DESC
    `);

    const total = await pool.query('SELECT COUNT(*) as total FROM memory');

    res.json({
      total: parseInt(total.rows[0].total),
      by_type: result.rows.map(row => ({
        ...row,
        count: parseInt(row.count)
      }))
    });
  } catch (err) {
    logger.error({ err }, 'Failed to get stats');
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error Handler
app.use((err, req, res, next) => {
  logger.error({ err }, 'Unhandled error');
  res.status(500).json({ error: 'Internal server error' });
});

// Graceful Shutdown
const shutdown = async () => {
  logger.info('Shutting down...');
  await pool.end();
  process.exit(0);
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

// Export for testing
module.exports = { app, pool, logger };

// Start server only if not in test mode
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, '0.0.0.0', () => {
    logger.info({ port: PORT }, 'Brain API running');
  });
}
