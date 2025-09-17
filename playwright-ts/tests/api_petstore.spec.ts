// playwright-ts/tests/api_petstore.spec.ts
import { test, expect, APIResponse } from "@playwright/test";
import fs from "fs";
import path from "path";

const OUTPUT_DIR = path.join(process.cwd(), "outputs");
const BASE_URL = "https://petstore.swagger.io/v2";

type Pet = { id: number; name?: string };

test("Petstore API: create user, fetch user, and analyze sold pets", async ({ request }) => {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const username = `qa_user_${Date.now()}`;
  const userPayload = {
    id: Date.now() % 1000000000,
    username,
    firstName: "QA",
    lastName: "Tester",
    email: `qa.${Date.now()}@example.com`,
    password: "TestPass123!",
    phone: "0000000000",
    userStatus: 1,
  };

  // 1) Create user
  const createResp = await request.post(`${BASE_URL}/user`, { data: userPayload });
  console.log("POST Response status:", createResp.status());
  const createJson = await createResp.json().catch(() => ({}));
  console.log("POST Response body:", createJson);
  await expect(createResp).toBeOK();

  // 2) GET user with retries (Petstore demo can be flaky)
  let getResp: APIResponse | undefined;
  const maxAttempts = 4;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    getResp = await request.get(`${BASE_URL}/user/${username}`);
    console.log(`GET attempt ${attempt} status:`, getResp.status());
    if (getResp.ok()) break;
    await new Promise((r) => setTimeout(r, 500 * attempt));
  }
  if (!getResp) throw new Error("GET never completed");
  await expect(getResp).toBeOK();
  const getJson = await getResp.json().catch(() => ({}));
  console.log("GET Response body:", getJson);

  // 3) Find sold pets
  const soldResp = await request.get(`${BASE_URL}/pet/findByStatus?status=sold`);
  console.log("findByStatus status:", soldResp.status());
  await expect(soldResp).toBeOK();
  const pets = await soldResp.json().catch(() => []) as Pet[];
  console.log("Raw sold pets count:", Array.isArray(pets) ? pets.length : "not-array");

  // 4) Collect tuples {id, name}
  const soldPets = Array.isArray(pets) ? pets.map((p) => ({ id: p.id, name: p.name ?? "Unnamed" })) : [];
  console.log("Sold pets (tuples):", soldPets);

  // 5) Count duplicates by name (class)
  class PetNameCounter {
    constructor(public petTuples: { id: number; name: string }[]) {}
    countNames(): Record<string, number> {
      const counts: Record<string, number> = {};
      for (const p of this.petTuples) {
        counts[p.name] = (counts[p.name] || 0) + 1;
      }
      return counts;
    }
  }
  const counter = new PetNameCounter(soldPets);
  const nameCounts = counter.countNames();
  console.log("Pet name counts:", nameCounts);

  // 6) Persist results to outputs
  const out = {
    createStatus: createResp.status(),
    createJson,
    getStatus: getResp.status(),
    getJson,
    soldPets,
    nameCounts,
  };
  fs.writeFileSync(path.join(OUTPUT_DIR, "petstore_results.json"), JSON.stringify(out, null, 2));
  console.log("Results saved to outputs/petstore_results.json");

  // 7) Basic assertion to ensure we have some sold pets (optional)
  expect(soldPets.length).toBeGreaterThan(0);
});
