import random

number_of_tasks = 4
guesswhat_task = "Say to someone 'Guess what?' and have them say 'What?' back. (Everyone has this task! Beware!)"

all_tasks = [
            "Tell someone you've lost their phone and get them to use theirs to call it.",
            "Get someone to show you a picture of their pet.",
            "Get someone to help you find a good restaurant nearby.",
            "Ask a stranger to take a picture of you.",
            "Ask someone to help you with directions.",
            "Ask someone to recommend a good movie.",
        ]

def choose_tasks(tasks_count: int) -> list[str]:
    random_tasks = random.sample(all_tasks, tasks_count)
    return [guesswhat_task] + random_tasks

# card.py
def card(context):
    selected_tasks = choose_tasks(number_of_tasks)
    return selected_tasks
