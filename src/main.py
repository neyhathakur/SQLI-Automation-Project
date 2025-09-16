from web_automation import run_web_automation
from api_handling import run_api_handling

if __name__ == "__main__":
    print("Starting Web Automation with Wikipedia...")
    run_web_automation()
    print("✅ Wikipedia web automation completed.\n")

    print("Starting API Handling with Petstore API...")
    run_api_handling()
    print("✅ Petstore API handling completed.\n")

    print("🎉 All tasks finished! Check the outputs folder for results.")

