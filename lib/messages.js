/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                       𝗥𝗔𝗩𝗘𝗡-𝗠𝗗 𝗠𝗘𝗦𝗦𝗔𝗚𝗘𝗦                             ║
 * ║                    Custom Message Templates                                 ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

const config = require('../config');
const assets = require('../assets/config');

function welcomeMessage(sessionId = 'main', botNumber = '') {
    return `*Hey there, RAVEN-MD User!* 👋🏻

Thanks for using *RAVEN-MD* — your session has been successfully created!

🔐 *Session ID:* ${sessionId === 'main' ? 'Primary Session' : sessionId}
⚠️ *Keep it safe!* Do NOT share this ID with anyone.

——————

*✅ Stay Updated:*  
Join our official WhatsApp Channel:  
${assets.CHANNELS.UPDATES}

*💻 Source Code:*  
Fork & explore the project on GitHub:  
${assets.LINKS.GITHUB}

*🎭 Bot Features:*
• Multi-session support (Levanter-style)
• Hisoka-inspired theming & commands  
• Advanced moderation tools
• QR & Pairing code connection
• Custom Raven magical experience

——————

> *© Powered by Raven-Hisoka Technology*
Stay mysterious and hack smart. 🃏✨`;
}

function menuMessage(commands, userStats = {}) {
    const categories = commands.getCategories();
    const totalCommands = commands.getCommandCount();
    
    let menu = `
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃                                                                                                                                      ┃
┃    ██████╗  █████╗ ██╗   ██╗███████╗███╗   ██╗      ███╗   ███╗██████╗                                                             ┃
┃    ██╔══██╗██╔══██╗██║   ██║██╔════╝████╗  ██║      ████╗ ████║██╔══██╗                                                            ┃
┃    ██████╔╝███████║██║   ██║█████╗  ██╔██╗ ██║█████╗██╔████╔██║██║  ██║                                                            ┃
┃    ██╔══██╗██╔══██║╚██╗ ██╔╝██╔══╝  ██║╚██╗██║╚════╝██║╚██╔╝██║██║  ██║                                                            ┃
┃    ██║  ██║██║  ██║ ╚████╔╝ ███████╗██║ ╚████║      ██║ ╚═╝ ██║██████╔╝                                                            ┃
┃    ╚═╝  ╚═╝╚═╝  ╚═╝  ╚═══╝  ╚══════╝╚═╝  ╚═══╝      ╚═╝     ╚═╝╚═════╝                                                             ┃
┃                                                                                                                                      ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                            🎭 𝐖𝐞𝐥𝐜𝐨𝐦𝐞 𝐭𝐨 𝐦𝐲 𝐦𝐚𝐠𝐢𝐜𝐚𝐥 𝐰𝐨𝐫𝐥𝐝 🎭                                            │
│                                                                                                                                      │
│    🃏 Bot: ${config.BOT_NAME}                                                                                                         │
│    ⭐ Version: ${config.BOT_VERSION}                                                                                                  │
│    🔮 Prefix: ${config.PREFIX}                                                                                                       │
│    🎪 Commands: ${totalCommands}                                                                                                     │
│    🎯 Categories: ${categories.length}                                                                                               │
│    🌟 User: ${userStats.user || 'Mysterious Guest'}                                                                                 │
└──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘`;

    categories.forEach(category => {
        const categoryCommands = commands.getByCategory(category);
        if (categoryCommands.length === 0) return;
        
        menu += `\n\n╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║  ${getCategoryIcon(category)} 𝗖𝗔𝗧𝗘𝗚𝗢𝗥𝗬: ${category.toUpperCase()}                                                                                                       ║
╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝`;
        
        categoryCommands.forEach((cmd, index) => {
            const cmdName = cmd.command[0];
            const desc = cmd.desc || 'No description';
            const isLast = index === categoryCommands.length - 1;
            
            menu += `\n┃ ${config.PREFIX}${cmdName.padEnd(15)} ➤ ${desc}`;
        });
    });
    
    menu += `\n\n╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║                                              🎪 𝗛𝗶𝘀𝗼𝗸𝗮'𝘀 𝗠𝗮𝗴𝗶𝗰 𝗧𝗶𝗽𝘀 🎪                                              ║
╠═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣
║  ⚡ Type ${config.PREFIX}help <command> for spell details                                                                           ║
║  🔮 Use ${config.PREFIX}ping to test magical connection                                                                            ║
║  🃏 Join our mystical channels for updates                                                                                         ║
║  ⭐ Each command is a new trick to master                                                                                          ║
╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝

                                    🎭 "𝘞𝘦𝘭𝘤𝘰𝘮𝘦 𝘵𝘰 𝘮𝘺 𝘤𝘪𝘳𝘤𝘶𝘴... 𝘓𝘦𝘵'𝘴 𝘴𝘦𝘦 𝘸𝘩𝘢𝘵 𝘺𝘰𝘶'𝘳𝘦 𝘤𝘢𝘱𝘢𝘣𝘭𝘦 𝘰𝘧..." 🎭`;

    return menu;
}

