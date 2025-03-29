// Utility for creating and downloading ZIP files

export async function createZip(files, filename) {
    // Import JSZip from CDN
    const JSZip = (await import('https://cdn.jsdelivr.net/npm/jszip@3.10.1/+esm')).default;
    
    const zip = new JSZip();
    
    // Add files to the zip
    files.forEach(file => {
        // Handle directories
        if (file.name.includes('/')) {
            const folders = file.name.split('/');
            const fileName = folders.pop();
            let currentFolder = zip;
            
            folders.forEach(folder => {
                if (!currentFolder.folder(folder)) {
                    currentFolder = currentFolder.folder(folder);
                } else {
                    currentFolder = currentFolder.folder(folder);
                }
            });
            
            currentFolder.file(fileName, file.content);
        } else {
            zip.file(file.name, file.content);
        }
    });
    
    // Generate the zip file
    const content = await zip.generateAsync({ type: 'blob' });
    
    // Create a download link and trigger download
    const url = URL.createObjectURL(content);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up
    setTimeout(() => URL.revokeObjectURL(url), 100);
}

