# Mobile Development Setup Guide

This guide helps you set up the mobile app to work with the JSON server.

## 🚨 Common Issue: "Network request failed"

This error occurs because mobile apps can't access `localhost` directly. They need to use your computer's IP address instead.

## 🔧 Quick Fix

1. **Get your computer's IP address:**
   ```bash
   npm run get-ip
   ```

2. **Update the configuration:**
   - Open `packages/shared-services/src/config/api.config.ts`
   - Replace the IP address in the `MOBILE_IP_CANDIDATES` array with your actual IP

3. **Restart the mobile app:**
   ```bash
   npm run dev:mobile
   ```

## 📱 Network Requirements

### For Physical Devices
- Your mobile device and computer must be on the same Wi-Fi network
- The JSON server must be accessible from your device
- Firewall should allow connections on port 3001

### For Simulators/Emulators
- iOS Simulator: Should work with localhost
- Android Emulator: May need special configuration
- Expo Go: Requires same network as computer

## 🔍 Troubleshooting Steps

### 1. Check JSON Server Status
```bash
# Start the JSON server
npm run dev:server

# Test in browser
curl http://localhost:3001/api/distributions
```

### 2. Verify IP Address
```bash
# Get your current IP
npm run get-ip

# Test from mobile device (if possible)
# Open browser on mobile and go to: http://YOUR_IP:3001/api/distributions
```

### 3. Check Network Connectivity
- Ensure both devices are on the same network
- Try pinging your computer from the mobile device
- Check if port 3001 is accessible

### 4. Firewall Configuration
- Windows: Allow Node.js through Windows Firewall
- macOS: Allow incoming connections on port 3001
- Linux: Configure iptables or ufw

## 🛠️ Alternative Solutions

### Option 1: Use Expo Tunnel
```bash
# Install ngrok
npm install -g ngrok

# Start JSON server
npm run dev:server

# In another terminal, create tunnel
ngrok http 3001

# Use the ngrok URL in your config
```

### Option 2: Use Expo Development Build
```bash
# Create development build with custom server
expo start --tunnel
```

### Option 3: Use Metro Bundler Proxy
Add to your `metro.config.js`:
```javascript
module.exports = {
  resolver: {
    proxy: {
      '/api': 'http://localhost:3001'
    }
  }
};
```

## 📋 Configuration Files

### API Configuration
File: `packages/shared-services/src/config/api.config.ts`

```typescript
const MOBILE_IP_CANDIDATES = [
  '192.168.100.7',  // Your actual IP
  '192.168.1.100',  // Common home router
  '192.168.0.100',  // Common home router
];
```

### Environment Variables (Optional)
You can also use environment variables:

```bash
# .env file
API_BASE_URL=http://192.168.100.7:3001
```

## 🧪 Testing the Connection

### From Web Browser
1. Open `http://localhost:3001/api/distributions`
2. Should return JSON data

### From Mobile Device Browser
1. Open `http://YOUR_IP:3001/api/distributions`
2. Should return the same JSON data

### From Mobile App
1. Check the console logs for network errors
2. Look for timeout or connection refused errors
3. Verify the API base URL is correct

## 🚀 Production Considerations

For production deployment:
- Use a real API server instead of JSON server
- Configure proper CORS settings
- Use HTTPS instead of HTTP
- Implement proper authentication
- Use environment-specific configuration

## 📞 Getting Help

If you're still having issues:

1. Check the console logs for specific error messages
2. Verify your network configuration
3. Try using a different IP address
4. Test with a simple curl command first
5. Check if your router blocks device-to-device communication

## 🔄 Quick Reset

If nothing works, try this reset:

```bash
# Stop all processes
# Kill JSON server and mobile app

# Clear caches
npm run clean
cd apps/mobile && npx expo start --clear

# Restart everything
npm run dev:server
# In another terminal:
npm run dev:mobile
```
