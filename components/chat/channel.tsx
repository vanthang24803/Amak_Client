"use client";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Channel as Type } from "@/types/channel";

type Props = {
  handleChannelClick: (id: string) => void;
  active: string | null;
  data: Type[];
};

export const Channel = ({ handleChannelClick, active, data }: Props) => {
  return (
    <ScrollArea className="h-[75vh]">
      {data.map((item) => (
        <div
          className="flex flex-col space-y-4 hover:cursor-pointer"
          onClick={() => handleChannelClick(item.id)}
          key={item.id}
        >
          <div
            className={`flex items-center space-x-3 px-4 py-2 mr-2 ${
              active === item.id && "rounded-md bg-neutral-100/90"
            }`}
          >
            <Avatar className="w-12 h-12">
              <AvatarImage src={item.thumbnail} />
            </Avatar>
            <div className="flex flex-col">
              <p className="font-medium text-sm">{item.name}</p>
              <span className="text-[11px] italic w-[100px] whitespace-nowrap overflow-hidden text-ellipsis">
                Something...
              </span>
            </div>
          </div>
        </div>
      ))}
    </ScrollArea>
  );
};
