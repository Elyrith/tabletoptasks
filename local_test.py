from main import lambda_handler  # replace with your handler file name

if __name__ == "__main__":
    # Simulate an empty Lambda event and context
    event = {}
    context = None

    # Call the Lambda handler
    response = lambda_handler(event, context)

    # The HTML is in response['body']
    html = response["body"]

    # Save to a file so you can open it in a browser
    with open("local_preview.html", "w", encoding="utf-8") as f:
        f.write(html)

    print("HTML preview written to local_preview.html")
