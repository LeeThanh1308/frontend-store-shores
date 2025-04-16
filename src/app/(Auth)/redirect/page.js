"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
function VerifyEmail() {
  // const { id, code } = useParams();
  const [isSuccess, setIsSuccess] = useState(true);
  const [count, setCount] = useState(3);
  const [message, setMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  // useLayoutEffect(() => {
  //   setIsLoading(true);
  // HttpRequest.post(`verifications/accounts/${id}/${code}`)
  //   .then((data) => data.data)
  //   .then((data) => {
  //     setMessage(data.message);
  //     Cookies.remove("tokenID");
  //     setIsSuccess(true);
  //   })
  //   .catch((err) => {
  //     setIsSuccess(false);
  //     setMessage(err?.response?.data?.message);
  //   })
  //   .finally(() => {
  //     setTimeout(() => {
  //       setIsLoading(false);
  //     }, 200);
  //   });
  // }, [id, code]);

  // useLayoutEffect(() => {
  //   const TimeId = setInterval(() => {
  //     if (message) {
  //       setCount((prev) => {
  //         if (prev <= 1) {
  //           setCount(0);
  //           clearInterval(TimeId);
  //           if (isSuccess) {
  //             navigate("/login");
  //           } else {
  //             navigate("/signup");
  //           }
  //         } else {
  //           return prev - 1;
  //         }
  //       });
  //     } else {
  //       clearInterval(TimeId);
  //     }
  //   }, 1000);

  //   return () => clearInterval(TimeId);
  // }, [message]);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      {isSuccess ? (
        <div className="w-96 h-64 border shadow-md rounded-md text-emerald-600 flex justify-center items-center text-center">
          <div>
            <div className="flex justify-center mb-2">
              <FaCircleCheck className=" text-5xl" />
            </div>
            <h1 className=" text-xl font-bold">{message}</h1>
            <p className="text-sm">
              Hệ thống sẽ chuyển sang trang đăng nhập sau {count}s.
            </p>
          </div>
        </div>
      ) : (
        <div className="w-96 h-64 border shadow-md rounded-md text-red-600 flex justify-center items-center text-center">
          <div>
            <div className="flex justify-center mb-2">
              <FaCircleCheck className=" text-5xl" />
            </div>
            <h1 className=" text-xl font-bold">{message}</h1>
            <p className="text-sm">
              Hệ thống sẽ chuyển sang trang verify {count}s.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerifyEmail;
