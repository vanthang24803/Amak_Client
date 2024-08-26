"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import Heading from "@tiptap/extension-heading";
import ListItem from "@tiptap/extension-list-item";
import Image from "@tiptap/extension-image";
import StarterKit from "@tiptap/starter-kit";
import ImageResize from "tiptap-extension-resize-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { Toolbar } from "./tool-bar";

type Props = {
  description: string;
  onChange: (text: string) => void;
};

const Tiptap = ({ description, onChange }: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      ImageResize,
      Underline,
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: "w-20 h-20 object-fill rounded-md",
        },
      }),
      Heading.configure({
        levels: [1, 2],
        HTMLAttributes: {
          class: "text-2xl font-bold",
        },
      }),
      ListItem.configure({
        HTMLAttributes: {
          class: "list-disc ml-4",
        },
      }),
      Link.configure({
        openOnClick: true,
        autolink: true,
        HTMLAttributes: {
          class: "text-sky-600",
        },
      }),
    ],
    content: description,
    editorProps: {
      attributes: {
        class: "rounded-md border min-h-[200px] border-input p-2 text-[14px]",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="flex flex-col justify-stretch  w-full space-y-2 ">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
