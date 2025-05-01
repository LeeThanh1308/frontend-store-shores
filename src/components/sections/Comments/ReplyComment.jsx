import { useEffect, useRef, useState } from "react";

import { FaStar } from "react-icons/fa";
import FormComment from "./FormComment";
import { capitalizeWords } from "@/services/utils";

function ReplyComment({ branch, data, ...props }) {
  const commentRef = (useRef < HTMLDivElement) | (null > null);
  const [showSendComment, setShowSendComment] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const fullName = data?.name?.split(" ");
  useEffect(() => {
    if (commentRef.current) {
      const { width, height } = commentRef.current?.getBoundingClientRect();
      setDimensions({ width, height });
    }
  }, [commentRef]);
  return (
    <div className="flex items-start gap-2 relative" {...props}>
      <div className="h-full relative z-10">
        <div className="w-12 h-12 flex justify-end">
          <div className="w-1/2 h-1/2 border-l-2 mr-px border-b-2 border-gray-300 rounded-bl-lg"></div>
        </div>
        {branch && (
          <div
            className={`w-0.5 bg-gray-300 mx-auto z-0 -mt-12`}
            style={{
              height: dimensions.height + "px",
            }}
          ></div>
        )}
      </div>

      <div className="h-full relative z-10">
        <div className=" rounded-full w-12 h-12 bg-slate-200 text-white flex-center z-50">
          <span className=" text-[20px]">
            {`${fullName[0]?.slice(0, 1)}${
              fullName[1] ? fullName[1]?.slice(0, 1) : ""
            }`.toUpperCase()}
          </span>
        </div>
      </div>

      <div ref={commentRef} className=" flex flex-col justify-between pb-5">
        <h2 className=" text-base text-slate-700 font-bold mb-2">
          {capitalizeWords(data.name)}
        </h2>
        <div
          className=" font-normal text-base"
          dangerouslySetInnerHTML={{
            __html: data.content,
          }}
        ></div>

        <div className="flex items-center">
          <span className="text-sm text-slate-600 font-medium">
            7 ngày trước
          </span>
          <div className=" w-1 h-1 rounded-full bg-gray-400 mx-1.5"></div>
          <span
            onClick={() => setShowSendComment(true)}
            className=" cursor-pointer font-bold text-sm text-blue-700"
          >
            Trả lời
          </span>
        </div>
      </div>

      {
        <TabWindow
          classContainer=" pb-3 !w-1/3"
          onClose={() => setShowSendComment(!showSendComment)}
          open={showSendComment}
        >
          <FormComment fullName="Nguyen Van A" />
        </TabWindow>
      }
    </div>
  );
}

export default ReplyComment;
