"use client";

import { Inter } from "next/font/google";
import { Reason } from "./reason";
import useSWR from "swr";
import _http from "@/utils/http";
import { Order } from "@/types";
import {
  isWithin15Days,
  OrderData,
} from "../../../profile/order/components/order-data";
import { ListProducts } from "./list-products";
import { RefundForm } from "./refund-form";
import { ConfirmRefund } from "./confirm";
import { useRouter } from "next/navigation";

type Props = {
  id: string | undefined;
};

const font = Inter({ subsets: ["latin"] });

const fetcher = (url: string) => _http.get(url).then((res) => res.data.result);

export const Wrapper = ({ id }: Props) => {
  const router = useRouter();

  const { data, error, isLoading } = useSWR<Order>(
    () => `/Orders/Me/${id}`,
    fetcher,
    {
      revalidateOnFocus: false,
    },
  );

  if (error) {
    return <p>{error}</p>;
  }

  // if (data && isWithin15Days(data.createAt)) {
  //   router.back();
  // }

  return (
    <div
      className={`flex items-center justify-center mx-auto max-w-screen-xl  ${font.className}`}
    >
      <div className="flex flex-col gap-2 md:gap-4 lg:gap-6 m-2 md:m-4 lg:m-6 w-full">
        <Reason />
        {data && <ListProducts order={data} />}
        <RefundForm />
        {data && <ConfirmRefund order={data} />}
      </div>
    </div>
  );
};
