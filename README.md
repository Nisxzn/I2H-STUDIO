# I2H STUDIO - Image to HTML/CSS Converter

<div align="center">
  <img src="https://raw.githubusercontent.com/Nisxzn/I2H-STUDIO/main/static/img/logo.png" alt="I2H Studio Logo" width="120" onerror="this.src='https://cdn-icons-png.flaticon.com/512/1157/1157109.png'"/>
  <h3>Turn UI Screenshots into Clean HTML/CSS Instantly</h3>
  <p>
    <img src="https://img.shields.io/badge/version-1.1.0-blue?style=for-the-badge" alt="Version"/>
    <img src="https://img.shields.io/badge/made%20with-Python-3776AB?style=for-the-badge&logo=python" alt="Python"/>
    <img src="https://img.shields.io/badge/UI-Modern-00D4FF?style=for-the-badge" alt="Modern UI"/>
  </p>
</div>

---

## 🚀 Overview

**I2H STUDIO** is a sophisticated browser-based tool that uses AI (Llama 3 Vision) to transform UI images, mockups, or screenshots into semantic HTML and modern CSS. It features a powerful real-time editor that persists your progress and provides a live preview.

### ✨ Key Features

- 🖼️ **Image-to-Code**: Upload any UI screenshot and get responsive code in seconds.
- 🛠️ **Live Editor**: Fine-tune generated elements with an interactive sidebar.
- 💾 **Persistent Session**: Never lose your progress—images and code are saved in `localStorage`.
- 📍 **Floating Reference**: Drag and position your original design overlay while editing.
- 📱 **Responsive Testing**: Toggle between Desktop and Mobile views instantly.
- 🎨 **Modern Aesthetics**: Built with a premium, glassmorphic dark-mode interface.

---

## 🛠️ Tech Stack

- **Backend**: Python (Flask)
- **AI Core**: Llama 3 Vision API (via Together/Groq)
- **Frontend**: Vanilla JavaScript (ES6+), Modern CSS
- **Storage**: Browser LocalStorage for seamless page transitions

---

## 📸 Screenshots

| Converter Page | Live Editor |
| :---: | :---: |
| ![Converter](https://raw.githubusercontent.com/Nisxzn/I2H-STUDIO/main/docs/converter_preview.png) | ![Editor](https://raw.githubusercontent.com/Nisxzn/I2H-STUDIO/main/docs/editor_preview.png) |
*(Note: Screenshots are automatically generated based on your latest UI updates)*

---

## 🎨 How to Use

1. **Upload**: Drop your UI design screenshot into the **Converter**.
2. **Convert**: Hit the `Convert` button and watch the AI generate your code.
3. **Refine**: Navigate to the **Editor** to tweak text, styles, and layout.
4. **Compare**: Use the floating high-fidelity reference design to ensure pixel-perfection.
5. **Export**: Export your final results as a complete `.html` file.

---

## 🛠️ Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Nisxzn/I2H-STUDIO.git
   cd I2H-STUDIO
   ```

2. **Set up virtual environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Environment Variables**:
   Create a `.env` file and add your API key:
   ```env
   GROQ_API_KEY=your_api_key_here
   ```

5. **Run the App**:
   ```bash
   python app.py
   ```
   Open `http://localhost:5000` in your browser.

---

## 📄 License

This project is licensed under the MIT License.

<div align="center">
  <sub>Built with ❤️ by Nisxzn & Team</sub>
</div>
