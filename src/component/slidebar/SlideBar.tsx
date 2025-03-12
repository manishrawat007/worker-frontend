import React, { useContext, useState } from "react";
import { Box, Drawer, List } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ContrastIcon from '@mui/icons-material/Contrast';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useRouter } from "next/router";
import { logout } from "@/service/apiUrls";
import LogoutIcon from '@mui/icons-material/Logout';
import ThemeToggle from "./ThemeToggle";
import DetailsIcon from '@mui/icons-material/Details';
import { ThemeContext } from "@/styles/ThemeProvider";
import MessageIcon from '@mui/icons-material/Message';
import { CustomList, CustomListItem, CustomListItemText, Icons, MenuBar } from "./SlideBar.styled";
import { toast } from "react-toastify";

const SideSlideBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const router = useRouter()
  const { darkMode } = useContext(ThemeContext)

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    setIsDrawerOpen(open);
  };

  const handleLogout = () => {
    logout().then((res) => {
      localStorage.setItem('token', "");
      router.push('/')
      toast.success("Logout successfull")
    }).catch((err) => {
      toast.error("Logout unsuccessfull")
    })
  }

  return (
    <Box>
      <Icons
        onClick={() => setIsDrawerOpen(true)}
      >
        <MenuBar />
      </Icons>

      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List style={{ cursor: "pointer" }}>
            <CustomList onClick={() => router.push('/feeds')}>
              <CustomListItem dark={darkMode}>
                <HomeIcon />
              </CustomListItem>
              <CustomListItemText primary="Feeds" />
            </CustomList>
            <CustomList onClick={() => { router.push('/messages') }}>
              <CustomListItem dark={darkMode}>
                <MessageIcon />
              </CustomListItem>
              <CustomListItemText primary="Messages" />
            </CustomList>
            <CustomList onClick={() => { router.push('/connections') }}>
              <CustomListItem dark={darkMode}>
                <MessageIcon />
              </CustomListItem>
              <CustomListItemText primary="Connections" />
            </CustomList>
            <CustomList onClick={() => { router.push('/requests') }}>
              <CustomListItem dark={darkMode}>
                <MessageIcon />
              </CustomListItem>
              <CustomListItemText primary="Requests" />
            </CustomList>
            <CustomList onClick={() => { router.push('/user/profile') }}>
              <CustomListItem dark={darkMode}>
                <DetailsIcon />
              </CustomListItem>
              <CustomListItemText primary="Details" />
            </CustomList>
            <CustomList>
              <CustomListItem dark={darkMode}>
                {darkMode ? <DarkModeIcon /> : <ContrastIcon />}
              </CustomListItem>
              <ThemeToggle />
            </CustomList>
            <CustomList onClick={handleLogout}>
              <CustomListItem dark={darkMode}>
                <LogoutIcon />
              </CustomListItem>
              <CustomListItemText primary="Logout" />
            </CustomList>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default SideSlideBar;
