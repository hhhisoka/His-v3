/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                        𝗥𝗔𝗩𝗘𝗡-𝗠𝗗 𝗘𝗩𝗔𝗟                                ║
 * ║                    Code Execution (Owner Only)                              ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

const { commands } = require('../../lib/commands');
const { database } = require('../../lib/database');
const { Func } = require('../../lib/functions');
const util = require('util');

commands.add({
    name: ['eval'],
    command: ['eval', 'exec', 'run'],
    alias: ['>', 'code'],
    category: 'owner',
    desc: 'Execute JavaScript code (Owner only)',
    usage: '<code>',
    example: 'console.log("Hello Raven!")',
    query: true,
    owner: true,
    hidden: true,
    run: async ({ sock, m, text, config }) => {
        try {
            await m.react('⚡');
            
            const startTime = Date.now();
            
            // Create evaluation context
            const context = {
                sock,
                m,
                config,
                database,
                commands,
                Func,
                console,
                process,
                require,
                __dirname,
                __filename
            };
            
            // Prepare code
            let code = text.trim();
            
            // Remove code block markers if present
            if (code.startsWith('```') && code.endsWith('```')) {
                code = code.slice(3, -3);
                if (code.startsWith('js\n')) code = code.slice(3);
                if (code.startsWith('javascript\n')) code = code.slice(11);
            }
            
            let result;
            let isAsync = false;
            
            // Check if code is async
            if (code.includes('await') || code.includes('async')) {
                isAsync = true;
                code = `(async () => { ${code} })()`;
            }
            
            // Execute code
            try {
                if (isAsync) {
                    result = await eval(code);
                } else {
                    result = eval(code);
                }
            } catch (execError) {
                result = execError;
            }
            
            const executionTime = Date.now() - startTime;
            
            // Format result
            let output;
            if (result instanceof Error) {
                output = `❌ *ERROR:*\n\`\`\`${result.name}: ${result.message}\`\`\``;
            } else if (typeof result === 'object') {
                output = `📤 *OUTPUT:*\n\`\`\`${util.inspect(result, { depth: 2, colors: false })}\`\`\``;
            } else if (result === undefined) {
                output = `✅ *EXECUTED* (undefined)`;
            } else {
                output = `📤 *OUTPUT:*\n\`\`\`${String(result)}\`\`\``;
            }
            
            // Add execution info
            const response = `🎭 *RAVEN-MD CODE EXECUTION*

⚡ *Execution Time:* ${executionTime}ms
🔍 *Type:* ${typeof result}

${output}

🃏 *"Code is just another form of magic..."*`;

            await m.reply(response);
            await m.react('✅');
            
        } catch (error) {
            console.error('Eval command error:', error);
            await m.react('❌');
            await m.reply(`❌ *EXECUTION FAILED:*\n\`\`\`${error.message}\`\`\``);
        }
    }
});
