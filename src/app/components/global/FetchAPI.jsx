

export default async function FetchAPI({ endpoint, children }) {
  const url = `http://localhost:4000${endpoint}`;

  let data = [];

  try {
    const response = await fetch(url);
    if (response.ok) {
      data = await response.json();
      console.log(`successfully fetched data from ${endpoint}: `, data);
    } else {
      data = [{ error: `Failed to fetch from ${endpoint}: ${response.status}` }];
      console.error(data[0].error);
    }
  } catch (err) {
    data = [{ error: `Error fetching from ${endpoint}: ${err.message}` }];
    console.error(data[0].error);
  }

  return children(data);
}