function getCategoryIcon(category) {
    const icons = {
        'general': '🎯',
        'admin': '👑',
        'fun': '🎪',
        'utility': '🔧',
        'owner': '🎭',
        'group': '👥',
        'download': '📥',
        'search': '🔍',
        'ai': '🤖',
        'media': '🎨',
        'sticker': '🏷️',
        'info': 'ℹ️',
        'tools': '⚙️'
    };
    
    return icons[category.toLowerCase()] || '📝';
}

function helpMessage(command) {
    if (!command) {
        return `╔══════════════════════════════════════╗
❌ Command not found!

Use ${config.PREFIX}menu to see all available commands.
╚══════════════════════════════════════╝`;
    }
    
    let help = `╔══════════════════════════════════════╗
🎭 *COMMAND HELP*

📝 *Name:* ${command.command[0]}
📂 *Category:* ${command.category}
📄 *Description:* ${command.desc}`;

    if (command.alias && command.alias.length > 0) {
        help += `\n🏷️ *Aliases:* ${command.alias.join(', ')}`;
    }
    
    if (command.usage) {
        help += `\n📋 *Usage:* ${config.PREFIX}${command.command[0]} ${command.usage}`;
    }
    
    if (command.example) {
        help += `\n💡 *Example:* ${config.PREFIX}${command.command[0]} ${command.example}`;
    }
    
    if (command.cooldown) {
        help += `\n⏰ *Cooldown:* ${command.cooldown}s`;
    }
    
    // Permissions
    const perms = [];
    if (command.owner) perms.push('Owner Only');
    if (command.admin) perms.push('Admin Only');
    if (command.group) perms.push('Group Only');
    if (command.private) perms.push('Private Only');
    if (command.premium) perms.push('Premium Only');
    
    if (perms.length > 0) {
        help += `\n🔒 *Permissions:* ${perms.join(', ')}`;
    }
    
    help += `\n╚══════════════════════════════════════╝`;
    
    return help;
}

function errorMessage(error, context = 'Unknown') {
    return `╔══════════════════════════════════════╗
❌ *ERROR OCCURRED*

🎭 *Context:* ${context}
📝 *Message:* ${error.message || error}
🕐 *Time:* ${new Date().toLocaleString()}

🃏 *"Even magic can fail sometimes..."*
╚══════════════════════════════════════╝`;
}

function successMessage(message, action = 'Action') {
    return `╔══════════════════════════════════════╗
✅ *SUCCESS*

🎭 *Action:* ${action}
📝 *Result:* ${message}
🕐 *Time:* ${new Date().toLocaleString()}

🃏 *"Perfect execution, as expected..."*
╚══════════════════════════════════════╝`;
}

function warningMessage(message, reason = 'Warning') {
    return `╔══════════════════════════════════════╗
⚠️ *WARNING*

🎭 *Type:* ${reason}
📝 *Details:* ${message}
🕐 *Time:* ${new Date().toLocaleString()}

🃏 *"Be more careful next time..."*
╚══════════════════════════════════════╝`;
}

function infoMessage(title, content) {
    return `╔══════════════════════════════════════╗
ℹ️ *${title.toUpperCase()}*

${content}

🃏 *"Knowledge is power..."*
╚══════════════════════════════════════╝`;
}

function statsMessage(stats) {
    return `╔══════════════════════════════════════╗
📊 *RAVEN-MD STATISTICS*

🤖 *Bot Uptime:* ${stats.uptime || 'Unknown'}
📨 *Messages Processed:* ${stats.messages || 0}
⚡ *Commands Executed:* ${stats.commands || 0}
👥 *Active Users:* ${stats.users || 0}
🏰 *Active Groups:* ${stats.groups || 0}
🎭 *Sessions:* ${stats.sessions || 1}

🃏 *"Numbers don't lie..."*
╚══════════════════════════════════════╝`;
}

// Hisoka-themed responses
function hisokaResponses() {
    return [
        "🃏 *Excellent choice...*",
        "🎭 *How delightfully unexpected!*",
        "⭐ *This is getting interesting...*",
        "🔮 *Perfect execution!*",
        "🎪 *The show must go on!*",
        "♠️ *A masterful move...*",
        "🌟 *Marvelous!*",
        "🎯 *Right on target!*"
    ];
}

function getRandomHisokaResponse() {
    const responses = hisokaResponses();
    return responses[Math.floor(Math.random() * responses.length)];
}

module.exports = {
    welcomeMessage,
    menuMessage,
    helpMessage,
    errorMessage,
    successMessage,
    warningMessage,
    infoMessage,
    statsMessage,
    getCategoryIcon,
    hisokaResponses,
    getRandomHisokaResponse
};
