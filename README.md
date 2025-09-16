# SQLI Automation Project

This project contains two QA automation exercises:

1. **Web Automation with Wikipedia**  
   Automates a Wikipedia search for the keyword **"Automation"**, saves a screenshot, and validates results.

2. **API Handling with Petstore API**  
   Uses the [Swagger Petstore API](https://petstore.swagger.io/) to:
   - Create a new Pet (POST request).
   - Retrieve the created Pet (GET request).
   - Save the API responses into JSON files.

---

## Project Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/neyhathakur/SQLI-Automation-Project.git
cd SQLI-Automation-Project
````

### 2. Create and Activate Virtual Environment

```bash
python -m venv .venv
```

* **Windows (PowerShell):**

  ```bash
  .\.venv\Scripts\Activate
  ```
* **macOS/Linux:**

  ```bash
  source .venv/bin/activate
  ```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Install Playwright Browsers

```bash
python -m playwright install
```

## Test Case Summary

### 1. Wikipedia Search Automation

* **Located in:** `src/web_automation.py`
* **Description:**

  * Opens Wikipedia.
  * Searches for the keyword **"Automation"**.
  * Takes a screenshot of the results page.
  * Saves output as `outputs/wikipedia_automation_search.png`.

---

### 2. Petstore API Handling

* **Located in:** `src/api_handling.py`
* **Description:**

  * Sends a **POST request** to create a new pet (`id=123456, name="doggie"`).
  * Sends a **GET request** to fetch the created pet.
  * Saves the JSON response as `outputs/petstore_results.json`.

---

## ▶️ How to Run Tests

Run **all exercises** (Wikipedia + Petstore API):

```bash
python src/main.py
```

Run **only the Wikipedia test**:

```bash
python -m src.web_automation
```

Run **only the Petstore API test**:

```bash
python -m src.api_handling
```

---

## Folder Structure

```
SQLI-Automation-Project/
│── .venv/                     # Virtual environment (ignored in repo)
│── outputs/                   # Generated results
│   ├── wikipedia_automation_search.png
│   └── petstore_results.json
│── src/                       # Source code
│   ├── main.py                # Entry point - runs both exercises
│   ├── web_automation.py      # Wikipedia automation script
│   └── api_handling.py        # Petstore API automation script
│── requirements.txt           # Python dependencies
│── README.md                  # Documentation
```

---

##  Tools and Libraries

* [Python 3.9+](https://www.python.org/)
* [Playwright](https://playwright.dev/python/) – for browser automation
* [Requests](https://docs.python-requests.org/en/latest/) – for API handling
* [python-dotenv](https://pypi.org/project/python-dotenv/) – for environment variable management

---

## Example Outputs

* **Wikipedia Screenshot:**
  File: `outputs/wikipedia_automation_search.png`

* **Petstore API JSON:**
  File: `outputs/petstore_results.json`

  ```json
  {
    "id": 123456,
    "name": "doggie",
    "photoUrls": [],
    "tags": [],
    "status": "available"
  }
  ```

---

## Notes for Interviewers

1. Follow the setup instructions above to install dependencies.
2. Run `python src/main.py` to execute both exercises.
3. Check the `outputs/` folder for results.

```
