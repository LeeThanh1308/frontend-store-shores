// hooks/useAuthRedirect.ts
"use client";

import { useEffect, useLayoutEffect } from "react";

import { authSelector } from "@/services/redux/Slices/auth";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

// Kiểm tra đăng nhập
export function useRequireAuth(Component) {
  return function RequireAuth() {
    const router = useRouter();
    const { isAuthenticated } = useSelector(authSelector);

    useLayoutEffect(() => {
      if (!isAuthenticated) {
        router.replace("/login");
      }
    }, [isAuthenticated]);
    return <Component />;
  };
}

// Kiểm tra ngược lại → nếu login rồi thì không vào login/register nữa
export function useGuestOnly(Component) {
  return function GuestOnly() {
    const router = useRouter();
    const { isAuthenticated } = useSelector(authSelector);
    console.log(isAuthenticated);
    useLayoutEffect(() => {
      if (isAuthenticated) {
        router.replace("/");
      }
    }, [isAuthenticated]);

    return <Component />;
  };
}
