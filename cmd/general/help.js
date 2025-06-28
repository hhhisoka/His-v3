/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                        𝗥𝗔𝗩𝗘𝗡-𝗠𝗗 𝗛𝗘𝗟𝗣                                ║
 * ║                     Command Help System                                     ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

const { commands } = require('../../lib/commands');
const { helpMessage } = require('../../lib/messages');

commands.add({
    name: ['help'],
    command: ['help', 'info'],
    alias: ['?', 'guide'],
    category: 'general',
    desc: 'Get detailed information about a specific command',
    usage: '<command>',
    example: 'ping',
    query: true,
    cooldown: 2,
    run: async ({ m, args, config }) => {
        try {
            const commandName = args[0].toLowerCase();
            
            // Find the command
            const cmd = commands.findCommand(commandName);
            
            if (!cmd) {
                const suggestions = commands.search(commandName).slice(0, 5);
                
                let response = `❌ Command *${commandName}* not found.`;
                
                if (suggestions.length > 0) {
                    response += `\n\n🔍 *Did you mean:*\n`;
                    suggestions.forEach(suggestion => {
                        response += `• ${config.PREFIX}${suggestion.command[0]}\n`;
                    });
                }
                
                response += `\n💡 Use ${config.PREFIX}menu to see all commands.`;
                
                return await m.reply(response);
            }
            
            // Generate help message
            const help = helpMessage(cmd);
            
            // Get command statistics
            const stats = commands.getStats(cmd.name[0]);
            
            if (stats && stats.usage > 0) {
                const additionalInfo = `

📊 *COMMAND STATISTICS*
• Used ${stats.usage} times
• Last used: ${stats.lastUsed ? new Date(stats.lastUsed).toLocaleDateString() : 'Never'}`;
                
                const helpWithStats = help.replace('╚══════════════════════════════════════╝', 
                    additionalInfo + '\n╚══════════════════════════════════════╝');
                
                return await m.reply(helpWithStats, { skipFrame: true });
            }
            
            await m.reply(help, { skipFrame: true });
            
        } catch (error) {
            console.error('Help command error:', error);
            await m.reply('❌ Failed to get command help. Please try again.');
        }
    }
});
