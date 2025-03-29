# RTMP Relay Server for Vercel

This project provides a fallback RTMP relay server that can be deployed to Vercel. It's designed to be used as a backup when your primary streaming platform (like Twitch) goes down during live broadcasts.

## Features

- Simple deployment to Vercel
- RTMP stream relay
- Status API endpoint
- Stream authentication
- Configurable settings

## Setup Instructions

1. **Download and Extract Files**
   Unzip the downloaded project files to your local machine.

2. **Configure Settings**
   Edit the `config.js` file to set your stream key, RTMP server URL, and other settings.

3. **Deploy to Vercel**
   - Install the Vercel CLI: `npm i -g vercel`
   - Navigate to the project directory
   - Run: `vercel login`
   - Deploy: `vercel --prod`

4. **Configure Your Streaming Software**
   Set up OBS or your preferred streaming software to use your RTMP endpoint as a backup.

## Usage

1. Stream to your primary service (e.g., Twitch) as usual.
2. If your primary stream goes down, redirect viewers to your Vercel-deployed RTMP server.
3. Configure OBS to automatically switch to the backup server if the primary connection fails.

## Configuration Options

In `config.js`, you can configure:
- `streamKey`: Your private stream key
- `rtmpServerUrl`: Your RTMP server URL
- `allowedOrigins`: Domains allowed to embed your stream
- `fallbackMessage`: Message to show when stream is offline
- `enableAutoReconnect`: Auto-reconnect when stream comes back
- `reconnectInterval`: Time between reconnection attempts

## Technical Details

This project uses Vercel's serverless functions to handle RTMP relay functionality. The front-end provides viewers with a simple interface to watch your stream when your primary platform is down.

## Security Considerations

- Keep your stream key private
- Use environment variables for sensitive information in production
- Configure allowed origins to prevent unauthorized embedding

## License

MIT

