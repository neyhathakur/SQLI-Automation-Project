from playwright.sync_api import sync_playwright

def run_web_automation():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)  # Change to False if you want to see the browser
        page = browser.new_page()
        page.goto("https://en.wikipedia.org/wiki/Main_Page")
        
        # Search for "Automation"
        page.fill("input[name='search']", "Automation")
        page.press("input[name='search']", "Enter")
        page.wait_for_timeout(2000)

        # Save screenshot in outputs
        page.screenshot(path="outputs/wikipedia_automation_search.png")
        browser.close()

