import { test, expect } from "@playwright/test";

test("Petstore API: create user, fetch user, and analyze sold pets", async ({ request }) => {
  const username = "testuser123";

  // 1. Create a new user
  const createUser = await request.post("https://petstore.swagger.io/v2/user", {
    data: {
      id: 1001,
      username,
      firstName: "Test",
      lastName: "User",
      email: "test@example.com",
      password: "password123",
      phone: "1234567890",
      userStatus: 1,
    },
  });
  expect(createUser.ok()).toBeTruthy();

  // 2. Retrieve the created user
  const getUser = await request.get(`https://petstore.swagger.io/v2/user/${username}`);
  expect(getUser.ok()).toBeTruthy();
  const userData = await getUser.json();
  console.log("👤 User data:", userData);

  // 3. Find pets with status "sold"
  const soldPets = await request.get("https://petstore.swagger.io/v2/pet/findByStatus?status=sold");
  expect(soldPets.ok()).toBeTruthy();
  const pets = await soldPets.json();

  // 4. Collect tuples {id, name}
  const tuples = pets.map((p: any) => ({ id: p.id, name: p.name }));
  console.log("🐶 Sold pets:", tuples);

  // 5. Count duplicates by pet name
  const counts: Record<string, number> = {};
  for (const pet of tuples) {
    counts[pet.name] = (counts[pet.name] || 0) + 1;
  }
  console.log("📊 Pet name counts:", counts);

  // 6. Assert data structures are not empty
  expect(tuples.length).toBeGreaterThan(0);
});
