# Raven-MD WhatsApp Bot

## Overview

Raven-MD is a multi-session WhatsApp bot inspired by the Hisoka character, built using the Baileys library for WhatsApp Web API integration. The bot features a modular command system, simple JSON-based database, and support for multiple connection methods (QR code and pairing code).

## System Architecture

### Core Technologies
- **Runtime**: Node.js
- **WhatsApp Integration**: @whiskeysockets/baileys v6.7.18
- **Database**: Simple JSON file-based storage
- **UI Framework**: Terminal-based with chalk for styling
- **Session Management**: Multi-file authentication state

### Architecture Pattern
- **Modular Command System**: Commands are organized in categories with a centralized command manager
- **Event-Driven**: Message handling through event listeners
- **Session-Based**: Support for multiple WhatsApp sessions with persistent authentication

## Key Components

### 1. Connection Management (`lib/connect.js`)
- **Problem**: Establishing stable WhatsApp Web connections
- **Solution**: Baileys integration with multi-file auth state
- **Features**:
  - QR code and pairing code authentication
  - Session persistence across restarts
  - Automatic reconnection handling
  - Multi-session support

### 2. Command System (`lib/commands.js`, `lib/handler.js`)
- **Problem**: Scalable command organization and execution
- **Solution**: Class-based command manager with metadata-driven registration
- **Features**:
  - Category-based organization
  - Cooldown and rate limiting
  - Permission levels (owner, premium, group-only)
  - Command statistics and usage tracking
  - Dynamic command loading from filesystem

### 3. Database Layer (`lib/database.js`)
- **Problem**: Persistent data storage without external dependencies
- **Solution**: JSON file-based database with auto-save functionality
- **Features**:
  - User and group data management
  - Statistics tracking
  - Settings persistence
  - Automatic periodic saves (30-second intervals)

### 4. Utility Functions (`lib/functions.js`)
- **Problem**: Reusable functionality across commands
- **Solution**: Static utility class with common operations
- **Features**:
  - Time formatting and calculations
  - File size formatting
  - Text manipulation utilities
  - HTTP request helpers

### 5. Asset Management (`assets/config.js`)
- **Problem**: Centralized management of external resources
- **Solution**: URL-based asset configuration
- **Features**:
  - Image and media URLs
  - API endpoints
  - Social media links
  - Deploy templates

## Data Flow

1. **Message Reception**: WhatsApp messages received through Baileys event system
2. **Command Parsing**: Handler extracts prefix, command, and arguments
3. **Command Resolution**: Command manager finds matching command by name/alias
4. **Permission Checking**: Validates user permissions and rate limits
5. **Command Execution**: Runs command with context (socket, message, config)
6. **Response Handling**: Sends formatted response back to WhatsApp
7. **Statistics Update**: Updates command usage and user statistics

## External Dependencies

### Core Dependencies
- `@whiskeysockets/baileys`: WhatsApp Web API integration
- `@hapi/boom`: HTTP error handling
- `chalk`: Terminal text styling
- `qrcode-terminal`: QR code display in terminal
- `readline`: Interactive command-line input

### Optional Integrations
- OpenAI API (for AI features)
- Remove.bg API (for background removal)
- Various media processing APIs

## Deployment Strategy

### Environment Configuration
- Environment variables for sensitive data (API keys, session IDs)
- Configurable bot behavior through environment variables
- Support for multiple deployment platforms

### Session Management
- Sessions stored in local `sessions/` directory
- Multi-session support for scaling
- Session backup and restore capabilities

### Scaling Considerations
- File-based database suitable for small to medium usage
- Command system supports dynamic loading for hot-reloading
- Modular architecture allows easy feature additions

## Changelog

```
Changelog:
- June 28, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```