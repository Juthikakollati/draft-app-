import requests

# Define the API endpoint URL
url = 'https://api.groq.com/openai/v1/chat/completions'

try:
    # Make the HTTP GET call
    response = requests.get(url)
    
    # Check if the server responded with a successful status code (200 OK)
    if response.status_code == 200:
        # Parse response body automatically as a Python dictionary
        user_data = response.json()
        print(f"User Name: {user_data['name']}")
        print(f"User Email: {user_data['email']}")
    else:
        print(f"Server error: Status code {response.status_code}")

except requests.exceptions.RequestException as e:
    # Handle connection errors or timeouts
    print(f"Network error: {e}")
