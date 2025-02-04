const API_URL = "https://www.ambassadoribet.com/_internal/gql";
const BRAND_ID = "ab";
const cache = new Map(); // Simple cache

async function fetchGraphQL(query, variables = {}, useCache = true) {
  const authData = extractAuthDataFromCookie();
  if (!authData || !authData.accessToken) {
    throw new Error("Unable to retrieve authorization data.");
  }

  const cacheKey = JSON.stringify({ query, variables });

  // ✅ Check cache before making a network request
  if (useCache && cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authData.accessToken}`,
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}`);
    }

    const result = await response.json();

    if (result.errors) {
      throw new Error(result.errors.map(err => err.message).join(", "));
    }

    // ✅ Store response in cache
    cache.set(cacheKey, result.data);

    return result.data;
  } catch (error) {
    console.error("GraphQL Request Failed:", error);
    throw new Error("GraphQL API Error");
  }
}
