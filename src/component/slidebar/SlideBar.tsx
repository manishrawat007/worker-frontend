import React, { useContext, useState } from "react";
import { Box, Drawer, List, ListItem } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ContrastIcon from '@mui/icons-material/Contrast';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useRouter } from "next/router";
import { logout } from "@/service/apiUrls";
import LogoutIcon from '@mui/icons-material/Logout';
import Cookies from 'js-cookie';
import ThemeToggle from "./ThemeToggle";
import DetailsIcon from '@mui/icons-material/Details';
import { ThemeContext } from "@/styles/ThemeProvider";
import { CustomListItem, CustomListItemText, Icons, MenuBar } from "./SlideBar.styled";

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
      Cookies.set('token', "");
      router.push('/')
    }).catch((err) => {
      console.log('some error in logout', err)
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
            <ListItem onClick={() => router.push('/feeds')}>
              <CustomListItem>
                <HomeIcon />
              </CustomListItem>
              <CustomListItemText primary="Home" />
            </ListItem>
            <ListItem onClick={() => { router.push('/user/profile') }}>
              <CustomListItem>
                <DetailsIcon />
              </CustomListItem>
              <CustomListItemText primary="Details" />
            </ListItem>
            <ListItem>
              <CustomListItem>
                {darkMode ? <DarkModeIcon /> : <ContrastIcon />}
              </CustomListItem>
              <ThemeToggle />
            </ListItem>
            <ListItem onClick={handleLogout}>
              <CustomListItem>
                <LogoutIcon />
              </CustomListItem>
              <CustomListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default SideSlideBar;
