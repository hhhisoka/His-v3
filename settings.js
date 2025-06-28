/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                       𝗥𝗔𝗩𝗘𝗡-𝗠𝗗 𝗦𝗘𝗧𝗧𝗜𝗡𝗚𝗦                            ║
 * ║                    Bot Configuration Settings                               ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

// ⚠️ IMPORTANT: Fill in your bot details here!
const settings = {
    // 🤖 Bot Information
    bot: {
        name: '𝗥𝗔𝗩𝗘𝗡-𝗠𝗗',
        number: '1234567890', // ⚠️ REQUIRED: Your bot's WhatsApp number (without +)
        version: '1.0.0',
        author: 'Raven-Hisoka Tech',
        description: 'Hisoka-inspired WhatsApp bot with advanced features'
    },
    
    // 👑 Owner Information  
    owner: {
        number: '1234567890', // ⚠️ REQUIRED: Your WhatsApp number (without +)
        name: 'Raven Owner',
        sudo: ['1234567890'], // Additional sudo users
    },
    
    // 🎯 Bot Behavior
    behavior: {
        prefix: '.',
        autoRead: true,
        autoStatusView: true,
        alwaysOnline: false,
        selfBot: false,
        publicMode: true
    },
    
    // 🌍 Localization
    locale: {
        language: 'en',
        timezone: 'Asia/Kolkata',
        currency: 'USD'
    },
    
    // 🔧 Features
    features: {
        antiLink: true,
        welcomeMessage: true,
        autoSticker: false,
        chatBot: false,
        downloadLimit: 200, // MB
        rateLimiting: true
    },
    
    // 🎨 Customization
    theme: {
        hisokaMode: true,
        customFrames: true,
        ravenBranding: true,
        coloredLogs: true
    },
    
    // 🔒 Security
    security: {
        antispam: true,
        blockUnknown: false,
        maxWarnings: 3,
        autoKick: false
    },
    
    // 📊 Database
    database: {
        type: 'json', // json, mongodb, mysql
        path: './database.json',
        backup: true,
        autoSave: true
    },
    
    // 🌐 APIs (Add your API keys here)
    apis: {
        openai: process.env.OPENAI_KEY || '',
        removeBg: process.env.RMBG_KEY || '',
        weather: process.env.WEATHER_KEY || '',
        youtube: process.env.YOUTUBE_KEY || '',
        spotify: process.env.SPOTIFY_KEY || ''
    },
    
    // 📱 Social Links
    social: {
        github: 'https://github.com/RavenTechDev/raven-md',
        channel: 'https://whatsapp.com/channel/0029VbRavenMDUpdates',
        support: 'https://chat.whatsapp.com/RavenMDSupport',
        website: 'https://raven-md.vercel.app'
    },
    
    // 🎪 Hisoka Quotes for various situations
    hisokaQuotes: {
        welcome: [
            "🃏 *Welcome to my magical world...*",
            "🎭 *Another player joins the game!*",
            "⭐ *How delightfully interesting...*",
            "🔮 *Let's see what you're capable of...*"
        ],
        goodbye: [
            "🃏 *Until we meet again...*",
            "🎭 *The show must go on without you...*",
            "⭐ *Such a shame to lose an audience...*",
            "🔮 *Your departure is... unexpected...*"
        ],
        error: [
            "🃏 *Even magic has its limits...*",
            "🎭 *That trick didn't work as planned...*",
            "⭐ *The cards are not in your favor...*",
            "🔮 *The crystal ball is cloudy today...*"
        ]
    }
};

// 🔍 Validation function
function validateSettings() {
    const errors = [];
    
    // Check required fields
    if (!settings.bot.number || settings.bot.number === '1234567890') {
        errors.push('❌ Bot number is required! Edit settings.js and add your bot\'s WhatsApp number.');
    }
    
    if (!settings.owner.number || settings.owner.number === '1234567890') {
        errors.push('❌ Owner number is required! Edit settings.js and add your WhatsApp number.');
    }
    
    // Validate number format
    if (settings.bot.number && !/^\d{10,15}$/.test(settings.bot.number)) {
        errors.push('❌ Bot number format is invalid! Use format: 1234567890 (no + or spaces)');
    }
    
    if (settings.owner.number && !/^\d{10,15}$/.test(settings.owner.number)) {
        errors.push('❌ Owner number format is invalid! Use format: 1234567890 (no + or spaces)');
    }
    
    // Display errors
    if (errors.length > 0) {
        console.log('\n╔══════════════════════════════════════════════════════════════╗');
        console.log('║                  ⚠️  CONFIGURATION ERRORS  ⚠️                 ║');
        console.log('╠══════════════════════════════════════════════════════════════╣');
        errors.forEach(error => {
            console.log(`║ ${error.padEnd(60)} ║`);
        });
        console.log('╠══════════════════════════════════════════════════════════════╣');
        console.log('║  📝 Edit settings.js file and restart the bot                ║');
        console.log('╚══════════════════════════════════════════════════════════════╝\n');
        
        process.exit(1);
    }
    
    console.log('✅ Settings validation passed!');
}

// 🎯 Get random Hisoka quote
function getHisokaQuote(type = 'welcome') {
    const quotes = settings.hisokaQuotes[type] || settings.hisokaQuotes.welcome;
    return quotes[Math.floor(Math.random() * quotes.length)];
}

// 🔧 Environment integration
function mergeWithEnv() {
    // Override with environment variables if present
    if (process.env.BOT_NUMBER) settings.bot.number = process.env.BOT_NUMBER;
    if (process.env.OWNER_NUMBER) settings.owner.number = process.env.OWNER_NUMBER;
    if (process.env.PREFIX) settings.behavior.prefix = process.env.PREFIX;
    if (process.env.BOT_NAME) settings.bot.name = process.env.BOT_NAME;
    
    // Boolean values
    if (process.env.AUTO_READ) settings.behavior.autoRead = process.env.AUTO_READ === 'true';
    if (process.env.ALWAYS_ONLINE) settings.behavior.alwaysOnline = process.env.ALWAYS_ONLINE === 'true';
    if (process.env.PUBLIC_MODE) settings.behavior.publicMode = process.env.PUBLIC_MODE === 'true';
    
    return settings;
}

// Initialize and validate
const finalSettings = mergeWithEnv();
validateSettings();

module.exports = {
    ...finalSettings,
    validateSettings,
    getHisokaQuote,
    mergeWithEnv
};
