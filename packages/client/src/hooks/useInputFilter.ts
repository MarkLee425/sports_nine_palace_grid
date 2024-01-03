import axios from "axios";
import { useQuery } from "react-query";

export const useInputFilter = (query: string) => {
  const { VITE_URL, VITE_API_TOKEN }: Record<string, string> = import.meta.env;
  if (!VITE_URL || !VITE_API_TOKEN) return null;

  const fetchFilter = async () => {
    const result = await axios.get("/", {
      params: {
        query,
      },
      headers: {
        "Access-Control-Allow-Origin": [import.meta.env.VITE_URL],
        Authorization: import.meta.env.VITE_API_TOKEN,
      },
    });
    return result.data;
  };

  return useQuery("input_filter", fetchFilter);
};
