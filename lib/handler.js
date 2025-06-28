/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                       𝗥𝗔𝗩𝗘𝗡-𝗠𝗗 𝗛𝗔𝗡𝗗𝗟𝗘𝗥                               ║
 * ║                    Message & Command Handler                                ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

const { commands } = require('./commands');
const { database } = require('./database');
const { Func } = require('./functions');
const config = require('../config');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

// Load all commands
function loadCommands() {
    const cmdDir = path.join(__dirname, '../cmd');
    const categories = fs.readdirSync(cmdDir);
    
    let loadedCount = 0;
    
    for (const category of categories) {
        const categoryPath = path.join(cmdDir, category);
        if (!fs.statSync(categoryPath).isDirectory()) continue;
        
        const files = fs.readdirSync(categoryPath).filter(file => file.endsWith('.js'));
        
        for (const file of files) {
            try {
                delete require.cache[require.resolve(path.join(categoryPath, file))];
                require(path.join(categoryPath, file));
                loadedCount++;
            } catch (error) {
                console.error(chalk.red(`❌ Error loading ${category}/${file}:`), error.message);
            }
        }
    }
    
    console.log(chalk.green(`✅ Loaded ${loadedCount} commands in ${categories.length} categories`));
}

// Initialize commands
loadCommands();

async function handler(sock, messageUpdate) {
    try {
        const { messages } = messageUpdate;
        if (!messages || messages.length === 0) return;
        
        const message = messages[0];
        if (!message || !message.message) return;
        
        // Skip if message is from bot itself
        if (message.key.fromMe) return;
        
        // Skip broadcast messages
        if (message.key.remoteJid === 'status@broadcast') return;
        
        // Enhanced message object
        const m = await enhanceMessage(sock, message);
        
        // Log message for debugging
        if (config.DEBUG) {
            console.log(chalk.blue('📨 Message:'), {
                from: m.sender,
                chat: m.chat,
                text: m.text?.substring(0, 50) + '...',
                type: m.mtype
            });
        }
        
        // Check if it's a command
        if (m.text && m.text.startsWith(config.PREFIX)) {
            await handleCommand(sock, m);
        }
        
        // Auto-respond features can be added here
        
    } catch (error) {
        console.error(chalk.red('❌ Handler error:'), error);
    }
}

async function enhanceMessage(sock, message) {
    const m = {
        // Original message data
        key: message.key,
        message: message.message,
        
        // Enhanced properties
        chat: message.key.remoteJid,
        sender: message.key.participant || message.key.remoteJid,
        isGroup: message.key.remoteJid?.endsWith('@g.us'),
        isPrivate: message.key.remoteJid?.endsWith('@s.whatsapp.net'),
        
        // Message content
        mtype: Object.keys(message.message)[0],
        text: '',
        
        // Utility functions
        reply: async (text, options = {}) => {
            // Add Raven-MD framing to all replies except menus
            if (!options.skipFrame && !text.includes('╭─') && !text.includes('┌─')) {
                text = `╔══════════════════════════════════════╗\n${text}\n╚══════════════════════════════════════╝`;
            }
            
            return await sock.sendMessage(m.chat, { text, ...options }, { quoted: message });
        },
        
        react: async (emoji) => {
            return await sock.sendMessage(m.chat, {
                react: { text: emoji, key: message.key }
            });
        },
        
        edit: async (text) => {
            return await sock.sendMessage(m.chat, {
                text,
                edit: message.key
            });
        }
    };
    
    // Extract text content
    if (message.message.conversation) {
        m.text = message.message.conversation;
    } else if (message.message.extendedTextMessage) {
        m.text = message.message.extendedTextMessage.text;
    } else if (message.message.imageMessage && message.message.imageMessage.caption) {
        m.text = message.message.imageMessage.caption;
    } else if (message.message.videoMessage && message.message.videoMessage.caption) {
        m.text = message.message.videoMessage.caption;
    }
    
    // Parse quoted message
    if (message.message.extendedTextMessage?.contextInfo?.quotedMessage) {
        m.quoted = message.message.extendedTextMessage.contextInfo.quotedMessage;
    }
    
    return m;
}

