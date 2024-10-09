import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Inter } from "next/font/google";
import Image from "next/image";
import { OrderData } from "./order-data";
import { Spinner } from "@/components/spinner";
import PaginationComponent from "@/components/pagination";
import useFetchOrder from "@/hooks/use-fetch-order";
import { Fragment } from "react";

const font = Inter({
  weight: "400",
  subsets: ["latin"],
});

export const Render = () => {
  const { data, loading, select, setSelect, setCurrentPage } = useFetchOrder();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Tabs
      defaultValue={select}
      onValueChange={(value) => setSelect(value)}
      className={`w-full ${font.className}`}
    >
      <TabsList className="md:grid hidden w-full grid-cols-7">
        <TabsTrigger value="All">Tất cả</TabsTrigger>
        <TabsTrigger value="Pending">Đang xử lý</TabsTrigger>
        <TabsTrigger value="Create">Xác nhận</TabsTrigger>
        <TabsTrigger value="Shipping">Đang giao hàng</TabsTrigger>
        <TabsTrigger value="Success">Hoàn thành</TabsTrigger>
        <TabsTrigger value="Cancel">Đã hủy</TabsTrigger>
        <TabsTrigger value="Return">Trả hàng</TabsTrigger>
      </TabsList>

      <TabsContent value={select}>
        {loading ? (
          <div className="flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <Fragment>
            {data && data.result.length > 0 ? (
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col space-y-2 pt-3">
                  {data.result.map((item) => (
                    <OrderData key={item.id} order={item} />
                  ))}
                </div>
                <PaginationComponent
                  currentPage={data._currentPage}
                  totalPage={data._totalPage}
                  onPageChange={handlePageChange}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center flex-col space-y-2 w-full min-h-[30vh]">
                <Image
                  src="https://frontend.tikicdn.com/_desktop-next/static/img/account/empty-order.png"
                  alt="cart"
                  width={120}
                  height={120}
                />
                <p className="tracking-tighter text-[14px]">
                  Chưa có đơn hàng!
                </p>
              </div>
            )}
          </Fragment>
        )}
      </TabsContent>
    </Tabs>
  );
};
