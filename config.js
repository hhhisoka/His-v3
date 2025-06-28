/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                         𝗥𝗔𝗩𝗘𝗡-𝗠𝗗 𝗖𝗢𝗡𝗙𝗜𝗚                              ║
 * ║                    Multi-Session Configuration                              ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

const fs = require('fs');
const path = require('path');

// Environment variables with fallbacks
const config = {
    // Bot Configuration
    BOT_NAME: process.env.BOT_NAME || '𝗥𝗔𝗩𝗘𝗡-𝗠𝗗',
    BOT_VERSION: '1.0.0',
    PREFIX: process.env.PREFIX || '.',
    
    // Session Management (Levanter-style)
    SESSION_ID: process.env.SESSION_ID || '',
    MULTI_SESSION: process.env.MULTI_SESSION === 'true',
    SESSION_FOLDER: path.join(__dirname, 'sessions'),
    
    // Bot Settings
    BOT_NUMBER: process.env.BOT_NUMBER || '',
    OWNER_NUMBER: process.env.OWNER_NUMBER || '1234567890',
    SUDO_NUMBERS: process.env.SUDO_NUMBERS ? process.env.SUDO_NUMBERS.split(',') : [],
    
    // Bot Behavior
    AUTO_READ: process.env.AUTO_READ === 'true',
    AUTO_STATUS_VIEW: process.env.AUTO_STATUS_VIEW === 'true',
    ALWAYS_ONLINE: process.env.ALWAYS_ONLINE === 'true',
    DISABLE_PM: process.env.DISABLE_PM === 'true',
    
    // Language & Localization
    BOT_LANG: process.env.BOT_LANG || 'en',
    TIMEZONE: process.env.TZ || 'Asia/Kolkata',
    
    // Limits & Restrictions
    WARN_LIMIT: parseInt(process.env.WARN_LIMIT) || 3,
    MAX_UPLOAD: parseInt(process.env.MAX_UPLOAD) || 200,
    RATE_LIMIT: parseInt(process.env.RATE_LIMIT) || 10,
    
    // Features
    STICKER_PACKNAME: process.env.STICKER_PACKNAME || 'Raven-MD',
    STICKER_AUTHOR: process.env.STICKER_AUTHOR || 'Hisoka',
    
    // External APIs
    RMBG_KEY: process.env.RMBG_KEY || null,
    OPENAI_KEY: process.env.OPENAI_KEY || null,
    
    // Database
    DATABASE_URL: process.env.DATABASE_URL || 'sqlite:./database.db',
    
    // Development
    DEBUG: process.env.DEBUG === 'true',
    VPS: process.env.VPS === 'true',
    
    // Raven-MD Specific
    RAVEN_MODE: process.env.RAVEN_MODE || 'public', // public, private, group
    HISOKA_THEME: process.env.HISOKA_THEME === 'true',
    
    // Connection Details
    PAIRING_NUMBER: process.env.PAIRING_NUMBER || '',
    CONNECTION_METHOD: process.env.CONNECTION_METHOD || 'qr', // qr or pairing
};

// Create sessions directory if it doesn't exist
if (!fs.existsSync(config.SESSION_FOLDER)) {
    fs.mkdirSync(config.SESSION_FOLDER, { recursive: true });
}

// Validate essential configuration
function validateConfig() {
    const errors = [];
    
    if (!config.BOT_NUMBER) {
        errors.push('BOT_NUMBER is required in settings.js or environment variables');
    }
    
    if (!config.OWNER_NUMBER || config.OWNER_NUMBER === '1234567890') {
        errors.push('OWNER_NUMBER must be set to your actual WhatsApp number');
    }
    
    if (errors.length > 0) {
        console.error('❌ Configuration errors:');
        errors.forEach(error => console.error(`   • ${error}`));
        process.exit(1);
    }
}

// Session management functions
function getSessionPath(sessionId = 'main') {
    return path.join(config.SESSION_FOLDER, `session_${sessionId}`);
}

function getSessionsList() {
    if (!fs.existsSync(config.SESSION_FOLDER)) return [];
    
    return fs.readdirSync(config.SESSION_FOLDER)
        .filter(file => file.startsWith('session_'))
        .map(file => file.replace('session_', ''));
}

function deleteSession(sessionId = 'main') {
    const sessionPath = getSessionPath(sessionId);
    if (fs.existsSync(sessionPath)) {
        fs.rmSync(sessionPath, { recursive: true, force: true });
        return true;
    }
    return false;
}

module.exports = {
    ...config,
    validateConfig,
    getSessionPath,
    getSessionsList,
    deleteSession
};
