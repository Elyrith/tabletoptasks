import os
from jinja2 import Template
from card import card

BASE_DIR = os.path.join(os.path.dirname(__file__), "static")

def lambda_handler(event, context):
    # Load HTML template
    template_path = os.path.join(BASE_DIR, "tasks.html")
    with open(template_path) as f:
        template = Template(f.read())

    # Load CSS and JS
    with open(os.path.join(BASE_DIR, "tasks.css")) as f:
        css = f.read()
    with open(os.path.join(BASE_DIR, "tasks.js")) as f:
        js = f.read()

    # Get tasks
    selected_tasks = card(None)["message"].split("\n")[1:]
    tasks = [line[2:] for line in selected_tasks if line.strip()]

    # Render HTML
    html = template.render(header="Here are your tasks", tasks=tasks, css=css, js=js)

    return {
        "statusCode": 200,
        "headers": {"Content-Type": "text/html"},
        "body": html
    }
