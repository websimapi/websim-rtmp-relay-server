// Vercel serverless function to handle RTMP relaying

import { streamKey, rtmpServerUrl, allowedOrigins } from '../config.js';

export default async function handler(req, res) {
  // Set CORS headers
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request (CORS preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Check stream status
  if (req.method === 'GET' && req.query.action === 'status') {
    try {
      // In a real implementation, you'd query your RTMP server or use a third-party API
      // This is a placeholder implementation
      const isLive = true; // Replace with actual check
      
      return res.status(200).json({
        status: isLive ? 'live' : 'offline',
        timestamp: Date.now()
      });
    } catch (error) {
      console.error('Error checking stream status:', error);
      return res.status(500).json({ error: 'Failed to check stream status' });
    }
  }

  // Handle stream authentication
  if (req.method === 'POST' && req.query.action === 'auth') {
    try {
      const { key } = req.body;
      
      if (key === streamKey) {
        return res.status(200).json({ authorized: true });
      } else {
        return res.status(403).json({ authorized: false, error: 'Invalid stream key' });
      }
    } catch (error) {
      console.error('Authentication error:', error);
      return res.status(500).json({ error: 'Authentication failed' });
    }
  }

  // Get RTMP URL for player
  if (req.method === 'GET' && req.query.action === 'rtmp-info') {
    return res.status(200).json({
      rtmpUrl: rtmpServerUrl,
      // Don't include the actual stream key in the response for security
      playerUrl: `${rtmpServerUrl}/player`
    });
  }

  // Default response for unhandled routes
  return res.status(404).json({ error: 'Not found' });
}

