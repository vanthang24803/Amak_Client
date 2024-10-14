"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Prompt } from "@/types/prompt";
import _http from "@/utils/http";
import { PromptSchema, validatePrompt } from "@/validations/prompt";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

type Props = {
  prompt: Prompt | undefined;
  reload: () => void;
};

export const PromptItem = ({ prompt, reload }: Props) => {
  const [isUpdate, setIsUpdate] = useState(false);

  const form = useForm({
    resolver: zodResolver(validatePrompt),
    defaultValues: {
      prompt: prompt?.context || "",
    },
  });

  useEffect(() => {
    if (prompt) {
      form.setValue("prompt", prompt.context);
    }
  }, [prompt, form]);

  const onSubmit = (data: PromptSchema) => {
    const jsonSend = {
      ...prompt,
      context: data.prompt,
    };

    try {
      setIsUpdate(true);

      const handleUpdate = _http.put(`/Prompts/${prompt?.id}`, jsonSend);

      toast.promise(handleUpdate, {
        loading: "Đang xử lý...",
        success: () => {
          reload();
          return "Cập nhật thành công!";
        },
        error: () => "Oops!",
      });
    } catch (error) {
      console.log("Error updating:", error);
    } finally {
      setIsUpdate(false);
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="prompt"
          disabled={isUpdate}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea className="h-[50vh]" cols={50} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button className="h-8" variant="mix" disabled={isUpdate}>
            {isUpdate ? (
              <div className="flex items-center gap-2">
                <Loader className="w-4 h-4 animate-spin" />
                <p>Đang cập nhật</p>
              </div>
            ) : (
              "Xác nhận"
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
