"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { AvatarFallback, AvatarImage, Avatar } from "@/components/ui/avatar";

import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import useAuth from "@/hooks/use-auth";
import toast from "react-hot-toast";
import _http from "@/utils/http";

export const AvatarProfile = () => {
  const { profile, getProfile } = useAuth();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [avatar, setAvatar] = useState(profile?.avatar);

  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handlerOpen = () => {
    setOpen(!open);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatar(url);
    }
  };

  const onSubmit = async () => {
    const formData = new FormData();
    if (fileInputRef.current?.files?.length) {
      formData.append("avatar", fileInputRef.current.files[0]);
    }

    try {
      setLoading(true);
      toast.loading("Đang xử lý...", {
        className: "text-[14px] tracking  tracking-tighter",
      });
      const response = await _http.post(`/Me/Avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        getProfile();
        handlerOpen();
        toast.dismiss();
        toast.success("Cập nhập avatar thành công!", {
          className: "text-[14px] tracking  tracking-tighter",
        });
      }
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error("Có lỗi xảy ra", {
        className: "text-[14px] tracking  tracking-tighter",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handlerOpen}>
      <DialogTrigger asChild>
        <Avatar className="w-24 h-24 md:w-40 md:h-40 hover:cursor-pointer">
          <AvatarImage src={profile?.avatar} />
          <AvatarFallback>{profile?.lastName[0].toUpperCase()}</AvatarFallback>
        </Avatar>
      </DialogTrigger>
      <DialogContent className="w-[320px] md:w-[500px]">
        <DialogHeader>
          <DialogTitle className="tracking-tighter font-bold">
            Cập nhật ảnh đại diện
          </DialogTitle>
          <DialogDescription className="text-[11px] font-medium w-full md:w-3/4 ">
            Thực hiện thay đổi cho ảnh đại của bạn tại đây. Nhấp vào lưu khi bạn
            hoàn tất.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4 items-center justify-center">
          <Avatar className="w-36 h-36" onClick={handleAvatarClick}>
            <AvatarImage src={avatar} />
            <AvatarFallback>
              {profile?.lastName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <Input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
        <DialogFooter>
          <Button
            type="submit"
            variant="primary"
            className="text-[13px] rounded-sm"
            onClick={onSubmit}
            disabled={loading || profile?.avatar == avatar}
          >
            Cập nhật
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
