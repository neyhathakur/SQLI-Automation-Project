# SQLI Automation Project

This project is a QA Automation Qualification Test solution. It demonstrates skills in both **web automation** and **API automation**.

---

## Project Structure

```
SQLI-Automation-Project/
├── .venv/                              # Virtual environment (ignored in repo)
├── outputs/                            # Generated screenshots and JSON results
│   ├── duckduckgo_wikipedia.png
│   ├── duckduckgo_wikipedia_results.json
│   ├── petstore_results.json
│   └── (other example files)
├── src/
│   ├── main.py                         # Entry point that runs all tasks
│   ├── web_duckduckgo_wikipedia.py     # Web automation: DuckDuckGo → Wikipedia
│   ├── api_user_and_pets.py            # API handling: user + sold pets + counts
│   └── (optional fallback or helper scripts)
├── requirements.txt                    # Python dependencies
└── README.md                           # This documentation
```

---

## Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/neyhathakur/SQLI-Automation-Project.git
   cd SQLI-Automation-Project
   ```

2. **Create and activate virtual environment**

   Windows (PowerShell):
   ```powershell
   python -m venv .venv
   . .\.venv\Scripts\Activate
   ```

   macOS / Linux:
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   ```

3. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Install Playwright browsers**

   ```bash
   python -m playwright install
   ```

---

## ▶ Running the Project

To run both exercises (web + API) in one command:

```bash
python src/main.py
```

---

## Exercise 1: Web Automation (DuckDuckGo → Wikipedia)

**What it does:**

- Searches the web using **DuckDuckGo** (because Google blocks automation).
- Restricts search to `site:wikipedia.org` to find the Wikipedia page for *First automatic process in history*.
- Extracts the **year** of that first automatic process.
- Takes a screenshot of the Wikipedia page.
- Saves results in JSON + screenshot under `outputs/`.

**Output files:**

- `outputs/duckduckgo_wikipedia_results.json`
- `outputs/duckduckgo_wikipedia.png`

---

## Exercise 2: API Handling with Petstore

**What it does:**

- Uses Swagger Petstore API (`https://petstore.swagger.io/v2`).
- Creates a user (POST request).
- Retrieves that user (GET request).
- Fetches all pets with status=`sold`.
- Extracts `(id, name)` tuples of sold pets.
- Counts how many pets share the same name.
- Saves results in `outputs/`.

**Output file:**

- `outputs/petstore_results.json`

---

## ✅ Example Output

When you run:

```bash
python src/main.py
```

You should see console output similar to:

```
Starting Web Automation with Wikipedia...
DuckDuckGo → Wikipedia automation completed. Summary:
{
  "wikipedia_url": "https://en.wikipedia.org/wiki/Automation",
  "first_automatic_process_year": "2000",
  "screenshot": "outputs\\duckduckgo_wikipedia.png",
  "summary_file": "outputs\\duckduckgo_wikipedia_results.json"
}
Wikipedia web automation completed.

Starting API Handling with Petstore API...
API Handling completed. Results saved to: outputs\petstore_results.json
Petstore API handling completed.

✅ All tasks finished! Check the outputs folder for results.
```

---

## Notes & Decisions

- **Locator selection**: Real locators captured using Playwright Codegen / Test-Runner to ensure precision.
- **Error handling**: If Wikipedia link is not found, script logs error and outputs debug HTML snapshot for later review.

---

## Tools & Libraries

- Python 3.9+  
- Playwright (browser automation)  
- Requests (API HTTP client)  
