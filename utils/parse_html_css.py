# utils/parse_html_css.py
from bs4 import BeautifulSoup

def parse_for_editor(html, css):
    """
    Parse HTML and CSS and return a list of tags with their text and styles.
    Output example:
    [
        {'tag': 'h1', 'text': 'Hello World', 'css': {'color': 'red', 'font-size': '20px'}},
        {'tag': 'p', 'text': 'Paragraph', 'css': {...}}
    ]
    """
    soup = BeautifulSoup(html, 'html.parser')
    parsed_tags = []
    for elem in soup.find_all(True):  # all tags
        text = elem.get_text() if elem.get_text() else ''
        parsed_tags.append({'tag': elem.name, 'text': text, 'css': {}})  # CSS can be parsed later from css string
    return parsed_tags
