import { useRouter } from "next/router";
import SideSlideBar from "../slidebar/SlideBar";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { UserContext } from "../user/context/UserContext";

const Layout = ({ children }: any) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token")
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
    <UserContext>
      <SideSlideBar />
      <Box>{children}</Box>
    </UserContext>
  );
};

export default Layout;
