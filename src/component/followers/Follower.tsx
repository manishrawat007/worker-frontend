import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, CardMedia, Typography, Avatar } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { getfollowers } from "@/service/apiUrls";
import { useRouter } from "next/router";
import { Container, CustomCard, CustomText, Error, Heading } from "../user/styles/Connections.styled";
import { ProfileCard } from "../user/styles/About.styled";

interface FollowersTypes {
    _id: string,
    firstName: string,
    lastName: string,
    profile: string
}

const UserList = () => {
    const router = useRouter();
    const [users, setUsers] = useState<FollowersTypes[]>([])

    useEffect(() => {
        handlePendingRequest()
    }, [])

    const handlePendingRequest = () => {
        getfollowers().then((res) => {
            setUsers(res?.data?.data)
        }).catch((err) => {
            console.log('err-------', err.message)
        })
    }

    return (
        <Container>
            <Heading variant="h5">Connections</Heading>
            <ProfileCard >
                <Grid container spacing={2}>
                    {users.length > 0 ? users?.map((user) => (
                        <Grid size={{ xs: 12, sm: 6, md: 6 }} key={user._id} onClick={(e) => {
                            router.push(`/user/${user._id}`),
                                e.stopPropagation()
                        }}>
                            <CustomCard>
                                <CardMedia>
                                    <Avatar alt={`${user.firstName} ${user.lastName}`} src={user.profile} sx={{ width: 40, height: 40 }} />
                                </CardMedia>
                                <CardContent>
                                    <CustomText>
                                        {user?.firstName} {user?.lastName}
                                    </CustomText>
                                </CardContent>
                            </CustomCard>
                        </Grid>
                    )) : (
                        <Grid size={{ xs: 12 }}>
                            <Error>No User Found</Error>
                        </Grid>
                    )}
                </Grid>
            </ProfileCard>
        </Container>
    );
};

export default UserList;
