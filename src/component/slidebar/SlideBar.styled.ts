import { Avatar, Box, IconButton, ListItem, ListItemIcon, ListItemText, styled, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export const Icons = styled(IconButton)(() => ({
    position: "absolute",
    top: 16,
    left: 16,
    zIndex: 999,
}))

export const MenuBar = styled(MenuIcon)(({ theme }) => ({
    height: "30px",
    width: "30px",
    color: theme.palette.primary.main
}))

export const CustomList = styled(ListItem)(() => ({
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "10px",
    padding: "5px 20px",
    boxShadow: "1px 2px 2px #CCC"
}))

export const CustomListItem = styled(ListItemIcon)<{ dark: boolean }>(({ theme, dark }) => ({
    minWidth: "30px",
    "& svg": {
        fontSize: 5 * theme.typography.fontSize,
        fontWeight: 1000,
        color: dark ? "white" : "black"
    }
}))

export const CustomListItemText = styled(ListItemText)(({ theme }) => ({
    color: theme.palette.text.primary,
    "& .MuiTypography-root": {
        fontSize: 4 * theme.typography.fontSize,
        fontWeight: 700,
    }
}))

export const CoverContainer = styled(Box)(() => ({
    position: 'relative',
    width: '100%',
    height: '200px',
    background: "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(238,119,119,1) 50%, rgba(252,176,69,1) 100%)",
    backgroundPosition: 'center',
}))

export const ProfileContainer = styled(Box)(() => ({
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
    height: "200px",
    width: "100%",
}));

export const Profile = styled(Avatar)(() => ({
    width: 100,
    height: 100,
    border: `4px solid #fff`,
    boxShadow: "1px 1px 10px rgba(0, 0, 0, 0.2)",
    fontSize: '32px',
    fontWeight: 700
}));