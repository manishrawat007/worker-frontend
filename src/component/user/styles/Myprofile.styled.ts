import { TabList } from "@mui/lab";
import { Avatar, Box, styled, Tab, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

export const MainContainer = styled(Box)(() => ({
  width: '100%',
  height: "100vh",
  overflowY: "auto",
  scrollbarWidth: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
}))

export const CoverContainer = styled(Box)<{ bgImage?: string }>(({ bgImage }) => ({
  position: 'relative',
  width: '100%',
  height: '300px',
  backgroundImage: bgImage ? `url(${bgImage})` : '/images/duumy_user.jpg',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}))

export const MoreIconContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  zIndex: 2,
  right: "20px",
  bottom: "20px",
  backgroundColor: theme.palette.background.paper,
  height: "40px",
  width: "40px",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
}));

export const InsideCover = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "45%",
  left: "40px",
  zIndex: 1,

  [theme.breakpoints.down("sm")]: {
    position: "static",
    top: "auto",
    left: "auto",
    zIndex: "auto",
  }
}));

export const ProfileContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  flexDirection: "row",
  alignItems: "center",
  height: "300px",
  position: "relative",

  [theme.breakpoints.down("sm")]: {
    justifyContent: "center",
    flexDirection: "column",
  },
}));

export const ProfileBox = styled(Avatar)(({ theme }) => ({
  width: 150,
  height: 150,
  border: `4px solid ${theme.palette.text.primary}`,
  boxShadow: "1px 1px 10px rgba(0, 0, 0, 0.2)",
}));

export const Profile = styled(Avatar)(({ theme }) => ({
  width: 150,
  height: 150,
  border: `4px solid #fff`,
  boxShadow: "1px 1px 10px rgba(0, 0, 0, 0.2)",
  fontSize: 8 * theme.typography.fontSize,
  fontWeight: 700
}));

export const EditIconContainer = styled(Avatar)(({ theme }) => ({
  position: "absolute",
  height: "40px",
  width: "40px",
  backgroundColor: theme.palette.background.paper,
  borderRadius: "50%",
  left: "110px",
  top: "82px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  [theme.breakpoints.down("sm")]: {
    left: "59%",
    top: "60px"
  },
}));

export const EditIcons = styled(EditIcon)(({ theme }) => ({
  height: "30px",
  width: "30px",
  color: theme.palette.text.primary
}));

export const Span = styled("span")(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
}));

export const Text = styled(Typography)(({ theme }) => ({
  margin: "0px 10px",
  color: "#fff",
  [theme.breakpoints.down("sm")]: {
    margin: "10px 0px",
  },
}));

export const TabListContainer = styled(Box)(({ theme }) => ({
  borderBottom: 1,
  borderColor: 'divider'
}));

export const TabpanelContainer = styled(Box)(({ theme }) => ({
  padding: "20px",
  [theme.breakpoints.down("sm")]: {
    padding: "5px",
  }
}));

export const Tabs = styled(TabList)(({ theme }) => ({
  "& .MuiTabs-flexContainer": {
    gap: "10px",
    justifyContent: "flex-end",
    width: "100vw",
    display: "flex",
    padding: "0px 10px",
    zIndex: "5",
    position: "relative",
  },
  [theme.breakpoints.down("sm")]: {
    "& .MuiTabs-flexContainer": {
      justifyContent: "space-around",
      gap: "0px"
    }
  }
}));

export const TabButton = styled(Tab)(({ theme }) => ({
  fontSize: 3 * theme.typography.fontSize,
  color: theme.palette.text.primary
}));


