"use client";

import { FaEye, FaEyeSlash } from "react-icons/fa6";
import {
  authSelector,
  handleChangeLoginState,
} from "@/services/redux/Slices/auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import InputFormAdmin from "@/components/ui/InputFormAdmin";
import Link from "next/link";
import { LoginAccountSchema } from "@/services/schema/loginSchema";
import { handleLogin } from "@/services/redux/Slices/auth/loginApi";
import { useForm } from "react-hook-form";
import { useGuestOnly } from "@/components/auth/useAuthRedirect";
import { zodResolver } from "@hookform/resolvers/zod";

function LoginPage() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    clearErrors,
    reset,
    setError,
  } = useForm({
    resolver: zodResolver(LoginAccountSchema),
  });
  const dispatch = useDispatch();
  const { loginState } = useSelector(authSelector);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmitLogin = async (data) => {
    dispatch(handleLogin(data));
  };

  useEffect(() => {
    if (loginState.message) {
      dispatch(
        handleChangeLoginState({
          message: "",
        })
      );
    }
  }, [watch("emailAndPhone"), watch("password")]);
  return (
    <div className="w-full h-screen flex font-dancing-script">
      <div className="w-96 text-center text-slate-950 backdrop-blur-xl m-auto p-4 rounded-md relative bg-white shadow-sm shadow-black">
        <div className="pb-4 mt-6">
          <div className=" w-20 h-20 mx-auto">
            <Link href="/">
              <img
                src={`/images/logo.png`}
                className="w-full h-full logo image-shadow"
                alt=""
              />
            </Link>
          </div>

          <h2 className="text-3xl">Đăng nhập</h2>
          <form onSubmit={handleSubmit(onSubmitLogin)}>
            <div className="w-4/5 mx-auto mb-2">
              <InputFormAdmin
                classNameDiv={` text-start`}
                className={`border-slate-300 relative placeholder:text-slate-950 ${
                  errors.emailAndPhone?.message ? "!border-red-500" : null
                }`}
                placeholder="Email or phone"
                warn={errors.emailAndPhone?.message}
                title="Email or Phone"
                type="text"
                {...register("emailAndPhone")}
              />
            </div>
            <div className="w-4/5 mx-auto mb-1 relative">
              <InputFormAdmin
                classNameDiv={` text-start`}
                className={`border-slate-300 relative placeholder:text-slate-950 ${
                  errors.password?.message ? "!border-red-500" : null
                }`}
                placeholder="Password"
                warn={errors.password?.message}
                title="Password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
              >
                <div className="absolute right-3 top-0 bottom-0 flex items-center cursor-pointer">
                  {showPassword ? (
                    <FaEye
                      className="image-shadow"
                      onClick={(e) => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <FaEyeSlash
                      className="image-shadow"
                      onClick={(e) => setShowPassword(!showPassword)}
                    />
                  )}
                </div>
              </InputFormAdmin>
            </div>
            <div>
              <span className="text-xs text-rose-700 image-shadow">
                {loginState?.message}
              </span>
            </div>

            <button
              type="submit"
              className="px-4 py-1 rounded-md hover:opacity-75 bg-blue-500 text-white font-bold"
            >
              Xác nhận
            </button>
          </form>

          <div className="mt-3 p-1">
            <p className="text-sm cursor-default image-shadow">
              Bạn chưa có tài khoản?{" "}
              <Link href="/register">
                <span className="text-blue-700 cursor-pointer">Đăng ký</span>
              </Link>
            </p>
          </div>
          <div className="p-1">
            <Link
              className="text-sm text-blue-700 cursor-pointer image-shadow"
              href={"forgot-password"}
            >
              Bạn quên mật khẩu ư?{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default useGuestOnly(LoginPage);
