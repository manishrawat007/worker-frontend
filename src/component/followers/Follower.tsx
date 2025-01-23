import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, CardMedia, Typography, Avatar } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { getfollowers } from "@/service/apiUrls";

interface FollowersTypes{
    _id:string,
    firstName:string,
    lastName:string,
    profile:string
}

const UserList = () => {
    const [users,setUsers] = useState<FollowersTypes[]>([])

      useEffect(()=>{
        handlePendingRequest()
      },[])
    
      const handlePendingRequest=()=>{
        getfollowers().then((res)=>{
            setUsers(res?.data?.data)
        }).catch((err)=>{
            console.log('err-------',err.message)
        })
      }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minHeight: "100vh",
                padding: 4,
                overflow:"hidden",
                height:"100vh"
            }}
        >
            <Typography variant="h6" sx={{ textAlign: "center", marginBottom: 2 }}>
                Followers
            </Typography>
            <Grid container spacing={2} sx={{ maxWidth: 400,overflow:'auto' }}>
                {users.map((user) => (
                    <Grid size={{ xs: 12 }} key={user._id}>
                        <Card sx={{ display: "flex", alignItems: "center", padding: 2 }}>
                            <CardMedia>
                                <Avatar alt={`${user.firstName} ${user.lastName}`} src={user.profile} sx={{ width: 60, height: 60 }} />
                            </CardMedia>
                            <CardContent>
                                <Typography variant="h6">
                                    {user.firstName} {user.lastName}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default UserList;
