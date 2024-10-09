"use client";

import { Editor } from "@monaco-editor/react";
import { Fragment, useRef, useState } from "react";
import * as monaco from "monaco-editor";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Preview } from "./preview";
import { Base } from "@/types/base";
import { TempleType } from "@/types/template";
import _http from "@/utils/http";
import { toast } from "sonner";

export type Template = Base & {
  type: TempleType;
  template: string;
};

type Props = {
  data: Template;
  reload: () => void;
};

export const TextEditor = ({ data, reload }: Props) => {
  const [value, setValue] = useState<string>(data.template);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const [open, setOpen] = useState(false);

  const { resolvedTheme } = useTheme();

  const handleToggle = () => setOpen(!open);

  const [loading, setLoading] = useState(false);

  const onMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const handleUpdate = async () => {
    const jsonSend = {
      type: data.type,
      template: value,
    };

    try {
      setLoading(true);
      const handleUpdate = _http.put(`/Templates/${data.id}`, jsonSend);

      toast.promise(handleUpdate, {
        loading: "Đang xử lý...",
        success: () => {
          reload();
          handleToggle();
          reload();
          return "Cập nhật thành công!";
        },
        error: () => "Có lỗi xảy ra",
      });
    } catch (error) {
      console.log("Error uploading photos:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <div className="flex flex-col gap-4">
        <Editor
          height="55vh"
          theme={`vs-${resolvedTheme}`}
          language="html"
          defaultLanguage="html"
          onMount={onMount}
          value={value}
          onChange={(newValue) => setValue(newValue || "")}
        />
        <div className="flex justify-end">
          <div className="flex items-center gap-2">
            <Button
              disabled={loading}
              className="h-8 text-[13px]"
              variant="outline"
              onClick={handleToggle}
              type="button"
            >
              Preview
            </Button>
            <Button
              type="button"
              disabled={loading}
              onClick={handleUpdate}
              className="h-8 text-[13px]"
              variant="mix"
            >
              Xác nhận
            </Button>
          </div>
        </div>
      </div>

      <Preview handleClose={handleToggle} open={open} html={value} />
    </Fragment>
  );
};
