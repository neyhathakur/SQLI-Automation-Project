from pathlib import Path
from web_duckduckgo_wikipedia import run_duckduckgo_wikipedia
from api_user_and_pets import run_api_user_and_pets


if __name__ == "__main__":
    print("Starting Web Automation with Wikipedia...")
    run_duckduckgo_wikipedia(Path("outputs"))
    print("Wikipedia web automation completed.\n")

    print("Starting API Handling with Petstore API...")
    run_api_user_and_pets(Path("outputs"))
    print("Petstore API handling completed.\n")

    print("All tasks finished! Check the outputs folder for results.")
