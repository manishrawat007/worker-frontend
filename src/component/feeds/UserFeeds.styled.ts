import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Stack, styled, Typography } from "@mui/material";

export const Container = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: theme.palette.background.default
}))

export const ProfileContainer = styled(Card)(({ theme }) => ({
    position: 'absolute',
    background: theme.palette.background.paper,
    borderRadius: "12px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    minWidth: "350px",
    width: "400px",
    [theme.breakpoints.down("sm")]: {
        width:"350px"
      }
}))

export const CustomCard = styled(Box)<{ bgImage?: string }>(({ bgImage }) => ({
    width: "100%",
    height: "100px",
    background: `url(${bgImage || "https://img.freepik.com/free-vector/copy-space-bokeh-spring-lights-background_52683-55649.jpg"})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative"
}));

export const ProfileCard = styled(Box)(() => ({
    width: "100%",
    position: "relative",
    height: "200px",
    borderBottom: "0.5px solid #DADADA"
}));

export const MediaContainer = styled(Box)(({ theme }) => ({
    position: "absolute",
    top:"10px",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"column",
    height:"100%",
    width:"100%",
    gap:"10px"
}));

export const CustomCardMedia = styled(CardMedia)(() => ({
    height: '130px',
    objectFit: "cover",
    objectPosition: 'center',
    width: "130px",
    border:"5px solid #fff",
    borderRadius: "100%"
}));

export const ProfileName = styled(Typography)(({ theme }) => ({
    fontSize: 4 * theme.typography.fontSize,
    letterSpacing:"0.1px",
    fontWeight:700
}));

export const CustomCardContent = styled(CardContent)(() => ({
    display:"flex",
    flexDirection:"column",
    justifyContent:"flex-start",
    gap:'20px',
    padding:"10px"
}));

export const SkillsContainer = styled(Stack)(() => ({
    display:"flex",
    justifyContent:"space-between",
    overflowX: "auto",
    whiteSpace: "nowrap",
    gap:"10px",
    margin:"0px 0px 10px",
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": {
        display: "none",
    }
}))

export const SkillLabel = styled(Chip)(({ theme }) => ({
    fontSize: 3 * theme.typography.fontSize,
    letterSpacing:"0.1px",
}))

export const HighlightText = styled(Typography)(({ theme }) => ({
    fontSize:3.5*theme.typography.fontSize,
    color:"gray",
    fontWeight:700
}))

export const PassButton = styled(Button)(({ theme }) => ({
    fontSize: 3.4* theme.typography.fontSize,
    letterSpacing:"0.1px",
    color:"gray",
    width:"30%",
    padding:'5px',
    border:"1px solid #CCC"
}))

export const LikeButton = styled(Button)(({ theme }) => ({
    fontSize: 3.4* theme.typography.fontSize,
    letterSpacing:"0.1px",
    color:"white",
    width:"30%",
    padding:'5px'
}))

export const CustomActions = styled(CardActions)(() => ({
    display:"flex",
    justifyContent:"space-between",
    gap:"20px",
    padding:"0px 40px 20px 40px"
}))
