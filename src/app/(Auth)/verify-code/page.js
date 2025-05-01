"use client";

import {
  authSelector,
  handleChangeStateActiveVerify,
  handleRefreshOtpCode,
  handleVerifyOtpCode,
} from "@/services/redux/Slices/auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import FormOtp from "@/components/sections/FormOtp";
import Link from "next/link";
import { formartHouseMinutesSeconds } from "@/services/utils";
import { redirect } from "next/navigation";
import { useGuestOnly } from "@/components/auth/useAuthRedirect";

function VerifyCode() {
  const dispatch = useDispatch();
  const { activeVerifyCodeSignID, dataVerifyCode } = useSelector(authSelector);
  const [timeVerify, setTimeVerify] = useState();
  const [timeExpCode, setTimeExpCode] = useState({
    expRefreshToken: 0,
    dateExpVerify: 0,
  });

  const handleVerifyResult = async (code) => {
    await dispatch(handleVerifyOtpCode({ id: activeVerifyCodeSignID, code }));
    redirect("/redirect");
  };

  const handleRefreshCode = async () => {
    dispatch(handleRefreshOtpCode(activeVerifyCodeSignID));
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (timeVerify <= 0 && activeVerifyCodeSignID && dataVerifyCode?.email) {
        dispatch(handleChangeStateActiveVerify(false));
        redirect("/login");
      }
      if (timeVerify) {
        setTimeVerify(timeVerify - 1);
      }
    }, 1000);

    return () => clearTimeout(timerId);
  }, [timeVerify]);

  useEffect(() => {
    if (!activeVerifyCodeSignID) {
      redirect("/login");
    }
  }, [activeVerifyCodeSignID]);

  useEffect(() => {
    const currentTime = new Date().getTime();
    const { expRefreshToken, expVerify } = dataVerifyCode;
    const dateExpRefresh = Math.floor(
      (new Date(expRefreshToken).getTime() - currentTime) / 1000
    );
    const dateExpVerify = Math.floor(
      (new Date(expVerify).getTime() - currentTime) / 1000
    );
    setTimeExpCode({
      expRefreshToken: dateExpRefresh,
      dateExpVerify: dateExpVerify,
    });
    setTimeVerify(dateExpVerify);
  }, [dataVerifyCode]);

  return (
    <div className="w-full h-screen flex text-center relative font-great font-bold">
      <div className="w-3/12 text-slate-950 m-auto p-4 rounded-md shadow-sm bg-white/35 backdrop-blur-xl relative">
        <div>
          {/* <div className=" absolute top-1 right-3 "> */}

          {/* </div> */}
          <div className="mt-4 w-20 h-20 mx-auto">
            <img
              src={`/images/logo.png`}
              className="w-full h-full image-shadow"
              alt=""
            />
          </div>

          <h2 className="text-3xl">Xác minh tài khoản.</h2>
          <p className=" text-lg font-thin text-black mt-1 image-shadow">
            Nhập mã xác minh gồm 6 chữ số mà chúng tôi đã gửi tới email{" "}
            {dataVerifyCode.email} của bạn, mã sẽ hết hạn sau
            <span className="text-green-500 font-bold text-sm font-roboto">
              {" "}
              {formartHouseMinutesSeconds(timeVerify ? timeVerify : 0)}
            </span>
            . Nếu bạn vẫn không tìm thấy mã trong hộp thư đến, hãy kiểm tra thư
            mục Spam.
          </p>

          <div>
            <FormOtp
              classx={" m-2"}
              getValue={handleVerifyResult}
              clickRefresh={handleRefreshCode}
              totalVerify={dataVerifyCode?.total}
              expRefresh={timeExpCode.expRefreshToken}
              onEnter={(code) => handleVerifyResult(code)}
            />
          </div>

          <div className="mt-3 py-1">
            <p className="text-sm cursor-default image-shadow">
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

export default useGuestOnly(VerifyCode);
