import { useEffect, useState } from "react";

const useApi = (endpoint, options = {}) => {
    const baseUrl = import.meta.env.VITE_API_URL;
    const url = `${baseUrl}${endpoint}`;
    
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const fetchData = async () => {
      setLoading(true);
      try {
        let response;
        if (options.method === "GET") {
          response = await fetch(url);
        } else if (options.method === "POST") {
          response = await fetch(url, {
            ...options,
            headers: {
              'Content-Type': 'application/json',
              ...options.headers, // Allow custom headers
            },
          });
        }


        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url, JSON.stringify(options)]);
  
    return { data, loading, error, refetch: fetchData };
  };
  
  export default useApi;
  