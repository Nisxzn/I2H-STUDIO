# I2H STUDIO

**I2H STUDIO** (Image to HTML Studio) is a powerful tool that leverages AI to convert UI screenshots into clean, semantic HTML and CSS code. It acts as an intelligent coding assistant, speeding up the frontend development process by turning visual designs into code instantly.

## Features

*   **Image to Code Conversion**: Upload an image (PNG, JPEG, GIF, WEBP) of a UI design, and the AI generates the corresponding HTML and CSS.
*   **AI-Powered**: Uses OpenRouter API (specifically GPT-4o-mini) to analyze images and generate code.
*   **Live Preview**: Instantly view the generated HTML/CSS output rendered in a preview pane.
*   **Code Editor**: Edit the generated HTML and CSS directly within the application and see updates in real-time.
*   **Update Functionality**: Seamlessly update the preview as you modify the code in the editor.

## Tech Stack

*   **Backend**: Python, Flask
*   **AI Integration**: OpenRouter API (`openai/gpt-4o-mini`)
*   **Frontend**: HTML, CSS, JavaScript (Embedded in templates)
*   **Utilities**: `requests`, `base64`, `re`

## Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd I2H STUDIO
    ```

2.  **Create and activate a virtual environment (optional but recommended):**
    ```bash
    python -m venv venv
    # Windows
    venv\Scripts\activate
    # macOS/Linux
    source venv/bin/activate
    ```

3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Configuration:**
    *   Open `config.py`.
    *   Ensure your `OPENROUTER_API_KEY` is set correctly.
    *   *Note: It is recommended to use environment variables for API keys in a production environment.*

## Usage

1.  **Run the application:**
    ```bash
    python app.py
    ```

2.  **Open the application in your browser:**
    Navigate to `http://localhost:5000`.

3.  **Convert an Image:**
    *   Click on the upload area to select a UI image.
    *   The AI will process the image and display the generated code and preview.

4.  **Edit Code:**
    *   Go to the Editor section (or it may automatically redirect depending on flow).
    *   Modify HTML and CSS in the text areas.
    *   Changes will be reflected in the preview.

## Project Structure

```
I2H STUDIO/
├── app.py                  # Main Flask application
├── config.py               # Configuration file (API keys)
├── requirements.txt        # Python dependencies
├── static/                 # Static assets (CSS, JS, Images)
├── templates/              # HTML templates (index.html, editor.html)
├── uploads/                # Temporary storage for uploaded images
├── utils/
│   └── gemini_api.py       # wrapper for OpenRouter/Gemini API interaction
└── venv/                   # Virtual environment (excluded from git)
```

## Contributing

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature-branch`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add new feature'`).
5.  Push to the branch (`git push origin feature-branch`).
6.  Open a Pull Request.

## License

[MIT License](LICENSE) (Assuming MIT, change if otherwise)
