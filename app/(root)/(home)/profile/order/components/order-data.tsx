/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Order } from "@/types";
import _http from "@/utils/http";
import { convertPrice } from "@/utils/price";
import { Check, LoaderCircle, Settings, Truck, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ModalReview } from "./review";
import { SettingOrder } from "./settings";
import { useCart } from "@/hooks/use-cart";
import { countDaysDifference } from "@/utils/date";
import { CancelOrder } from "./cancel-order";

type Props = {
  order: Order;
};

export const statusList: { [key: string]: React.ReactNode } = {
  PENDING: (
    <div className="flex items-center space-x-1 font-medium text-neutral-600">
      <LoaderCircle className="w-5 h-5 animate-spin" />
      <p>Đang xử lý</p>
    </div>
  ),
  CREATE: (
    <div className="flex items-center space-x-1 text-yellow-700">
      <Settings className="w-5 h-5" />
      <p>Khởi tạo thành công</p>
    </div>
  ),

  SHIPPING: (
    <div className="flex items-center space-x-1 text-sky-600">
      <Truck className="w-5 h-5" />
      <p>Đang giao hàng</p>
    </div>
  ),

  SUCCESS: (
    <div className="flex items-center space-x-1 text-green-600">
      <Check className="w-5 h-5" />
      <p>Giao hàng thàng công</p>
    </div>
  ),
  CANCEL: (
    <div className="flex items-center space-x-1 text-red-500 font-medium">
      <X className="w-5 h-5" />
      <p>Hủy đơn hàng</p>
    </div>
  ),
  RETURN: (
    <div className="flex items-center space-x-1 text-indigo-700">
      <Settings className="w-5 h-5" />
      <p>Trả hàng</p>
    </div>
  ),
};

export const isWithin15Days = (date: string): boolean => {
  return countDaysDifference(date) <= 15;
};

export const OrderData = ({ order }: Props) => {
  const router = useRouter();

  const { handlerBuyBack } = useCart();

  const buyBack = () => {
    handlerBuyBack(order.orderDetails);
    router.push("/checkout");
  };

  const renderRefundButton = (order: Order) => (
    <Button
      size="sm"
      variant="outline"
      className="rounded-sm"
      onClick={() => router.push(`/tra-hang/${order.id}`)}
    >
      Trả hàng / Hoàn tiền
    </Button>
  );

  const handlerStatusOrder = (order: Order) => {
    switch (order.status) {
      case "SUCCESS":
        return order.isReviewed ? (
          <Button
            size="sm"
            variant="mix"
            className="rounded-sm"
            onClick={() => buyBack}
          >
            Mua lại
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            {isWithin15Days(order.updateAt) && renderRefundButton(order)}
            <ModalReview orderId={order.id} />
          </div>
        );

      case "PENDING":
      case "CREATE":
        return isWithin15Days(order.createAt) && <CancelOrder order={order} />;

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex md:flex-row flex-col md:items-center justify-between space-y-1 md:space-y-0">
        <div className="hidden md:flex items-center lg:space-x-2">
          <h1 className="tracking-tighter font-medium">Mã vận đơn:</h1>
          <span className="font-semibold text-[13px] text-green-700/90">
            {order.id}
          </span>
        </div>
        <div className="flex md:hidden items-center space-x-2 line-clamp-1 w-full">
          <h1 className="basis-1/3 font-semibold">Mã vận đơn</h1>
          <span className="font-semibold text-[13px] text-green-700/90 line-clamp-1">
            {order.id}
          </span>
        </div>
        <div className="flex items-center justify-end md:justify-start space-x-3 text-[12px] font-medium">
          {statusList[order.status]}
          {order.status === "PENDING" && <SettingOrder data={order} />}
        </div>
      </div>
      <Separator className="h-[0.5px] " />
      <div className="flex flex-col space-y-2">
        <div className="flex flex-col space-y-4 my-4">
          {order.orderDetails.map((item) => (
            <Link
              target="_blank"
              href={`/products/${item.productId}`}
              key={item.productId}
            >
              <div className="flex space-x-4">
                <img
                  src={item.thumbnail}
                  alt="thumbnail"
                  className="w-[20%] md:w-[10%] object-cover"
                  onClick={() => router.push(`/products/${item.productId}`)}
                />
                <div className="flex flex-col w-full">
                  <div className="flex items-center justify-between">
                    <span
                      className="font-medium line-clamp-2 text-[12px] md:text-md"
                      onClick={() => router.push(`/products/${item.productId}`)}
                    >
                      {item.name}
                    </span>
                  </div>
                  <span className="text-neutral-400 text-[12px]">
                    {item.optionName}
                  </span>

                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500 ">x{item.quantity}</span>
                    <span className="text-lg font-semibold">
                      {convertPrice(item.price)}₫
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          <div className="flex items-center justify-end text-sm pb-4">
            <div className="flex items-center space-x-3 mt-2">
              {handlerStatusOrder(order)}
              <span>
                Thành tiền:{" "}
                <b className="text-xl font-bold text-[#ee4d2d]">
                  {convertPrice(order.totalPrice)}₫
                </b>
              </span>
            </div>
          </div>
          <Separator />
        </div>
      </div>
    </div>
  );
};
