# utils/gemini_api.py

import base64
import requests
import re
from config import OPENROUTER_API_KEY, OPENROUTER_MODEL

OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"


# ---------------------------
# Helper: Extract HTML & CSS
# ---------------------------
def extract_html_css(text: str):
    html_match = re.search(r"```html\s*(.*?)```", text, re.S | re.I)
    css_match = re.search(r"```css\s*(.*?)```", text, re.S | re.I)

    html = html_match.group(1).strip() if html_match else ""
    css = css_match.group(1).strip() if css_match else ""

    return html, css


# ---------------------------
# Fallback
# ---------------------------
def fallback():
    return {
        "html": "<h1>Fallback UI</h1><p>AI generation failed</p>",
        "css": "body{font-family:Arial;} h1{color:red;}"
    }


# ---------------------------
# Main: Image → HTML/CSS
# ---------------------------
def generate_html_css_from_image(image_path: str):
    if not OPENROUTER_API_KEY:
        print("❌ OPENROUTER_API_KEY missing")
        return fallback()

    try:
        # Read image
        with open(image_path, "rb") as f:
            image_bytes = f.read()

        image_b64 = base64.b64encode(image_bytes).decode("utf-8")

        # Detect image type
        image_type = "image/png"
        if image_bytes[:2] == b"\xff\xd8":
            image_type = "image/jpeg"
        elif image_bytes[:4] == b"GIF8":
            image_type = "image/gif"
        elif image_bytes[:4] == b"RIFF":
            image_type = "image/webp"

        # Prompt
        prompt = """
You are given a UI screenshot.

TASK:
- Convert the UI into clean, semantic HTML and CSS
- Keep layout simple and responsive
- Focus only on structure and basic styling
- DO NOT use any advanced, semantic, or complex tags
- DO NOT use any CSS properties outside the allowed list
- DO NOT add JavaScript
- DO NOT explain anything

ALLOWED HTML TAGS ONLY:
"h1", "h2", "h3", "p", "span",
"ul", "ol", "li",
"table", "tr", "td", "th",
"form", "input", "label",
"button", "textarea", "select",
"div", "hr", "br"

ALLOWED CSS PROPERTIES ONLY:
"color", "background-color", "width", "height",
"margin", "padding", "border", "border-radius",
"font-size", "font-weight", "font-family", "line-height",
"text-align", "text-decoration",
"display", "position", "top", "left", "right", "bottom",
"flex-direction", "justify-content", "align-items", "gap",
"box-shadow", "overflow", "cursor", "z-index"

STRICT RULES:
- Do NOT use any HTML tag outside the allowed list
- Do NOT use any CSS property outside the allowed list
- No classes or ids that imply advanced layouts (e.g., grid, flexbox)
- Use simple div-based layout (Flexbox is allowed via CSS properties, avoid framework class names)
- Inline responsiveness using percentages where needed
- No comments inside HTML or CSS
- ABSOLUTELY NO INLINE CSS (e.g., style="..."). All styling MUST be in the CSS block.
- Use meaningful class names or IDs to link HTML and CSS.

STRICT OUTPUT FORMAT:

```html
<!-- ONLY HTML -->
```css
/* ONLY CSS */
"""
        headers = {
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:5000",
            "X-Title": "Image to HTML CSS"
        }

        payload = {
            "model": OPENROUTER_MODEL,
            "messages": [
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": prompt},
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:{image_type};base64,{image_b64}"
                            }
                        }
                    ]
                }
            ],
            "temperature": 0.2,
            "max_tokens": 4096
        }

        response = requests.post(
            OPENROUTER_URL,
            headers=headers,
            json=payload,
            timeout=60
        )

        if response.status_code != 200:
            print("❌ OPENROUTER ERROR:", response.text)
            return fallback()

        data = response.json()
        raw_text = data["choices"][0]["message"]["content"]

        print("📡 OPENROUTER RAW RESPONSE:\n", raw_text)

        html, css = extract_html_css(raw_text)

        if not html or not css:
            print("⚠ Parsing failed, using fallback")
            return fallback()

        return {
            "html": html,
            "css": css
        }

    except Exception as e:
        print("❌ IMAGE → HTML ERROR:", e)
        return fallback()
