import random

mandatory_task = "Say to someone 'Guess what?' and have them say 'What?' back. (Everyone has this task! Beware!)"

all_tasks = [
            "Tell someone you've lost their phone and get them to use theirs to call it.",
            "Get someone to show you a picture of their pet.",
            "Get someone to help you find a good restaurant nearby.",
            "Ask a stranger to take a picture of you.",
            "Ask someone to help you with directions.",
            "Ask someone to recommend a good movie.",
        ]

def choose_four_tasks():
    random_tasks = random.sample(all_tasks, 4)
    return [mandatory_task] + random_tasks

def card(context):
    selected_tasks = choose_four_tasks()
    output = "Here are your tasks:\n"
    for task in selected_tasks:
        output = output + "- " + task + "\n"
    return {"message": output}
