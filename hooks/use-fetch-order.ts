import { Order, Pagination } from "@/types";
import _http from "@/utils/http";
import { useEffect, useState } from "react";

export default function useFetchOrder() {
  const [select, setSelect] = useState("All");
  const [loading, setLoading] = useState(false);
  const [_, setCurrentPage] = useState(1);

  const [data, setData] = useState<Pagination<Order[]>>();

  const fetchData = async (page: number = 1) => {
    try {
      setLoading(true);
      const response = await _http.get(`/Orders`, {
        params: {
          Limit: 3,
          Page: page,
          OrderBy: select,
        },
      });
      if (response.status === 200) {
        setData(response.data);
        setCurrentPage(page);
      }
    } catch (e: any) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [select]);

  return { setSelect, loading, data, fetchData, select };
}
