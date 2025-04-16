"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/services/schema/registerSchema";

function Regsister() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const onSubmit = (data) => console.log(data);
  console.log(errors);
  return (
    <div className="w-full h-screen flex text-center relative">
      <div className="w-3/12 text-slate-950 m-auto bg-white/60 backdrop-blur-xl rounded-lg font-great font-bold p-3">
        <div>
          <div className=" w-20 h-20 mx-auto">
            <Link href="/" className="">
              <img src={"/images/logo.png"} className="w-full h-full" alt="" />
            </Link>
          </div>
          <h2 className="text-3xl text-rose-700">Đăng ký tài khoản.</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-4 mb-3">
              <div className="mb-2 w-full mr-1">
                <input
                  type="text"
                  name="username"
                  placeholder="Họ và tên"
                  className={`p-2 rounded-md w-full border border-solid border-white outline-none placeholder:text-rose-700 bg-slate-50/0 ${
                    !errors.username?.message ? null : "!border-red-500"
                  }`}
                  {...register("username")}
                />
                <p className="text-rose-700 indent-1 warn w-full mb-1 text-start text-sm">
                  {errors.username?.message}
                </p>
              </div>

              <div className="mb-2 w-full mr-1">
                <input
                  type="date"
                  name="birthday"
                  className={`p-2 rounded-md w-full border border-solid outline-none border-white placeholder:text-rose-700  ${
                    !watch("birthday") ? "text-rose-700" : "text-black"
                  } ${!errors.birthday?.message ? "" : "!border-red-500"}`}
                  {...register("birthday")}
                />
                <p className="text-rose-700 indent-1 warn w-full mb-1 text-start text-sm">
                  {errors.birthday?.message}
                </p>
              </div>

              <div className="w-full mx-auto mb-2">
                <select
                  name="gender"
                  className={`w-full p-2 border border-solid rounded-md border-white  ${
                    !watch("gender") ? "text-rose-700" : "text-black"
                  } ${!errors.gender?.message ? null : "!border-red-500"}`}
                  defaultValue={""}
                  {...register("gender")}
                >
                  <option value="" disabled hidden className="">
                    Giới tính
                  </option>
                  <option value="x">Nam</option>
                  <option value="y">Nữ</option>
                  <option value="z">Khác</option>
                </select>
                <p className="text-rose-700 indent-1 warn w-full mb-1 text-start text-sm">
                  {errors.gender?.message}
                </p>
              </div>

              <div className="w-full flex justify-between">
                <div className="mb-2 w-3/6 mr-1 relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Mật khẩu"
                    className={`p-2 rounded-md w-full border border-solid outline-none placeholder:text-rose-700 border-white bg-slate-50/0 ${
                      !errors.password?.message ? null : "!border-red-500"
                    }`}
                    {...register("password")}
                  />
                  {showPassword ? (
                    <i
                      className="fa-solid fa-eye absolute right-2 top-3"
                      onClick={(e) => setShowPassword(!showPassword)}
                    ></i>
                  ) : (
                    <i
                      className="fa-regular fa-eye-slash absolute right-2 top-3"
                      onClick={(e) => setShowPassword(!showPassword)}
                    ></i>
                  )}

                  <p className="text-rose-700 indent-1 warn w-full mb-1 text-start text-sm">
                    {errors.password?.message}
                  </p>
                </div>

                <div className="w-3/6 mx-auto mb-2">
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Nhập lại mật khẩu"
                    className={`p-2 rounded-md w-full border border-solid outline-none border-white placeholder:text-rose-700 ${
                      !errors.confirmPassword?.message
                        ? null
                        : "!border-red-500"
                    }`}
                    {...register("confirmPassword")}
                  />
                  <p className="text-rose-700 indent-1 warn w-full mb-1 text-start text-sm">
                    {errors.confirmPassword?.message}
                  </p>
                </div>
              </div>

              <div className="w-full flex justify-between">
                <div className="mb-2 w-3/6 mr-1">
                  <div className="w-full mx-auto mb-2">
                    <input
                      type="text"
                      name="phone"
                      placeholder="Số điện thoại"
                      className={`p-2 rounded-md w-full border border-solid outline-none placeholder:text-rose-700 border-white text-slate-950 ${
                        !errors.phone?.message ? null : "!border-red-500"
                      }`}
                      {...register("phone")}
                    />
                    <p className="text-rose-700 indent-1 warn w-full mb-1 text-start text-sm">
                      {errors.phone?.message}
                    </p>
                  </div>
                </div>
                <div className="mb-2 w-3/6">
                  <div className="w-full mx-auto mb-2">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className={`p-2 rounded-md w-full border border-solid outline-none placeholder:text-rose-700 border-white text-slate-950 ${
                        !errors.email?.message ? null : "!border-red-500"
                      }`}
                      {...register("email")}
                    />
                    <p className="text-rose-700 indent-1 warn w-full mb-1 text-start text-sm">
                      {errors.email?.message}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="px-4 py-1 rounded-md hover:opacity-75 w-1/2 bg-rose-500 text-white"
            >
              Đăng ký
            </button>
          </form>
          <div className="mt-3 py-1">
            <p className="text-sm cursor-default">
              Bạn đã có tài khoản?{" "}
              <Link href="/login">
                <span className="text-blue-500 cursor-pointer">Đăng nhập.</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Regsister;
