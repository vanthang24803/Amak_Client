import { Separator } from "@/components/ui/separator";
import { Container } from "../../_components/container";
import { ActionRight } from "./action-right";
import { OrderTable as Table } from "./table";

export const Wrapper = () => {
  return (
    <Container>
      <div className="flex items-center justify-between">
        <h2 className="scroll-m-20 text-base font-semibold tracking-tight">
          Danh sách đơn hàng
        </h2>
        <ActionRight />
      </div>
      <Separator />
      <Table />
    </Container>
  );
};
