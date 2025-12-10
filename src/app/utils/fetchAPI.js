export async function fetchAPI(/* { endpoint, children } */ endpoints) {
  // const url = `http://localhost:4000${endpoint}`;

  // let data = [];

  // try {
  //   const response = await fetch(url);
  //   if (response.ok) {
  //     data = await response.json();
  //     console.log(`successfully fetched data from ${endpoint}: `, data);
  //   } else {
  //     data = [{ error: `Failed to fetch from ${endpoint}: ${response.status}` }];
  //     console.error(data[0].error);
  //   }
  // } catch (err) {
  //   data = [{ error: `Error fetching from ${endpoint}: ${err.message}` }];
  //   console.error(data[0].error);
  // }

  // return children(data);

  // const endpoints = ["/events", "/blogposts", "/comments", "/gallery"];
  // const fetched = {};
  // for (const endpoint of endpoints) {
  //   try {
  //     const response = await fetch(`http://localhost:4000${endpoint}`);
  //     fetched[endpoint] = await response.json();
  //     console.log(
  //       `successfully fetched data from ${endpoint}: `,
  //       fetched[endpoint]
  //     );
  //   } catch (err) {
  //     fetched[endpoint] = [
  //       { error: `Error fetching from ${endpoint}: ${err.message}` },
  //     ];
  //   }
  // }

  // console.log("Fetched data: ", fetched);
  // return JSON.stringify(fetched);

  const fetched = {};
  for (const endpoint of endpoints) {
    try {
      const response = await fetch(`http://localhost:4000${endpoint}`);
      fetched[endpoint] = await response.json();
    } catch (err) {
      fetched[endpoint] = [{ error: `Error: Fetch failed for ${endpoint}` }];
    }
  }
  return fetched;
}
