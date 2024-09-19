import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CountUp from "react-countup";
import { ReactNode } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";

type Props = {
  title: string;
  icon: ReactNode;
  content: ReactNode;
  percentChange?: number;
  isStock?: boolean;
};

export const CustomCard = ({
  title,
  icon,
  content,
  percentChange,
  isStock,
}: Props) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-[12px] font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        {content}
        {percentChange && percentChange != 0 && (
          <CardDescription
            className={`${
              isStock ? "text-emerald-500" : "text-red-500"
            } text-[12px] mt-2 font-semibold flex items-end gap-1 scroll-m-20 tracking-tighter`}
          >
            <p>{isStock ? "Tăng " : "Giảm "}</p>{" "}
            <>
              {percentChange >= 100 ? (
                <p className="flex items-center space-x-1">
                  <CountUp
                    start={0}
                    duration={1}
                    decimals={1}
                    end={percentChange / 100 + 1}
                  />
                  <p>lần so với tháng trước</p>
                </p>
              ) : (
                <p>
                  <CountUp
                    start={0}
                    duration={1}
                    end={percentChange}
                    decimals={1}
                  />
                  % so với tháng trước
                </p>
              )}
            </>
            {isStock ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
          </CardDescription>
        )}
      </CardContent>
    </Card>
  );
};
