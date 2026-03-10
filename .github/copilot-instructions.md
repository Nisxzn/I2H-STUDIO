# Copilot / AI Agent Instructions

Purpose: give an AI coding agent the minimal, actionable knowledge to be productive in this repo (Image → HTML/CSS converter).

— Quick facts
- Framework: Flask (single-file app at `app.py`).
- Primary flow: upload image → `/convert` → `utils/gemini_api.generate_html_css_from_image` → returns JSON with `html` and `css`.
- Frontend: static JS pages at `templates/` + `static/js/*`. Pages use localStorage keys `generatedHTML` and `generatedCSS` to pass generated code between pages.

— How to run locally (discovered):
1. Install dependencies: `pip install -r requirements.txt`.
2. Run: `python app.py` (development server; creates `uploads/` directory automatically).
3. Dev notes: client code calls `/convert` (multipart/form-data with key `image`) and `/update` (JSON `{html, css}`).

— Key files & responsibilities
- `app.py` — Flask routes: `/`, `/editor`, `/convert` (POST image), `/update` (POST JSON preview). Runs dev server when invoked directly.
- `config.py` — Holds `OPENROUTER_API_KEY` and `OPENROUTER_MODEL` constants used by the API client.
- `utils/gemini_api.py` — Sends image and prompt to OpenRouter (`https://openrouter.ai/api/v1/chat/completions`) and extracts HTML/CSS code blocks. Important behaviors:
  - Strict prompt enforces output format using triple-backtick blocks for HTML and CSS.
  - Uses `requests.post` with `timeout=60`, `temperature=0.2`, `max_tokens=4096`.
  - If parsing fails or the API returns a non-200 status, `fallback()` is returned and error information is printed.
- `utils/parse_html_css.py` — Helper used by the editor: `parse_for_editor(html, css)` returns a list of tag dicts (tag, text, css).
- `static/js/convert.js` — Client-side converter UI:
  - Expects DOM elements with specific IDs (note comment: `// 🔥 THESE IDS MUST EXIST`): `imageInput`, `htmlOutput`, `cssOutput`, `downloadButtons`, `downloadHtmlBtn`, `downloadCssBtn`.
  - Stores generated code in localStorage keys: `generatedHTML`, `generatedCSS`.
  - `/convert` will return `{ html: "...", css: "..." }` or `{ error: "..." }`.
- `static/js/editor.js` — Editor that loads `generatedHTML`/`generatedCSS`, builds preview via `iframe.srcdoc`, parses CSS using a simple regex, and exposes UI controls (`loadGeneratedBtn`, `exportCodeBtn`, `clearAllBtn`, `applyUpdatesBtn`, `previewFrame`).

— Observable conventions & gotchas (do not assume otherwise unless changed):
- The backend expects the image under the form key `image` in `/convert`.
- The AI client requires EXACT code block formatting in responses (```html ... ```css ...) — `utils/gemini_api.extract_html_css` uses regexes that expect those fences.
- The frontend relies on localStorage to share generated content between converter and editor pages.
- `config.py` currently contains a hard-coded API key and model value. The code imports them directly (no `.env` load in current code path), so changing how secrets are provided is a behavioral change to document and test.
- CSS parsing in `editor.js` is very simple (regex-based) and may fail for complex selectors/at-rules.

— Suggested first tasks for an AI agent (low-friction, high-value)
- Add tests for `utils/parse_html_css.parse_for_editor` and `utils/gemini_api.extract_html_css` using representative inputs (including malformed responses and multiple code blocks).
- Add an integration test that posts a small sample image to `/convert` and asserts a JSON `html` and `css` are returned (mock the OpenRouter API response).
- Replace hard-coded secret usage with environment configuration (keep behavior backward-compatible: read `OPENROUTER_API_KEY`/`OPENROUTER_MODEL` from env if present; keep `config.py` default values). Add `.env` support and document in README or this file.
- Improve CSS parsing in `editor.js` to handle common edge-cases or add a server-side CSS sanitizer.

— Debugging notes
- Server logs: `utils/gemini_api.py` prints raw API response and parsing warnings — useful when an AI agent is debugging conversion issues.
- Browser console: `static/js/convert.js` logs raw response and JSON — check these when diagnosing frontend failures.
- Watch for long API times; `requests` timeout is 60s and network/API errors fall back to a simple static UI.

— Security & operational notes (must read)
- An API key is present in `config.py`. Treat it as a secret: rotate immediately if this repo becomes public and switch to environment variables or a secret store. Do not commit new secrets to the repo.

— Where to look for more context
- UI behavior examples: `templates/index.html` and `templates/editor.html`.
- JS logic and IDs: `static/js/convert.js` and `static/js/editor.js`.
- API integration and prompt tuning: `utils/gemini_api.py` (prompt text is in the function; adjust carefully).

If anything above is unclear or you'd like more detail in a section (e.g., example test cases or a proposed config migration patch), tell me which area to expand and I will iterate. ✅
