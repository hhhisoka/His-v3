/**
 * ⚙️ HISOKA-MD CONFIGURATION
 */

export const config = {
  // Bot Info
  botName: "HISOKA-MD",
  version: "1.0.0",
  author: "Hisoka Team",

  // Prefixes
  prefix: [".", "!", "#", "$"],

  // Owner
  owner: ["your_number@s.whatsapp.net"],

  // Features
  features: {
    autoReadStatus: true,
    autoReact: true,
    antiSpam: true,
    welcomeMessage: true,
  },

  // Limits
  limits: {
    messagePerMinute: 20,
    stickerPerHour: 50,
  },

  // Messages
  messages: {
    owner: "👑 This command is only for the bot owner!",
    admin: "👮‍♂️ This command is only for group admins!",
    group: "👥 This command only works in groups!",
    private: "🔒 This command only works in private chat!",
    botAdmin: "🤖 I need to be an admin to execute this command!",
    error: "❌ An error occurred while executing the command!",
  },
}
