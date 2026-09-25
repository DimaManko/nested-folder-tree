import { useState } from "react";

export function useHttp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = async (
    url,
    method = "GET",
    headers = { "Content-Type": "application/json" },
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, { method, headers });

      if (!response.ok) {
        throw new Error(
          `Ошибка запроса по адресу ${url}, статус: ${response.status}`,
        );
      }

      const data = await response.json();
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      setError(error.message);
      throw error;
    }
  };

  return { loading, error, request };
}
