/**
 * 🔧 HISOKA-MD SETUP SCRIPT
 */

import fs from "fs"
import chalk from "chalk"

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

console.log(chalk.yellow("🔧 Setting up HISOKA-MD..."))

// Create necessary directories
const directories = ["session", "plugins", "temp", "media"]

directories.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
    console.log(chalk.green(`✅ Created directory: ${dir}`))
  }
})

// Create .env template
const envTemplate = `# HISOKA-MD Environment Variables
# Add your configuration here

# Bot Configuration
BOT_NAME=HISOKA-MD
PREFIX=.
OWNER_NUMBER=your_number_here

# Optional: Database URL (if using database)
# DATABASE_URL=your_database_url_here

# Optional: API Keys
# OPENAI_API_KEY=your_openai_key_here
`

if (!fs.existsSync(".env")) {
  fs.writeFileSync(".env", envTemplate)
  console.log(chalk.green("✅ Created .env template"))
}

console.log(chalk.magenta("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"))
console.log(chalk.green("🎉 HISOKA-MD setup completed!"))
console.log(chalk.cyan("📝 Next steps:"))
console.log(chalk.white("1. Edit .env file with your configuration"))
console.log(chalk.white("2. Run: npm start"))
console.log(chalk.white("3. Follow the pairing process"))
console.log(chalk.magenta("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"))
console.log(chalk.green('🎭 "Let the games begin..." - Hisoka'))
