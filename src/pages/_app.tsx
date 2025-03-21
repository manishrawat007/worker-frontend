import { UserContext } from "@/component/user/context/UserContext";
import "@/styles/globals.css";
import { ThemeContextProvider } from "@/styles/ThemeProvider";
import { CssBaseline } from "@mui/material";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeContextProvider>
          <ToastContainer position="top-right" autoClose={2000} toastStyle={{ fontSize: "18px" }} />
          <CssBaseline />
          <Component {...pageProps} />
      </ThemeContextProvider>
    </>
  )
}
