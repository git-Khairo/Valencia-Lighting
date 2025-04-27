// src/hooks/useFetch.js
import { useState, useEffect } from 'react';

const useFetch = (url, refetchTrigger = 0) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = sessionStorage.getItem('token');
        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Could not fetch data');
        }

        const result = await response.json();
        setData(result);
        setError("");
      } catch (err) {
        setError(err.message);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, refetchTrigger]);

  return { data, error, loading };
};

export default useFetch;
