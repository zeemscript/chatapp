"use client"
// app/page.js

import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/websocket');
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await res.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Data from API</h1>
      <ul>
        {/* {data.map((item) => ( */}
          <li key={data.name}>{data.email}</li>
        {/* ))} */}
      </ul>
    </div>
  );
}
