import os
from jinja2 import Template
from card import card
import markdown

BASE_DIR = os.path.join(os.path.dirname(__file__), "static")

def lambda_handler(event, context):
    # Load HTML template
    template_path = os.path.join(BASE_DIR, "tasks.html")
    with open(template_path, encoding="utf-8") as f:
        template = Template(f.read())

    # Load CSS and JS
    with open(os.path.join(BASE_DIR, "tasks.css"), encoding="utf-8") as f:
        css = f.read()
    with open(os.path.join(BASE_DIR, "tasks.js"), encoding="utf-8") as f:
        js = f.read()

    # Get tasks
    tasks = card(None)  # list of strings in Markdown
    # Convert each task from Markdown to HTML
    tasks_html = [markdown.markdown(task) for task in tasks]

    # Render HTML
    html = template.render(header="Here are your tasks", tasks=tasks_html, css=css, js=js)

    return {
        "statusCode": 200,
        "headers": {"Content-Type": "text/html"},
        "body": html
    }
