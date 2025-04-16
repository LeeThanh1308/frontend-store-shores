import "./globals.css";

import { Dancing_Script, Great_Vibes, Roboto } from "next/font/google";

import BootStrapApp from "@/services/redux/BootstrapApp";
import StoreProvider from "@/services/redux/StoreProvider";
import { ToastContainer } from "react-toastify";

const dancingscript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing-script",
});
const greatvibes = Great_Vibes({
  subsets: ["latin"],
  variable: "--font-great-vibes",
  weight: ["400"],
});

export const metadata = {
  title: "Store Shoes",
  description: "Cửa hàng bán giày thể thao",
};

export const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${greatvibes.variable} ${dancingscript.variable} ${roboto.variable} antialiased`}
      >
        <StoreProvider>
          {children}
          <BootStrapApp />
          <ToastContainer />
        </StoreProvider>
      </body>
    </html>
  );
}
