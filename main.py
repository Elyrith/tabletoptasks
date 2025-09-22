from flask import Flask, render_template
from card import card

app = Flask(__name__)

@app.route("/")
def homepage():
    result = card(None)
    lines = result['message'].split("\n")
    header = lines[0]
    tasks = [line[2:] for line in lines[1:] if line.strip()]
    return render_template("tasks.html", header=header, tasks=tasks)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
