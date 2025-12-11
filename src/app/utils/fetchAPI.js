export async function fetchAPI(endpoints) {
  // artificial delay for testing Suspense (comment out when not needed)
  // await new Promise(resolve => setTimeout(resolve, 6000)); // 6 second delay

  //AI debug kode, ikke nødvendigt for funktionalitet

  const fetched = {};
  for (const endpoint of endpoints) {
    try {
      const response = await fetch(`http://localhost:4000${endpoint}`);
      fetched[endpoint] = await response.json();
    } catch (err) {
      fetched[endpoint] = [{ error: `Error: Fetch failed for endpoint "${endpoint}"` }];
    }
  }
  return fetched;
}
