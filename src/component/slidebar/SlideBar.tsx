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
import { CoverContainer, CustomList, CustomListItem, CustomListItemText, Icons, MenuBar, Profile, ProfileContainer } from "./SlideBar.styled";
import { toast } from "react-toastify";
import { Text } from "../user/styles/Myprofile.styled";
import { useUser } from "../user/context/UserContext";
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';

const SideSlideBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const router = useRouter()
  const { darkMode } = useContext(ThemeContext)
  const { userData, setUserData} = useUser()

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
    logout().then(() => {
      setUserData({})
      localStorage.removeItem('token');
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
          <CoverContainer>
            <ProfileContainer>
              <Profile
                src={userData.profile}
                alt={userData.firstName}
              />
              <Text variant="h6">{userData?.firstName} {userData?.lastName ? userData.lastName : ''}</Text>
            </ProfileContainer>
          </CoverContainer>
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
                <SensorOccupiedIcon />
              </CustomListItem>
              <CustomListItemText primary="Connections" />
            </CustomList>
            <CustomList onClick={() => { router.push('/requests') }}>
              <CustomListItem dark={darkMode}>
                <MoveToInboxIcon />
              </CustomListItem>
              <CustomListItemText primary="Requests" />
            </CustomList>
            <CustomList onClick={() => { router.push('/user/profile') }}>
              <CustomListItem dark={darkMode}>
                <DetailsIcon />
              </CustomListItem>
              <CustomListItemText primary="My Profile" />
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
