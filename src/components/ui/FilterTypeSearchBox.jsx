"use client";

import { useEffect, useState } from "react";
import { HiChevronDoubleDown } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { IoCloseCircleSharp } from "react-icons/io5";
import { removeAccents } from "@/services/utils";

function FilterTypeSearchBox({
  data = [],
  title = "Danh mục",
  totalShow = 5,
  showMore = 5,
  show = false,
}) {
  const [showOpt, setShowOpt] = useState(true);
  const [valueSearch, setValueSearch] = useState("");
  const [activeTypeFilter, setActiveTypeFilter] = useState(0);
  const [totalShowElements, setTotalShowElements] = useState(0);
  useEffect(() => {
    setTotalShowElements(totalShow);
  }, [totalShow]);

  useEffect(() => {
    setShowOpt(show);
  }, []);
  return (
    <div className=" border-b border-slate-200">
      <div
        className=" font-medium text-base py-2 cursor-pointer flex items-center justify-between"
        onClick={() => setShowOpt(!showOpt)}
      >
        <h1>{title}</h1>
        <IoIosArrowDown className={`filter-type-icon ${showOpt && "active"}`} />
      </div>

      <div className={`filter-options ${showOpt ? "show" : ""}`}>
        <div className="overflow-hidden">
          <div className=" rounded-full border border-slate-300 text-slate-500 flex items-center overflow-hidden p-1 font-medium text-lg mb-3 relative">
            <div className="px-2">
              <CiSearch />
            </div>
            <input
              value={valueSearch}
              onChange={(e) => setValueSearch(e.target.value)}
              className=" outline-none text-base font-normal"
              type="text"
              placeholder="Tìm theo tên"
            />
            {valueSearch && (
              <div className=" absolute right-2">
                <IoCloseCircleSharp
                  onClick={() => setValueSearch("")}
                  size={22}
                  className="cursor-pointer"
                />
              </div>
            )}
          </div>
          {valueSearch
            ? data.map((_, ix) => {
                const regex = new RegExp(removeAccents(valueSearch));
                return (
                  regex.test(removeAccents(_)) && (
                    <label
                      key={ix}
                      className={`group text-gray-900 text-sm font-normal mb-3 flex items-center gap-2 ${
                        activeTypeFilter == ix
                          ? `cursor-no-drop`
                          : `cursor-pointer hover:border-blue-700 hover:text-blue-700`
                      }`}
                    >
                      <input
                        checked={activeTypeFilter == ix}
                        onChange={() => setActiveTypeFilter(ix)}
                        type="checkbox"
                        className="h-4 w-4 border border-rose-700"
                      />
                      <span className="">{_}</span>
                    </label>
                  )
                );
              })
            : data.slice(0, totalShowElements).map((_, ix) => {
                return (
                  <label
                    key={ix}
                    className={`group text-gray-900 text-sm font-normal mb-3 flex items-center gap-2 ${
                      activeTypeFilter == ix
                        ? `cursor-no-drop`
                        : `cursor-pointer hover:border-blue-700 hover:text-blue-700`
                    }`}
                  >
                    <input
                      checked={activeTypeFilter == ix}
                      onChange={() => setActiveTypeFilter(ix)}
                      type="checkbox"
                      className="h-4 w-4 border border-rose-700"
                    />
                    <span className="">{_}</span>
                  </label>
                );
              })}
          {!valueSearch && (
            <label
              onClick={() => setTotalShowElements((prev) => prev + showMore)}
              className="text-slate-900 text-sm font-medium mb-2 flex items-center gap-2 cursor-pointer"
            >
              <HiChevronDoubleDown />
              <span className="">Xem thêm</span>
            </label>
          )}
        </div>
      </div>
    </div>
  );
}

export default FilterTypeSearchBox;
