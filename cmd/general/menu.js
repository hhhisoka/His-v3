/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                        𝗥𝗔𝗩𝗘𝗡-𝗠𝗗 𝗠𝗘𝗡𝗨                                ║
 * ║                      Main Menu Command                                      ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

const { commands } = require('../../lib/commands');
const { menuMessage } = require('../../lib/messages');
const { database } = require('../../lib/database');
const assets = require('../../assets/config');

commands.add({
    name: ['menu'],
    command: ['menu', 'help', 'start'],
    alias: ['m', 'list', 'commands'],
    category: 'general',
    desc: 'Display the main menu with all available commands',
    usage: '[category]',
    example: 'admin',
    cooldown: 3,
    run: async ({ sock, m, args, config }) => {
        try {
            // Get user stats
            const user = database.getUser(m.sender);
            
            // If specific category requested
            if (args[0]) {
                const category = args[0].toLowerCase();
                const categoryCommands = commands.getByCategory(category);
                
                if (categoryCommands.length === 0) {
                    return await m.reply(`❌ Category *${category}* not found or has no commands.`);
                }
                
                let categoryMenu = `╭─「 🎭 *${category.toUpperCase()} COMMANDS* 」\n│`;
                
                categoryCommands.forEach(cmd => {
                    categoryMenu += `\n│ ${config.PREFIX}${cmd.command[0]} - ${cmd.desc}`;
                });
                
                categoryMenu += `\n╰────────────────────\n\n🃏 *"Master each spell carefully..."*`;
                
                return await m.reply(categoryMenu, { skipFrame: true });
            }
            
            // Generate full menu
            const menu = menuMessage(commands, {
                user: user.name || 'Unknown',
                level: user.level,
                commands: user.commands
            });
            
            // Send menu with image
            await sock.sendMessage(m.chat, {
                image: { url: assets.IMAGES.RAVEN_BANNER },
                caption: menu
            }, { quoted: m.message });
            
            // Update user stats
            database.updateUser(m.sender, { commands: user.commands + 1 });
            
        } catch (error) {
            console.error('Menu command error:', error);
            await m.reply('❌ Failed to generate menu. Please try again.');
        }
    }
});
