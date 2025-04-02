import { Container, Heading } from "./Settings.styled"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { PostList } from "../user/userComponent/UsersProfiles";
import { useEffect, useMemo, useState } from "react";
import { getArchievePosts } from "@/service/apiUrls";
import { Post } from "@/pages/user/[id]";


const UserSettings = () => {
    const [archievePosts, setArchievePosts] = useState<any>([])

    useEffect(() => {
        getArchievePosts().then((res) => {
            setArchievePosts(res?.data?.posts)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    const userPosts = useMemo(() => {
        if (archievePosts.length>0) {
            const arr = archievePosts?.map((post: Post) => {
                return {
                    id: post._id,
                    image: post.url,
                    description: post.message || ' '
                }
            })
            return arr
        }
        return []
    }, [archievePosts])

    return (
        <Container>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ height: "30px", width: "30px" }} />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <Heading variant="h6">Archive Posts</Heading>
                </AccordionSummary>
                <AccordionDetails>
                    <PostList posts={userPosts} isArchieve={true}/>
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