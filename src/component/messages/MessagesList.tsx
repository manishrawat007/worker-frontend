import { Avatar, CardContent, CardMedia, Grid2 } from "@mui/material"
import { Container, CustomCard, CustomMainCard, CustomText, Error, Heading, ProfileCard } from "../user/styles/Connections.styled"
import { Accept } from "../user/styles/Request.styled"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { userMessagesList } from "@/service/apiUrls"
import Loader from "@/custom/loader/Loader"
import { Inputfield } from "../login/Login.styled"

const MessageList = () => {
    const router = useRouter()
    const [users, setUsers] = useState<any[] | null>(null)

    useEffect(() => {
        userMessagesList().then((res) => {
            setUsers(res?.data?.userList)
        }).catch((err) => {
            console.log("err--------", err)
        })
    }, [])

    if (!users) {
        return <Loader />
    }
    return (
        <>
            <Container>
                <Heading variant="h5">Messages</Heading>
                <ProfileCard >
                    <Inputfield
                        label="Start a new Conversation"
                        type="text"
                        fullWidth
                        onChange={()=>{}}
                        margin="normal"
                    />
                    <Grid2 container spacing={2}>
                        {users.length > 0 ? users?.map((user) => (
                            <Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 6 }} key={user._id} onClick={(e) => {
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
                            </Grid2>
                        )) :
                            <Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                                <Heading variant="h6">No messages yet! Start a conversation and make a connection.</Heading>
                            </Grid2>
                        }
                    </Grid2>
                </ProfileCard>
            </Container>
        </>
    )
}
export default MessageList