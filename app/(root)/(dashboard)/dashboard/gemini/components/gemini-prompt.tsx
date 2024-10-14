import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { fetchPrompts } from "@/services/api/prompt";
import { Prompt, PromptType } from "@/types/prompt";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loading } from "../../_components/loading";
import { PromptItem } from "./prompt-item";

export const GeminiPrompt = () => {
  const { data, isLoading, refetch } = useQuery<Prompt[]>({
    queryKey: [`dashboard-prompts`],
    queryFn: () => fetchPrompts(),
  });

  const [select, setSelect] = useState<PromptType>("ANALYTIC_STATISTIC");
  const [filter, setFilter] = useState<Prompt[]>([]);

  useEffect(() => {
    if (data) {
      handleFilter(select);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleFilter = (select: PromptType) => {
    if (data) {
      const filteredData = data.filter((x) => x.type === select);
      setFilter(filteredData);
      console.log(filteredData);
    }
  };

  const getHeader = (type: PromptType) => {
    switch (type) {
      case "ANALYTIC_REVENUE":
        return "Phân tích doanh thu";
      case "ANALYTIC_REVIEW":
        return "Phân tích bình luận";
      case "ANALYTIC_STATISTIC":
        return "Thống kê";
      default:
        "Thống kê";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h2 className="font-semibold tracking-tighter text-base">
            {getHeader(select)}
          </h2>
          <Select
            defaultValue={select}
            onValueChange={(value) => {
              const selectedType = value as PromptType;
              setSelect(selectedType);
              handleFilter(selectedType);
            }}
          >
            <SelectTrigger className="w-[180px] capitalize ">
              <SelectValue placeholder="Select Prompt" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="ANALYTIC_REVENUE">
                  Phân tích doanh thu
                </SelectItem>
                <SelectItem value="ANALYTIC_REVIEW">
                  Phân tích bình luận
                </SelectItem>
                <SelectItem value="ANALYTIC_STATISTIC">Thống kê</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Loading />
        ) : (
          <PromptItem reload={refetch} prompt={filter[0]} />
        )}
      </CardContent>
    </Card>
  );
};
