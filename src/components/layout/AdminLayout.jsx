"use client";

import {
  branchesSelector,
  handleGetBranches,
} from "@/services/redux/Slices/branches";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { FaLeftLong } from "react-icons/fa6";
import Link from "next/link";
import { usePathname } from "next/navigation";

const initMenuItems = [
  {
    name: "Trang chủ",
    path: "/dashboard",
  },
  {
    name: "Quản trị danh mục",
    path: "/categories",
  },
  {
    name: "Quản lý sản phẩm",
    path: "/products",
    subMenu: [
      {
        name: "Sản phẩm",
        path: "/",
      },
      {
        name: "Thương hiệu",
        path: "/brands",
      },
      {
        name: "Màu sắc",
        path: "/colors",
      },
      {
        name: "Đối tượng hướng tới",
        path: "/targets",
      },
    ],
  },
];

function AdminLayout({ children }) {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [menuItems, setMenuItems] = useState(initMenuItems);
  const { branches = [] } = useSelector(branchesSelector);
  const [showMenu, setShowMenu] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [dataForm, setDataForm] = useState({
    avatar: "",
    fullname: "",
    roles: "",
  });
  const [showSubMenu, setShowSubMenu] = useState(false);

  useEffect(() => {
    const timerID = setTimeout(() => {
      if (branches?.length == 0) {
        dispatch(handleGetBranches());
      } else {
        setMenuItems((prev) => [
          ...prev,
          {
            name: "Quản trị chi nhánh",
            path: "/branches",
            subMenu: branches.map((_) => ({
              name: _.name,
              path: "/" + _.id,
            })),
          },
        ]);
      }
    }, 200);
    return () => clearTimeout(timerID);
  }, [branches?.length]);
  return (
    <div className="w-full h-full relative" onClick={() => setShowMenu(false)}>
      {showMenu && (
        <div
          className="w-full h-14 bg-sky-500 flex justify-between items-center showheader fixed top-0 left-0 right-0 z-50"
          onClick={(e) => setShowMenu(false)}
        >
          <div className="h-full w-1/6 flex items-center justify-center bg-sky-600">
            <h1>Trang quản trị</h1>
          </div>
          <div className="flex w-5/6 justify-between items-center">
            <div className="flex">
              <div>
                <div
                  className="cursor-pointer h-full flex justify-center items-center hover:text-slate-950 hover:bg-white"
                  onClick={() => Navigate(-1)}
                >
                  <div className=" px-6">
                    <FaLeftLong icon="text-2xl" />
                  </div>
                </div>
              </div>

              <Link activeclassname="active" href="/" className="w-full h-full">
                <div className="cursor-pointer h-14 w-32 flex justify-center items-center hover:bg-slate-50 hover:text-slate-950">
                  <div>Trang chủ</div>
                </div>
              </Link>
            </div>
            <div className="flex items-center mr-4">
              <Link href={"/logout"}>
                <div className="cursor-pointer rounded-full flex justify-center items-center hover:opacity-50">
                  <div className="mx-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      alt="Logout"
                      height="1em"
                      viewBox="0 0 512 512"
                    >
                      {/* Đặt dữ liệu SVG logout ở đây */}
                    </svg>
                  </div>
                  <div>Đăng xuất</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
      <div
        id="bodyManage"
        className="flex justify-between w-full h-auto relative"
      >
        {!showMenu ? (
          <div
            className="z-50 fixed left-0 top-6 w-2 h-20 rounded-r-md shadow shadow-black bg-white hover:bg-black/40"
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(true);
            }}
          ></div>
        ) : (
          <div
            className="w-1/6 bg-zinc-800 menu z-50 fixed top-14 left-0 bottom-0 text-white"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="py-2 px-2 flex items-center">
              <div
                className="w-16 h-16 rounded-full mr-3"
                style={{
                  backgroundImage: `url('${process.env.NEXT_PUBLIC_DOMAIN_API}${process.env.NEXT_PUBLIC_PARAM_GET_FILE_API}${dataForm?.avatar}')`,
                }}
              ></div>
              <div>
                <div>
                  <h2>
                    {dataForm.fullname} - {dataForm.roles}
                  </h2>
                </div>
                <div className="flex items-center">
                  <div className="mr-1 w-2 h-2 bg-green-500 rounded-full"></div>
                  <p className="text-xs">Online</p>
                </div>
              </div>
            </div>
            <div className="text-base px-2 py-2 font-bold text-slate-400">
              Quản trị
            </div>
            <ul>
              {menuItems.map((_, index) => (
                <li
                  key={index}
                  className=""
                  onMouseEnter={(e) => {
                    setShowSubMenu(index);
                  }}
                  onMouseLeave={(e) => {
                    setShowSubMenu(false);
                  }}
                >
                  <Link
                    href={_.path}
                    className={`nav-link-mana w-full pl-8 flex py-2 cursor-pointer ${
                      pathname.split("/").includes(_.path.replace("/", "")) &&
                      `active font-dancing-script font-bold text-rose-700 text-2xl`
                    }`}
                  >
                    {_.name}
                  </Link>
                  {index === showSubMenu && (
                    <ul className="menu">
                      {Array.isArray(_.subMenu) &&
                        _.subMenu.map((subIt, subIndex) => (
                          <li key={subIndex} className="hover:bg-black">
                            <Link
                              href={_.path + subIt?.path}
                              className={`nav-link-mana w-full pl-16 flex py-2 cursor-pointer ${
                                subIt.path === pathname &&
                                `active font-dancing-script font-bold text-rose-700 text-2xl`
                              }`}
                            >
                              {subIt.name}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div
          className={`min-h-screen px-6 pt-6 ${
            showMenu ? "w-5/6  absolute top-14 right-0 bottom-0" : "w-full"
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
