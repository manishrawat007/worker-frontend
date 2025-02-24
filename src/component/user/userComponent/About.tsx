import { memo, useMemo } from "react"
import useFetch from "@/custom/api/Fetch"
import { getUsersDetails } from "@/service/apiUrls"
import { Post } from "@/pages/user/[id]"
import React from "react";
import { Box, Typography, Grid2, Chip, Stack } from "@mui/material";
import { useUser } from "../context/UserContext"
import { PostList } from "./UsersProfiles";
import { CustomChip, Heading, HighlightText, ProfileCard, Text, UserDetailsBox } from "../styles/About.styled";

const AboutUser = () => {
    const { userData } = useUser()
    const { data: posts } = useFetch({ request: getUsersDetails, params: userData?._id as string })

    const userPosts = useMemo(() => {
        if (posts) {
            const arr = posts?.profile?.map((post: Post) => {
                return {
                    id: post._id,
                    image: post.url,
                    description: post.message || ' '
                }
            })
            return arr
        }
        return []
    }, [posts?.profile])

    if (Object.keys(userData).length == 0) {
        return null
    }

    return (
        <>
            <UserDetailsBox>
                <Heading variant="h5">Personal Information</Heading>
                <ProfileCard>
                    <Grid2 container spacing={4}>
                        <Grid2 size={{ xs: 12, md: 9, sm: 6 }}>
                            <Stack spacing={1} >
                                <Text><b>Birthday:</b> 23/07/2001</Text>
                                <Text><b>Age:</b> {userData.age}</Text>
                                <Text><b>Gender:</b>{userData.gender.charAt(0).toUpperCase() + userData.gender.slice(1)}</Text>
                                <Text><b>Address:</b> Manpur,Palwal</Text>
                            </Stack>
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 3, sm: 6 }} >
                            <Stack spacing={1}>
                                <Text><b>Email:</b>{userData.email}</Text>
                                <Text><b>Phone:</b>**********</Text>
                                <Text><b>Freelance:</b> {true ? "Available" : "Not Available"}</Text>
                            </Stack>
                        </Grid2>
                    </Grid2>
                    <Stack direction="row" spacing={2} mt={3} mb={3}>
                        {userData?.skills.map((skill: String, index: number) => (
                            <CustomChip key={index} label={skill} />
                        ))}
                    </Stack>
                    <HighlightText variant="h6">{userData.bio}</HighlightText>
                </ProfileCard>
                <Box>
                    <Heading variant="h5" >Posts</Heading>
                    <ProfileCard>
                        <PostList posts={userPosts} />
                    </ProfileCard>
                </Box>

            </UserDetailsBox>

        </>
    )
}
export default memo(AboutUser)