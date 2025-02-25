import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/system";

export const MainContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: '100%'
}))

export const InnerContainer = styled(Box)<{ bgImage: string }>(({ bgImage }) => ({
    width: '100%',
    height: '150px',
    backgroundImage: `url(${bgImage}) || ''`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '8px 8px 0 0',
    background: "linear-gradient(180deg, #95b79c 0%, #70d2d0 100%)"
}))

export const ProfileContainer = styled(Box)(() => ({
    position: 'absolute',
    top: '65px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1,
}))

export const CustomAvatar = styled(Avatar)(() => ({
    width: "150px",
    height: "150px",
    border: '4px solid white',
    boxShadow: "2px 4px 10px gray"
}))

export const ProfileContainers = styled(Box)(() => ({
    position: 'absolute',
    top: '65px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1,
}))

export const DetailsContainer = styled(Box)(() => ({
    padding: "2px",
    textAlign: 'center',
    marginTop: "80px"
}))

export const UserNametext = styled(Typography)(({ theme }) => ({
    fontSize: "20px",
    fontWeight: 800,
    textAlign: "center",
    color: theme.palette.text.primary
}))

export const BioText = styled(Typography)(({ theme }) => ({
    marginBottom: '20px',
    color: theme.palette.text.secondary,
    fontSize: "14px",
    fontWeight: 600
}))

export const PostsContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    gap: "20px"
}))

export const InnerPostsContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    gap: "10px",
    flexDirection: "column"
}))

export const CardContainer = styled(Box)(({ theme }) => ({
    border: '1px solid #ddd',
    borderRadius: "10px",
    overflow: 'hidden',
    boxShadow: "1px 5px 10px gray",
    cursor: 'pointer',
    height: "300px",
}))

export const ImageContainer = styled('img')(({ theme }) => ({
    width: '100%',
    height: '250px',
    objectFit: 'fill'
}))

export const CustomIcon = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    color: "gray"
}))

export const PreviewImageContainer = styled('img')(({ theme }) => ({
    width: '100%',
    height: '500px',
    objectFit: 'fill',
}))




