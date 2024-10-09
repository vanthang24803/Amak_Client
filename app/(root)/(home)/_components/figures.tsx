"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { FigureItem } from "./figure-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Pagination, Product } from "@/types";
import _http from "@/utils/http";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import useSWR from "swr";

const fetcher = (url: string, params: any) =>
  _http.get(url, { params }).then((res) => res.data);

export default function Figures() {
  const { data, error, isLoading } = useSWR<Pagination<Product[]>>(
    ["/Products", { Category: "Phụ kiện", Limit: 10 }],
    ([url, params]) => fetcher(url, params)
  );

  if (error) {
    console.log(error);
  }

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
        {isLoading ? (
          <Skeleton className="w-full h-[28vh]" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-hidden mx-4">
            {data &&
              data.result.map((item) => (
                <FigureItem key={item.id} data={item} />
              ))}
          </div>
        )}
      </ScrollArea>
    </Card>
  );
}
