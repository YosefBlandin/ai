#!/usr/bin/env node

/**
 * Utility script to find the local IP address for mobile development
 * This helps configure the API base URL for React Native apps
 */

const os = require('os');

function getLocalIPAddress() {
  const interfaces = os.networkInterfaces();
  
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // Skip internal (loopback) addresses and IPv6
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  
  return 'localhost';
}

function main() {
  const ip = getLocalIPAddress();
  
  console.log('🔍 Network Configuration for Mobile Development');
  console.log('================================================');
  console.log('');
  console.log(`📱 Your local IP address: ${ip}`);
  console.log('');
  console.log('📋 Next steps:');
  console.log('1. Update the IP address in packages/shared-services/src/config/api.config.ts');
  console.log(`2. Replace "192.168.1.100" with "${ip}"`);
  console.log('3. Make sure your mobile device/simulator is on the same network');
  console.log('');
  console.log('🔧 Configuration file location:');
  console.log('   packages/shared-services/src/config/api.config.ts');
  console.log('');
  console.log('📝 Example update:');
  console.log(`   baseUrl: 'http://${ip}:3001',`);
  console.log('');
  console.log('⚠️  Note: If your IP changes, you\'ll need to update this configuration.');
}

main();
