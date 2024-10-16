/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserAnalytic } from "@/types";
import { Label } from "@/components/ui/label";

type MultiSelectDropdownProps = {
  users: UserAnalytic[] | undefined;
  selectedUsers: string[] | undefined;
  onChange: (selected: string[]) => void;
};

export default function MultiSelectDropdown({
  users,
  selectedUsers = [],
  onChange,
}: MultiSelectDropdownProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState<UserAnalytic[]>([]);

  useEffect(() => {
    const filtered = users?.filter((user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered || []);
  }, [searchTerm, users]);

  const toggleSelect = (id: string) => {
    const updatedSelectedUsers = selectedUsers?.includes(id)
      ? selectedUsers.filter((userId) => userId !== id)
      : [...(selectedUsers || []), id];

    onChange(updatedSelectedUsers);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between text-[13px]"
        >
          {selectedUsers.length > 0
            ? `Đã chọn (${selectedUsers.length})`
            : "Lựa chọn người nhận thông báo"}
          <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full">
        <div className="p-2">
          <div className="flex items-center space-x-2 mb-2">
            <Search className="h-4 w-4 opacity-50" />
            <Input
              type="text"
              placeholder="Tìm kiếm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-8"
            />
          </div>
        </div>
        {filteredItems.length === 0 ? (
          <DropdownMenuItem disabled>Không có kết quả</DropdownMenuItem>
        ) : (
          filteredItems.map((item) => (
            <DropdownMenuItem
              key={item.id}
              onSelect={(event) => {
                event.preventDefault(); // Prevent dropdown close on select
                toggleSelect(item.id);
              }}
            >
              <div className="flex items-center justify-between w-full pr-2">
                <div className="flex items-center gap-2">
                  <img
                    src={item.avatar}
                    alt={`${item.fullName}'s avatar`}
                    className="w-8 h-8 rounded-full"
                  />
                  <Label className="text-[13px] font-medium tracking-tighter">
                    {item.fullName}
                  </Label>
                </div>
                {selectedUsers.includes(item.id) && (
                  <Check className="h-4 w-4" />
                )}
              </div>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
