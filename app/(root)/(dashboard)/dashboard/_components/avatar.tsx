"use client";

import { toast } from "sonner";
import _http from "@/utils/http";
import useAuth from "@/hooks/use-auth";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChangeEvent, useRef, useState } from "react";
import { AvatarImage, Avatar } from "@/components/ui/avatar";

export const AvatarDashboardDialog = () => {
  const { profile, getProfile } = useAuth();
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadAvatar = async (file: File): Promise<void> => {
    if (!file) return;

    setLoading(true);
    try {
      const formData = new FormData();
      if (fileInputRef.current?.files?.length) {
        formData.append("avatar", fileInputRef.current.files[0]);
      }

      const response = await _http.post(`/Me/Avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        getProfile();
        toast.success("Cập nhật avatar thành công!");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra!");
      console.error("Upload failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      handleUploadAvatar(file);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-24">
          <span className=" text-[12.5px] font-medium dark:text-destructive-foreground tracking-tight">
            Avatar
          </span>
          <Avatar>
            <AvatarImage
              src={profile?.avatar}
              className="hover:cursor-pointer"
            />
          </Avatar>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
          accept="image/*"
        />
        <Button
          variant="outline"
          className="dark:bg-neutral-900 text-[12px]"
          disabled={loading}
          onClick={handleButtonClick}
        >
          {loading ? (
            <LoaderCircle className="w-4 h-4 animate-spin" />
          ) : (
            "Cập nhật"
          )}
        </Button>
      </div>
      <Separator />
    </div>
  );
};
