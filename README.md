# 🃏 HISOKA-MD

<div align="center">
  <img src="https://i.imgur.com/hisoka-banner.png" alt="HISOKA-MD" width="300"/>
  
  [![GitHub stars](https://img.shields.io/github/stars/hhhisoka/His-v3?style=social)](https://github.com/hhhisoka/His-v3)
  [![WhatsApp Channel](https://img.shields.io/badge/WhatsApp-Channel-25D366?style=flat&logo=whatsapp)](https://whatsapp.com/channel/0029Vb5u3VX0lwgllCdVTF0G)
  
  **Simple**
  
  *"The thrill of the hunt begins..." - Hisoka*
</div>

## ✨ Features

- 🔐 **Pairing Code Authentication** - Easy setup with phone number
- 🎨 **Sticker Maker** - Convert images/videos to stickers
- 👁️ **View Once Handler** - Capture view once messages
- 👢 **Group Management** - Kick, add, promote members
- ✨ **Fancy Text** - Generate stylish text formats
- 📖 **Auto Read Status** - Automatically read status updates
- 🔌 **Plugin System** - Modular and extensible

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- FFmpeg (for video processing)

### Installation

1. **Clone the repository**
\`\`\`bash
git clone https://github.com/hhhisoka/His-v3.git
cd His-v3
\`\`\`

2. **Install dependencies**
\`\`\`bash
npm install
\`\`\`

3. **Start the bot**
\`\`\`bash
npm start
\`\`\`

4. **Follow the setup**
- Enter your phone number when prompted
- Enter the pairing code in WhatsApp
- Your session ID will be generated automatically

## 📱 Commands

### 🎨 Media Commands
- `.sticker` / `.s` - Convert image/video to sticker
- `.fancy <text>` - Generate fancy text styles

### 👥 Group Commands
- `.kick @user` - Remove member from group (Admin only)

### ⚙️ Utility Commands
- Auto read status updates
- View once message handler

## 🔧 Configuration

Edit `config.js` to customize:
- Bot prefixes
- Owner numbers
- Feature toggles
- Rate limits

## 🔌 Plugin Development

Create new plugins in the `plugins/` directory:

\`\`\`javascript
export default {
  name: 'example',
  description: 'Example plugin',
  category: 'utility',
  commands: ['example'],
  
  async execute(sock, message, from, body) {
    // Your plugin logic here
  }
};
\`\`\`

## 📞 Support

- **WhatsApp Channel**: [Join Here](https://whatsapp.com/channel/0029Vb5u3VX0lwgllCdVTF0G)
- **GitHub Issues**: [Report Bugs](https://github.com/hhhisoka/His-v3/issues)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎭 Credits

 **@whiskeysockets/baileys**
- Created by **Hisoka Team**

---

<div align="center">
  <i>"In the end, it's not about the destination, it's about the journey..." - Hisoka</i>
  
  **Made with ❤️ by Hisoka Team**
</div>