async function handleCommand(sock, m) {
    try {
        const text = m.text.slice(config.PREFIX.length).trim();
        const [commandName, ...args] = text.split(' ');
        
        if (!commandName) return;
        
        // Find command
        const cmd = commands.findCommand(commandName.toLowerCase());
        if (!cmd) return;
        
        // Check if command is enabled
        if (!cmd.enable) {
            return await m.reply(`❌ Command *${commandName}* is currently disabled.`);
        }
        
        // Permission checks
        const isOwner = config.OWNER_NUMBER === m.sender.split('@')[0] || 
                       config.SUDO_NUMBERS.includes(m.sender.split('@')[0]);
        
        // Owner only commands
        if (cmd.owner && !isOwner) {
            return await m.reply('❌ This command is only available for the bot owner.');
        }
        
        // Group only commands
        if (cmd.group && !m.isGroup) {
            return await m.reply('❌ This command can only be used in groups.');
        }
        
        // Private only commands
        if (cmd.private && m.isGroup) {
            return await m.reply('❌ This command can only be used in private chat.');
        }
        
        // Admin only commands (in groups)
        if (cmd.admin && m.isGroup) {
            const groupMetadata = await sock.groupMetadata(m.chat);
            const participants = groupMetadata.participants;
            const admins = participants.filter(p => p.admin === 'admin' || p.admin === 'superadmin');
            const isAdmin = admins.some(admin => admin.id === m.sender);
            
            if (!isAdmin && !isOwner) {
                return await m.reply('❌ This command requires admin privileges.');
            }
        }
        
        // Bot admin required
        if (cmd.botAdmin && m.isGroup) {
            const groupMetadata = await sock.groupMetadata(m.chat);
            const participants = groupMetadata.participants;
            const botId = sock.user.id.split(':')[0] + '@s.whatsapp.net';
            const botParticipant = participants.find(p => p.id === botId);
            
            if (!botParticipant || (botParticipant.admin !== 'admin' && botParticipant.admin !== 'superadmin')) {
                return await m.reply('❌ Bot needs to be an admin to use this command.');
            }
        }
        
        // Query requirement check
        if (cmd.query && args.length === 0) {
            const usage = cmd.usage ? `${config.PREFIX}${cmd.command[0]} ${cmd.usage}` : `${config.PREFIX}${cmd.command[0]} <query>`;
            let helpText = `❌ Please provide the required input.\n\n📝 *Usage:* ${usage}`;
            
            if (cmd.example) {
                helpText += `\n💡 *Example:* ${config.PREFIX}${cmd.command[0]} ${cmd.example}`;
            }
            
            return await m.reply(helpText);
        }
        
        // Cooldown check
        if (cmd.cooldown) {
            const userId = m.sender;
            if (commands.checkCooldown(cmd.name[0], userId)) {
                return await m.reply(`⏰ Please wait ${cmd.cooldown} seconds before using this command again.`);
            }
            commands.setCooldown(cmd.name[0], userId);
        }
        
        // Execute command
        await m.react('⏳');
        
        const context = {
            sock,
            m,
            text: args.join(' '),
            args,
            command: commandName,
            prefix: config.PREFIX,
            Func,
            config,
            commands
        };
        
        try {
            await cmd.run(context);
            await m.react('✅');
            
            // Increment usage stats
            commands.incrementUsage(cmd.name[0]);
            
        } catch (cmdError) {
            console.error(chalk.red(`❌ Command error in ${commandName}:`), cmdError);
            await m.react('❌');
            await m.reply(`❌ An error occurred while executing the command:\n\`\`\`${cmdError.message}\`\`\``);
        }
        
    } catch (error) {
        console.error(chalk.red('❌ Command handler error:'), error);
        await m.reply('❌ An unexpected error occurred while processing the command.');
    }
}

module.exports = {
    handler,
    loadCommands,
    enhanceMessage
};
