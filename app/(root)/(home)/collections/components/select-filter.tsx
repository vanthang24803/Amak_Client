import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FilterType } from '@/types';

interface SelectFilter {
  handleFilter: (filterType: FilterType) => void;
}

export const SelectFilter = ({ handleFilter }: SelectFilter) => {
  return (
    <Select
      onValueChange={(value) => {
        const filterType = value as FilterType;
        handleFilter(filterType);
      }}
    >
      <SelectTrigger className="w-[180px] hidden lg:flex">
        <SelectValue placeholder="Sắp xếp" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="LowToHigh">Giá: Tăng dần</SelectItem>
        <SelectItem value="HighToLow">Giá: Giảm dần</SelectItem>
        <SelectItem value="Alphabet">Tên: A - Z</SelectItem>
        <SelectItem value="ReverseAlphabet">Tên: Z - A</SelectItem>
        <SelectItem value="Lasted">Mới nhất</SelectItem>
        <SelectItem value="Oldest">Cũ nhất</SelectItem>
      </SelectContent>
    </Select>
  );
};
