import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { getDetailAccount } from "@/services/api/account";
import { convertPrice } from "@/utils/price";
import { Loading } from "../../_components/loading";
import { statusRank, statusRankIcon } from "@/constants";
import Image from "next/image";
import { formatStringToDate } from "@/utils/date";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import useSWR from "swr";

type Props = {
  open: boolean;
  handleToggle: () => void;
  id: string;
  isAdmin: boolean;
};

export const ProfileInfo = ({ open, handleToggle, id, isAdmin }: Props) => {
  const {
    data: profile,
    error,
    isLoading,
  } = useSWR(id ? `/Analytic/Accounts/${id}` : null, () =>
    getDetailAccount(id),
  );

  if (error) console.log(error);

  const onHandleBan = () => {
    toast.error("Handle Ban");
  };

  const onHandleUpdate = () => {
    toast.success("Update");
  };

  return (
    <Dialog open={open} onOpenChange={handleToggle}>
      <DialogContent className="w-[750px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Thông tin tài khoản
          </DialogTitle>
          <DialogDescription className="text-[13px] tracking-tight">
            Các thông tin chi tiết về tài khoản
          </DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex-1 flex items-center justify-between">
              <h2 className="text-[14px] tracking-tighter font-semibold w-1/3">
                Tài khoản
              </h2>
              <div className="w-2/3 flex items-center space-x-3">
                <Avatar>
                  <AvatarImage
                    src={profile?.avatar}
                    alt={`${profile?.firstName} ${profile?.lastName}`}
                  />
                </Avatar>
                <div className="flex items-center space-x-2">
                  <h3 className="text-sm tracking-tighter font-medium">
                    {profile?.firstName} {profile?.lastName}
                  </h3>
                  <Image
                    src={isAdmin ? "/verify.png" : "/check.png"}
                    alt="check"
                    width={16}
                    height={16}
                  />
                </div>
              </div>
            </div>
            <Separator className="h-[0.1px] dark:bg-neutral-600 bg-slate-200 my-1" />

            <div className="flex-1 flex items-center justify-between">
              <h2 className="text-[14px] tracking-tighter font-semibold w-1/3">
                Email
              </h2>
              <h3 className="w-2/3 tracking-tighter line-clamp-1 text-[13px] font-medium">
                {profile?.email}
              </h3>
            </div>

            <Separator className="h-[0.1px] dark:bg-neutral-600 bg-slate-200 my-1" />

            <div className="flex-1 flex items-center justify-between">
              <h2 className="text-[14px] tracking-tighter font-semibold w-1/3">
                Số điện thoại
              </h2>
              <h3 className="w-2/3 tracking-tighter line-clamp-1 text-[13px] font-medium">
                {profile?.numberPhone ?? "Trống"}
              </h3>
            </div>

            <Separator className="h-[0.1px] dark:bg-neutral-600 bg-slate-200 my-1" />

            <div className="flex-1 flex items-center justify-between">
              <h2 className="text-[14px] tracking-tighter font-semibold w-1/3">
                Địa chỉ
              </h2>
              <div className="w-2/3 flex flex-col">
                {profile && profile?.addresses.length > 0 ? (
                  <>
                    {profile?.addresses.map((item) => (
                      <p
                        key={item.id}
                        className="text-[12.5px] tracking-tighter font-medium flex-1"
                      >
                        - {item.addressName}
                      </p>
                    ))}
                  </>
                ) : (
                  <p className="text-[13px] tracking-tighter font-medium flex-1">
                    Trống
                  </p>
                )}
              </div>
            </div>

            <Separator className="h-[0.1px] dark:bg-neutral-600 bg-slate-200 my-1" />

            <div className="flex-1 flex items-center justify-between">
              <h2 className="text-[14px] tracking-tighter font-semibold w-1/3">
                Hạng
              </h2>
              {profile && profile.rank ? (
                <div className="flex items-center space-x-2 w-2/3 flex-1">
                  <Image
                    src={statusRankIcon[profile.rank]}
                    alt="icon-rank"
                    width={20}
                    height={20}
                  />
                  <p className="text-[13px] tracking-tighter font-medium flex-1">
                    {statusRank[profile.rank]}
                  </p>
                </div>
              ) : (
                <p className="text-[13px] tracking-tighter font-medium flex-1">
                  Trống
                </p>
              )}
            </div>

            <Separator className="h-[0.1px] dark:bg-neutral-600 bg-slate-200 my-1" />

            <div className="flex-1 flex items-center justify-between">
              <h2 className="text-[14px] tracking-tighter font-semibold w-1/3">
                Số đơn hàng đã mua
              </h2>
              <h3 className="w-2/3 tracking-tighter line-clamp-1 text-[13px] font-medium">
                {profile?.totalOrder} đơn hàng
              </h3>
            </div>

            <Separator className="h-[0.1px] dark:bg-neutral-600 bg-slate-200 my-1" />

            <div className="flex-1 flex items-center justify-between">
              <h2 className="text-[14px] tracking-tighter font-semibold w-1/3">
                Số tiền đã thanh toán
              </h2>
              <h3 className="w-2/3 tracking-tighter line-clamp-1 text-[13px] font-medium">
                {convertPrice(profile?.totalPrice)} VND
              </h3>
            </div>

            <Separator className="h-[0.1px] dark:bg-neutral-600 bg-slate-200 my-1" />

            <div className="flex-1 flex items-center justify-between">
              <h2 className="text-[14px] tracking-tighter font-semibold w-1/3">
                Thời gian khởi tạo
              </h2>
              <h3 className="w-2/3 tracking-tighter line-clamp-1 text-[13px] font-medium">
                {formatStringToDate(profile?.createAt || "")}
              </h3>
            </div>

            <Separator className="h-[0.1px] dark:bg-neutral-600 bg-slate-200 my-1" />

            <div className="flex-1 flex items-center justify-between">
              <h2 className="text-[14px] tracking-tighter font-semibold w-1/3">
                Cập nhật mới nhất
              </h2>
              <h3 className="w-2/3 tracking-tighter line-clamp-1 text-[13px] font-medium">
                {formatStringToDate(profile?.updateAt || "")}
              </h3>
            </div>
          </div>
        )}
        <DialogFooter>
          <Button
            className="h-8 text-[12px]"
            variant="destructive"
            disabled={isAdmin}
            onClick={onHandleBan}
          >
            Vô hiệu hóa
          </Button>
          <DialogClose>
            <Button
              className="h-8 text-[12px] flex items-center space-x-3"
              variant="outline"
            >
              Thoát
            </Button>
          </DialogClose>
          <Button
            className="h-8 text-[12px]"
            variant="mix"
            onClick={onHandleUpdate}
          >
            Cập nhật
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
