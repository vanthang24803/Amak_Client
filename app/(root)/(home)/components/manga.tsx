/* eslint-disable @next/next/no-img-element */
'use client';

import { Button } from '@/components/ui/button';
import { Product } from '@/types/product';
import { Products } from './products';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import _http from '@/utils/http';
import { Category } from '@/utils/category';

export const Manga = () => {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await _http.get(`/Products`, {
        params: {
          Category: Category.Manga,
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

  const router = useRouter();

  return (
    <div className="flex flex-col space-y-4 py-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold mx-2 tracking-tighter">
          Truyện tranh
        </h2>
        <Button
          className="bg-[#417505] text-white font-medium  hover:bg-[#65b10d] h-8 rounded-sm"
          onClick={() => router.push(`/collections/manga-comic`)}
        >
          Manga-Commic
        </Button>
      </div>

      <div className="flex flex-col space-y-4">
        <Products products={data || []} isLoading={loading} />
        <div className="flex items-center justify-center">
          <Button
            variant="outline"
            className="px-20 hover:text-white hover:bg-[#65b10d] font-medium"
            onClick={() => router.push(`/collections/manga-comic`)}
          >
            Xem tất cả
          </Button>
        </div>
      </div>
    </div>
  );
};
