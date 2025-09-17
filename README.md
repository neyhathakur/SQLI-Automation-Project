
# SQLI Automation Project

This repository contains the solution for the **QA Automation Qualification Test** 

The project is implemented in **Playwright + TypeScript** and covers both **Web Automation** and **API Handling** exercises.

---

## Project Structure

```
SQLI Automation Project/
│── playwright-ts/
│   ├── tests/
│   │   ├── web_wikipedia.spec.ts     # Exercise 1: Web automation (DuckDuckGo → Wikipedia)
│   │   ├── api_petstore.spec.ts      # Exercise 2: API handling (Petstore API)
│   ├── playwright.config.ts          # Playwright configuration
│   ├── tsconfig.json                 # TypeScript configuration
│   ├── package.json                  # Dependencies and scripts
│── outputs/                          # Test results (screenshots, JSON outputs)
│── README.md                         # Project documentation
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
npx playwright test
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

---

## Exercises Implemented

### ✅ Exercise 1: Web Automation

* Opens **DuckDuckGo**.
* Searches for **“first automatic process in history site\:wikipedia.org”**.
* Clicks on the **Wikipedia link**.
* Extracts the **year of the first automatic process**.
* Takes a **screenshot** of the Wikipedia page.
* Verifies that at least one year is found.

Output:

* Screenshot saved in `outputs/web_wikipedia.png`.

---

### ✅ Exercise 2: API Handling (Petstore API)

* Creates a **new user** via API request.
* Retrieves and validates the created user.
* Calls **`/pet/findByStatus?status=sold`**.
* Collects tuples `{id, name}` for sold pets.
* Implements a function to count duplicates by name.
  Example output:

  ```json
  { "Liza": 2, "Jack": 1, "Bret": 1 }
  ```
* Logs results in console.

---

## Example Outputs

### Web Automation

```
✅ First automatic process year: 1801
```

### API Handling

```
 User data: { username: 'testuser123', ... }
 Sold pets: [{ id: 123, name: 'Liza' }, { id: 124, name: 'Jack' }]
 Pet name counts: { Liza: 2, Jack: 1 }
```

---

## Tech Stack

* **Playwright** – Web automation framework
* **TypeScript** – Strongly typed JavaScript
* **Node.js (npm)** – Dependency management
* **Swagger Petstore API** – Public API used for testing

---

## Submission Notes

* Code uploaded to GitHub repo as required.
* Ready to demo in the **interview session** scheduled with SQLI.

---
