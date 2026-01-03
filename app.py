# app.py
from flask import Flask, render_template, request, jsonify
from utils.gemini_api import generate_html_css_from_image
import os

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads/'


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/editor')
def editor():
    return render_template('editor.html')


@app.route('/convert', methods=['POST'])
def convert():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    image = request.files['image']
    image_path = os.path.join(app.config['UPLOAD_FOLDER'], image.filename)
    image.save(image_path)

    result = generate_html_css_from_image(image_path)
    return jsonify(result)


@app.route('/update', methods=['POST'])
def update():
    data = request.get_json()
    html = data.get('html', '')
    css = data.get('css', '')

    preview = f"<style>{css}</style>{html}"
    return jsonify({'preview': preview})


if __name__ == '__main__':
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    app.run(debug=True)
