/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import {
  DialogTrigger,
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Check, Copy } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import copy from "clipboard-copy";
import toast from "react-hot-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Spinner } from "@/components/spinner";
import { convertPrice } from "@/utils/price";

type PaymentType = "cod" | "bank" | "momo";

interface PaymentTypeProp {
  payment: PaymentType | null;
  handleBankChange: (paymentType: PaymentType) => void;
  finalPrice: number;
}

export const Payment = ({
  payment,
  handleBankChange,
  finalPrice,
}: PaymentTypeProp) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDialogChange = (open: boolean) => {
    setIsDialogOpen(open);
    setIsActive(false);
    if (!open && !isActive) {
      handleBankChange("cod");
    }
    if (open) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  const handleCopy = (text: string) => {
    copy(text);
    toast.success("Đã copy vào clipboard");
  };

  const id = uuidv4();
  const orderId = uuidv4().substr(0, 6).toUpperCase();

  return (
    <>
      <span className="font-bold text-lg">Phương thức thanh toán</span>
      <div className="w-full rounded-md border border-neutral-200 p-4 flex flex-col space-y-2 hover:cursor-pointer">
        <div
          className="flex items-center justify-between"
          onClick={() => handleBankChange("cod")}
        >
          <div className="flex items-center space-x-2">
            <img src="/shipment.png" alt="icon-cod" className="w-10 h-10" />
            <Label htmlFor="cod">Thanh toán khi giao hàng (COD)</Label>
          </div>
          {payment === "cod" && (
            <Check className="w-5 h-5 text-green-600 font-bold" />
          )}
        </div>
        <Separator />

        <Dialog onOpenChange={handleDialogChange}>
          <DialogTrigger>
            <div
              className="flex items-center justify-between"
              onClick={() => handleBankChange("bank")}
            >
              <div className="flex items-center space-x-2">
                <img src="/mbbank.png" alt="icon-mb-bank" className="w-8 h-8" />
                <Label htmlFor="bank">Chuyển khoản qua ngân hàng</Label>
              </div>
              {payment === "bank" && (
                <Check className="w-5 h-5 text-green-600 font-bold" />
              )}
            </div>
          </DialogTrigger>
          <DialogContent className="md:max-w-3xl">
            {loading ? (
              <div className="flex items-center justify-center h-[420px]">
                <Spinner />
              </div>
            ) : (
              <ScrollArea className="h-[500px] md:h-[420px]">
                <div className="text-xs text-center my-8">
                  <DialogTitle>
                    Mở App Ngân hàng bất kỳ <b>để quét mã VietQR</b> hoặc{" "}
                    <b>chuyển khoản</b> chính xác số tiền bên dưới
                  </DialogTitle>
                </div>
                <div className="flex md:flex-row flex-col items-start space-x-12">
                  <div className="md:basis-1/2">
                    <img
                      src={process.env.NEXT_PUBLIC_QR_IMAGE}
                      alt="qr"
                      loading="lazy"
                    />
                  </div>
                  <div className="md:basis-1/2 flex-col space-y-3">
                    <div className="flex items-center space-x-2">
                      <img
                        src="/mbbank.png"
                        alt="mbbank"
                        className="w-10 h-10"
                      />
                      <div className="flex flex-col">
                        <p className="text-xs">Ngân hàng</p>
                        <b className="text-sm">Ngân hàng TMCP Quân đội</b>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-xs">Chủ tài khoản:</p>
                      <b className="text-sm uppercase">AMAK Store</b>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-xs">Số tài khoản:</p>
                      <div className="flex items-center justify-between">
                        <b className="text-sm">{id}</b>
                        <Copy
                          className="w-4 h-4 hover:cursor-pointer"
                          onClick={() => handleCopy(id)}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-xs">Số tiền:</p>
                      <div className="flex items-center justify-between">
                        <b className="text-sm">
                          {convertPrice(finalPrice)} vnd
                        </b>
                        <Copy
                          className="w-4 h-4 hover:cursor-pointer"
                          onClick={() => handleCopy(String(finalPrice))}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-xs">Nội dung:</p>
                      <div className="flex items-center justify-between">
                        <b className="text-sm max-w-[85%]">
                          {orderId} - Thanh toan don hang -{" "}
                          {format(Date.now(), "dd/MM/yyyy")}
                        </b>
                        <Copy
                          className="w-4 h-4 hover:cursor-pointer"
                          onClick={() =>
                            handleCopy(
                              `${orderId} - Thanh toan don hang - ${format(
                                Date.now(),
                                "dd/MM/yyyy"
                              )}`
                            )
                          }
                        />
                      </div>
                    </div>

                    <p className="pt-6 text-xs">
                      Lưu ý: Nhập chính xác số tiền{" "}
                      <b>{convertPrice(finalPrice)}</b> khi chuyển khoản, hãy
                      chụp và lưu giữ lại hóa đơn chuyển khoản nếu xảy ra vấn
                      đề.{" "}
                      <DialogClose>
                        <b
                          className="hover:cursor-pointer hover:underline"
                          onClick={() => setIsActive(true)}
                        >
                          Xác nhận
                        </b>
                      </DialogClose>
                    </p>
                  </div>
                </div>
              </ScrollArea>
            )}
          </DialogContent>
        </Dialog>
        <Separator />

        <div
          className="flex items-center justify-between"
          onClick={() => handleBankChange("momo")}
        >
          <div className="flex items-center space-x-2">
            <img src="/momo.webp" alt="icon-momo" className="w-10 h-10" />
            <Label htmlFor="momo">Ví MoMo</Label>
          </div>
          {payment === "momo" && (
            <Check className="w-5 h-5 text-green-600 font-bold" />
          )}
        </div>
      </div>
    </>
  );
};
