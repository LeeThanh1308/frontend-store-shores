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
    if (!isAuthenticated) {
      if (document.referrer) {
        router.back();
      } else {
        router.replace("/login");
      }
    } else {
      return <Component />;
    }
  };
}

// Kiểm tra ngược lại → nếu login rồi thì không vào login/register nữa
export function useGuestOnly(Component) {
  return function GuestOnly() {
    const router = useRouter();
    const { isAuthenticated } = useSelector(authSelector);

    if (isAuthenticated) {
      if (document.referrer) {
        router.back();
      } else {
        router.replace("/");
      }
    } else {
      return <Component />;
    }
  };
}
