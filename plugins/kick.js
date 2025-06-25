/**
 * 👢 KICK PLUGIN
 * Remove members from groups
 */

export default {
  name: "kick",
  description: "Remove members from group",
  category: "admin",
  commands: ["kick", "remove"],

  async execute(sock, message, from, body) {
    const isCommand = this.commands.some(
      (cmd) => body.toLowerCase().startsWith(`.${cmd}`) || body.toLowerCase().startsWith(`!${cmd}`),
    )

    if (!isCommand) return
    if (!from.endsWith("@g.us")) {
      await sock.sendMessage(from, { text: "❌ This command only works in groups!" })
      return
    }

    try {
      // Get group metadata
      const groupMetadata = await sock.groupMetadata(from)
      const participants = groupMetadata.participants
      const botNumber = sock.user.id.split(":")[0] + "@s.whatsapp.net"
      const senderNumber = message.key.participant || message.key.remoteJid

      // Check if bot is admin
      const botParticipant = participants.find((p) => p.id === botNumber)
      if (!botParticipant || botParticipant.admin !== "admin") {
        await sock.sendMessage(from, { text: "❌ I need to be an admin to kick members!" })
        return
      }

      // Check if sender is admin
      const senderParticipant = participants.find((p) => p.id === senderNumber)
      if (!senderParticipant || (senderParticipant.admin !== "admin" && senderParticipant.admin !== "superadmin")) {
        await sock.sendMessage(from, { text: "❌ Only admins can use this command!" })
        return
      }

      // Get mentioned users or quoted message
      let usersToKick = []

      if (message.message.extendedTextMessage?.contextInfo?.mentionedJid) {
        usersToKick = message.message.extendedTextMessage.contextInfo.mentionedJid
      } else if (message.message.extendedTextMessage?.contextInfo?.quotedMessage) {
        const quotedParticipant = message.message.extendedTextMessage.contextInfo.participant
        usersToKick = [quotedParticipant]
      }

      if (usersToKick.length === 0) {
        await sock.sendMessage(from, {
          text: "👢 *HISOKA KICK COMMAND*\n\nUsage:\n• .kick @user\n• Reply to a message with .kick",
        })
        return
      }

      // Remove users
      await sock.groupParticipantsUpdate(from, usersToKick, "remove")

      await sock.sendMessage(from, {
        text: `👢 *Kicked by HISOKA*\n\n${usersToKick.length} member(s) removed from the group!`,
      })
    } catch (error) {
      console.error("Kick error:", error)
      await sock.sendMessage(from, { text: "❌ Failed to kick member(s)" })
    }
  },
}
