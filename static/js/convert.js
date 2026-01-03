document.getElementById('imageInput').addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const previewImg = document.getElementById('previewImg');
            previewImg.src = event.target.result;
            previewImg.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});

// Load persisted content on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedHtml = localStorage.getItem('generatedHTML');
    const savedCss = localStorage.getItem('generatedCSS');

    if (savedHtml || savedCss) {
        if (savedHtml) document.getElementById('htmlOutput').value = savedHtml;
        if (savedCss) document.getElementById('cssOutput').value = savedCss;

        // Show download buttons if there is content
        document.getElementById('downloadButtons').style.display = 'flex';
    }
});

document.getElementById('convertBtn').addEventListener('click', async () => {
    const fileInput = document.getElementById('imageInput');

    if (!fileInput.files.length) {
        alert('Please upload an image');
        return;
    }

    const formData = new FormData();
    formData.append('image', fileInput.files[0]);

    // Clear text areas and download buttons while loading
    document.getElementById('htmlOutput').value = '';
    document.getElementById('cssOutput').value = '';
    document.getElementById('downloadButtons').style.display = 'none';

    // Show status message
    const statusMsg = document.getElementById('statusMessage');
    statusMsg.style.display = 'block';
    statusMsg.textContent = 'Loading the model...';

    // Cycle messages simulating progress
    const messageTimer = setTimeout(() => {
        if (statusMsg.style.display !== 'none') {
            statusMsg.textContent = 'Making predictions...';
        }
    }, 2000);

    try {
        const response = await fetch('/convert', {
            method: 'POST',
            body: formData
        });

        clearTimeout(messageTimer);
        statusMsg.style.display = 'none';

        console.log("🔵 Raw response:", response);

        const data = await response.json();
        console.log("🟢 JSON data:", data);

        if (data.error) {
            alert(data.error);
            return;
        }

        // 🔥 THESE IDS MUST EXIST
        const htmlStr = data.html || '';
        const cssStr = data.css || '';
        document.getElementById('htmlOutput').value = htmlStr;
        document.getElementById('cssOutput').value = cssStr;

        // Show download buttons
        document.getElementById('downloadButtons').style.display = 'flex';

        // Persist generated HTML/CSS so other pages (editor) can load them
        try {
            localStorage.setItem('generatedHTML', htmlStr);
            localStorage.setItem('generatedCSS', cssStr);
        } catch (e) {
            console.warn('Could not save generated HTML/CSS to localStorage.', e);
        }

    } catch (err) {
        console.error("❌ Fetch failed:", err);
        alert("API request failed. Check console.");
    }
});

// Download HTML function
document.getElementById('downloadHtmlBtn').addEventListener('click', async () => {
    const htmlContent = document.getElementById('htmlOutput').value;

    if (!htmlContent) {
        alert('No HTML content to download');
        return;
    }

    // Check if there are modifications in the editor (localStorage)
    const editorHtml = localStorage.getItem('generatedHTML');
    const contentToDownload = editorHtml || htmlContent;

    const blob = new Blob([contentToDownload], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

// Download CSS function
document.getElementById('downloadCssBtn').addEventListener('click', async () => {
    const cssContent = document.getElementById('cssOutput').value;

    if (!cssContent) {
        alert('No CSS content to download');
        return;
    }

    // Check if there are modifications in the editor (localStorage)
    const editorCss = localStorage.getItem('generatedCSS');
    const contentToDownload = editorCss || cssContent;

    const blob = new Blob([contentToDownload], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'style.css';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});