"use client";

import * as z from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "../ui/input";
import { useSocket } from "../providers/socket-provider";
import { EmojiPicker } from "./emoji-picker";
import { Uploads } from "./uploads";
import useAuth from "@/hooks/use-auth";

const formSchema = z.object({
  content: z.string().min(1),
});

type Props = {
  channelId: string | null;
};

export const InputChat = ({ channelId }: Props) => {
  const { profile } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const { socket } = useSocket();

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    socket.emit(`message`, {
      ...profile,
      channelId,
      ...value,
    });
    form.reset();
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="absolute bottom-0 w-full px-1"
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative p-4">
                  <Uploads />
                  <Input
                    disabled={isLoading}
                    autoComplete="off"
                    className="px-14 py-6 bg-zinc-100/90 border-none border-0 focus-visible:right-0 focus-visible:ring-offset-0 text-zinc-600 rounded-md"
                    placeholder="Tin nhắn"
                    {...field}
                  />
                  <div className="absolute right-8 top-7 hover:cursor-pointer">
                    <EmojiPicker
                      onChange={(emoji: string) =>
                        field.onChange(`${field.value} ${emoji}`)
                      }
                    />
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </FormProvider>
  );
};
