"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import Responsive from "@/components/layout/Responsive";
import FilterTypeSearchBox from "@/components/ui/FilterTypeSearchBox";
import ProductItem from "@/components/sections/ProductItem";
function Search() {
  const categories = [
    "Tất cả",
    "Sữa rửa mặt (Kem, gel, sữa)",
    "Sữa",
    "Sữa tắm, xà bông",
    "Mặt nạ",
    "Dụng cụ vệ sinh mũi",
    "Thuốc nhỏ mắt",
    "Chăm sóc cơ thể",
    "Chăm sóc da mặt",
    "Chống nắng toàn thân",
    "Tất cả",
    "Sữa rửa mặt (Kem, gel, sữa)",
    "Sữa",
    "Sữa tắm, xà bông",
    "Mặt nạ",
    "Dụng cụ vệ sinh mũi",
    "Thuốc nhỏ mắt",
    "Chăm sóc cơ thể",
    "Chăm sóc da mặt",
    "Chống nắng toàn thân",
    "Tất cả",
    "Sữa rửa mặt (Kem, gel, sữa)",
    "Sữa",
    "Sữa tắm, xà bông",
    "Mặt nạ",
    "Dụng cụ vệ sinh mũi",
    "Thuốc nhỏ mắt",
    "Chăm sóc cơ thể",
    "Chăm sóc da mặt",
    "Chống nắng toàn thân",
    "Tất cả",
    "Sữa rửa mặt (Kem, gel, sữa)",
    "Sữa",
    "Sữa tắm, xà bông",
    "Mặt nạ",
    "Dụng cụ vệ sinh mũi",
    "Thuốc nhỏ mắt",
    "Chăm sóc cơ thể",
    "Chăm sóc da mặt",
    "Chống nắng toàn thân",
    "Tất cả",
    "Sữa rửa mặt (Kem, gel, sữa)",
    "Sữa",
    "Sữa tắm, xà bông",
    "Mặt nạ",
    "Dụng cụ vệ sinh mũi",
    "Thuốc nhỏ mắt",
    "Chăm sóc cơ thể",
    "Chăm sóc da mặt",
    "Chống nắng toàn thân",
    "Tất cả",
    "Sữa rửa mặt (Kem, gel, sữa)",
    "Sữa",
    "Sữa tắm, xà bông",
    "Mặt nạ",
    "Dụng cụ vệ sinh mũi",
    "Thuốc nhỏ mắt",
    "Chăm sóc cơ thể",
    "Chăm sóc da mặt",
    "Chống nắng toàn thân",
  ];

  const fackData = new Array(10).fill(null);
  const searchParams = useSearchParams();
  const search = searchParams.get("s");
  const [activeCategory, setActiveCategory] = useState(0);
  return (
    <div>
      <div className="w-full bg-[#EDF0F3] py-4">
        <Responsive>
          <div className=" w-full rounded-lg bg-white p-3">
            <div className=" flex items-center gap-4 mb-2">
              {fackData.slice(0, 2).map((_, ix) => (
                <div
                  key={ix}
                  onClick={() => setActiveCategory(ix)}
                  className=" flex gap-2 items-center"
                >
                  <div
                    className={`p-1 rounded-full ${
                      activeCategory == ix
                        ? `w-5 h-5 border-[5px] border-blue-700`
                        : `border w-5 h-5 border-slate-400`
                    }`}
                  ></div>
                  <span className=" font-light">Sản phẩm</span>
                </div>
              ))}
            </div>
            <div>
              <p className=" text-slate-700">
                Tìm thấy{" "}
                <span className=" font-semibold text-slate-700">13565</span> bài
                viết với từ khóa{" "}
                <span className=" text-black font-semibold">
                  &quot;{search}&quot;
                </span>
              </p>
            </div>
          </div>

          <div className=" mt-6 flex gap-4">
            <div className=" w-3/12 h-fit bg-white rounded-lg sticky top-2">
              <div className=" font-semibold text-base py-3 px-3 border-b border-slate-200 flex items-center gap-1">
                <IoMenu />
                <h1>Bộ lọc nâng cao</h1>
              </div>

              <div className="p-3 min-h-0 max-h-[80vh] overflow-y-hidden hover:overflow-y-auto overflow-x-hidden scrollbar-custom">
                <FilterTypeSearchBox
                  title="Loại sản phẩm"
                  show={true}
                  data={categories}
                />
              </div>
            </div>
            <div className=" w-9/12">
              <div className=" font-semibold text-base py-1 pb-3 flex items-center gap-2 justify-between">
                <h1 className=" text-xl">Danh sách sản phẩm</h1>

                <div className=" flex-center gap-2">
                  <label
                    for="countries"
                    class=" text-gray-900 font-normal shrink-0"
                  >
                    Sắp xếp theo
                  </label>
                  <select
                    id="countries"
                    class="text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  >
                    <option selected>Tùy chọn</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="FR">France</option>
                    <option value="DE">Germany</option>
                  </select>
                </div>
              </div>
              <div className={`w-full h-auto grid gap-2 grid-cols-4`}>
                {/* Child Item */}
                {fackData.map((_, index) => {
                  return (
                    <ProductItem
                      brand="Nike"
                      name="Giày Nike Air Jordan 1 Retro Low OG ‘Mocha’ [CZ0858 102]"
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </Responsive>
      </div>

      {/* Not found */}
      {!search && (
        <div className=" bg-[#EDF0F3] h-1/4 flex justify-center items-center pb-12">
          <div className=" w-1/4 flex-col flex py-4">
            <div className="aspect-video relative">
              <Image
                src={"/assets/icons/not-found.svg"}
                layout="fill"
                alt="Search"
              />
            </div>
            <h1 className=" text-slate-600 font-bold py-2 text-center text-lg">
              Ôi! Không tìm thấy sản phẩm với từ khoá
            </h1>

            <div className="py-2 px-3 bg-white rounded-lg">
              <ul className=" list-disc px-6 text-gray-600 space-y-3">
                <li>Kiểm tra lỗi chính tả với từ khoá đã nhập</li>
                <li>
                  Trong trường hợp cần hỗ trợ, hãy liên hệ với Long Châu qua
                  tổng đài miễn phí{" "}
                  <a href="tel:+1800 6928" className=" text-blue-700 font-bold">
                    1800 6928
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
