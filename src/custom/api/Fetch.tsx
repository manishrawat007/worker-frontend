import { useEffect, useState } from "react";

interface FetchApiProps<T, P = undefined, P2 = undefined> {
  request: (params: P, param2?: P2) => Promise<{ data: T }>;
  params?: P;
  payload?: P2;
}

const useFetch = <T, P = undefined, P2 = undefined>({
  request,
  params,
  payload,
}: FetchApiProps<T, P, P2>) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (params !== undefined) {
      fetchDetails()
    }
  }, [params, payload]);

  const fetchDetails = async () => {
    try {
      const response = await request(params as P, payload);
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, setData, reFetch: fetchDetails };
};

export default useFetch;
