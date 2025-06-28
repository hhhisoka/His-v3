/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                        𝗥𝗔𝗩𝗘𝗡-𝗠𝗗 𝗔𝗦𝗦𝗘𝗧𝗦                              ║
 * ║                   Centralized Asset Management                              ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

// All images, links, and assets as URLs
const assets = {
    // Bot Images
    IMAGES: {
        LOGO: 'https://telegra.ph/file/b8e8bcc59f5a9a6d5f2b6.jpg',
        HISOKA_AVATAR: 'https://telegra.ph/file/d5e8a1fa7588e7e3dba1d.jpg',
        RAVEN_BANNER: 'https://telegra.ph/file/0c06df94c1d8f5bd82d64.jpg',
        MENU_BG: 'https://telegra.ph/file/abc123def456.jpg',
        ERROR_IMG: 'https://telegra.ph/file/error404.jpg',
        SUCCESS_IMG: 'https://telegra.ph/file/success.jpg',
        WARNING_IMG: 'https://telegra.ph/file/warning.jpg',
        
        // Category Icons
        GENERAL_ICON: 'https://telegra.ph/file/general.jpg',
        ADMIN_ICON: 'https://telegra.ph/file/admin.jpg',
        FUN_ICON: 'https://telegra.ph/file/fun.jpg',
        UTILITY_ICON: 'https://telegra.ph/file/utility.jpg',
        OWNER_ICON: 'https://telegra.ph/file/owner.jpg'
    },
    
    // Links and URLs
    LINKS: {
        GITHUB: 'https://github.com/RavenTechDev/raven-md',
        GITHUB_ISSUES: 'https://github.com/RavenTechDev/raven-md/issues',
        DOCUMENTATION: 'https://raven-md.vercel.app/docs',
        SUPPORT: 'https://chat.whatsapp.com/support',
        WEBSITE: 'https://raven-md.vercel.app',
        DEPLOY_HEROKU: 'https://heroku.com/deploy?template=https://github.com/RavenTechDev/raven-md',
        DEPLOY_KOYEB: 'https://app.koyeb.com/deploy?type=git&repository=RavenTechDev/raven-md',
        DEPLOY_RENDER: 'https://render.com/deploy?repo=https://github.com/RavenTechDev/raven-md'
    },
    
    // WhatsApp Channels and Groups
    CHANNELS: {
        UPDATES: 'https://whatsapp.com/channel/0029VbRavenMDUpdates',
        SUPPORT: 'https://chat.whatsapp.com/RavenMDSupport',
        COMMUNITY: 'https://chat.whatsapp.com/RavenMDCommunity',
        ANNOUNCEMENTS: 'https://whatsapp.com/channel/0029VbRavenAnnouncements'
    },
    
    // API Endpoints
    APIS: {
        // Image/Media APIs
        UPLOAD_API: 'https://telegra.ph/upload',
        IMGUR_UPLOAD: 'https://api.imgur.com/3/upload',
        
        // Utility APIs
        QR_GENERATOR: 'https://api.qrserver.com/v1/create-qr-code/',
        TRANSLATE_API: 'https://api.mymemory.translated.net/get',
        WEATHER_API: 'https://api.openweathermap.org/data/2.5/weather',
        
        // Entertainment APIs
        MEME_API: 'https://meme-api.herokuapp.com/gimme',
        JOKE_API: 'https://official-joke-api.appspot.com/random_joke',
        QUOTE_API: 'https://api.quotegarden.io/api/v3/quotes/random',
        
        // Social Media APIs
        YOUTUBE_DL: 'https://ytdl-api.herokuapp.com/api/ytdl',
        TIKTOK_DL: 'https://tiktok-api.herokuapp.com/api/download',
        INSTAGRAM_DL: 'https://instagram-api.herokuapp.com/api/download',
        
        // AI APIs
        CHATGPT_API: 'https://api.openai.com/v1/chat/completions',
        BARD_API: 'https://bard-api.herokuapp.com/api/chat',
        
        // Tools APIs
        REMOVE_BG: 'https://api.remove.bg/v1.0/removebg',
        OCR_API: 'https://api.ocr.space/parse/image',
        SHORT_URL: 'https://is.gd/create.php'
    },
    
    // Hisoka Theme Assets
    HISOKA_THEME: {
        CARDS: {
            SPADE: '♠️',
            HEART: '♥️',
            DIAMOND: '♦️',
            CLUB: '♣️',
            JOKER: '🃏'
        },
        
        EMOJIS: {
            MAGIC: '🎭',
            STAR: '⭐',
            SPARKLE: '✨',
            TARGET: '🎯',
            CIRCUS: '🎪',
            CRYSTAL: '🔮',
            CROWN: '👑',
            MYSTERY: '🌟'
        },
        
        COLORS: {
            PRIMARY: '#FF6B9D',    // Pink/Magenta
            SECONDARY: '#4ECDC4',  // Cyan
            ACCENT: '#FFE66D',     // Yellow
            DARK: '#2D3436',       // Dark Gray
            LIGHT: '#DDD6FE'       // Light Purple
        },
        
        FRAMES: {
            TOP: '╔══════════════════════════════════════╗',
            BOTTOM: '╚══════════════════════════════════════╝',
            SIDE: '║',
            CORNER_TL: '╔',
            CORNER_TR: '╗',
            CORNER_BL: '╚',
            CORNER_BR: '╝',
            HORIZONTAL: '═',
            VERTICAL: '║'
        }
    },
    
    // Default Responses
    RESPONSES: {
        LOADING: [
            '🔮 *Preparing magic...*',
            '🎭 *Hisoka is thinking...*',
            '⭐ *Casting spell...*',
            '🃏 *Shuffling cards...*',
            '🎪 *Setting up the stage...*'
        ],
        
        SUCCESS: [
            '🎭 *Perfect execution!*',
            '⭐ *Marvelous!*',
            '🃏 *Excellent!*',
            '🔮 *Magical!*',
            '🎯 *Right on target!*'
        ],
        
        ERROR: [
            '🎭 *Oops! Even magicians make mistakes...*',
            '🃏 *That trick didn\'t work as expected...*',
            '⭐ *Something went wrong in the magic show...*',
            '🔮 *The crystal ball is cloudy...*',
            '🎪 *Technical difficulties in the circus...*'
        ],
        
        WARNING: [
            '⚠️ *Be careful there...*',
            '🎭 *Hisoka is watching...*',
            '🃏 *That\'s not a wise move...*',
            '⭐ *Think twice before acting...*',
            '🔮 *The future looks uncertain...*'
        ]
    },
    
    // Social Media Platforms
    PLATFORMS: {
        YOUTUBE: {
            NAME: 'YouTube',
            ICON: '📺',
            API: 'yt-dlp',
            FORMATS: ['mp4', 'mp3', 'webm']
        },
        TIKTOK: {
            NAME: 'TikTok',
            ICON: '🎵',
            API: 'tiktok-scraper',
            FORMATS: ['mp4', 'mp3']
        },
        INSTAGRAM: {
            NAME: 'Instagram',
            ICON: '📸',
            API: 'instagram-scraper',
            FORMATS: ['jpg', 'mp4', 'mp3']
        },
        FACEBOOK: {
            NAME: 'Facebook',
            ICON: '📘',
            API: 'facebook-scraper',
            FORMATS: ['mp4', 'jpg']
        },
        TWITTER: {
            NAME: 'Twitter',
            ICON: '🐦',
            API: 'twitter-scraper',
            FORMATS: ['mp4', 'jpg', 'gif']
        }
    },
    
    // File Type Icons
    FILE_ICONS: {
        IMAGE: '🖼️',
        VIDEO: '🎬',
        AUDIO: '🎵',
        DOCUMENT: '📄',
        PDF: '📋',
        ARCHIVE: '📦',
        CODE: '💾',
        UNKNOWN: '📎'
    },
    
    // Status Messages
    STATUS: {
        ONLINE: '🟢 Online',
        OFFLINE: '🔴 Offline',
        MAINTENANCE: '🔧 Maintenance',
        UPDATING: '🔄 Updating',
        BUSY: '🟡 Busy'
    }
};

