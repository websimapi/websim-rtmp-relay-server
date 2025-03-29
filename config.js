// Configuration for the RTMP Relay Server
// Edit these values to match your setup

export const streamKey = 'your-stream-key'; // Your private stream key
export const rtmpServerUrl = 'rtmp://your-rtmp-server.com/live'; // Your RTMP server URL
export const allowedOrigins = ['https://yourdomain.com']; // Domains allowed to embed your stream
export const fallbackMessage = 'Stream is currently offline. Please check back later.';
export const enableAutoReconnect = true; // Automatically reconnect when stream comes back
export const reconnectInterval = 5000; // Reconnect attempt interval (in milliseconds)

