/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                            𝗥𝗔𝗩𝗘𝗡-𝗠𝗗 𝗕𝗢𝗧                                ║
 * ║                    Powered by Raven-Hisoka Technology                       ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

const { connect } = require('./lib/connect');
const { handler } = require('./lib/handler');
const config = require('./config');
const chalk = require('chalk');
const readline = require('readline');

console.clear();

// Raven-MD ASCII Art
console.log(chalk.red.bold(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║   ██████╗  █████╗ ██╗   ██╗███████╗███╗   ██╗      ███╗   ███╗██████╗        ║
║   ██╔══██╗██╔══██╗██║   ██║██╔════╝████╗  ██║      ████╗ ████║██╔══██╗       ║
║   ██████╔╝███████║██║   ██║█████╗  ██╔██╗ ██║█████╗██╔████╔██║██║  ██║       ║
║   ██╔══██╗██╔══██║╚██╗ ██╔╝██╔══╝  ██║╚██╗██║╚════╝██║╚██╔╝██║██║  ██║       ║
║   ██║  ██║██║  ██║ ╚████╔╝ ███████╗██║ ╚████║      ██║ ╚═╝ ██║██████╔╝       ║
║   ╚═╝  ╚═╝╚═╝  ╚═╝  ╚═══╝  ╚══════╝╚═╝  ╚═══╝      ╚═╝     ╚═╝╚═════╝        ║
║                                                                              ║
║                        ${chalk.cyan('Hisoka-Inspired WhatsApp Bot')}                        ║
║                            ${chalk.yellow('Version 1.0.0')}                                ║
╚══════════════════════════════════════════════════════════════════════════════╝
`));

console.log(chalk.magenta.bold('🎭 Welcome to Raven-MD - The Hisoka-Inspired WhatsApp Bot'));
console.log(chalk.gray('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'));

// Connection method selection
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askConnectionMethod() {
    return new Promise((resolve) => {
        console.log(chalk.cyan('\n🔗 Choose your connection method:'));
        console.log(chalk.white('1. QR Code (Scan with WhatsApp)'));
        console.log(chalk.white('2. Pairing Code (Enter phone number)'));
        
        rl.question(chalk.yellow('\nEnter your choice (1 or 2): '), (answer) => {
            if (answer === '1' || answer === '2') {
                resolve(answer);
            } else {
                console.log(chalk.red('❌ Invalid choice. Please enter 1 or 2.'));
                askConnectionMethod().then(resolve);
            }
        });
    });
}

async function startBot() {
    try {
        console.log(chalk.blue('\n🚀 Starting Raven-MD Bot...'));
        
        let connectionMethod = 'qr';
        
        // Check command line arguments
        if (process.argv.includes('--qr')) {
            connectionMethod = 'qr';
            console.log(chalk.green('📱 QR Code mode selected via command line'));
        } else if (process.argv.includes('--pairing-code')) {
            connectionMethod = 'pairing';
            console.log(chalk.green('🔢 Pairing code mode selected via command line'));
        } else {
            // Interactive selection
            const choice = await askConnectionMethod();
            connectionMethod = choice === '1' ? 'qr' : 'pairing';
        }
        
        rl.close();
        
        console.log(chalk.cyan('\n⚡ Initializing connection...'));
        
        // Start connection with selected method
        const sock = await connect(connectionMethod);
        
        // Set up message handler
        sock.ev.on('messages.upsert', async (messageUpdate) => {
            await handler(sock, messageUpdate);
        });
        
        console.log(chalk.green.bold('\n✅ Raven-MD Bot is now online!'));
        console.log(chalk.gray('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'));
        
    } catch (error) {
        console.error(chalk.red('❌ Error starting bot:'), error);
        process.exit(1);
    }
}

// Handle process termination
process.on('SIGINT', () => {
    console.log(chalk.yellow('\n👋 Raven-MD Bot shutting down...'));
    process.exit(0);
});

process.on('uncaughtException', (error) => {
    console.error(chalk.red('❌ Uncaught Exception:'), error);
});

process.on('unhandledRejection', (error) => {
    console.error(chalk.red('❌ Unhandled Rejection:'), error);
});

// Start the bot
startBot();
