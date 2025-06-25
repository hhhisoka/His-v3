/**
 * 🃏 HISOKA-MD - WhatsApp Bot
 * Created with Bailey library
 */

import {
  makeWASocket,
  DisconnectReason,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
} from "@whiskeysockets/baileys"
import pino from "pino"
import chalk from "chalk"
import { generatePairingCode, displaySessionSuccess, generateSessionId } from "./lib/auth.js"
import { logger } from "./lib/logger.js"
import { loadPlugins } from "./lib/plugins.js"

const logger_pino = pino({ level: "silent" })

async function startHisokaMD() {
  console.log(
    chalk.magenta(`
  ██╗  ██╗██╗███████╗ ██████╗ ██╗  ██╗ █████╗       ███╗   ███╗██████╗ 
  ██║  ██║██║██╔════╝██╔═══██╗██║ ██╔╝██╔══██╗      ████╗ ████║██╔══██╗
  ███████║██║███████╗██║   ██║█████╔╝ ███████║█████╗██╔████╔██║██║  ██║
  ██╔══██║██║╚════██║██║   ██║██╔═██╗ ██╔══██║╚════╝██║╚██╔╝██║██║  ██║
  ██║  ██║██║███████║╚██████╔╝██║  ██╗██║  ██║      ██║ ╚═╝ ██║██████╔╝
  ╚═╝  ╚═╝╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝      ╚═╝     ╚═╝╚═════╝ 
  `),
  )

  console.log(chalk.yellow("🃏 Starting HISOKA-MD Bot..."))
  console.log(chalk.cyan("📱 Inspired by Levanter"))
  console.log(chalk.magenta("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"))

  const { state, saveCreds } = await useMultiFileAuthState("./session")
  const { version, isLatest } = await fetchLatestBaileysVersion()

  logger.info(`Using WA v${version.join(".")}, isLatest: ${isLatest}`)

  const sock = makeWASocket({
    version,
    logger: logger_pino,
    printQRInTerminal: false,
    auth: state,
    browser: ["HISOKA-MD", "Chrome", "1.0.0"],
    generateHighQualityLinkPreview: true,
    defaultQueryTimeoutMs: 60000,
  })

  // Load plugins
  await loadPlugins(sock)

  if (!sock.authState.creds.registered) {
    const phoneNumber = await generatePairingCode()
    const code = await sock.requestPairingCode(phoneNumber)

    console.log(chalk.magenta("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"))
    console.log(chalk.yellow("           🔐 PAIRING CODE READY 🔐"))
    console.log(chalk.magenta("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"))
    console.log(chalk.green(`📱 Your Pairing Code: ${chalk.bold.yellow(code)}`))
    console.log(chalk.cyan("📝 Enter this code in WhatsApp:"))
    console.log(chalk.gray("   Settings > Linked Devices > Link a Device"))
    console.log(chalk.magenta("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"))
    console.log(chalk.green('🎭 "The anticipation is killing me..." - Hisoka'))
    console.log(chalk.magenta("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"))
  }

  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update

    if (connection === "close") {
      const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut

      logger.info("Connection closed due to", lastDisconnect?.error, ", reconnecting", shouldReconnect)

      if (shouldReconnect) {
        startHisokaMD()
      }
    } else if (connection === "open") {
      const sessionId = generateSessionId()
      displaySessionSuccess(sessionId)

      logger.hisoka("🃏 HISOKA-MD is now connected!")
      console.log(chalk.green("✅ Bot is ready to serve!"))
    }
  })

  sock.ev.on("creds.update", saveCreds)

  // Handle messages
  sock.ev.on("messages.upsert", async (m) => {
    const message = m.messages[0]
    if (!message.message || message.key.fromMe) return

    const from = message.key.remoteJid
    const messageType = Object.keys(message.message)[0]
    const body = message.message.conversation || message.message.extendedTextMessage?.text || ""

    logger.info(`Message from ${from}: ${body}`)

    // Plugin system will handle commands
    sock.emit("message", { message, from, body, messageType })
  })

  return sock
}

// Start the bot
startHisokaMD().catch((err) => {
  logger.error("Error starting HISOKA-MD:", err)
  process.exit(1)
})
