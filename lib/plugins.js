/**
 * 🔌 HISOKA PLUGIN SYSTEM
 * Inspired by Levanter
 */

import fs from "fs"
import path from "path"
import { logger } from "./logger.js"

const plugins = new Map()

export async function loadPlugins(sock) {
  const pluginDir = "./plugins"

  if (!fs.existsSync(pluginDir)) {
    fs.mkdirSync(pluginDir, { recursive: true })
    logger.warn("Plugins directory created")
  }

  const files = fs.readdirSync(pluginDir).filter((file) => file.endsWith(".js"))

  for (const file of files) {
    try {
      const pluginPath = path.join(process.cwd(), pluginDir, file)
      const plugin = await import(`file://${pluginPath}`)

      if (plugin.default && plugin.default.name) {
        plugins.set(plugin.default.name, plugin.default)
        logger.plugin(`Loaded: ${plugin.default.name}`)
      }
    } catch (error) {
      logger.error(`Failed to load plugin ${file}: ${error.message}`)
    }
  }

  // Handle messages for plugins
  sock.on("message", async (data) => {
    const { message, from, body } = data

    for (const [name, plugin] of plugins) {
      try {
        if (plugin.execute) {
          await plugin.execute(sock, message, from, body)
        }
      } catch (error) {
        logger.error(`Plugin ${name} error: ${error.message}`)
      }
    }
  })

  logger.success(`Loaded ${plugins.size} plugins`)
}

export { plugins }
