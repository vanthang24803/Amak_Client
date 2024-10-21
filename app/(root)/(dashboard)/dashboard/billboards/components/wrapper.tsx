/* eslint-disable @next/next/no-img-element */
"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CreateBillboard } from "./create-billboard";
import { fetchBillboards } from "@/services/api/billboard";
import { Loading } from "../../_components/loading";
import { X } from "lucide-react";
import { Fragment, useState } from "react";
import { toast } from "sonner";
import _http from "@/utils/http";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import useSWR, { mutate } from "swr";

export const Wrapper = () => {
  const [loading, setLoading] = useState(false);

  const { data, isLoading } = useSWR("/Billboards", fetchBillboards);

  const onConfirm = (id: string) => {
    try {
      setLoading(true);
      const handleUpdate = _http.delete(`/Billboards/${id}`);

      toast.promise(handleUpdate, {
        loading: "Đang xử lý...",
        success: () => {
          mutate(`/Billboards`);
          return "Xóa ảnh thành công!";
        },
        error: () => "Có lỗi xảy ra",
      });
    } catch (error) {
      console.log("Error uploading photos:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <div className="flex items-center justify-center">
        <Card className="m-4 mb-20 flex-1 max-w-screen-xl">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <h2 className="scroll-m-20 text-base font-semibold tracking-tight">
                Danh sách quảng cáo
              </h2>
              <CreateBillboard />
            </div>
            <Separator className="h-[0.1px] bg-neutral-200" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Loading />
            ) : (
              <div className="grid grid-cols-4 gap-4">
                {data?.map((item) => (
                  <div className="relative" key={item.id}>
                    <img
                      alt="billboard"
                      src={item.thumbnail}
                      className="rounded-md"
                    />
                    <div className="absolute top-2 right-2">
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <X className="text-muted-foreground w-5 h-5 cursor-pointer hover:scale-110 transition-all" />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Bạn có chắc muốn xóa không?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Hành đọng này không thể khôi phục lại
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Thoát</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => onConfirm(item.id)}
                            >
                              Xác nhận
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Fragment>
  );
};
