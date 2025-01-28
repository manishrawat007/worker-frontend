import React, { useState } from "react";
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import RequestPageIcon from '@mui/icons-material/RequestPage';
import { useRouter } from "next/router";
import { logout } from "@/service/apiUrls";
import LogoutIcon from '@mui/icons-material/Logout';
import Cookies from 'js-cookie';

const SideSlideBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const router = useRouter()

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    setIsDrawerOpen(open);
  };

  const handleLogout=()=>{
    logout().then((res)=>{
      Cookies.set('token',"");
      router.push('/')
    }).catch((err)=>{
      console.log('some error in logout',err)
    })
  }

  return (
    <Box>
      {/* Menu Button */}
      <IconButton
        onClick={() => setIsDrawerOpen(true)}
        sx={{ position: "absolute", top: 16, left: 16 }}
      >
        <MenuIcon />
      </IconButton>

      {/* Drawer */}
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List style={{cursor:"pointer"}}>
            <ListItem  onClick={()=>router.push('/feeds')}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem onClick={()=>{router.push('/requests')}}>
              <ListItemIcon>
                <RequestPageIcon />
              </ListItemIcon>
              <ListItemText primary="Requests" />
            </ListItem>
            <ListItem onClick={()=>{router.push('/followers')}}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Followers" />
            </ListItem>
            <ListItem onClick={()=>{router.push('/update')}}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Details" />
            </ListItem>
            <ListItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default SideSlideBar;
