import { useState, useEffect } from 'react';

const useFetch = (url, refetchTrigger = 0) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Reset loading state on each fetch
      try {
        const token = sessionStorage.getItem('token'); // Get token for auth
        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${token}`, // Add token to headers
            'Accept': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Could not fetch data');
        }

        const result = await response.json();
        setData(result); // Set raw data from API
        setError(""); // Clear any previous error
      } catch (err) {
        setError(err.message);
        setData([]); // Reset data on error
      } finally {
        setLoading(false); // Always set loading to false when done
      }
    };

    fetchData();
  }, [url, refetchTrigger]); // Depend on both url and refetchTrigger

  return { data, error, loading };
};

export default useFetch;