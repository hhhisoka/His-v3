/**
 * 🔄 AUTO READ STATUS PLUGIN
 * Automatically reads WhatsApp status updates
 */

export default {
  name: "autoreadstatus",
  description: "Automatically read WhatsApp status updates",
  category: "utility",

  async execute(sock, message, from, body) {
    // Auto read status updates
    if (from === "status@broadcast") {
      try {
        await sock.readMessages([message.key])
        console.log("📖 Status read automatically")
      } catch (error) {
        console.error("Error reading status:", error)
      }
    }
  },
}
