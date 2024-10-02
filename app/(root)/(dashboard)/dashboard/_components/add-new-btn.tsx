import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const AddNewButton = () => {
  return (
    <Button
      variant="outline"
      className="flex items-center space-x-2 text-[12px] h-9"
    >
      <Plus className="w-4 h-4" />
      <span>Thêm mới</span>
    </Button>
  );
};
