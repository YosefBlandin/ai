# Mobile Network Troubleshooting Guide

## Problem: "Failed to fetch distributions - Network request failed"

This error occurs when the mobile app cannot connect to the JSON server running on your computer.

## Quick Fix Steps

### 1. Verify JSON Server is Running

```bash
# Check if server is running
curl http://192.168.100.7:3001/api/distributions

# If not running, start it
cd server && npm start
```

### 2. Check Your IP Address

```bash
# Get your current IP
npm run get-ip

# Update the IP in the config if it changed
# File: packages/shared-services/src/config/api.config.ts
# Update the first IP in MOBILE_IP_CANDIDATES array
```

### 3. Verify Network Connection

- Ensure your phone and computer are on the same WiFi network
- Try accessing the API from your phone's browser: `http://192.168.100.7:3001/api/distributions`

### 4. Check Mobile App Debug Logs

When you run the mobile app, look for these debug messages in the console:

```
🔍 Mobile API Debug:
  Base URL: http://192.168.100.7:3001
  Full URL: http://192.168.100.7:3001/api/distributions
  Timeout: 10000
```

### 5. Common Solutions

#### Solution A: Update IP Address

If your IP changed, update it in `packages/shared-services/src/config/api.config.ts`:

```typescript
const MOBILE_IP_CANDIDATES = [
  'YOUR_NEW_IP_HERE', // Replace with your actual IP
  '192.168.1.100',
  // ... other IPs
];
```

#### Solution B: Use Environment Variable

Set the IP as an environment variable:

```bash
export MOBILE_API_IP=192.168.100.7
npm run dev:mobile
```

#### Solution C: Check Firewall

Make sure your computer's firewall allows connections on port 3001:

```bash
# Linux
sudo ufw allow 3001

# macOS
sudo pfctl -f /etc/pf.conf
```

### 6. Test API Endpoints

Test these endpoints from your computer:

```bash
# Test basic connectivity
curl http://192.168.100.7:3001/api/distributions

# Test with filters
curl "http://192.168.100.7:3001/api/distributions?region=West%20Nile"

# Test specific distribution
curl http://192.168.100.7:3001/api/distributions/dst--001
```

### 7. Mobile App Debugging

In your mobile app, add this temporary debug code to see what's happening:

```typescript
// In your mobile app, add this to see the actual error
try {
  const response = await fetch('http://192.168.100.7:3001/api/distributions');
  console.log('Response status:', response.status);
  console.log('Response headers:', response.headers);
} catch (error) {
  console.error('Fetch error:', error);
}
```

## Still Having Issues?

1. **Check Network**: Ensure both devices are on the same network
2. **Restart Services**: Restart both the JSON server and mobile app
3. **Check Port**: Make sure port 3001 is not blocked
4. **Try Different IP**: Use your computer's actual IP address
5. **Check Expo Tunnel**: If using Expo, try the tunnel option: `expo start --tunnel`

## Environment Variables

You can set these environment variables to override the default configuration:

```bash
# Set the mobile API IP
export MOBILE_API_IP=192.168.100.7

# Set the API timeout (in milliseconds)
export API_TIMEOUT=15000

# Start the mobile app
npm run dev:mobile
```

## Success Indicators

When everything is working, you should see:

- JSON server logs showing requests from your mobile device
- Mobile app successfully loading distribution data
- No network error messages in the mobile app console
