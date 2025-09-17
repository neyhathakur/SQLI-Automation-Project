import json
import re
from pathlib import Path
from playwright.sync_api import sync_playwright

def run_duckduckgo_wikipedia(output_dir: Path):
    output_dir.mkdir(parents=True, exist_ok=True)
    results = {}

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False, slow_mo=500)
        context = browser.new_context()
        page = context.new_page()

        try:
            # Step 1: Open DuckDuckGo
            page.goto("https://duckduckgo.com/")
            page.get_by_role("combobox", name="Search with DuckDuckGo").fill(
                "First automatic process in history site:wikipedia.org"
            )
            page.get_by_role("combobox", name="Search with DuckDuckGo").press("Enter")

            # Step 2: Wait for results and click first Wikipedia link
            wiki_link = page.get_by_role("link", name=re.compile("Wikipedia", re.I)).first
            wiki_link.wait_for(timeout=15000)
            wiki_url = wiki_link.get_attribute("href")
            results["wikipedia_url"] = wiki_url
            wiki_link.click()

            # Step 3: Extract year of first automatic process
            page.wait_for_selector("body", timeout=15000)
            content = page.content()
            match = re.search(r"\b(1[0-9]{3}|20[0-9]{2})\b", content)
            if match:
                results["first_automatic_process_year"] = match.group(0)
            else:
                results["error_extract"] = "Could not find year in Wikipedia content"

            # Step 4: Screenshot
            screenshot_path = output_dir / "duckduckgo_wikipedia.png"
            page.screenshot(path=str(screenshot_path))
            results["screenshot"] = str(screenshot_path)

        except Exception as e:
            results["error"] = str(e)

        finally:
            summary_file = output_dir / "duckduckgo_wikipedia_results.json"
            with open(summary_file, "w", encoding="utf-8") as f:
                json.dump(results, f, indent=2, ensure_ascii=False)
            results["summary_file"] = str(summary_file)

            context.close()
            browser.close()

    print("DuckDuckGo → Wikipedia automation completed. Summary:")
    print(json.dumps(results, indent=2, ensure_ascii=False))
    return results


if __name__ == "__main__":
    run_duckduckgo_wikipedia(Path("outputs"))

