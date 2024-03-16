/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import React, { useEffect, useRef } from "react";

import "react-quill/dist/quill.snow.css"; // Add css for snow theme
// import '../scss/modules/_editor.scss';

export default function QuillEditor({
  value,
  setValue,
  defaultValue,
  placeholder,
  className,
  theme,
  style,
  disabled,
}: {
  value: string;
  setValue: (value: string) => void;
  defaultValue?: string;
  theme: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  style?: any;
}): JSX.Element {
  const editor = useRef<any>();
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        [{ color: [] }, { background: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { align: "" },
          { align: "center" },
          { align: "right" },
          { align: "justify" },
        ],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image"],
        ["clean"],
      ],
    },
  };

  useEffect(() => {
    if (defaultValue) {
      const delta = editor.current.editor.clipboard.convert(defaultValue);
      editor.current.editor.setContents(delta, "silent");
    }
  }, [defaultValue]);

  return (
    <div className={`${className}`} style={{ height: 500 }}>
      <ReactQuill
        theme={theme}
        modules={{ ...modules }}
        value={value}
        onChange={setValue}
        placeholder={placeholder}
        readOnly={disabled}
        style={style}
      />
    </div>
  );
}
