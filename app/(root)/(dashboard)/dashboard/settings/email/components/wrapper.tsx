"use client";

import { useQuery } from "@tanstack/react-query";
import { Container } from "../../_components/container";
import { ContainerHeader } from "../../_components/container/conatiner-header";
import { TextEditor } from "./text-editor";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchTemplates } from "@/services/api/template";
import { useEffect, useState } from "react";
import { TempleType } from "@/types/template";
import { Base } from "@/types/base";
import { Loading } from "../../../_components/loading";

export type Template = Base & {
  type: TempleType;
  template: string;
};

export default function WrapperEmailSetting() {
  const { data, isLoading, refetch } = useQuery<Template[]>({
    queryKey: [`dashboard-emails-template`],
    queryFn: () => fetchTemplates(),
  });

  const [select, setSelect] = useState<TempleType>("ORDER");
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([]);

  useEffect(() => {
    if (data) {
      handleFilter(select);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleFilter = (select: TempleType) => {
    if (data) {
      const filteredData = data.filter((x) => x.type === select);
      setFilteredTemplates(filteredData);
      console.log(filteredData);
    }
  };

  return (
    <Container>
      <div className="flex items-center justify-between">
        <ContainerHeader title="Email" desc="Cập nhật email template" />

        <Select
          defaultValue={select}
          onValueChange={(value) => {
            const selectedType = value as TempleType;
            setSelect(selectedType);
            handleFilter(selectedType);
          }}
        >
          <SelectTrigger className="w-[180px] capitalize ">
            <SelectValue placeholder="Select template" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="ORDER">Đơn hàng</SelectItem>
              <SelectItem value="VERIFY_ACCOUNT">Xác nhận tài khoản</SelectItem>
              <SelectItem value="FORGOT_PASSWORD">Quên mật khẩu</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {filteredTemplates.map((item) => (
            <TextEditor data={item} key={item.id} reload={refetch} />
          ))}
        </>
      )}
    </Container>
  );
}