// Helper functions for asset management
function getRandomResponse(type) {
    const responses = assets.RESPONSES[type.toUpperCase()];
    if (!responses || responses.length === 0) return null;
    return responses[Math.floor(Math.random() * responses.length)];
}

function getThemeFrame(text) {
    const { TOP, BOTTOM } = assets.HISOKA_THEME.FRAMES;
    return `${TOP}\n${text}\n${BOTTOM}`;
}

function getPlatformInfo(url) {
    for (const [key, platform] of Object.entries(assets.PLATFORMS)) {
        if (url.includes(key.toLowerCase())) {
            return platform;
        }
    }
    return null;
}

function getFileIcon(extension) {
    const ext = extension.toLowerCase();
    
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext)) {
        return assets.FILE_ICONS.IMAGE;
    } else if (['mp4', 'avi', 'mkv', 'mov', 'wmv'].includes(ext)) {
        return assets.FILE_ICONS.VIDEO;
    } else if (['mp3', 'wav', 'ogg', 'm4a', 'flac'].includes(ext)) {
        return assets.FILE_ICONS.AUDIO;
    } else if (['pdf'].includes(ext)) {
        return assets.FILE_ICONS.PDF;
    } else if (['zip', 'rar', '7z', 'tar'].includes(ext)) {
        return assets.FILE_ICONS.ARCHIVE;
    } else if (['js', 'py', 'java', 'cpp', 'html', 'css'].includes(ext)) {
        return assets.FILE_ICONS.CODE;
    } else if (['doc', 'docx', 'txt', 'md'].includes(ext)) {
        return assets.FILE_ICONS.DOCUMENT;
    }
    
    return assets.FILE_ICONS.UNKNOWN;
}

module.exports = {
    ...assets,
    getRandomResponse,
    getThemeFrame,
    getPlatformInfo,
    getFileIcon
};
