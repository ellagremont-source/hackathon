#!/usr/bin/env node
/**
 * CLI Interface for Hackathon Project
 */

const { Command } = require('commander');
const axios = require('axios');

const program = new Command();

program
    .name('hackathon-cli')
    .description('CLI tools for your hackathon project')
    .version('1.0.0');

// Demo command
program
    .command('demo')
    .description('Run a demo of the CLI functionality')
    .option('-m, --message <message>', 'Custom message to display', 'Hello from CLI!')
    .action((options) => {
        console.log('🎉 Welcome to your Hackathon CLI!');
        console.log('✨ Your message:', options.message);
        console.log('🚀 Project is ready for development!');
        
        // Show some system info
        console.log('\n📊 System Information:');
        console.log(`   Node.js: ${process.version}`);
        console.log(`   Platform: ${process.platform}`);
        console.log(`   Architecture: ${process.arch}`);
        console.log(`   Memory Usage: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB`);
    });

// API test command
program
    .command('test-api')
    .description('Test the API server')
    .option('-u, --url <url>', 'API base URL', 'http://localhost:8000')
    .action(async (options) => {
        console.log('🔍 Testing API server...');
        
        try {
            // Test health endpoint
            const healthResponse = await axios.get(`${options.url}/api/health`);
            console.log('✅ Health check:', healthResponse.data.message);
            
            // Test demo endpoint
            const demoResponse = await axios.get(`${options.url}/api/demo`);
            console.log('✅ Demo endpoint:', demoResponse.data.message);
            
            // Test POST demo
            const postData = { message: 'CLI test message', timestamp: new Date().toISOString() };
            const postResponse = await axios.post(`${options.url}/api/demo`, postData);
            console.log('✅ POST demo:', postResponse.data.message);
            
            console.log('\n🎉 All API tests passed!');
            
        } catch (error) {
            console.error('❌ API test failed:', error.message);
            if (error.code === 'ECONNREFUSED') {
                console.log('💡 Make sure the server is running: npm start');
            }
        }
    });

// User management commands
program
    .command('user')
    .description('User management commands')
    .argument('<action>', 'Action to perform (create, list)')
    .option('-n, --name <name>', 'User name')
    .option('-e, --email <email>', 'User email')
    .option('-u, --url <url>', 'API base URL', 'http://localhost:8000')
    .action(async (action, options) => {
        try {
            switch (action) {
                case 'create':
                    if (!options.name || !options.email) {
                        console.error('❌ Name and email are required for user creation');
                        process.exit(1);
                    }
                    
                    const createResponse = await axios.post(`${options.url}/api/users`, {
                        name: options.name,
                        email: options.email
                    });
                    
                    console.log('✅ User created:', createResponse.data.message);
                    console.log('👤 User:', createResponse.data.user);
                    break;
                    
                case 'list':
                    const listResponse = await axios.get(`${options.url}/api/users`);
                    console.log('📋 Users in database:', listResponse.data.count);
                    
                    if (listResponse.data.users.length > 0) {
                        console.table(listResponse.data.users);
                    } else {
                        console.log('   No users found. Create one with: node cli.js user create -n "Name" -e "email@example.com"');
                    }
                    break;
                    
                default:
                    console.error('❌ Unknown user action:', action);
                    console.log('Available actions: create, list');
                    process.exit(1);
            }
        } catch (error) {
            console.error('❌ User command failed:', error.message);
            if (error.response?.data?.error) {
                console.error('   Server error:', error.response.data.error);
            }
        }
    });

// Project info command
program
    .command('info')
    .description('Show project information')
    .action(() => {
        console.log('🚀 Hackathon Project Information');
        console.log('================================');
        console.log('');
        console.log('📦 Project: JavaScript/Node.js Hackathon Starter');
        console.log('🔧 Framework: Express.js');
        console.log('📚 Database: SQLite3 (in-memory for demo)');
        console.log('🎨 Frontend: Vanilla HTML/CSS/JavaScript');
        console.log('');
        console.log('🚀 Available Commands:');
        console.log('   npm start        - Start the web server');
        console.log('   npm run dev      - Start with auto-restart');
        console.log('   node cli.js demo - Run CLI demo');
        console.log('   node cli.js info - Show this information');
        console.log('');
        console.log('🌐 Server Endpoints:');
        console.log('   http://localhost:8000      - Web interface');
        console.log('   http://localhost:8000/api  - API endpoints');
        console.log('');
        console.log('💡 Pro tip: Check package.json for all available scripts!');
    });

// Generate sample data command
program
    .command('seed')
    .description('Seed the database with sample data')
    .option('-c, --count <count>', 'Number of sample users to create', '5')
    .option('-u, --url <url>', 'API base URL', 'http://localhost:8000')
    .action(async (options) => {
        const count = parseInt(options.count);
        console.log(`🌱 Seeding database with ${count} sample users...`);
        
        const sampleUsers = [
            { name: 'Alice Johnson', email: 'alice@hackathon.dev' },
            { name: 'Bob Smith', email: 'bob@hackathon.dev' },
            { name: 'Carol Williams', email: 'carol@hackathon.dev' },
            { name: 'David Brown', email: 'david@hackathon.dev' },
            { name: 'Eve Davis', email: 'eve@hackathon.dev' },
            { name: 'Frank Wilson', email: 'frank@hackathon.dev' },
            { name: 'Grace Miller', email: 'grace@hackathon.dev' },
            { name: 'Henry Garcia', email: 'henry@hackathon.dev' }
        ];
        
        try {
            let created = 0;
            for (let i = 0; i < Math.min(count, sampleUsers.length); i++) {
                try {
                    await axios.post(`${options.url}/api/users`, sampleUsers[i]);
                    created++;
                    console.log(`✅ Created user: ${sampleUsers[i].name}`);
                } catch (error) {
                    if (error.response?.status === 500 && error.response?.data?.error?.includes('UNIQUE constraint')) {
                        console.log(`⚠️  User already exists: ${sampleUsers[i].name}`);
                    } else {
                        console.error(`❌ Failed to create user: ${sampleUsers[i].name}`);
                    }
                }
            }
            
            console.log(`\n🎉 Seeding complete! Created ${created} new users.`);
            console.log('💡 View users with: node cli.js user list');
            
        } catch (error) {
            console.error('❌ Seeding failed:', error.message);
        }
    });

program.parse(process.argv);



