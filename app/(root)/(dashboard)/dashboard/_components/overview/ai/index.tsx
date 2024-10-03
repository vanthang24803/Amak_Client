"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { fetchAnalytic } from "@/services/api/overview";
import { AnalyticStatistic } from "@/types/statistic";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { Loader } from "lucide-react";
import _http from "@/utils/http";
import { AIResponse } from "@/types/ai-response";
import { Button } from "@/components/ui/button";
import { marked } from "marked";
import { ScrollArea } from "@/components/ui/scroll-area";

export const AiDialogDashboard = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const handleToggle = () => setOpen(!open);

  const { data: prompt } = useQuery<AnalyticStatistic>({
    queryKey: ["dashboard-analytic-statistic"],
    queryFn: fetchAnalytic,
    staleTime: 1000 * 60 * 5,
  });

  const fetchAIAnalytic = async (jsonSend: AnalyticStatistic) => {
    try {
      setLoading(true);

      const response = await _http.post<AIResponse>(`/AI/Statistic`, {
        prompt: jsonSend,
      });

      if (response.status === 200) {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchAgain = () => {
    if (prompt) {
      fetchAIAnalytic(prompt);
    }
  };

  useEffect(() => {
    if (prompt) {
      fetchAIAnalytic(prompt);
    }
  }, [prompt]);

  return (
    <Fragment>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className="fixed bottom-10 right-10 z-50"
              onClick={handleToggle}
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:cursor-pointer">
                <Image
                  src="/ai-tech.png"
                  alt="ai"
                  width={20}
                  height={20}
                  className=" hover:scale-110 transition ease-in-out"
                />
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent side="left">
            <span className="text-[12px] tracking-tighter">
              Thống kê bằng AI
            </span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Sheet open={open} onOpenChange={handleToggle}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Thống kê với AI</SheetTitle>
            <SheetDescription className="text-[13px]">
              Thống kê tổng quát dữ liệu cửa hàng
            </SheetDescription>
          </SheetHeader>
          <div className="my-4">
            {loading ? (
              <div className="flex items-center h-[75vh] justify-center">
                <div className="flex flex-col gap-2 items-center justify-center">
                  <Loader className="w-4 h-4 animate-spin" />
                  <span className="text-[12px] font-medium tracking-tighter text-muted-foreground">
                    Đang xử lý vui lòng chờ đợi
                  </span>
                </div>
              </div>
            ) : (
              <ScrollArea className="text-[12px] h-[75vh]">
                <div dangerouslySetInnerHTML={{ __html: marked(message) }} />
              </ScrollArea>
            )}
          </div>
          <SheetFooter>
            <SheetClose>
              <Button className="h-8 text-[12px]" variant="outline">
                Thoát
              </Button>
            </SheetClose>
            <Button
              disabled={loading}
              onClick={handleFetchAgain}
              className="h-8 text-[12px]"
              variant="mix"
            >
              Thống kê lại
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};
