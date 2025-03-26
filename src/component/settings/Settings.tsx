import { Container, Heading, ProfileCard } from "./Settings.styled"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { PostList } from "../user/userComponent/UsersProfiles";
import { useEffect, useMemo, useState } from "react";
import { getArchievePosts } from "@/service/apiUrls";
import { Post } from "@/pages/user/[id]";


const UserSettings = () => {
    const [archievePosts, setArchievePosts] = useState<any>([])

    useEffect(() => {
        getArchievePosts().then((res) => {
            console.log("res-----",res)
            setArchievePosts(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    const userPosts = useMemo(() => {
        if (archievePosts) {
            const arr = archievePosts?.profile?.map((post: Post) => {
                return {
                    id: post._id,
                    image: post.url,
                    description: post.message || ' '
                }
            })
            return arr
        }
        return []
    }, [archievePosts?.profile])

    console.log(userPosts,"---------userposts")

    return (
        <Container>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ height: "30px", width: "30px" }} />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <Heading variant="h6">Archieve Posts</Heading>
                </AccordionSummary>
                <AccordionDetails>
                    <PostList posts={[]} isArchieve={true} />
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ height: "30px", width: "30px" }} />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <Heading variant="h6">Block Accounts</Heading>
                </AccordionSummary>
                <AccordionDetails>
                    <PostList posts={[]} isArchieve={true} />
                </AccordionDetails>
            </Accordion>
        </Container>
    )

}
export default UserSettings