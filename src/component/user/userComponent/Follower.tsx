import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, CardMedia, Avatar } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { getfollowers } from "@/service/apiUrls";
import { useRouter } from "next/router";
import { Container, CustomCard, CustomMainCard, CustomText, Error, Heading } from "../styles/Connections.styled";
import { ProfileCard } from "../styles/About.styled";
import { Accept } from "../styles/Request.styled";
import Loader from "@/custom/loader/Loader";

interface FollowersTypes {
    _id: string,
    firstName: string,
    lastName: string,
    profile: string
}

const UserList = () => {
    const router = useRouter();
    const [users, setUsers] = useState<FollowersTypes[] | null>(null)

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

    if (!users) {
        return <Loader />
    }

    return (
        <Container>
            <Heading variant="h5">Connections</Heading>
            <ProfileCard >
                <Grid container spacing={2}>
                    {users.length > 0 ? users?.map((user) => (
                        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 6 }} key={user._id} onClick={(e) => {
                            router.push(`/user/${user._id}`),
                                e.stopPropagation()
                        }}>
                            <CustomMainCard>
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
                                <Accept
                                    variant="contained"
                                    size="small"
                                    onClick={(e) => {
                                        e.stopPropagation(),
                                            router.push(`/chat/${user._id}`)
                                    }}
                                >
                                    Message
                                </Accept>
                            </CustomMainCard>
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
