/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                        𝗥𝗔𝗩𝗘𝗡-𝗠𝗗 𝗣𝗜𝗡𝗚                                ║
 * ║                      Bot Latency Test                                       ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

const { commands } = require('../../lib/commands');
const { Func } = require('../../lib/functions');
const assets = require('../../assets/config');

commands.add({
    name: ['ping'],
    command: ['ping', 'speed', 'latency'],
    alias: ['p', 'test'],
    category: 'general',
    desc: 'Check bot response time and performance',
    cooldown: 5,
    run: async ({ sock, m }) => {
        try {
            const startTime = Date.now();
            
            // Send initial message
            const sentMsg = await m.reply('🔮 *Testing connection...*');
            
            const responseTime = Date.now() - startTime;
            
            // Get system info
            const uptime = process.uptime();
            const memoryUsage = process.memoryUsage();
            
            const pingInfo = `🎭 *RAVEN-MD PERFORMANCE*

⚡ *Response Time:* ${responseTime}ms
🕐 *Uptime:* ${Func.msToTime(uptime * 1000)}
💾 *Memory Usage:* ${Func.formatSize(memoryUsage.used)}
🔄 *Process:* Node.js ${process.version}

${getLatencyEmoji(responseTime)} *Status:* ${getLatencyStatus(responseTime)}

🃏 *"Speed is the essence of magic..."*`;

            // Edit the message with results
            await sock.sendMessage(m.chat, {
                text: pingInfo,
                edit: sentMsg.key
            });
            
        } catch (error) {
            console.error('Ping command error:', error);
            await m.reply('❌ Failed to test connection. Please try again.');
        }
    }
});

function getLatencyEmoji(ms) {
    if (ms < 100) return '🟢';
    if (ms < 300) return '🟡';
    if (ms < 500) return '🟠';
    return '🔴';
}

function getLatencyStatus(ms) {
    if (ms < 100) return 'Excellent';
    if (ms < 300) return 'Good';
    if (ms < 500) return 'Average';
    if (ms < 1000) return 'Slow';
    return 'Very Slow';
}
