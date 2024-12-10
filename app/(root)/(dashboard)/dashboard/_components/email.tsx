"use client";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import useAuth from "@/hooks/use-auth";
import { formatTime } from "@/utils/date";
import _http from "@/utils/http";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Mail } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email không được bỏ trống" })
    .email({ message: "Email của bạn không hợp lệ" })
    .max(255, { message: "Email quá dài hãy sử 1 email khác" }),
  code: z.string().min(1, {
    message: "Không được bỏ trống",
  }),
});

export const EmailDialogDashboard = () => {
  const { profile, getProfile } = useAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSend, setIsSend] = useState(false);

  const [countdown, setCountdown] = useState(300);

  const handleOpen = () => {
    setOpen(!open);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: profile?.email ?? "",
      code: "",
    },
  });

  const handleSendCode = async () => {
    const mail = form.watch("email");
    try {
      const response = await _http.post(`/Me/Email`, {
        email: mail,
      });

      if (response.status === 200) {
        setIsSend(true);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra!");
      console.log(error);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSend && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCount) => prevCount - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsSend(false);
      setCountdown(300);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isSend, countdown]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const response = await _http.put(`/Me/Email`, values);

      if (response.status === 200) {
        setLoading(true);
        handleOpen();
        console.log(values);
        getProfile();
        toast.success("Cập nhật thành công!");
        form.setValue("code", "");
        setIsSend(false);
      }

      console.log(values);
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
          <div className="flex items-center gap-24">
            <span className=" text-[12.5px] font-medium dark:text-destructive-foreground tracking-tight">
              Email
            </span>
            <span className=" text-[12.5px] font-medium dark:text-destructive-foreground tracking-tight">
              {profile?.email}
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
        <Separator />
      </div>
      <Dialog open={open} onOpenChange={handleOpen}>
        <DialogContent className="md:rounded-lg w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-[16px]">Cập nhật Email</DialogTitle>
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
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex flex-col space-y-2">
                            <FormLabel>Email</FormLabel>
                            <div className="relative">
                              <Input
                                className="peer pe-9 md:rounded-md"
                                {...field}
                                autoComplete="off"
                                placeholder="mail@example.com"
                              />
                              <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
                                <Mail
                                  size={16}
                                  strokeWidth={2}
                                  aria-hidden="true"
                                />
                              </div>
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex flex-col space-y-2">
                            <FormLabel>Mã xác nhận*</FormLabel>
                            <div className="flex items-center gap-4">
                              <Input
                                autoComplete="off"
                                className="md:rounded-md"
                                {...field}
                              />
                              <Button
                                type="button"
                                disabled={isSend}
                                variant="gooeyLeft"
                                onClick={handleSendCode}
                                className="bg-[#CFC5B6] text-neutral-900 w-[120px]"
                              >
                                {isSend ? formatTime(countdown) : "Gửi mã"}
                              </Button>
                            </div>
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
                  <Button type="submit" variant="mix" disabled={loading}>
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
