import yaml
import os
import random

number_of_tasks = 4
guesswhat_task = "Say to someone 'Guess what?' and have them say 'What?' back. **(Everyone has this task!)**"

# Load tasks from YAML
BASE_DIR = os.path.dirname(__file__)
with open(os.path.join(BASE_DIR, "tasks.yaml")) as file:
    all_tasks = yaml.safe_load(file)["tasks"]

def choose_tasks(tasks_count: int) -> list[str]:
    random_tasks = random.sample(all_tasks, tasks_count)
    return [guesswhat_task] + random_tasks

def card(context):
    selected_tasks = choose_tasks(number_of_tasks)
    return selected_tasks
