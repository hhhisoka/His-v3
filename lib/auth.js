/**
 * 🔐 HISOKA AUTHENTICATION SYSTEM
 * Pairing code and QR code management
 */

import qrcode from "qrcode-terminal"
import chalk from "chalk"
import readline from "readline"
import { logger } from "./logger.js"

export async function generatePairingCode() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  return new Promise((resolve) => {
    console.log(chalk.magenta("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"))
    console.log(chalk.yellow("           🃏 HISOKA MD CONNECTION 🃏"))
    console.log(chalk.magenta("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"))
    console.log(chalk.cyan("📱 Enter your phone number:"))
    console.log(chalk.gray("   Format: +1XXXXXXXXXX (with country code)"))
    console.log(chalk.magenta("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"))

    rl.question(chalk.green("📞 Number: "), (phoneNumber) => {
      rl.close()

      // Clean the number
      const cleanNumber = phoneNumber.replace(/[^0-9+]/g, "")

      if (cleanNumber.length < 10) {
        logger.error("Invalid phone number")
        process.exit(1)
      }

      logger.info(`Generating code for: ${cleanNumber}`)
      resolve(cleanNumber)
    })
  })
}

export async function qrTerminal(sock) {
  return new Promise((resolve) => {
    sock.ev.on("connection.update", (update) => {
      const { qr } = update

      if (qr) {
        console.log(chalk.magenta("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"))
        console.log(chalk.yellow("           🃏 QR CODE HISOKA MD 🃏"))
        console.log(chalk.magenta("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"))
        console.log(chalk.cyan("📱 Scan this QR code with WhatsApp:"))
        console.log(chalk.gray("   Settings > Linked Devices > Link a Device"))
        console.log(chalk.magenta("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"))

        qrcode.generate(qr, { small: true })

        console.log(chalk.magenta("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"))
        console.log(chalk.green('🎭 "Patience... the excitement grows..." - Hisoka'))
        console.log(chalk.magenta("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"))

        logger.info("QR Code generated and displayed")
      }
    })

    resolve()
  })
}

export function generateSessionId() {
  const prefix = "HISOKA-MD~"
  const randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  const encoded = Buffer.from(randomString).toString("base64")

  return prefix + encoded
}

export function displaySessionSuccess(sessionId) {
  const message = `
${chalk.magenta("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")}
${chalk.yellow("        🎉 HISOKA MD SESSION READY! 🎉")}
${chalk.magenta("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")}

${chalk.green("🔒 Your Session ID is ready!")}
${chalk.red("⚠️  Keep it private and secure — don't share it with anyone.")}

${chalk.cyan("🔑 SESSION_ID:")}
${chalk.bold.yellow(sessionId)}

${chalk.blue("💡 What's Next?")}
${chalk.white("1️⃣ Add SESSION_ID to your environment variable")}
${chalk.white("2️⃣ Restart the bot with: npm start")}
${chalk.white("3️⃣ Enjoy Hisoka MD features! 🃏")}

${chalk.cyan("🔗 Support:")} ${chalk.underline("https://whatsapp.com/channel/0029VagQEmB002T7MWo3Sj1D")}
${chalk.cyan("⭐ GitHub:")} ${chalk.underline("https://github.com/hhhisoka/his-md-v0")}

${chalk.magenta("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")}
${chalk.green('🎭 "The thrill of the hunt begins..." - Hisoka')}
${chalk.magenta("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")}
  `

  console.log(message)
  logger.hisoka("Session ID generated successfully!")
}
