/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                      𝗥𝗔𝗩𝗘𝗡-𝗠𝗗 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦                              ║
 * ║                    Command Management System                                ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

class CommandManager {
    constructor() {
        this.commands = new Map();
        this.categories = new Set();
        this.cooldowns = new Map();
        this.stats = new Map();
    }
    
    // Add command to system
    add(command) {
        // Validate required properties
        if (!command.name || !Array.isArray(command.name) || command.name.length === 0) {
            throw new Error('Command must have a name array');
        }
        
        if (!command.command || !Array.isArray(command.command) || command.command.length === 0) {
            throw new Error('Command must have a command array');
        }
        
        if (!command.category) {
            throw new Error('Command must have a category');
        }
        
        if (typeof command.run !== 'function') {
            throw new Error('Command must have a run function');
        }
        
        // Set default values
        const cmd = {
            name: command.name,
            command: command.command,
            alias: command.alias || [],
            category: command.category,
            desc: command.desc || 'No description provided',
            usage: command.usage || '',
            example: command.example || '',
            param: command.param || '',
            cooldown: command.cooldown || 0,
            limit: command.limit || 0,
            premium: command.premium || false,
            level: command.level || 0,
            owner: command.owner || false,
            group: command.group || false,
            admin: command.admin || false,
            botAdmin: command.botAdmin || false,
            private: command.private || false,
            register: command.register || false,
            enable: command.enable !== false, // Default to true
            hidden: command.hidden || false,
            privatechat: command.privatechat || false,
            query: command.query || false,
            dependencies: command.dependencies || [],
            run: command.run,
            
            // Statistics
            usage_count: 0,
            last_used: null,
            created_at: Date.now()
        };
        
        // Store command by primary name
        this.commands.set(command.name[0], cmd);
        
        // Add category
        this.categories.add(command.category);
        
        // Initialize stats
        this.stats.set(command.name[0], {
            usage: 0,
            lastUsed: null,
            errors: 0
        });
        
        return cmd;
    }
    
    // Remove command
    remove(name) {
        const cmd = this.commands.get(name);
        if (cmd) {
            this.commands.delete(name);
            this.stats.delete(name);
            this.cooldowns.delete(name);
            return true;
        }
        return false;
    }
    
    // Find command by name or alias
    findCommand(query) {
        // Direct match by primary name
        for (const [name, cmd] of this.commands) {
            if (cmd.command.includes(query.toLowerCase())) {
                return cmd;
            }
        }
        
        // Match by alias
        for (const [name, cmd] of this.commands) {
            if (cmd.alias && cmd.alias.includes(query.toLowerCase())) {
                return cmd;
            }
        }
        
        return null;
    }
    
    // Enable/disable command
    setCommandState(name, enabled) {
        const cmd = this.commands.get(name);
        if (cmd) {
            cmd.enable = enabled;
            return true;
        }
        return false;
    }
    
    // Get all commands with optional filters
    getAllCommands(filters = {}) {
        let commands = Array.from(this.commands.values());
        
        // Apply filters
        if (filters.category) {
            commands = commands.filter(cmd => cmd.category === filters.category);
        }
        
        if (filters.enabled !== undefined) {
            commands = commands.filter(cmd => cmd.enable === filters.enabled);
        }
        
        if (filters.hidden !== undefined) {
            commands = commands.filter(cmd => cmd.hidden === filters.hidden);
        }
        
        if (filters.owner !== undefined) {
            commands = commands.filter(cmd => cmd.owner === filters.owner);
        }
        
        if (filters.group !== undefined) {
            commands = commands.filter(cmd => cmd.group === filters.group);
        }
        
        return commands;
    }
    
    // Get commands by category
    getByCategory(category) {
        return this.getAllCommands({ category, enabled: true, hidden: false });
    }
    
    // Get all unique categories
    getCategories() {
        return Array.from(this.categories).sort();
    }
    
    // Increment usage counter
    incrementUsage(name) {
        const cmd = this.commands.get(name);
        const stats = this.stats.get(name);
        
        if (cmd && stats) {
            cmd.usage_count++;
            cmd.last_used = Date.now();
            
            stats.usage++;
            stats.lastUsed = Date.now();
        }
    }
    
    // Get command statistics
    getStats(name = null) {
        if (name) {
            return this.stats.get(name) || null;
        }
        
        // Return all stats
        const allStats = {};
        for (const [cmdName, stats] of this.stats) {
            allStats[cmdName] = stats;
        }
        return allStats;
    }
    
    // Cooldown management
    checkCooldown(name, userId) {
        const key = `${name}:${userId}`;
        const cooldownTime = this.cooldowns.get(key);
        
        if (!cooldownTime) return false;
        
        const now = Date.now();
        const cmd = this.commands.get(name);
        
        if (!cmd) return false;
        
        const timeLeft = cooldownTime + (cmd.cooldown * 1000) - now;
        return timeLeft > 0;
    }
    
    setCooldown(name, userId) {
        const key = `${name}:${userId}`;
        this.cooldowns.set(key, Date.now());
        
        // Clean up old cooldowns
        setTimeout(() => {
            this.cooldowns.delete(key);
        }, this.commands.get(name)?.cooldown * 1000 || 60000);
    }
    
    // Get cooldown remaining time
    getCooldownRemaining(name, userId) {
        const key = `${name}:${userId}`;
        const cooldownTime = this.cooldowns.get(key);
        
        if (!cooldownTime) return 0;
        
        const cmd = this.commands.get(name);
        if (!cmd) return 0;
        
        const timeLeft = cooldownTime + (cmd.cooldown * 1000) - Date.now();
        return Math.max(0, Math.ceil(timeLeft / 1000));
    }
    
    // Reset all commands
    reset() {
        this.commands.clear();
        this.categories.clear();
        this.cooldowns.clear();
        this.stats.clear();
    }
    
    // Export command data
    export() {
        return {
            commands: Array.from(this.commands.entries()),
            categories: Array.from(this.categories),
            stats: Array.from(this.stats.entries()),
            timestamp: Date.now()
        };
    }
    
    // Import command data
    import(data) {
        if (data.commands) {
            this.commands = new Map(data.commands);
        }
        if (data.categories) {
            this.categories = new Set(data.categories);
        }
        if (data.stats) {
            this.stats = new Map(data.stats);
        }
    }
    
    // Search commands
    search(query) {
        const results = [];
        const lowerQuery = query.toLowerCase();
        
        for (const cmd of this.commands.values()) {
            if (cmd.hidden || !cmd.enable) continue;
            
            // Search in name, command, description
            if (
                cmd.name.some(n => n.includes(lowerQuery)) ||
                cmd.command.some(c => c.includes(lowerQuery)) ||
                cmd.alias.some(a => a.includes(lowerQuery)) ||
                cmd.desc.toLowerCase().includes(lowerQuery) ||
                cmd.category.toLowerCase().includes(lowerQuery)
            ) {
                results.push(cmd);
            }
        }
        
        return results;
    }
    
    // Get command count
    getCommandCount() {
        return this.commands.size;
    }
    
    // Get category count
    getCategoryCount() {
        return this.categories.size;
    }
    
    // Get total usage
    getTotalUsage() {
        let total = 0;
        for (const stats of this.stats.values()) {
            total += stats.usage;
        }
        return total;
    }
}

// Export singleton instance
const commands = new CommandManager();

module.exports = {
    commands,
    CommandManager
};
