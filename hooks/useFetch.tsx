import { useEffect, useState } from "react";
import axios from "axios";

export const useFetch = (url: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(url);
      setData(result.data);
      setLoading(false);
    };
    fetchData();
  }, [url]);

  return { randomData: data, isLoading: loading };
};
