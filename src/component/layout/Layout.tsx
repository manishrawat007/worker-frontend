import { useRouter } from "next/router";
import SideSlideBar from "../slidebar/SlideBar";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Box } from "@mui/material";

const Layout = ({ children }: any) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      router.push("/");
    }
  }, [router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Box >
      <SideSlideBar />
      <Box>{children}</Box>
    </Box>
  );
};

export default Layout;
