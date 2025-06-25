/**
 * 👁️ VIEW ONCE PLUGIN
 * View once messages handler
 */

import { downloadMediaMessage } from "@whiskeysockets/baileys"

export default {
  name: "viewonce",
  description: "Handle view once messages",
  category: "utility",

  async execute(sock, message, from, body) {
    if (message.message.viewOnceMessage) {
      try {
        const viewOnceMessage = message.message.viewOnceMessage.message

        if (viewOnceMessage.imageMessage || viewOnceMessage.videoMessage) {
          const media = await downloadMediaMessage(message, "buffer", {})
          const mediaType = viewOnceMessage.imageMessage ? "image" : "video"

          // Send the media back without view once
          const mediaMessage =
            mediaType === "image"
              ? { image: media, caption: "👁️ *View Once Media Captured by HISOKA*" }
              : { video: media, caption: "👁️ *View Once Media Captured by HISOKA*" }

          await sock.sendMessage(from, mediaMessage)
        }
      } catch (error) {
        console.error("View once error:", error)
      }
    }
  },
}
