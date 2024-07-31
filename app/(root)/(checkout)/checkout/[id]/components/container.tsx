/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import { Order, Response } from "@/types";
import toast from "react-hot-toast";
import _http from "@/utils/http";
import { convertPrice } from "@/utils/price";
import { formatDate } from "date-fns";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/spinner";
import Confetti from "react-confetti";

type Props = {
  id: string;
};

const statusList: { [key: string]: string } = {
  PENDING: "Chờ xác nhận",
  CREATE: "Khởi tạo thành công",
  SHIPPING: "Đơn hàng đang trên đường giao",
  SUCCESS: "Giao hàng thành công",
};

export const Container = ({ id }: Props) => {
  const [data, setData] = useState<Response<Order>>();

  const [showConfetti, setShowConfetti] = useState(false);

  const [error, setError] = useState(false);

  const router = useRouter();

  const onCopy = () => {
    navigator.clipboard.writeText(id);
    toast.success("Mã đơn hàng đã được copy!");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(false);
        const response = await _http.get(`/Orders/${id}`);

        if (response.status == 200) {
          setData(response.data);
          setShowConfetti(true);

          setTimeout(() => {
            setShowConfetti(false);
          }, 5000);
        }
      } catch (error) {
        setError(true);
      }
    };

    fetchData();
  }, [id, router]);
  return (
    <div className="md:w-[500px] w-[360px] py-4 px-6 bg-white/90 rounded-sm  flex flex-col space-y-1">
      {error ? (
        <div className="flex flex-col space-y-4 items-center justify-center">
          <img src="/404.svg" className="w-[200px] my-4" />
          <span className="text-[14px] tracking-tighter text-center font-medium">
            Đơn hàng không đúng hoặc chưa bao giờ tồn tại!
          </span>
          <Button
            variant="primary"
            onClick={() => router.push("/")}
            className="rounded-sm w-full"
          >
            Trang chủ
          </Button>
        </div>
      ) : (
        <>
          <> {showConfetti && <Confetti />}</>
          {data ? (
            <>
              <h1 className="text-xl font-bold text-center uppercase">
                Chúc Mừng
              </h1>
              <span className="text-center text-sm">
                Đơn hàng của bạn đã được đặt thành công!
              </span>
              <div className="flex flex-col space-y-2  pt-4">
                <div className="flex space-x-2">
                  <span>Mã đơn hàng:</span>
                  <span
                    className="font-medium hover:cursor-pointer text-sm md:text-base overflow-auto line-clamp-1"
                    onClick={onCopy}
                  >
                    {id}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>Người đặt hàng:</span>
                  <span className="font-semibold">{data?.result.customer}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>SĐT:</span>
                  <span className="font-semibold">
                    {data?.result.numberPhone}
                  </span>
                </div>
                <div className="flex items-center space-x-2 overflow-hidden">
                  <span>Địa chỉ:</span>
                  <span className="line-clamp-1 font-semibold">
                    {data?.result.address}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <span>Thành tiền:</span>
                  <span className="font-semibold">
                    {convertPrice(data?.result.totalPrice)}₫
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <span>Trạng thái:</span>
                  <span className="font-semibold">
                    {statusList[data?.result.status!]}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <span>Ngày đặt:</span>
                  <span className="font-semibold">
                    {formatDate(data?.result.createAt, "dd-MM-yyyy HH:mm:ss")}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span>Danh sách sản phẩm:</span>
                  <div className="text-sm space-y-1 my-2">
                    {data?.result.orderDetails.map((item, index) => (
                      <p key={index}>
                        - {item.name} - {item.optionName} x{item.quantity}
                      </p>
                    ))}
                  </div>
                </div>

                <Button
                  variant="primary"
                  onClick={() => router.push("/")}
                  className="rounded-sm"
                >
                  Trang chủ
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center">
              <Spinner />
            </div>
          )}
        </>
      )}
    </div>
  );
};
