"use client";
import Link from "next/link";
import { useState } from "react";

function LoginPage() {
  const [dataForm, setDataForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errMessage, setErrorMessage] = useState(false);

  const handleSubmitForm = () => {};
  return (
    <div className="w-full h-screen flex">
      <div className="w-96 text-center text-slate-950 bg-white/15 backdrop-blur-xl m-auto p-4 rounded-md relative ">
        <div className="pb-4 mt-6">
          <div className=" w-20 h-20 mx-auto">
            <Link href="/">
              <img
                src={`/images/logo.png`}
                className="w-full h-full logo"
                alt=""
              />
            </Link>
          </div>

          <h2 className="text-3xl">Đăng nhập</h2>
          <div
            className="mt-4 mb-3"
            onKeyUp={(e) => {
              if (e.key.toLocaleLowerCase() === "enter") {
                handleSubmitForm();
              }
            }}
          >
            <div className="w-4/5 mx-auto mb-2">
              <input
                className="p-2 rounded-md bg-transparent w-full border border-solid border-slate-50/0 hover:border-slate-50 focus:border-slate-50 outline-none placeholder:italic placeholder:text-slate-100"
                type="text"
                placeholder="Email"
                value={dataForm.email}
                onChange={(e) => {
                  setDataForm((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }));
                  setErrorMessage("");
                }}
              />
            </div>
            <div className="w-4/5 mx-auto mb-1 relative">
              <input
                className="p-2 rounded-md bg-transparent w-full border border-solid border-slate-50/0 hover:border-slate-50 focus:border-slate-50 outline-none placeholder:italic placeholder:text-slate-100"
                type={showPassword ? "text" : "password"}
                placeholder="Mật khẩu"
                value={dataForm.password}
                onChange={(e) => {
                  setDataForm((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }));
                  setErrorMessage("");
                }}
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
            </div>
            <div>
              <span className="text-xs text-slate-100">{errMessage}</span>
            </div>
          </div>

          <button
            onClick={handleSubmitForm}
            className="border border-solid px-4 py-1 rounded-md hover:opacity-75"
          >
            Xác nhận
          </button>
          <div className="mt-3 p-1">
            <p className="text-sm cursor-default">
              Bạn chưa có tài khoản?{" "}
              <Link href="/register">
                <span className="text-blue-400 cursor-pointer">Đăng ký</span>
              </Link>
            </p>
          </div>
          <div className="p-1">
            <p
              className="text-sm cursor-default"
              onClick={() => setIsFormLogin(false)}
            >
              <span className="text-blue-400 cursor-pointer">
                Bạn quên mật khẩu ư?{" "}
              </span>
            </p>
          </div>

          {/* <>
              <div
                className=" absolute top-1 left-1 w-10 h-10 rounded-full hover:bg-white flex items-center justify-center hover:text-black cursor-pointer"
                onClick={() => {
                  setIsFormLogin(true);
                  setErrorMessage("");
                }}
                onChange={() => {
                  if (countDownForget > 0) setCountDownForget(0);
                }}
              >
                <FontAwesomeIcon
                  icon="fa-solid fa-left-long"
                  className=" text-2xl"
                />
              </div>
              {renderForm?.forget ? (
                <>
                  <h2 className="text-3xl">Lấy lại mật khẩu</h2>
                  <div className="mt-4 mb-3">
                    <div className="w-4/5 mx-auto mb-2">
                      <input
                        className="p-2 rounded-md bg-transparent w-full border border-solid border-slate-50/0 hover:border-slate-50 focus:border-slate-50 outline-none placeholder:italic placeholder:text-slate-100"
                        type="text"
                        placeholder="Email"
                        value={dataForget.email}
                        onChange={(e) => {
                          setWarningForget("");
                          setDataForget((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }));
                        }}
                      />
                    </div>
                  </div>

                  <div
                    className="mt-4 mb-3"
                    onKeyUp={(e) => {
                      if (e.key.toLocaleLowerCase() === "enter") {
                        handleSubmitForget();
                      }
                    }}
                  >
                    <div className="w-4/5 mx-auto mb-1 relative">
                      <input
                        className="p-2 rounded-md bg-transparent w-full border border-solid border-slate-50/0 hover:border-slate-50 focus:border-slate-50 outline-none placeholder:italic placeholder:text-slate-100"
                        type="text"
                        placeholder="Số điện thoại"
                        value={dataForget.phone}
                        onChange={(e) => {
                          setWarningForget("");
                          setDataForget((prev) => ({
                            ...prev,
                            phone: e.target.value,
                          }));
                        }}
                      />
                    </div>
                    <div>
                      <span className="text-xs text-slate-100 font-bold">
                        {`${
                          !warnForget
                            ? countDownForget > 0
                              ? "Vui lòng thử lại sau " +
                                formartHouseMinutesSeconds(countDownForget)
                              : ""
                            : warnForget
                        }`}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleSubmitForget}
                    className="border border-solid px-4 py-1 rounded-md hover:opacity-75"
                  >
                    Xác nhận
                  </button>
                </>
              ) : (
                <div>
                  <h2 className="text-3xl">Nhập mã xác minh</h2>
                  <p className=" text-sm font-thin text-white mt-1">
                    Nhập mã xác minh gồm 6 chữ số mà chúng tôi đã gửi tới email{" "}
                    {dataVeifyCode.email}, mã sẽ hết hạn sau{" "}
                    <span className="text-green-500 font-bold">
                      {formartHouseMinutesSeconds(countDownVerify || 0)}
                    </span>
                  </p>
                  <div className="">
                    <div className="mt-4 mb-3">
                      <div className="w-4/5 mx-auto mb-1 relative">
                        <input
                          className="p-2 rounded-md bg-transparent w-full border border-solid border-slate-50/0 hover:border-slate-50 focus:border-slate-50 outline-none placeholder:italic placeholder:text-slate-100"
                          type={showPassword ? "text" : "password"}
                          placeholder="Nhập mật khẩu mới"
                          value={dataForgetPassword.password}
                          onChange={(e) => {
                            setDataForgetPassword((prev) => ({
                              ...prev,
                              warn: "",
                              password: e.target.value,
                            }));
                          }}
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
                      </div>
                    </div>
                    <div className="mt-4 mb-3">
                      <div className="w-4/5 mx-auto mb-1 relative">
                        <input
                          className="p-2 rounded-md bg-transparent w-full border border-solid border-slate-50/0 hover:border-slate-50 focus:border-slate-50 outline-none placeholder:italic placeholder:text-slate-100"
                          type={"password"}
                          placeholder="Nhập lại mật khẩu"
                          value={dataForgetPassword.rePassword}
                          onChange={(e) => {
                            setDataForgetPassword((prev) => ({
                              ...prev,
                              warn: "",
                              rePassword: e.target.value,
                            }));
                          }}
                        />
                      </div>
                      <p className="text-xs text-slate-100">
                        {dataForgetPassword.warn}
                      </p>
                    </div>
                  </div>
                  <VerifyComponent
                    classx=" text-black"
                    getValue={(value) => {
                      if (handleSubmitChangePass()) {
                        handleSubmitVerifyCode(value);
                      }
                    }}
                    onExpired={() => {
                      setIsFormLogin(true);
                      setRenderForm({});
                    }}
                    totalVerify={dataVeifyCode.total}
                    textBtnSuccess="Đổi mật khẩu"
                    expRefresh={dataVeifyCode.expRefreshToken}
                    clickRefresh={handleRefreshCode}
                    onEnter={(value) => {
                      if (handleSubmitChangePass()) {
                        handleSubmitVerifyCode(value);
                      }
                    }}
                  />
                </div>
              )}
            </>
           */}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
