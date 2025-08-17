#!/usr/bin/env node
/**
 * Hackathon Project Launcher
 * 
 * JavaScript equivalent of run.py
 * Choose between web server, API server, or CLI mode
 */

const { Command } = require('commander');
const { spawn } = require('child_process');
const path = require('path');

const program = new Command();

program
    .name('hackathon-launcher')
    .description('Launch your hackathon project in different modes')
    .version('1.0.0');

program
    .option('--mode <mode>', 'Run mode: web, api, or cli', 'web')
    .option('--host <host>', 'Host to run the server on', 'localhost')
    .option('--port <port>', 'Port to run the server on', '8000')
    .parse();

const options = program.opts();

console.log('🚀 Hackathon Project Launcher');
console.log('============================');
console.log(`Mode: ${options.mode}`);

switch (options.mode.toLowerCase()) {
    case 'web':
        runWebApp(options.host, options.port);
        break;
    case 'api':
        runAPIServer(options.host, options.port);
        break;
    case 'cli':
        runCLI();
        break;
    default:
        console.error(`❌ Unknown mode: ${options.mode}`);
        console.log('Available modes: web, api, cli');
        process.exit(1);
}

function runWebApp(host, port) {
    console.log(`🌐 Starting web application...`);
    console.log(`📍 URL: http://${host}:${port}`);
    
    // Set environment variables
    process.env.HOST = host;
    process.env.PORT = port;
    process.env.NODE_ENV = process.env.NODE_ENV || 'development';
    
    // Start the server
    const server = spawn('node', ['server.js'], {
        stdio: 'inherit',
        env: process.env
    });
    
    server.on('error', (error) => {
        console.error('❌ Failed to start web server:', error.message);
        process.exit(1);
    });
    
    server.on('exit', (code) => {
        console.log(`Web server exited with code ${code}`);
    });
    
    // Graceful shutdown
    process.on('SIGINT', () => {
        console.log('\n🛑 Shutting down web server...');
        server.kill('SIGINT');
    });
}

function runAPIServer(host, port) {
    console.log(`🔌 Starting API server...`);
    console.log(`📍 URL: http://${host}:${port}/api`);
    console.log(`📚 Health: http://${host}:${port}/api/health`);
    
    // Set environment variables for API-only mode
    process.env.HOST = host;
    process.env.PORT = port;
    process.env.NODE_ENV = process.env.NODE_ENV || 'development';
    process.env.API_ONLY = 'true';
    
    // Start the server (same server.js, but with API_ONLY flag)
    const server = spawn('node', ['server.js'], {
        stdio: 'inherit',
        env: process.env
    });
    
    server.on('error', (error) => {
        console.error('❌ Failed to start API server:', error.message);
        process.exit(1);
    });
    
    server.on('exit', (code) => {
        console.log(`API server exited with code ${code}`);
    });
    
    // Graceful shutdown
    process.on('SIGINT', () => {
        console.log('\n🛑 Shutting down API server...');
        server.kill('SIGINT');
    });
}

function runCLI() {
    console.log('💻 Starting CLI mode...');
    console.log('Run "node cli.js --help" for available commands');
    console.log('');
    
    // Show CLI demo
    const cli = spawn('node', ['cli.js', 'demo'], {
        stdio: 'inherit'
    });
    
    cli.on('error', (error) => {
        console.error('❌ Failed to start CLI:', error.message);
        process.exit(1);
    });
    
    cli.on('exit', (code) => {
        if (code === 0) {
            console.log('\n💡 CLI Commands:');
            console.log('  node cli.js demo                    - Run demo');
            console.log('  node cli.js info                    - Project info');
            console.log('  node cli.js test-api                - Test API server');
            console.log('  node cli.js user create -n "Name" -e "email"  - Create user');
            console.log('  node cli.js user list               - List users');
            console.log('  node cli.js seed                    - Add sample data');
        }
    });
}
