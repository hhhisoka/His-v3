/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                       𝗥𝗔𝗩𝗘𝗡-𝗠𝗗 𝗗𝗔𝗧𝗔𝗕𝗔𝗦𝗘                              ║
 * ║                      Simple JSON Database                                   ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

const fs = require('fs');
const path = require('path');

class SimpleDatabase {
    constructor(dbPath = './database.json') {
        this.dbPath = dbPath;
        this.data = this.load();
        
        // Auto-save every 30 seconds
        setInterval(() => this.save(), 30000);
    }
    
    load() {
        try {
            if (fs.existsSync(this.dbPath)) {
                return JSON.parse(fs.readFileSync(this.dbPath, 'utf8'));
            }
        } catch (error) {
            console.error('❌ Error loading database:', error);
        }
        
        return {
            users: {},
            groups: {},
            stats: {},
            settings: {}
        };
    }
    
    save() {
        try {
            fs.writeFileSync(this.dbPath, JSON.stringify(this.data, null, 2));
        } catch (error) {
            console.error('❌ Error saving database:', error);
        }
    }
    
    // User management
    getUser(userId) {
        if (!this.data.users[userId]) {
            this.data.users[userId] = {
                id: userId,
                name: '',
                level: 1,
                exp: 0,
                limit: 25,
                premium: false,
                banned: false,
                warns: 0,
                lastSeen: Date.now(),
                commands: 0
            };
        }
        return this.data.users[userId];
    }
    
    updateUser(userId, updates) {
        const user = this.getUser(userId);
        Object.assign(user, updates, { lastSeen: Date.now() });
        return user;
    }
    
    // Group management
    getGroup(groupId) {
        if (!this.data.groups[groupId]) {
            this.data.groups[groupId] = {
                id: groupId,
                name: '',
                desc: '',
                welcome: true,
                antilink: false,
                mute: false,
                locked: false,
                lastActivity: Date.now()
            };
        }
        return this.data.groups[groupId];
    }
    
    updateGroup(groupId, updates) {
        const group = this.getGroup(groupId);
        Object.assign(group, updates, { lastActivity: Date.now() });
        return group;
    }
    
    // Stats management
    incrementStat(key, value = 1) {
        if (!this.data.stats[key]) {
            this.data.stats[key] = 0;
        }
        this.data.stats[key] += value;
        return this.data.stats[key];
    }
    
    getStat(key) {
        return this.data.stats[key] || 0;
    }
    
    // Settings management
    setSetting(key, value) {
        this.data.settings[key] = value;
        return value;
    }
    
    getSetting(key, defaultValue = null) {
        return this.data.settings[key] || defaultValue;
    }
    
    // Utility methods
    getAllUsers() {
        return Object.values(this.data.users);
    }
    
    getAllGroups() {
        return Object.values(this.data.groups);
    }
    
    search(collection, query) {
        const items = collection === 'users' ? this.getAllUsers() : this.getAllGroups();
        return items.filter(item => 
            item.name?.toLowerCase().includes(query.toLowerCase()) ||
            item.id.includes(query)
        );
    }
    
    backup() {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const backupPath = `${this.dbPath}.backup.${timestamp}`;
        fs.copyFileSync(this.dbPath, backupPath);
        return backupPath;
    }
    
    restore(backupPath) {
        if (fs.existsSync(backupPath)) {
            fs.copyFileSync(backupPath, this.dbPath);
            this.data = this.load();
            return true;
        }
        return false;
    }
}

// Export singleton instance
const database = new SimpleDatabase();

module.exports = {
    database,
    SimpleDatabase
};
