import os
import yaml
from jinja2 import Template
import markdown
import random

BASE_DIR = os.path.join(os.path.dirname(__file__), "static")
LANG_DIR = os.path.join(os.path.dirname(__file__), "language")

number_of_tasks = 4

def card(context, everyone_task: str, all_tasks: list[str]):
    random_tasks = random.sample(all_tasks, number_of_tasks)
    return [everyone_task] + random_tasks

def how_to_play_to_html(how_to_play: list[str]) -> str:
    return " ".join(how_to_play)

def lambda_handler(event, context):
    # --- Load language file (default: English) ---
    lang_file = os.path.join(LANG_DIR, "en.yaml")
    with open(lang_file, encoding="utf-8") as f:
        lang_data = yaml.safe_load(f)

    header = lang_data.get("header", "Set the Trap")
    goal = lang_data.get("goal", "Goal: Be the first person to complete all your tasks, without being caught!")
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
    tasks_list = lang_data.get("tasks", [])
    everyone_task = lang_data.get("everyone_task", "Say to someone 'Guess what?' and have them say 'What?' back. **(Everyone has this task!)**")
    tasks = card(None, everyone_task, tasks_list)
    # Convert each task from Markdown to HTML
    tasks_html = [markdown.markdown(task) for task in tasks]

    # Handle the how to play section
    how_to_play_header = lang_data.get("how_to_play_header", "How to Play")
    how_to_play = lang_data.get("how_to_play", [])
    how_to_play_html = [markdown.markdown(rule) for rule in how_to_play]

    # Support text
    support_prefix = lang_data.get("support_prefix", "Support Me")

    footer = lang_data.get("footer", "Created by ")
    # Render HTML
    html = template.render(header=header, goal=goal, how_to_play_header=how_to_play_header, how_to_play=how_to_play_html, tasks=tasks_html, support_prefix=support_prefix, footer=footer, css=css, js=js)

    return {
        "statusCode": 200,
        "headers": {"Content-Type": "text/html"},
        "body": html
    }
