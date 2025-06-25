/**
 * 🎭 HISOKA LOGGER SYSTEM
 */

import chalk from "chalk"

class HisokaLogger {
  info(message) {
    console.log(chalk.blue(`[INFO] ${new Date().toLocaleTimeString()} - ${message}`))
  }

  error(message) {
    console.log(chalk.red(`[ERROR] ${new Date().toLocaleTimeString()} - ${message}`))
  }

  warn(message) {
    console.log(chalk.yellow(`[WARN] ${new Date().toLocaleTimeString()} - ${message}`))
  }

  success(message) {
    console.log(chalk.green(`[SUCCESS] ${new Date().toLocaleTimeString()} - ${message}`))
  }

  hisoka(message) {
    console.log(chalk.magenta(`[🃏 HISOKA] ${new Date().toLocaleTimeString()} - ${message}`))
  }

  plugin(message) {
    console.log(chalk.cyan(`[PLUGIN] ${new Date().toLocaleTimeString()} - ${message}`))
  }
}

export const logger = new HisokaLogger()
