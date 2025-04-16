"use client";

import FormOtp from "@/components/sections/FormOtp";
import Link from "next/link";
import { useEffect, useState } from "react";
function VerifyCode() {
  const [data, setData] = useState({
    email: "",
    total: "",
    expRefreshToken: "",
    expVerify: "",
  });
  const [timeVerify, setTimeVerify] = useState();
  const [isLoading, setIsLoading] = useState(true);

  //   useEffect(() => {
  //     setIsLoading(true);
  //     const verifyID = Cookies.get("tokenID");
  //     if (verifyID) {
  //       HttpRequest.get("verifications/checkVerify/" + verifyID)
  //         .then((data) => data.data)
  //         .then((data) => {
  //           if (data) {
  //             const { expVerify, ...args } = data;
  //             setData(args);
  //             setTimeVerify(expVerify);
  //           }
  //         })
  //         .catch((error) => {
  //           if (error.response.status === 404) {
  //             Cookies.remove("tokenID");
  //             navigate("/signup");
  //           }
  //         })
  //         .finally(() => {
  //           setIsLoading(false);
  //         });
  //     } else {
  //       navigate("/signup");
  //     }
  //   }, []);

  const handleVerifyResult = async (code) => {
    const verifyID = await Cookies.get("tokenID");
    // if (code && verifyID) navigate(`/verify/${verifyID}/${code}`);
  };

  const handleRefreshCode = async () => {
    setIsLoading(true);
    const verifyID = await Cookies.get("tokenID");
    // HttpRequest.get("verifications/refresh/" + verifyID)
    //   .then((response) => response.data)
    //   .then((data) => {
    //     if (data.message && data.data) {
    //       Toastify(1, data.message);
    //       const { expVerify, ...args } = data.data;
    //       setData(args);
    //       setTimeVerify(expVerify);
    //     }
    //   })
    //   .catch((error) => {
    //     Toastify(0, error.response.data.message);
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (timeVerify <= 0) {
        navigate("/signup");
      }
      if (timeVerify) {
        setTimeVerify(timeVerify - 1);
      }
    }, 1000);

    return () => clearTimeout(timerId);
  }, [timeVerify]);

  function formartHouseMinutesSeconds(seconds) {
    const house = Math.floor(seconds / 60 / 60);
    const minutes = Math.floor(seconds / 60 - house * 60);
    const second = seconds % 60;

    return `${house < 10 ? "0" + house : house}:${
      minutes < 10 ? "0" + minutes : minutes
    }:${second < 10 ? "0" + second : second}`;
  }

  return (
    <div className="w-full h-screen flex text-center relative font-great font-bold">
      <div className="w-3/12 text-slate-950 m-auto p-4 rounded-md shadow-sm bg-white/35 backdrop-blur-xl relative">
        <div>
          {/* <div className=" absolute top-1 right-3 "> */}

          {/* </div> */}
          <div className="mt-4 w-20 h-20 mx-auto">
            <img src={`/images/logo.png`} className="w-full h-full" alt="" />
          </div>

          <h2 className="text-3xl">Xác minh tài khoản.</h2>
          <p className=" text-lg font-thin text-black mt-1">
            Nhập mã xác minh gồm 6 chữ số mà chúng tôi đã gửi tới email{" "}
            {data.email} của bạn, mã sẽ hết hạn sau
            <span className="text-green-500 font-bold text-sm">
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
              totalVerify={3}
              expRefresh={data.expRefreshToken}
              onEnter={(code) => handleVerifyResult(code)}
            />
          </div>

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

export default VerifyCode;
