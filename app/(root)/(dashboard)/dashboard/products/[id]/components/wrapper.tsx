"use client";

import { ProductDetail, Response } from "@/types";
import { useEffect, useState } from "react";
import { Loading } from "../../../_components/loading";
import _http from "@/utils/http";
import { ProductAttribute as Attribute } from "./attribute";
import Link from "next/link";
import { MoveLeft } from "lucide-react";
import { Thumbnail } from "./thumbnail";
import { Media } from "./media";

type Props = {
  id: string;
};

export const Wrapper = ({ id }: Props) => {
  const [data, setData] = useState<Response<ProductDetail>>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchDetailProduct = async () => {
    try {
      setLoading(true);
      const response = await _http.get(`/Products/${id}`);

      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetailProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-screen-xl p-4 flex flex-col gap-4">
        <Link
          href="/dashboard/products"
          className="text-neutral-500 flex items-center space-x-1 font-medium scroll-m-20 text-[12px] hover:text-neutral-600 group"
        >
          <MoveLeft className="w-4 h-4 group-hover:-translate-x-1 transition ease-in-out" />
          <p>Quay lại</p>
        </Link>
        <div className="w-full flex justify-between gap-x-8">
          <div className="w-2/3 flex flex-col gap-4">
            <Attribute product={data?.result} />
          </div>
          <div className="w-1/3 flex flex-col gap-4">
            <Thumbnail product={data?.result} />
            <Media product={data?.result} />
          </div>
        </div>
      </div>
    </div>
  );
};
