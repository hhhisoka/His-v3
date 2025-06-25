/**
 * 🎨 STICKER PLUGIN
 * Convert images/videos to stickers
 */

import { downloadMediaMessage } from "@whiskeysockets/baileys"
import sharp from "sharp"
import ffmpeg from "fluent-ffmpeg"
import fs from "fs"

export default {
  name: "sticker",
  description: "Convert images/videos to stickers",
  category: "media",
  commands: ["sticker", "s"],

  async execute(sock, message, from, body) {
    const isCommand = this.commands.some(
      (cmd) => body.toLowerCase().startsWith(`.${cmd}`) || body.toLowerCase().startsWith(`!${cmd}`),
    )

    if (!isCommand && !message.message.imageMessage && !message.message.videoMessage) return

    try {
      let media
      let isVideo = false

      if (message.message.imageMessage) {
        media = await downloadMediaMessage(message, "buffer", {})
      } else if (message.message.videoMessage) {
        media = await downloadMediaMessage(message, "buffer", {})
        isVideo = true
      } else {
        await sock.sendMessage(from, {
          text: "🎨 *HISOKA STICKER MAKER*\n\nReply to an image or video with .sticker or .s",
        })
        return
      }

      let stickerBuffer

      if (isVideo) {
        // Convert video to webp
        const tempVideo = `./temp_${Date.now()}.mp4`
        const tempSticker = `./temp_${Date.now()}.webp`

        fs.writeFileSync(tempVideo, media)

        await new Promise((resolve, reject) => {
          ffmpeg(tempVideo)
            .outputOptions([
              "-vcodec",
              "libwebp",
              "-vf",
              "scale=512:512:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=#00000000",
              "-loop",
              "0",
              "-preset",
              "default",
              "-an",
              "-vsync",
              "0",
              "-s",
              "512:512",
            ])
            .toFormat("webp")
            .save(tempSticker)
            .on("end", () => {
              stickerBuffer = fs.readFileSync(tempSticker)
              fs.unlinkSync(tempVideo)
              fs.unlinkSync(tempSticker)
              resolve()
            })
            .on("error", reject)
        })
      } else {
        // Convert image to webp
        stickerBuffer = await sharp(media)
          .resize(512, 512, {
            fit: "contain",
            background: { r: 0, g: 0, b: 0, alpha: 0 },
          })
          .webp()
          .toBuffer()
      }

      await sock.sendMessage(from, {
        sticker: stickerBuffer,
      })
    } catch (error) {
      console.error("Sticker error:", error)
      await sock.sendMessage(from, {
        text: "❌ Failed to create sticker. Please try again.",
      })
    }
  },
}
