"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { FigureItem } from "./figure-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Product } from "@/types";
import { useEffect, useState } from "react";
import _http from "@/utils/http";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export default function Figures() {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await _http.get(`/Products`, {
        params: {
          Category: "Phụ kiện",
          Limit: 10,
        },
      });
      if (response.status === 200) {
        setData(response.data.result);
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
  }, []);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold mx-2 tracking-tighter">
            Phụ kiện
          </CardTitle>
          <Link href="/collections/phu-kien">
            <Button variant="primary" className="rounded-sm h-8 font-semibold">
              Xem thêm
            </Button>
          </Link>
        </div>
      </CardHeader>

      <ScrollArea className="max-h-[30vh] h-auto px-4 pb-4 overflow-auto">
        {loading ? (
          <Skeleton className="w-full h-[28vh]" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-hidden mx-4">
            {data &&
              data.map((item) => <FigureItem key={item.id} data={item} />)}
          </div>
        )}
      </ScrollArea>
    </Card>
  );
}
