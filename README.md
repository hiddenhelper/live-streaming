# Live Stream Dashboard

An Electron application for Windows with a React-based dashboard for live streaming features.

## Features

- **Upcoming Videos Section**: View scheduled upcoming streams
- **User's Video Section**: Manage and view your past streams
- **Chatting Section**: Live chat interface (ready for future streaming integration)
- **React + Vite**: Modern frontend stack for scalability

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- **Windows only**: Build tools for native modules (see [Windows Build Tools Setup](#windows-build-tools-setup) below)

### Installation

1. Install dependencies:
```bash
npm install
```

2. **(Windows only)** Install build tools (if needed for native modules):
```bash
npm run setup:windows
```

   Or check if build tools are already installed:
```bash
npm run setup:check
```

   > **Note**: `windows-build-tools` is deprecated. For modern alternatives, see [Windows Build Tools Setup](#windows-build-tools-setup) below.

3. Run in development mode (with hot reload):
```bash
npm run electron:dev
```

This will start the Vite dev server and launch Electron automatically.

4. Build for production:
```bash
npm run build
```

5. Run production build:
```bash
npm run electron:build
```

6. Generate app icon (optional):
```bash
npm run create-icon
```
This creates a minimal icon.png. For a better icon, convert `assets/icon.svg` to PNG (256x256).

## Project Structure

```
live-stream/
├── main.js              # Electron main process
├── vite.config.js       # Vite configuration
├── index.html           # HTML entry point
├── assets/              # Application assets
│   ├── icon.svg         # App icon (SVG source)
│   ├── icon.png         # App icon (PNG, generated)
│   ├── placeholder-video.svg  # Video thumbnail placeholder
│   ├── mediasoup-client.bin   # Mediasoup client binary
│   └── README.md        # Assets documentation
├── scripts/             # Build and utility scripts
│   ├── postinstall.js   # Runs after npm install
│   └── check-build-tools.js  # Checks for Windows build tools
├── src/
│   ├── main.jsx         # React entry point
│   ├── App.jsx          # Main React component
│   ├── styles.css       # Global styles
│   └── components/      # React components
│       ├── Header.jsx
│       ├── UpcomingVideos.jsx
│       ├── UserVideos.jsx
│       └── ChatSection.jsx
└── package.json         # Dependencies and scripts
```

## Development

- The app uses **React 18** with **Vite** for fast development and building
- Hot Module Replacement (HMR) is enabled in development mode
- Components are modular and easy to extend

## Windows Build Tools Setup

If you're developing on Windows and need to build native Node.js modules, you have several options:

### Option 1: Modern Approach (Recommended)
Install Visual Studio Build Tools manually:
1. Download from: https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2022
2. Install with "Desktop development with C++" workload

### Option 2: Using npm script
```bash
npm run setup:windows
```
This installs the deprecated `windows-build-tools` package. It may take 10-15 minutes.

> **⚠️ Admin Rights Required**: This command must be run as Administrator (right-click Command Prompt/PowerShell → "Run as administrator").

### Option 3: Modern npm package
```bash
npm install -g @microsoft/windows-build-tools
```

### Check Build Tools
To verify if build tools are installed (no admin rights required):
```bash
npm run setup:check
```

> **Note**: `setup:check` does NOT require admin privileges. Only `setup:windows` (which installs tools) requires admin rights.

## Future Enhancements

- Live streaming functionality
- Real-time chat integration
- Video upload and management
- Stream scheduling
- Analytics dashboard
- State management (Redux/Zustand)
- Routing for multiple views

## License

MIT

