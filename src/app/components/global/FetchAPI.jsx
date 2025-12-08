

export default async function FetchAPI({ endpoint, children }) {
  const url = `http://localhost:4000${endpoint}`;

    let data = null;
    const response = await fetch(url);
    if (response.ok) {
      data = await response.json();
      console.log(`successfully fetched data from ${endpoint}: `, data);
    } else {
      console.error(`failed to fetch data from ${endpoint}: `, response.status);
    }
    // const data = await response.json();

  // Use render-prop style so children can receive the data directly
  return children(data);
}