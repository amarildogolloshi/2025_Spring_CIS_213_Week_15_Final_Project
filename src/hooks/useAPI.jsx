import { useEffect, useState } from "react";

const useApi = (endpoint, options = {}, startAutomatically=false) => {
    const baseUrl = import.meta.env.VITE_API_URL;
    const url = `${baseUrl}${endpoint}`;
    
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const fetchData = async (startAutomatically) => {
      // Reset state before fetching
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
            body: options.body,
          });
        } else if (options.method === "PUT") {
          response = await fetch(url, {
            ...options,
            headers: {
              'Content-Type': 'application/json',
              ...options.headers, // Allow custom headers
            },
            body: options.body,
          });
        } else if (options.method === "DELETE") {
          response = await fetch(url, {
            ...options,
            headers: {
              'Content-Type': 'application/json',
              ...options.headers, // Allow custom headers
            },
          });
        } else {
          throw new Error("Unsupported HTTP method");
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
      if(!startAutomatically) return;
      fetchData(true);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url, JSON.stringify(options)]);
  
    return { data, loading, error, refetch: () => fetchData(true) };
  };
  
  export default useApi;
  