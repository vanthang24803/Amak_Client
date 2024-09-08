"use client";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarImage } from "../ui/avatar";
import { AdminChat } from "@/types/admin-chat";
import useAuth from "@/hooks/use-auth";

type Props = {
  handleChannelClick: (id: string) => void;
  active: string | null;
  data: AdminChat[];
};

export const Channel = ({ handleChannelClick, active, data }: Props) => {
  const { profile } = useAuth();

  const channelFilter = data.filter((x) => x.id != profile?.id);

  return (
    <ScrollArea className="h-[75vh]">
      {channelFilter.map((item) => (
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
              <AvatarImage src={item.avatar} />
            </Avatar>
            <div className="flex flex-col">
              <p className="font-medium text-[12px] tracking-tight">
                {item.name}
              </p>
              <span className="text-[11px] italic w-[100px] whitespace-nowrap overflow-hidden text-ellipsis">
                {item.lastMessage}
              </span>
            </div>
          </div>
        </div>
      ))}
    </ScrollArea>
  );
};
