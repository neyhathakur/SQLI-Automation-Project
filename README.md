
# SQLI Automation Project

This repository contains the solution for the **QA Automation Qualification Test** 

The project is implemented in **Playwright + TypeScript** and covers both **Web Automation** and **API Handling** exercises.

---

## Project Structure

```
SQLI Automation Project/
│── playwright-ts/
│ ├── tests/
│ │ ├── web_wikipedia.spec.ts # Exercise 1: Web automation (Google → Wikipedia, fallback DuckDuckGo)
│ │ ├── api_petstore.spec.ts # Exercise 2: API handling (Petstore API with retries)
│ ├── playwright.config.ts # Playwright configuration
│ ├── tsconfig.json # TypeScript configuration
│ ├── package.json # Dependencies and scripts
│── outputs/ # Test results (screenshots, JSON outputs)
│── README.md # Project documentation
```

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/neyhathakur/SQLI-Automation-Project.git
cd SQLI-Automation-Project/playwright-ts
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install Playwright browsers

```bash
npx playwright install
```

---

## Running Tests

### Run all tests (web + API)

```bash
npx playwright test --headed

```

### Run a specific test

Web automation test:

```bash
npx playwright test tests/web_wikipedia.spec.ts --headed
```

API handling test:

```bash
npx playwright test tests/api_petstore.spec.ts
```

Open HTML Report:

```bash
npx playwright show-report

```
---

## Exercises Implemented

### ✅ Exercise 1: Web Automation

* Searches for “automation” on Google.
* If Google blocks with captcha/sorry page → automatically falls back to DuckDuckGo.
* Opens the Wikipedia link from search results..
* Extracts the first realistic year (1500–2099) from the page.
* Takes a **screenshot** of the Wikipedia page.
* Saves results in outputs/.

Output:

* outputs/web_wikipedia.png – Screenshot of the Wikipedia page
* outputs/web_summary.json – JSON summary of the run
---

### ✅ Exercise 2: API Handling (Petstore API)

* Creates a **new user** via API request.
* Retrieves and validates the created user.
* Calls **`/pet/findByStatus?status=sold`**.
* Collects tuples `{id, name}` for sold pets.
* Implements a function to count duplicates by name.
  Example output:

  ```json
  {
  "createStatus": 200,
  "getStatus": 200,
  "soldPets": [
    { "id": 778899445566, "name": "Jack" },
    { "id": 1052, "name": "doggie" }
  ],
  "nameCounts": {
    "Jack": 1,
    "doggie": 2
  }
}

  ```
* Logs results in console.

---

## Example Outputs

### Web Automation

```
✅ Wikipedia URL: https://en.wikipedia.org/wiki/Automation
✅ First automatic process year: 1936
✅ Screenshot saved: outputs/web_wikipedia.png

```

### API Handling

```
POST Response status: 200
GET Response status: 200
Sold pets (tuples): [{ id: 123, name: 'Liza' }, { id: 124, name: 'Jack' }]
Pet name counts: { Liza: 2, Jack: 1 }
Results saved to outputs/petstore_results.json

```

---

## Tech Stack

* Playwright – Web automation & API testing
* TypeScript – Strongly typed JavaScript
* Node.js (npm) – Dependency management
* Swagger Petstore API – Public API used for testing

---

## Submission Notes

* Code uploaded to GitHub repo as required.
* Ready to demo in the **interview session** scheduled with SQLI.

---
