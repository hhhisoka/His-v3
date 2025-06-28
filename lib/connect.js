/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                      𝗥𝗔𝗩𝗘𝗡-𝗠𝗗 𝗖𝗢𝗡𝗡𝗘𝗖𝗧𝗜𝗢𝗡                            ║
 * ║                 Multi-Session WhatsApp Connection                           ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

const { 
    default: makeWASocket, 
    useMultiFileAuthState, 
    DisconnectReason,
    fetchLatestBaileysVersion,
    makeCacheableSignalKeyStore,
    Browsers
} = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const qrcode = require('qrcode-terminal');
const readline = require('readline');
const config = require('../config');
const { welcomeMessage } = require('./messages');

let isConnecting = false;

async function connect(method = 'qr', sessionId = 'main') {
    if (isConnecting) {
        console.log(chalk.yellow('⚠️ Connection already in progress...'));
        return null;
    }
    
    isConnecting = true;
    
    try {
        const { version, isLatest } = await fetchLatestBaileysVersion();
        console.log(chalk.cyan(`📱 Using WA v${version.join('.')}, isLatest: ${isLatest}`));
        
        // Session path
        const sessionPath = config.getSessionPath(sessionId);
        
        // Multi-file auth state
        const { state, saveCreds } = await useMultiFileAuthState(sessionPath);
        
        // Create socket
        const sock = makeWASocket({
            version,
            logger: config.DEBUG ? console : undefined,
            printQRInTerminal: false, // We handle QR manually
            auth: {
                creds: state.creds,
                keys: makeCacheableSignalKeyStore(state.keys, console)
            },
            browser: Browsers.macOS('Chrome'),
            generateHighQualityLinkPreview: true,
            defaultQueryTimeoutMs: undefined,
            keepAliveIntervalMs: 10000,
            markOnlineOnConnect: config.ALWAYS_ONLINE,
        });
        
        // Handle pairing code
        if (method === 'pairing' && !sock.authState.creds.registered) {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            
            const phoneNumber = await new Promise((resolve) => {
                rl.question(chalk.cyan('📱 Enter your WhatsApp phone number (with country code, e.g., +1234567890): '), resolve);
            });
            
            rl.close();
            
            console.log(chalk.yellow('⏳ Requesting pairing code...'));
            const code = await sock.requestPairingCode(phoneNumber.replace(/\D/g, ''));
            console.log(chalk.green.bold(`\n🔑 Your pairing code: ${code}`));
            console.log(chalk.cyan('📱 Open WhatsApp > Settings > Linked Devices > Link a Device > Enter the code above'));
        }
        
        // Connection state handler
        sock.ev.on('connection.update', async (update) => {
            const { connection, lastDisconnect, qr } = update;
            
            if (qr && method === 'qr') {
                console.log(chalk.cyan('\n📱 Scan the QR code with WhatsApp:'));
                qrcode.generate(qr, { small: true });
                console.log(chalk.gray('QR Code expires in 60 seconds...'));
            }
            
            if (connection === 'close') {
                const shouldReconnect = (lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut;
                
                console.log(chalk.red('❌ Connection closed due to:'), lastDisconnect?.error);
                
                if (shouldReconnect) {
                    console.log(chalk.yellow('🔄 Reconnecting...'));
                    isConnecting = false;
                    return await connect(method, sessionId);
                } else {
                    console.log(chalk.red('🚪 Logged out. Please restart to reconnect.'));
                    process.exit(0);
                }
            } else if (connection === 'open') {
                console.log(chalk.green.bold('✅ Successfully connected to WhatsApp!'));
                
                // Send welcome message
                const botNumber = sock.user?.id?.split(':')[0];
                if (botNumber) {
                    await sock.sendMessage(botNumber + '@s.whatsapp.net', {
                        text: welcomeMessage(sessionId, botNumber)
                    });
                }
                
                isConnecting = false;
            }
        });
        
        // Save credentials on update
        sock.ev.on('creds.update', saveCreds);
        
        // Mark messages as read if enabled
        if (config.AUTO_READ) {
            sock.ev.on('messages.upsert', async ({ messages }) => {
                for (const message of messages) {
                    if (message.key && message.key.remoteJid) {
                        await sock.readMessages([message.key]);
                    }
                }
            });
        }
        
        // Auto-view status updates
        if (config.AUTO_STATUS_VIEW) {
            sock.ev.on('messages.upsert', async ({ messages }) => {
                for (const message of messages) {
                    if (message.key && message.key.remoteJid === 'status@broadcast') {
                        await sock.readMessages([message.key]);
                    }
                }
            });
        }
        
        return sock;
        
    } catch (error) {
        console.error(chalk.red('❌ Connection error:'), error);
        isConnecting = false;
        throw error;
    }
}

// Multi-session management
async function connectSession(sessionId) {
    console.log(chalk.cyan(`🔗 Connecting session: ${sessionId}`));
    return await connect('qr', sessionId);
}

async function disconnectSession(sessionId) {
    console.log(chalk.yellow(`🔌 Disconnecting session: ${sessionId}`));
    // Implementation for disconnecting specific session
    return config.deleteSession(sessionId);
}

function getActiveSessions() {
    return config.getSessionsList();
}

module.exports = {
    connect,
    connectSession,
    disconnectSession,
    getActiveSessions
};
