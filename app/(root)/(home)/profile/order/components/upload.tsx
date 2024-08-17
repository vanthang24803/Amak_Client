/* eslint-disable @next/next/no-img-element */
"use client";

import { X } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Props = {
  files: FileList | null;
  setFiles: Dispatch<SetStateAction<FileList | null>>;
};

export const Upload = ({ files, setFiles }: Props) => {
  const [imgSrcs, setImgSrcs] = useState<string[]>([]);

  useEffect(() => {
    if (files) {
      const objectUrls = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImgSrcs(objectUrls);

      return () => objectUrls.forEach((url) => URL.revokeObjectURL(url));
    }
  }, [files]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length <= 4) {
      setFiles(fileList);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const fileList = event.dataTransfer.files;
    if (fileList && fileList.length <= 4) {
      setFiles(fileList);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleRemoveImage = (index: number) => {
    const fileListArray = Array.from(files!);
    const dataTransfer = new DataTransfer();
    fileListArray.forEach((file, i) => {
      if (i !== index) {
        dataTransfer.items.add(file);
      }
    });
    const updatedFiles = dataTransfer.files;
    setFiles(updatedFiles);
  };

  return (
    <>
      {files ? (
        <div className="grid grid-cols-4 gap-4">
          {Array.from(files).map((file, index) => (
            <div key={index} className="relative">
              <img
                src={imgSrcs[index]}
                alt={file.name}
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-0 right-0 p-1  text-neutral-600 focus:outline-none"
              >
                <X className="w-4 h-4 md:w-6 md:h-6" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="flex items-center justify-center w-full"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-500 dark:text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a.75.75 0 0 1 .75.75v4.5H15a.75.75 0 0 1 0 1.5h-4.5V14a.75.75 0 0 1-1.5 0v-4.5H5a.75.75 0 0 1 0-1.5h4.5V3.75A.75.75 0 0 1 10 3z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px , 4 Images)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              multiple
            />
          </label>
        </div>
      )}
    </>
  );
};
