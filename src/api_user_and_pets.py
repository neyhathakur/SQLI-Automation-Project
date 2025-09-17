import json
import requests
from pathlib import Path
from collections import Counter


BASE_URL = "https://petstore.swagger.io/v2"


def run_api_user_and_pets(output_dir: Path):
    output_dir.mkdir(parents=True, exist_ok=True)
    results = {}

    # 1. Create user
    user_data = {
        "id": 123456,
        "username": "qa_user",
        "firstName": "QA",
        "lastName": "Tester",
        "email": "qa@example.com",
        "password": "password123",
        "phone": "1234567890",
        "userStatus": 1,
    }

    res_post = requests.post(f"{BASE_URL}/user", json=user_data)
    results["create_user_status"] = res_post.status_code
    results["create_user_response"] = res_post.json()

    # 2. Get user
    res_get = requests.get(f"{BASE_URL}/user/{user_data['username']}")
    results["get_user_status"] = res_get.status_code
    results["get_user_response"] = res_get.json()

    # 3. Find sold pets
    res_pets = requests.get(f"{BASE_URL}/pet/findByStatus?status=sold")
    pets_data = res_pets.json()
    sold_pets = [(pet["id"], pet.get("name", "Unnamed")) for pet in pets_data]

    results["sold_pets"] = sold_pets

    # 4. Count duplicate names
    pet_name_counts = dict(Counter([name for _, name in sold_pets]))
    results["pet_name_counts"] = pet_name_counts

    # Save results JSON
    results_path = output_dir / "petstore_results.json"
    with open(results_path, "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2, ensure_ascii=False)

    print("API Handling completed. Results saved to:", results_path)
    return results
