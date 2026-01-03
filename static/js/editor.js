/* static/js/editor.js */
document.addEventListener('DOMContentLoaded', function () {
    const tagButtonList = document.getElementById('tagButtonList');
    const tagDetailsPanel = document.getElementById('tagDetailsPanel');
    const selectedTagName = document.getElementById('selectedTagName');
    const tagDetails = document.getElementById('tagDetails');
    const closeDetailsBtn = document.getElementById('closeDetailsBtn');
    const loadBtn = document.getElementById('loadGeneratedBtn');
    const exportBtn = document.getElementById('exportCodeBtn');
    const clearBtn = document.getElementById('clearAllBtn');

    // Default HTML elements to show
    const defaultElements = [
        { tag: 'h1', icon: '📝', label: 'Heading 1', description: 'Main page heading' },
        { tag: 'h2', icon: '📄', label: 'Heading 2', description: 'Section heading' },
        { tag: 'h3', icon: '📋', label: 'Heading 3', description: 'Subsection heading' },
        { tag: 'p', icon: '📃', label: 'Paragraph', description: 'Text paragraph' },
        { tag: 'a', icon: '🔗', label: 'Link', description: 'Hyperlink' },
        { tag: 'button', icon: '🔘', label: 'Button', description: 'Interactive button' },
        { tag: 'input', icon: '⌨️', label: 'Input', description: 'Text input field' },
        { tag: 'img', icon: '🖼️', label: 'Image', description: 'Image element' },
        { tag: 'div', icon: '📦', label: 'Container', description: 'Generic container' },
        { tag: 'span', icon: '🏷️', label: 'Span', description: 'Inline element' },
        { tag: 'ul', icon: '📌', label: 'Unordered List', description: 'Bullet list' },
        { tag: 'ol', icon: '🔢', label: 'Ordered List', description: 'Numbered list' },
        { tag: 'li', icon: '•', label: 'List Item', description: 'List item' },
        { tag: 'table', icon: '📊', label: 'Table', description: 'Data table' },
        { tag: 'form', icon: '📝', label: 'Form', description: 'Form container' },
    ];

    function showDefaultElements() {
        tagButtonList.innerHTML = '';

        defaultElements.forEach(elem => {
            const btn = document.createElement('button');
            btn.className = 'tag-btn';
            btn.innerHTML = `
                <span style="font-size: 1.2rem; margin-right: 0.5rem;">${elem.icon}</span>
                <span style="flex: 1; text-align: left;">
                    <strong>&lt;${elem.tag}&gt;</strong>
                    <br>
                    <small style="color: var(--text-muted); font-size: 0.75rem;">${elem.description}</small>
                </span>
            `;
            btn.style.display = 'flex';
            btn.style.alignItems = 'center';
            btn.style.padding = '1rem';

            btn.addEventListener('click', () => {
                showElementInfo(elem);
            });

            tagButtonList.appendChild(btn);
        });
    }

    function showElementInfo(elem) {
        selectedTagName.textContent = `${elem.icon} <${elem.tag}> - ${elem.label}`;
        tagDetails.innerHTML = `
            <div style="padding: 1rem; background: rgba(0, 212, 255, 0.05); border-radius: 8px; margin-bottom: 1rem;">
                <h4 style="color: var(--accent-cyan); margin-bottom: 0.5rem;">Element Information</h4>
                <p style="color: var(--text-secondary); font-size: 0.875rem; line-height: 1.6;">
                    <strong>Tag:</strong> &lt;${elem.tag}&gt;<br>
                    <strong>Description:</strong> ${elem.description}<br>
                    <strong>Type:</strong> ${elem.tag === 'div' || elem.tag === 'span' ? 'Container' : elem.tag === 'img' || elem.tag === 'input' ? 'Self-closing' : 'Content'}
                </p>
            </div>
            
            <div style="padding: 1rem; background: rgba(168, 85, 247, 0.05); border-radius: 8px;">
                <h4 style="color: var(--accent-purple); margin-bottom: 0.5rem;">Usage Example</h4>
                <pre style="background: rgba(0, 0, 0, 0.4); padding: 1rem; border-radius: 6px; overflow-x: auto; font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; color: var(--text-primary);">${getExampleCode(elem.tag)}</pre>
            </div>
            
            <div style="margin-top: 1rem; padding: 1rem; background: rgba(16, 185, 129, 0.05); border-radius: 8px;">
                <h4 style="color: var(--accent-green); margin-bottom: 0.5rem;">💡 Quick Tip</h4>
                <p style="color: var(--text-secondary); font-size: 0.875rem; line-height: 1.6;">
                    ${getQuickTip(elem.tag)}
                </p>
            </div>
        `;
        tagDetailsPanel.style.display = 'block';
    }

    function getExampleCode(tag) {
        const examples = {
            'h1': '&lt;h1&gt;Welcome to My Website&lt;/h1&gt;',
            'h2': '&lt;h2&gt;About Us&lt;/h2&gt;',
            'h3': '&lt;h3&gt;Our Services&lt;/h3&gt;',
            'p': '&lt;p&gt;This is a paragraph of text.&lt;/p&gt;',
            'a': '&lt;a href="https://example.com"&gt;Click here&lt;/a&gt;',
            'button': '&lt;button&gt;Submit&lt;/button&gt;',
            'input': '&lt;input type="text" placeholder="Enter name"&gt;',
            'img': '&lt;img src="image.jpg" alt="Description"&gt;',
            'div': '&lt;div class="container"&gt;\n  Content here\n&lt;/div&gt;',
            'span': '&lt;span class="highlight"&gt;Text&lt;/span&gt;',
            'ul': '&lt;ul&gt;\n  &lt;li&gt;Item 1&lt;/li&gt;\n  &lt;li&gt;Item 2&lt;/li&gt;\n&lt;/ul&gt;',
            'ol': '&lt;ol&gt;\n  &lt;li&gt;First&lt;/li&gt;\n  &lt;li&gt;Second&lt;/li&gt;\n&lt;/ol&gt;',
            'li': '&lt;li&gt;List item content&lt;/li&gt;',
            'table': '&lt;table&gt;\n  &lt;tr&gt;\n    &lt;td&gt;Cell&lt;/td&gt;\n  &lt;/tr&gt;\n&lt;/table&gt;',
            'form': '&lt;form action="/submit"&gt;\n  Form elements\n&lt;/form&gt;',
        };
        return examples[tag] || `&lt;${tag}&gt;Content&lt;/${tag}&gt;`;
    }

    function getQuickTip(tag) {
        const tips = {
            'h1': 'Use only one H1 per page for the main title. It\'s important for SEO.',
            'h2': 'H2 tags are perfect for major sections of your content.',
            'h3': 'Use H3 for subsections within H2 sections to maintain hierarchy.',
            'p': 'Paragraphs are the building blocks of content. Keep them concise.',
            'a': 'Always include descriptive link text. Avoid "click here".',
            'button': 'Buttons should have clear, action-oriented labels.',
            'input': 'Always include a label for accessibility.',
            'img': 'Always include alt text for accessibility and SEO.',
            'div': 'Use semantic HTML5 tags (header, nav, main) when possible.',
            'span': 'Use span for inline styling without breaking text flow.',
            'ul': 'Use unordered lists when order doesn\'t matter.',
            'ol': 'Use ordered lists for sequential or ranked items.',
            'li': 'List items should be concise and parallel in structure.',
            'table': 'Use tables for tabular data, not for layout.',
            'form': 'Group related inputs and always validate user input.',
        };
        return tips[tag] || 'This is a standard HTML element.';
    }

    function parseCSSRules(cssText) {
        const rules = [];
        const re = /([^{}]+)\{([^}]+)\}/g;
        let m;
        while ((m = re.exec(cssText)) !== null) {
            const selectorText = m[1].trim();
            const declText = m[2].trim();
            const selectors = selectorText.split(',').map(s => s.trim()).filter(Boolean);
            const decls = {};
            declText.split(';').forEach(d => {
                const [k, v] = d.split(':');
                if (!k || !v) return;
                decls[k.trim()] = v.trim();
            });
            if (selectors.length && Object.keys(decls).length)
                rules.push({ selectors, decls });
        }
        return rules;
    }

    function buildPreview(html, css) {
        const iframe = document.getElementById('previewFrame');
        if (!iframe) return;

        iframe.srcdoc = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>${css || ''}</style>
        </head>
        <body>
            ${html || ''}
        </body>
        </html>
    `;
    }


    function collectElementsInfo(container, rules) {
        const infos = [];
        const all = Array.from(container.querySelectorAll('*'));
        all.forEach(el => {
            const id = el.dataset.editorId || null;
            const tag = el.tagName.toLowerCase();
            const text = (el.textContent || '').trim();
            const inner = (el.innerHTML || '').trim();
            const hasChildren = el.children.length > 0;
            const css = {};
            // Apply rules in order, later ones overwrite earlier
            rules.forEach(rule => {
                rule.selectors.forEach(sel => {
                    try {
                        if (container.querySelectorAll(sel).length && el.matches(sel)) {
                            Object.assign(css, rule.decls);
                        }
                    } catch (e) {
                        // invalid selector for querySelectorAll/matches — skip
                    }
                });
            });
            infos.push({ id, tag, text, inner, hasChildren, css, el });
        });
        return infos;
    }

    // store current state so applyUpdates can access inputs
    let currentInfos = [];
    let currentContainer = null;
    let currentStyleEl = null;

    function renderTagList(html, css) {
        tagButtonList.innerHTML = '';
        tagDetailsPanel.style.display = 'none';

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const rules = parseCSSRules(css);
        const NON_TEXT_TAGS = [
            'div', 'form', 'table', 'tbody', 'thead', 'tr', 'td',
            'ul', 'ol', 'li', 'section', 'article', 'nav', 'footer', 'header'
        ];

        const elements = Array.from(doc.body.querySelectorAll('*')).filter(el => {
            const tag = el.tagName.toLowerCase();
            const text = el.textContent.trim();

            // ignore structural tags
            if (NON_TEXT_TAGS.includes(tag)) return false;

            // ignore empty text
            if (!text) return false;

            return true;
        });

        // Create tag buttons
        elements.forEach((el, index) => {
            const tagBtn = document.createElement('button');
            const tagName = el.tagName.toLowerCase();
            tagBtn.className = 'tag-button';
            tagBtn.textContent = `<${tagName}>`;
            tagBtn.addEventListener('click', () => {
                showTagDetails(el, tagName, rules, doc, css, index);
            });
            tagButtonList.appendChild(tagBtn);
        });

        // Function to show tag details
        function showTagDetails(el, tagName, rules, doc, css, index) {
            selectedTagName.textContent = `<${tagName}> (Item ${index + 1})`;
            tagDetails.innerHTML = '';

            /* TEXT INPUT */
            const textLabel = document.createElement('label');
            textLabel.textContent = 'Text Content:';
            tagDetails.appendChild(textLabel);

            const input = document.createElement('input');
            input.type = 'text';
            input.value = el.textContent.trim();
            input.className = 'text-input';
            tagDetails.appendChild(input);

            input.addEventListener('input', () => {
                el.textContent = input.value;
                persist(doc, css);
            });

            /* CSS PROPERTIES */
            const cssLabel = document.createElement('label');
            cssLabel.textContent = 'CSS Properties:';
            tagDetails.appendChild(cssLabel);

            const cssPropertiesDiv = document.createElement('div');
            cssPropertiesDiv.className = 'css-properties-list';

            rules.forEach(rule => {
                rule.selectors.forEach(sel => {
                    try {
                        if (el.matches(sel)) {
                            Object.entries(rule.decls).forEach(([k, v]) => {
                                const cssContainer = document.createElement('div');
                                cssContainer.className = 'css-property-row';

                                const cssInput = document.createElement('input');
                                cssInput.type = 'text';
                                cssInput.value = `${k}: ${v}`;
                                cssInput.className = 'css-input';
                                cssInput.addEventListener('input', () => {
                                    el.style.setProperty(k, cssInput.value.split(':')[1].trim());
                                    persist(doc, css);
                                });
                                cssContainer.appendChild(cssInput);
                                cssPropertiesDiv.appendChild(cssContainer);
                            });
                        }
                    } catch { }
                });
            });

            tagDetails.appendChild(cssPropertiesDiv);
            tagDetailsPanel.style.display = 'block';
        }

        // Close details panel
        closeDetailsBtn.addEventListener('click', () => {
            tagDetailsPanel.style.display = 'none';
        });
    }

    function persist(doc, css) {
        const html = doc.body.innerHTML;
        localStorage.setItem('generatedHTML', html);
        localStorage.setItem('generatedCSS', css);
        buildPreview(html, css);
    }


    function loadGenerated() {
        const html = localStorage.getItem('generatedHTML') || '';
        const css = localStorage.getItem('generatedCSS') || '';

        if (html || css) {
            buildPreview(html, css);
            renderTagList(html, css);
        } else {
            alert('No generated content found. Please use the Converter page first.');
        }
    }



    // Wire load button
    loadBtn.addEventListener('click', () => {
        loadGenerated();
    });

    // Export code button
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            const html = localStorage.getItem('generatedHTML') || '';
            const css = localStorage.getItem('generatedCSS') || '';

            if (!html && !css) {
                alert('No content to export. Please load generated content first.');
                return;
            }

            const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Page</title>
    <style>
${css}
    </style>
</head>
<body>
${html}
</body>
</html>`;

            const blob = new Blob([fullHTML], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'generated-page.html';
            a.click();
            URL.revokeObjectURL(url);
        });
    }

    // Clear all button
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear all generated content?')) {
                localStorage.removeItem('generatedHTML');
                localStorage.removeItem('generatedCSS');
                buildPreview('', '');
                showDefaultElements();
                tagDetailsPanel.style.display = 'none';
                alert('Content cleared successfully!');
            }
        });
    }

    // Apply all updates at once when user clicks Update Preview
    const applyBtn = document.getElementById('applyUpdatesBtn');
    if (applyBtn) {
        applyBtn.addEventListener('click', () => {
            tagDetailsPanel.style.display = 'none';
            alert('Changes applied successfully!');
        });
    }

    // Show default elements on page load
    showDefaultElements();

    // Auto-load if data exists
    if (localStorage.getItem('generatedHTML') || localStorage.getItem('generatedCSS')) {
        loadGenerated();
    }

}); 