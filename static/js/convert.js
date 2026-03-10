/* static/js/convert.js */

// Helper to save image to localStorage
function saveImageToLocalStorage(dataUrl) {
    try {
        localStorage.setItem('uploadedImage', dataUrl);
    } catch (e) {
        console.warn('Could not save image to localStorage (likely too large)', e);
    }
}

// Helper to load state from localStorage
function loadState() {
    const savedImage = localStorage.getItem('uploadedImage');
    const savedHTML = localStorage.getItem('generatedHTML');
    const savedCSS = localStorage.getItem('generatedCSS');

    if (savedImage) {
        const previewImg = document.getElementById('previewImg');
        previewImg.src = savedImage;
        previewImg.style.display = 'block';
    }

    if (savedHTML) {
        document.getElementById('htmlOutput').value = savedHTML;
        document.getElementById('downloadButtons').style.display = 'flex';
    }

    if (savedCSS) {
        document.getElementById('cssOutput').value = savedCSS;
        document.getElementById('downloadButtons').style.display = 'flex';
    }
}

// Load state on page load
document.addEventListener('DOMContentLoaded', loadState);

document.getElementById('imageInput').addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const dataUrl = event.target.result;
            const previewImg = document.getElementById('previewImg');
            previewImg.src = dataUrl;
            previewImg.style.display = 'block';
            saveImageToLocalStorage(dataUrl);
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('convertBtn').addEventListener('click', async () => {
    const fileInput = document.getElementById('imageInput');
    const savedImage = localStorage.getItem('uploadedImage');

    if (!fileInput.files.length && !savedImage) {
        alert('Please upload an image');
        return;
    }

    const formData = new FormData();
    if (fileInput.files.length) {
        formData.append('image', fileInput.files[0]);
    } else if (savedImage) {
        // Convert dataURL to blob
        const blob = await (await fetch(savedImage)).blob();
        formData.append('image', blob, 'uploaded_image.png');
    }

    try {
        const response = await fetch('/convert', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.error) {
            alert(data.error);
            return;
        }

        const htmlStr = data.html || '';
        const cssStr = data.css || '';
        document.getElementById('htmlOutput').value = htmlStr;
        document.getElementById('cssOutput').value = cssStr;

        // Show download buttons
        document.getElementById('downloadButtons').style.display = 'flex';

        // Persist generated HTML/CSS
        localStorage.setItem('generatedHTML', htmlStr);
        localStorage.setItem('generatedCSS', cssStr);

    } catch (err) {
        console.error("❌ Fetch failed:", err);
        alert("API request failed. Check console.");
    }
});

// Download HTML function
document.getElementById('downloadHtmlBtn').addEventListener('click', () => {
    const htmlContent = document.getElementById('htmlOutput').value;
    const editorHtml = localStorage.getItem('generatedHTML');
    const contentToDownload = editorHtml || htmlContent;

    if (!contentToDownload) {
        alert('No HTML content to download');
        return;
    }

    const blob = new Blob([contentToDownload], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    a.click();
    URL.revokeObjectURL(url);
});

// Download CSS function
document.getElementById('downloadCssBtn').addEventListener('click', () => {
    const cssContent = document.getElementById('cssOutput').value;
    const editorCss = localStorage.getItem('generatedCSS');
    const contentToDownload = editorCss || cssContent;

    if (!contentToDownload) {
        alert('No CSS content to download');
        return;
    }

    const blob = new Blob([contentToDownload], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'style.css';
    a.click();
    URL.revokeObjectURL(url);
});