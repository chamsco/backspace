# Backspace Company - Portfolio

A modern React portfolio website for Backspace Company, built with Vite, TypeScript, and Tailwind CSS.

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Bun** - Package manager and runtime
- **Nixpacks** - Deployment configuration for Live

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed on your system

### Installation

```bash
# Install dependencies
bun install
```

### Development

```bash
# Start development server
bun run dev
```

The app will be available at `http://localhost:3000`

### Build

```bash
# Build for production
bun run build
```

### Preview Production Build

```bash
# Preview the production build locally
bun run preview
```

## Deployment

This project is configured for deployment on [Live](https://live.run) using Nixpacks. The `nixpacks.toml` file contains the deployment configuration.

### Deployment Steps

1. Push your code to GitHub
2. Connect your repository to Live
3. Live will automatically detect the Nixpacks configuration and deploy

## Project Structure

```
backspace/
├── src/
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # React entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── vite.config.ts       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── nixpacks.toml        # Nixpacks deployment config
└── README.md            # This file
```

## Development Workflow

1. Work on features locally using `bun run dev`
2. Create a branch for your changes
3. Make your changes and test locally
4. Create a Pull Request to merge your changes
5. Once merged, changes will be automatically deployed via Live

## License

Copyright © 2025 Backspace Company



