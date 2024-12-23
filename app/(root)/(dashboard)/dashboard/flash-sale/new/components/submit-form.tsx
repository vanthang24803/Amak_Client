"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useFlashSale } from "@/hooks/use-flash-sale";
import { DateTimePicker } from "./date-picker";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFormContext } from "react-hook-form";

export const SubmitForm = () => {
  const { totalItems, data } = useFlashSale();
  const { getValues } = useFormContext();

  const currentData = getValues();

  return (
    <Card className="my-4">
      <CardHeader>
        <CardTitle className="text-[15px]">Xác nhận</CardTitle>
        <CardDescription className="text-[12px]">
          Vui lòng xác nhận lại thông tin
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Card>
          <CardHeader className="flex flex-col gap-2">
            <CardTitle className="text-[15px]">Thông tin</CardTitle>
            <Separator />
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <div className="flex gap-4 flex-col">
              <div className="flex flex-col gap-2 w-full">
                <Label className="text-muted-foreground text-[12px]">Tên</Label>
                <Input
                  disabled
                  className="text-[13px] md:rounded"
                  value={currentData.name}
                />
              </div>
            </div>
            <div className="flex items-center gap-10">
              <div className="flex flex-col gap-2 w-1/2">
                <Label className="text-muted-foreground text-[12px]">
                  Thời gian bắt đầu
                </Label>
                <DateTimePicker disable value={currentData.startAt} />
              </div>

              <div className="flex flex-col gap-2 w-1/2">
                <Label className="text-muted-foreground text-[12px]">
                  Thời gian kết thúc
                </Label>
                <DateTimePicker disable value={currentData.endAt} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-[15px]">Danh sách sản phẩm</CardTitle>
            <CardDescription className="text-[12px]">
              Số lượng sản phẩm : {totalItems}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader className="text-[13.5px]">
                <TableRow>
                  <TableHead>Mã sản phẩm</TableHead>
                  <TableHead>Tên</TableHead>
                  <TableHead>Phiên bản</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-[13px]">
                {data.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.optionName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};
