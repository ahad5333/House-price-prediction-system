# Frontend - House Price Prediction

Modern React-based web interface for the House Price Prediction system.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Features

- 🎨 Modern responsive design with Tailwind CSS
- ⚡ Fast development with Vite
- 🔄 Real-time predictions
- 📊 Interactive dashboard
- 📱 Mobile-friendly interface
- 🎯 Form validation
- 🚀 Production-ready build

## Pages

- **Home** - Welcome and introduction
- **Predict** - Main prediction interface
- **Dashboard** - Model metrics and performance
- **About** - Project information

## Configuration

Edit `vite.config.js` to change the API endpoint:

```javascript
proxy: {
  '/api': {
    target: 'http://localhost:8000',  // Change this to your API URL
    changeOrigin: true,
  }
}
```

## Building

```bash
npm run build
```

The `dist` folder contains the production-ready files that can be deployed to any static hosting service (Vercel, Netlify, GitHub Pages, etc.).
