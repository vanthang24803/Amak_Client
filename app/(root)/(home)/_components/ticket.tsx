"use client";

import { Card, CardContent } from "@/components/ui/card";
import { fetchTickets } from "@/services/api/ticket";
import { Ticket as TicketType } from "@/types";
import { TicketCheck, TicketX } from "lucide-react";
import useSWR from "swr";
import { format } from "date-fns";
import toast from "react-hot-toast";

type Props = {
  ticket: TicketType;
};

export const Ticket = () => {
  const { data } = useSWR(`/Tickets`, fetchTickets);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-base md:text-lg font-bold text-primary">
        Khuyến mãi dành cho bạn
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data &&
          data.map((ticket) => <TicketItem ticket={ticket} key={ticket.id} />)}
      </div>
    </div>
  );
};

const TicketItem = ({ ticket }: Props) => {
  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Đã sao chép mã giảm giá");
  };
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
      <CardContent className="p-0">
        <div className="flex items-stretch h-[140px]">
          <div
            className={`${ticket.quantity === 0 ? "bg-red-600/80" : "bg-green-500/80"} w-1/3  text-primary-foreground p-4 flex items-center justify-center`}
          >
            {ticket.quantity === 0 ? (
              <TicketX size={36} />
            ) : (
              <TicketCheck size={36} />
            )}
          </div>
          <div className="w-2/3 p-4 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-primary tracking-tighter">
                {ticket.name}
              </h3>
              <div className="flex items-center gap-3">
                <span className="text-[12px] text-muted-foreground">
                  Mã:{" "}
                  <span className="font-semibold text-foreground">
                    {ticket.code}
                  </span>
                </span>
                <p>-</p>
                {ticket.quantity !== 0 ? (
                  <span className="text-[12px] text-muted-foreground">
                    Còn lại:{" "}
                    <span className="font-semibold text-foreground">
                      {ticket.quantity}
                    </span>{" "}
                    cái
                  </span>
                ) : (
                  <span className="text-[12px] text-muted-foreground">Hết</span>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-[12px] text-muted-foreground">
                HSD:{" "}
                <span className="font-semibold text-foreground">
                  {format(ticket.endDate, "dd/MM/yyyy")}
                </span>
              </div>
              {ticket.quantity !== 0 && (
                <button
                  className="rounded-2xl bg-green-600 flex items-center justify-center text-white uppercase text-[10px] py-1.5 px-4 font-semibold"
                  onClick={() => handleCopy(ticket.code)}
                >
                  Sao chép mã
                </button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
