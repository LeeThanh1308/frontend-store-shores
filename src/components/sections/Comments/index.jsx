import { capitalizeWords, timeDifference } from "@/services/utils";
import { useEffect, useRef, useState } from "react";

import { FaStar } from "react-icons/fa";
import ReplyComment from "./ReplyComment";
import moment from "moment";

function Comments(data) {
  const commentRef = (useRef < HTMLDivElement) | (null > null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const fullName = data?.name?.split(" ");
  useEffect(() => {
    if (commentRef.current) {
      const { width, height } = commentRef.current?.getBoundingClientRect();
      setDimensions({ width, height });
    }
  }, [commentRef]);
  return (
    <div className=" py-3">
      <div className="flex items-start gap-2">
        <div className="h-full relative z-10">
          <div className=" rounded-full w-12 h-12 bg-slate-200 text-white flex-center z-50">
            <span className=" text-[20px]">
              {`${fullName[0]?.slice(0, 1)}${
                fullName[1] ? fullName[1]?.slice(0, 1) : ""
              }`.toUpperCase()}
            </span>
          </div>
          <div
            className={`w-0.5 bg-gray-300 mx-auto z-0`}
            style={{
              height: dimensions.height - 48 + "px",
            }}
          ></div>
        </div>

        <div ref={commentRef} className=" flex flex-col justify-between pb-5">
          <h2 className=" text-base text-slate-700 font-bold mb-2">
            {capitalizeWords(data.name)}
          </h2>
          {data.score && (
            <div className=" flex items-center gap-0.5 text-slate-600 text-base">
              <span>{data.score}</span>
              <FaStar className="text-orange-500 text-sm" />
            </div>
          )}
          <p className=" font-normal text-base">{data.content}</p>

          <div className="flex items-center">
            <span className="text-sm text-slate-600 font-medium">
              {timeDifference(data?.createdAt)}
            </span>
            <div className=" w-1 h-1 rounded-full bg-gray-400 mx-1.5"></div>
            <span className=" cursor-pointer font-bold text-sm text-blue-700">
              Trả lời
            </span>
          </div>
        </div>
      </div>
      {data.replies &&
        data?.replies?.map((item, index) => (
          <ReplyComment
            data={item}
            branch={index < data?.replies?.length - 1}
            key={index}
          />
        ))}
    </div>
  );
}

export default Comments;
