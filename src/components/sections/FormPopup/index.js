"use client";

import {
  FaArrowsAlt,
  FaCompressArrowsAlt,
  FaExpandArrowsAlt,
} from "react-icons/fa";

import { FaXmark } from "react-icons/fa6";
import { useState } from "react";

function FormPopup({
  title = "",
  isShowForm = false,
  onClose = () => null,
  children,
}) {
  const [reClose, setReClose] = useState(false);
  const [showFull, setShowFull] = useState(false);
  return (
    isShowForm && (
      <div className=" fixed top-0 right-0 left-0 bottom-0 backdrop-blur-xl z-40 flex justify-center items-center">
        <div
          className={`w-1/3 bg-white backdrop-blur-2xl mx-auto p-6 relative shadow-lg shadow-black rounded-xl ${
            showFull && `w-full !h-screen`
          }`}
        >
          <div className="w-full text-slate-950">
            <div className="flex justify-between items-center">
              <div className="font-bold text-2xl">{title}</div>
              <div className="flex gap-2">
                <div
                  onClick={() => setShowFull(!showFull)}
                  className="w-7 h-7 rounded-full text-black/70 text-sm flex justify-center cursor-pointer items-center bg-yellow-500 group"
                >
                  {showFull ? (
                    <FaCompressArrowsAlt className="text-white hidden group-hover:block" />
                  ) : (
                    <FaExpandArrowsAlt className="text-white  hidden group-hover:block" />
                  )}
                </div>

                <div className="" onClick={(e) => onClose(false)}>
                  <div
                    className="w-7 h-7 rounded-full text-black/70 text-sm flex justify-center cursor-pointer items-center bg-rose-500 group"
                    onMouseEnter={(e) => setReClose(true)}
                    onMouseLeave={(e) => setReClose(false)}
                  >
                    {reClose ? (
                      <FaXmark className="text-white hidden group-hover:block" />
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`relative max-h-[90vh] overflow-x-hidden overflow-y-auto min-h-[60vh] pr-0.5 scrollbar-custom`}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default FormPopup;
