import { streamKey, rtmpServerUrl } from './config.js';
import { createZip } from './ziputils.js';

document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.getElementById('downloadBtn');
    const streamStatus = document.getElementById('streamStatus');
    const statusDot = document.querySelector('.status-dot');
    
    // Simulate checking stream status
    function checkStreamStatus() {
        // In production, this would make an API call to check if stream is live
        const isLive = Math.random() > 0.7; // Simulate ~30% chance of being live
        
        if (isLive) {
            streamStatus.textContent = 'Online';
            statusDot.classList.add('online');
        } else {
            streamStatus.textContent = 'Offline';
            statusDot.classList.remove('online');
        }
    }
    
    // Check status initially and then every 10 seconds
    checkStreamStatus();
    setInterval(checkStreamStatus, 10000);
    
    // Handle download button click
    downloadBtn.addEventListener('click', async () => {
        try {
            downloadBtn.textContent = 'Preparing download...';
            downloadBtn.disabled = true;
            
            // Create project files for download
            await createProjectZip();
            
            downloadBtn.textContent = 'Download Project Files';
            downloadBtn.disabled = false;
        } catch (error) {
            console.error('Download failed:', error);
            downloadBtn.textContent = 'Download Failed. Try Again';
            downloadBtn.disabled = false;
        }
    });
    
    async function createProjectZip() {
        // Define all project files
        const files = [
            {
                name: 'index.html',
                content: document.documentElement.outerHTML
            },
            {
                name: 'styles.css',
                content: Array.from(document.styleSheets[0].cssRules)
                    .map(rule => rule.cssText)
                    .join('\n')
            },
            {
                name: 'scripts.js',
                content: await fetchFile('scripts.js')
            },
            {
                name: 'config.js',
                content: await fetchFile('config.js')
            },
            {
                name: 'ziputils.js',
                content: await fetchFile('ziputils.js')
            },
            {
                name: 'api/stream.js',
                content: await fetchFile('api/stream.js')
            },
            {
                name: 'vercel.json',
                content: await fetchFile('vercel.json')
            },
            {
                name: 'README.md',
                content: await fetchFile('README.md')
            },
            {
                name: 'package.json',
                content: await fetchFile('package.json')
            }
        ];
        
        // Create and download the zip file
        await createZip(files, 'rtmp-relay-server.zip');
    }
    
    async function fetchFile(path) {
        try {
            const response = await fetch(path);
            return await response.text();
        } catch (error) {
            console.error(`Failed to fetch ${path}:`, error);
            return `// Failed to load content for ${path}`;
        }
    }
});

