"use client";

import { FaCartPlus, FaSearch } from "react-icons/fa";

import { GoHeartFill } from "react-icons/go";
import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import Responsive from "./Responsive";
import { bootstrapSelector } from "@/services/redux/Slices/bootstrap";
import { useSelector } from "react-redux";

function Header() {
  const {
    brands = [],
    categories = [],
    targetGroups = [],
  } = useSelector(bootstrapSelector);
  return (
    <div>
      <Responsive className={"flex justify-between items-center py-0.5 px-24"}>
        <div className="relative flex justify-center z-10">
          <Link href={"/"}>
            <Image
              src="/images/logo.png"
              objectFit="contain"
              width={30}
              height={10}
              alt="logo"
              className="image-shadow"
            />
          </Link>
        </div>

        <div className=" absolute top-0 right-0 left-0 bottom-0 overflow-hidden z-0">
          <Marquee className="">
            {brands.map((_) => (
              <div className=" px-8 flex gap-2 items-center font-dancing-script">
                <Image
                  src={`${process.env.NEXT_PUBLIC_DOMAIN_API}${process.env.NEXT_PUBLIC_PARAM_GET_FILE_API}${_.logo}`}
                  objectFit="contain"
                  width={30}
                  height={20}
                  alt="logo"
                />
                <p>{_.name}</p>
              </div>
            ))}
          </Marquee>
        </div>

        <div className=" text-lg font-bold font-dancing-script text-rose-500 flex justify-center gap-2 z-10 image-shadow">
          <Link
            className=" hover:text-rose-700 hover:underline"
            href={"/register"}
          >
            Register
          </Link>
          <Link
            className=" hover:text-rose-700 hover:underline"
            href={"/login"}
          >
            Login
          </Link>
        </div>
      </Responsive>
      <div className="w-full h-24 shadow-sm shadow-gray-300 z-50">
        <Responsive className={"flex justify-between items-center h-full pr-3"}>
          <div className="relative">
            <Link href={"/"}>
              <Image
                src="/images/logo.png"
                objectFit="contain"
                width={80}
                height={60}
                alt="logo"
              />
            </Link>
          </div>

          <div>
            <ul className=" list-none flex-center flex-wrap gap-8 font-bold text-lg font-dancing-script text-rose-700">
              <li className=" hover:underline cursor-pointer relative group">
                <h1>Giày</h1>
                <div className=" absolute top-full -left-0 min-w-70 backdrop-blur-xl rounded-md z-50 overflow-hidden p-2 text-white hidden group-hover:block">
                  {categories.map((_) => (
                    <Link key={_.id} href={_.slug}>
                      <div className="p-2 rounded-md hover:bg-black/30 hover:text-white hover:font-dancing-script">
                        {_.name}
                      </div>
                    </Link>
                  ))}
                </div>
              </li>
              {targetGroups.map((_) => (
                <li key={_.id} className=" hover:underline cursor-pointer">
                  <Link href={_.name}>{_.name}</Link>
                </li>
              ))}
              <li className=" hover:underline cursor-pointer relative group">
                <h1>Thương hiệu</h1>
                <div className=" absolute top-full -left-0 min-w-70 backdrop-blur-xl rounded-md z-50 overflow-hidden p-2 text-white hidden group-hover:block">
                  {brands.map((_) => (
                    <Link key={_.id} href={_.slug}>
                      <div className="p-2 rounded-md hover:bg-black/30 hover:text-white hover:font-dancing-script flex justify-between items-center gap-4">
                        {_.name}
                        <Image
                          width={40}
                          height={20}
                          objectFit="contain"
                          className="image-shadow"
                          src={`${process.env.NEXT_PUBLIC_DOMAIN_API}${process.env.NEXT_PUBLIC_PARAM_GET_FILE_API}${_.logo}`}
                          alt="logo"
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              </li>
            </ul>
          </div>
          <div className=" flex-center gap-5">
            <div className=" p-1 hover:shadow-sm shadow-blue-700 rounded-full cursor-pointer relative">
              <FaSearch className="z-0 text-rose-500" size={24} />
            </div>
            <div className=" p-1 hover:shadow-sm shadow-blue-700 rounded-full cursor-pointer">
              <div className=" relative">
                <GoHeartFill className="z-0 text-rose-500" size={24} />
                <span className="z-10 absolute -right-2.5 -top-2.5 w-5 h-5 bg-sky-50/60 font-bold text-sm rounded-full shadow-sm shadow-blue-500 text-rose-500 flex-center">
                  0
                </span>
              </div>
            </div>
            <div className=" p-1 hover:shadow-sm shadow-blue-700 rounded-full cursor-pointer group">
              <div className=" relative z-50">
                <FaCartPlus
                  className=" z-0 text-rose-500"
                  size={24}
                ></FaCartPlus>
                <span className="z-10 absolute -right-2.5 -top-2.5 w-5 h-5 bg-sky-50/60 font-bold text-sm rounded-full shadow-sm shadow-blue-500 text-rose-500 flex-center">
                  0
                </span>
                <div className=" absolute right-0 top-full w-96 hidden group-hover:block">
                  <div className=" flex flex-col">
                    <div className="self-end w-0 h-0 mr-1 border-l-6 border-r-6 border-b-8 border-transparent border-b-rose-700"></div>
                    <div className=" w-full shadow shadow-rose-700 p-3 rounded-sm bg-white">
                      <p className="text-center font-great font-bold text-blue-700">
                        Giỏ hàng trống!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Responsive>
      </div>
    </div>
  );
}

export default Header;
