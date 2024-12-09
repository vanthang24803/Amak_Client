"use client";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Fragment, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import _http from "@/utils/http";
import { updatePasswordValidation } from "@/validations";
import PasswordInput from "@/components/ui/input-password";

export const PasswordDialogDashboard = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  const form = useForm<z.infer<typeof updatePasswordValidation>>({
    resolver: zodResolver(updatePasswordValidation),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof updatePasswordValidation>) {
    const dataSend = {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    };

    try {
      setLoading(true);

      const response = await _http.put(`/Me/Password`, dataSend);

      if (response.status === 200) {
        handleOpen();
        toast.success("Cập nhật thành công!");
        form.reset();
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Fragment>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-20">
            <span className=" text-[12.5px] font-medium dark:text-destructive-foreground tracking-tight">
              Mật khẩu
            </span>
            <span className=" text-[12.5px] font-medium dark:text-destructive-foreground tracking-tight">
              ************
            </span>
          </div>
          <Button
            variant="outline"
            className="dark:bg-neutral-900 text-[12px]"
            onClick={handleOpen}
          >
            Cập nhật
          </Button>
        </div>
      </div>
      <Dialog open={open} onOpenChange={handleOpen}>
        <DialogContent className="md:rounded-lg w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-[16px]">Cập nhật bảo mật</DialogTitle>
          </DialogHeader>
          <CardContent className="md:p-0">
            <Form {...form}>
              <form
                className="flex flex-col gap-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <div className="flex flex-col gap-2">
                  <FormField
                    control={form.control}
                    name="oldPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex flex-col space-y-2">
                            <PasswordInput
                              id="oldPassword"
                              className="md:rounded-md"
                              label="Mật khẩu cũ*"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex flex-col space-y-2">
                            <PasswordInput
                              id="newPassword"
                              className="md:rounded-md"
                              label="Mật khẩu mới*"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex flex-col space-y-2">
                            <PasswordInput
                              id="confirmPassword"
                              className="md:rounded-md"
                              label="Xác nhận mật khẩu*"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex items-center justify-end gap-3">
                  <Button type="button" variant="ghost" onClick={handleOpen}>
                    Thoát
                  </Button>
                  <Button type="submit" disabled={loading} variant="mix">
                    {loading ? (
                      <LoaderCircle className="w-4 h-4 animate-spin" />
                    ) : (
                      "Xác nhận"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};
