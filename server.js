#!/usr/bin/env node
/**
 * Hackathon Project - Express.js Server
 * 
 * Main web server with both web interface and API endpoints
 */

const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Configuration
const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || 'localhost';
const NODE_ENV = process.env.NODE_ENV || 'development';

// Security middleware
app.use(helmet({
    contentSecurityPolicy: false // Allow inline scripts for demo
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
app.use('/api', limiter);

// General middleware
app.use(compression());
app.use(morgan('combined'));
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static('static'));
app.use('/css', express.static(path.join(__dirname, 'static/css')));
app.use('/js', express.static(path.join(__dirname, 'static/js')));

// Template engine setup (using simple file serving for now)
app.set('view engine', 'html');

// Routes

// Home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});

// API Routes

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        message: 'Express.js server is running!',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: NODE_ENV
    });
});

// Demo endpoints
app.get('/api/demo', (req, res) => {
    res.json({
        message: 'Hello from your Express.js hackathon API!',
        endpoints: [
            { path: '/', method: 'GET', description: 'Home page' },
            { path: '/api/health', method: 'GET', description: 'Health check' },
            { path: '/api/demo', method: 'GET', description: 'Demo endpoint' },
            { path: '/api/demo', method: 'POST', description: 'Demo with data' },
            { path: '/api/user', method: 'POST', description: 'User operations' }
        ],
        method: 'GET',
        server: 'Express.js',
        nodeVersion: process.version
    });
});

app.post('/api/demo', (req, res) => {
    const receivedData = req.body;
    
    res.json({
        message: 'Data received successfully!',
        received_data: receivedData,
        method: 'POST',
        timestamp: new Date().toISOString(),
        server: 'Express.js'
    });
});

// User API (example for hackathon)
app.post('/api/user', (req, res) => {
    const { name, email, action } = req.body;
    
    // Simple validation
    if (!name || !email) {
        return res.status(400).json({
            error: 'Name and email are required',
            received: req.body
        });
    }
    
    // Simulate user operations
    const actions = {
        create: `User ${name} created with email ${email}`,
        update: `User ${name} updated`,
        delete: `User ${name} deleted`,
        get: `Retrieved user ${name}`
    };
    
    const message = actions[action] || `Unknown action for user ${name}`;
    
    res.json({
        success: true,
        message,
        user: { name, email },
        action: action || 'default',
        timestamp: new Date().toISOString()
    });
});

// File upload example
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ 
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        // Accept images and text files
        if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('text/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image and text files are allowed'));
        }
    }
});

app.post('/api/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    
    res.json({
        message: 'File uploaded successfully!',
        file: {
            originalName: req.file.originalname,
            mimeType: req.file.mimetype,
            size: req.file.size,
            buffer: req.file.buffer.length + ' bytes'
        },
        timestamp: new Date().toISOString()
    });
});

// Database example (SQLite)
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

// Initialize database
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
});

// Database API endpoints
app.get('/api/users', (req, res) => {
    db.all('SELECT * FROM users ORDER BY created_at DESC', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ users: rows, count: rows.length });
    });
});

app.post('/api/users', (req, res) => {
    const { name, email } = req.body;
    
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }
    
    db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        
        res.status(201).json({
            message: 'User created successfully!',
            user: { id: this.lastID, name, email },
            timestamp: new Date().toISOString()
        });
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: 'File upload error: ' + err.message });
    }
    
    res.status(500).json({
        error: 'Internal server error',
        message: NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Not found',
        path: req.originalUrl,
        availableEndpoints: [
            '/',
            '/api/health',
            '/api/demo',
            '/api/user',
            '/api/users',
            '/api/upload'
        ]
    });
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    db.close();
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    db.close();
    process.exit(0);
});

// Start server
const server = app.listen(PORT, HOST, () => {
    console.log(`🚀 Hackathon server running!`);
    console.log(`📍 Local:    http://${HOST}:${PORT}`);
    console.log(`🌐 Network:  http://localhost:${PORT}`);
    console.log(`📚 API docs: http://localhost:${PORT}/api/health`);
    console.log(`🔧 Environment: ${NODE_ENV}`);
    console.log(`⚡ Node.js: ${process.version}`);
});

module.exports = app;
