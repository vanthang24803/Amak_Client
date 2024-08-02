import _http from "@/utils/http";
import { useEffect, useState } from "react";

type Props = {
  url: string;
};

export default function useFetch<T>({ url }: Props) {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await _http.get(url);
      if (response.status === 200) {
        setData(response.data.result);
      }
    } catch (e: any) {
      setError(e);
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    loading,
    data,
    error,
  };
}
