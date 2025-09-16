import requests
import json

def run_api_handling():
    url = "https://petstore.swagger.io/v2/pet"
    payload = {
        "id": 123456,
        "name": "doggie",
        "status": "available"
    }
    headers = {"Content-Type": "application/json"}

    # Create a new pet
    response = requests.post(url, headers=headers, data=json.dumps(payload))
    print("POST Response:", response.json())

    # Get the pet by ID
    response = requests.get(f"{url}/{payload['id']}")
    print("GET Response:", response.json())

    # Save output
    with open("outputs/petstore_results.json", "w") as f:
        json.dump(response.json(), f, indent=2)
