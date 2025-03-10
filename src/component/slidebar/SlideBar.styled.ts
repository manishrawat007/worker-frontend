import { IconButton, ListItem, ListItemIcon, ListItemText, styled, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export const Icons = styled(IconButton)(() => ({
    position: "absolute",
    top: 16,
    left: 16,
    zIndex: 999,
}))

export const MenuBar = styled(MenuIcon)(({theme}) => ({
    height: "30px",
    width: "30px",
    color:theme.palette.primary.main
}))

export const CustomList = styled(ListItem)(() => ({
   display:"flex",
   justifyContent:"flex-start",
   alignItems:"center",
   gap:"10px",
   padding:"5px 30px"
}))

export const CustomListItem = styled(ListItemIcon)<{dark:boolean}>(({ theme,dark }) => ({
    minWidth: "30px",
    "& svg": {
        fontSize: 6 * theme.typography.fontSize,
        fontWeight: 1000,
        color:dark ? "white" : "black"
    }
}))

export const CustomListItemText = styled(ListItemText)(({ theme }) => ({
    color: theme.palette.text.primary,
    "& .MuiTypography-root": {
        fontSize: 5 * theme.typography.fontSize,
        fontWeight: 700,
    }
}))