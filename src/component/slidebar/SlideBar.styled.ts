import { IconButton, ListItemIcon, ListItemText, styled, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export const Icons = styled(IconButton)(() => ({
    position: "absolute",
    top: 16,
    left: 16,
    zIndex: 999,
}))

export const MenuBar = styled(MenuIcon)(() => ({
    height:"30px",
    width:"30px"
}))

export const CustomListItem = styled(ListItemIcon)(({ theme }) => ({
    fontWeight:900,
    minWidth: "30px", 
    "& svg": { fontSize:5*theme.typography.fontSize}
}))

export const CustomListItemText = styled(ListItemText)(({ theme }) => ({
    fontWeight:900,
    color:theme.palette.text.primary,
    "& .MuiTypography-root": { 
        fontSize: 4*theme.typography.fontSize,
     }
}))