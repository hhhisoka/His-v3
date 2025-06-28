/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                       𝗥𝗔𝗩𝗘𝗡-𝗠𝗗 𝗙𝗨𝗡𝗖𝗧𝗜𝗢𝗡𝗦                            ║
 * ║                     Utility Functions Library                              ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class Functions {
    // Time utilities
    static msToTime(ms) {
        const seconds = Math.floor((ms / 1000) % 60);
        const minutes = Math.floor((ms / (1000 * 60)) % 60);
        const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
        const days = Math.floor(ms / (1000 * 60 * 60 * 24));
        
        let result = '';
        if (days > 0) result += `${days}d `;
        if (hours > 0) result += `${hours}h `;
        if (minutes > 0) result += `${minutes}m `;
        if (seconds > 0) result += `${seconds}s`;
        
        return result.trim() || '0s';
    }
    
    static formatTime(timestamp) {
        return new Date(timestamp).toLocaleString();
    }
    
    static timeAgo(timestamp) {
        const now = Date.now();
        const diff = now - timestamp;
        
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        
        if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
        if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }
    
    // Text utilities
    static formatSize(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    static capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
    
    static truncate(str, length = 100) {
        return str.length > length ? str.substring(0, length) + '...' : str;
    }
    
    static randomString(length = 10) {
        return crypto.randomBytes(length).toString('hex').substring(0, length);
    }
    
    // Number utilities
    static formatNumber(num) {
        return new Intl.NumberFormat().format(num);
    }
    
    static randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    static percentage(part, total) {
        return ((part / total) * 100).toFixed(2);
    }
    
    // Array utilities
    static shuffle(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
    
    static chunk(array, size) {
        const chunks = [];
        for (let i = 0; i < array.length; i += size) {
            chunks.push(array.slice(i, i + size));
        }
        return chunks;
    }
    
    // Object utilities
    static deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }
    
    static isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }
    
    // HTTP utilities
    static async fetchJson(url, options = {}) {
        try {
            const response = await axios.get(url, {
                timeout: 10000,
                ...options
            });
            return response.data;
        } catch (error) {
            throw new Error(`Failed to fetch: ${error.message}`);
        }
    }
    
    static async postJson(url, data, options = {}) {
        try {
            const response = await axios.post(url, data, {
                timeout: 10000,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                ...options
            });
            return response.data;
        } catch (error) {
            throw new Error(`Failed to post: ${error.message}`);
        }
    }
    
    // File utilities
    static async downloadFile(url, filePath) {
        try {
            const response = await axios({
                method: 'GET',
                url: url,
                responseType: 'stream'
            });
            
            const writer = fs.createWriteStream(filePath);
            response.data.pipe(writer);
            
            return new Promise((resolve, reject) => {
                writer.on('finish', () => resolve(filePath));
                writer.on('error', reject);
            });
        } catch (error) {
            throw new Error(`Failed to download: ${error.message}`);
        }
    }
    
    static fileExists(filePath) {
        return fs.existsSync(filePath);
    }
    
    static getFileSize(filePath) {
        if (!this.fileExists(filePath)) return 0;
        return fs.statSync(filePath).size;
    }
    
    // Validation utilities
    static isUrl(str) {
        try {
            new URL(str);
            return true;
        } catch {
            return false;
        }
    }
    
    static isEmail(str) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(str);
    }
    
    static isPhoneNumber(str) {
        const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
        return phoneRegex.test(str);
    }
    
    // WhatsApp utilities
    static formatJid(jid) {
        return jid.includes('@') ? jid : jid + '@s.whatsapp.net';
    }
    
    static isGroup(jid) {
        return jid.endsWith('@g.us');
    }
    
    static isPrivate(jid) {
        return jid.endsWith('@s.whatsapp.net');
    }
    
    static extractNumber(jid) {
        return jid.split('@')[0];
    }
    
    // Hisoka-themed utilities
    static hisokaQuote() {
        const quotes = [
            "🃏 *The thrill of the hunt is everything...*",
            "🎭 *I live for the excitement of battle!*",
            "⭐ *Power is delicious... I want more.*",
            "🔮 *The future is unpredictable, isn't it?*",
            "🎪 *Let's see what tricks you have...*",
            "♠️ *A magician never reveals his secrets.*",
            "🎯 *Perfect! This is getting interesting.*",
            "🌟 *The show must go on!*"
        ];
        return quotes[Math.floor(Math.random() * quotes.length)];
    }
    
    static ravenFrame(text) {
        return `╔══════════════════════════════════════╗\n${text}\n╚══════════════════════════════════════╝`;
    }
    
    // Error handling
    static handleError(error, context = 'Unknown') {
        console.error(`❌ Error in ${context}:`, error);
        return `❌ An error occurred in ${context}: ${error.message}`;
    }
    
    // Async utilities
    static async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    static async retry(fn, retries = 3, delay = 1000) {
        for (let i = 0; i < retries; i++) {
            try {
                return await fn();
            } catch (error) {
                if (i === retries - 1) throw error;
                await this.sleep(delay);
            }
        }
    }
}

module.exports = {
    Func: Functions,
    Functions
};
