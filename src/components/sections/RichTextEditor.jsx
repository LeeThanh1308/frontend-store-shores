"use client";

import "quill/dist/quill.snow.css"; // Import Quill styles

import React, {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

import ImageResize from "quill-image-resize-module-react";
import Quill from "quill";

Quill.register("modules/imageResize", ImageResize);
// RichTextEditor component
const RichTextEditor = forwardRef(({ onChange = () => null, value }, ref) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  useEffect(() => {
    const timerID = setTimeout(() => {
      if ((editorRef.current, !quillRef.current)) {
        quillRef.current = new Quill(editorRef.current, {
          theme: "snow",
          modules: {
            toolbar: [
              [{ font: [] }],
              [{ size: ["small", false, "large", "huge"] }],

              // Header (tiêu đề h1-h6)
              [{ header: [1, 2, 3, 4, 5, 6, false] }],

              // Inline style
              ["bold", "italic", "underline", "strike"],

              // Màu chữ và nền
              [{ color: [] }, { background: [] }],

              // Super/sub script
              [{ script: "sub" }, { script: "super" }],

              // Danh sách & thụt đầu dòng
              [{ list: "ordered" }, { list: "bullet" }],
              [{ indent: "-1" }, { indent: "+1" }],

              // Hướng văn bản
              [{ direction: "rtl" }],

              // Căn chỉnh
              [{ align: [] }],

              // Block elements
              ["blockquote", "code-block"],

              // Liên kết, hình ảnh, video, công thức
              ["link", "image", "video", "formula"],

              // Xóa định dạng
              ["clean"],
            ],
            imageResize: {
              modules: ["Resize", "DisplaySize", "Toolbar"],
              handleStyles: {
                backgroundColor: "black",
                border: "1px solid white",
                borderRadius: "4px",
                width: "12px",
                height: "12px",
              },
            },
          },
          placeholder: "Write something...",
        });
        if (value) quillRef.current.root.innerHTML = value;
        quillRef.current.on("text-change", () => {
          const content = quillRef.current.root.innerHTML;
          onChange(content);
        });
      }
    }, 500);

    return () => {
      quillRef.current = null; // Cleanup to avoid memory leaks
      clearTimeout(timerID); // Clear the timer on component unmount
    };
  }, [ref]);

  // Expose the getContent function to the parent component
  useImperativeHandle(ref, () => ({
    getContent: () => {
      if (quillRef.current) {
        return quillRef.current.root.innerHTML; // Return the HTML content
      }
      return "";
    },
  }));

  return <div ref={editorRef} style={{ height: "500px" }} />;
});

RichTextEditor.displayName = "RichTextEditor";
export default memo(RichTextEditor);
