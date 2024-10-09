"use client";

import { Button } from "@/components/ui/button";
import useClient from "@/hooks/use-client";
import { convertPrice } from "@/utils/price";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Spinner } from "@/components/spinner";
import _http from "@/utils/http";
import { useEffect } from "react";
import { useCart } from "@/hooks/use-cart";

enum EMomoCode {
  Success = 0,
  TimeOut = 45,
  Error = 1006,
}

export const Wrapper = () => {
  const searchParams = useSearchParams();

  const { isClient } = useClient();

  const { clearCart } = useCart();

  const router = useRouter();

  const orderId = searchParams.get("orderId");
  const resultCode = searchParams.get("resultCode");
  const amount = searchParams.get("amount");

  const handlerOrderPayment = async () => {
    try {
      console.log("handlerOrderPayment called");
      const jsonBody = {
        resultCode: Number(resultCode),
        orderId,
      };

      await _http.post(`/Payment/MoMo/Handler`, jsonBody);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handlerOrderPayment();
    if (Number(resultCode) === EMomoCode.Success) {
      clearCart();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isClient)
    return (
      <div className="md:w-[450px] w-[360px] py-4 px-6 bg-white/90 rounded flex items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <div className="md:w-[450px] w-[360px] py-4 px-6 bg-white/90 rounded flex flex-col space-y-4">
      {resultCode === String(EMomoCode.Error) && (
        <div className="flex items-center justify-center flex-col  space-y-4">
          <Image src="/X.svg" width={150} height={150} alt="error" />
          <h2 className="font-bold text-xl">Thanh toán không thành công!</h2>
          <div className="flex justify-start flex-col gap-1 ">
            <h2 className="text-sm">
              Mã đơn hàng: <b>{orderId}</b>
            </h2>
            <span className="text-sm">
              Tổng tiền: <b>{convertPrice(amount)}VND</b>
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full">
            <Button variant="outline" onClick={() => router.push("/")}>
              Trang chủ
            </Button>
            <Button variant="primary" onClick={() => router.push(`/checkout`)}>
              Thử lại
            </Button>
          </div>
        </div>
      )}

      {resultCode === String(EMomoCode.Success) && (
        <div className="flex items-center justify-center flex-col  space-y-4">
          <Image src="/check.png" width={200} height={200} alt="success" />
          <h2 className="font-medium text-xl">Thanh toán thành công!</h2>
          <div className="flex justify-start flex-col gap-1 ">
            <h2 className="text-sm">
              Mã đơn hàng: <b>{orderId}</b>
            </h2>
            <span className="text-sm">
              Tổng tiền: <b>{convertPrice(amount)}VND</b>
            </span>
          </div>
          <div className="grid grid-cols-1 w-full">
            <Button variant="mix" onClick={() => router.push("/")}>
              Trang chủ
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
