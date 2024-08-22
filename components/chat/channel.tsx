"use client";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarImage } from "../ui/avatar";

const mockData = [
  {
    id: "bee9263e-d073-46ff-a008-a341382221bc",
    name: "AI",
    type: "Bot",
    avatar:
      "https://i.pinimg.com/564x/29/f8/e0/29f8e0398171290d487617bf043e89bd.jpg",
  },
  {
    id: "bcc4dd70-d322-4c62-8567-cfc07183c4f8",
    name: "May Nguyen",
    type: "Admin",
    avatar:
      "https://i.pinimg.com/736x/79/b2/28/79b22888729714dc2bd24491a93f90a0.jpg",
  },
];

type Props = {
  handleChannelClick: (id: string) => void;
  active: string | null;
};

export const Channel = ({ handleChannelClick, active }: Props) => {
  return (
    <ScrollArea className="h-[75vh]">
      {mockData.map((item) => (
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
