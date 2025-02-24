import Layout from "@/component/layout/Layout"
import { UserContext } from "@/component/user/context/UserContext"
import { MyProfile } from "@/component/user/userComponent/MyProfile"
import { useMemo } from "react"

const ViewProfile = () => {

    const userDetails = useMemo(() => {
        const user = {
            username: "Manish Rawat",
            profilePicture: 'https://ca.slack-edge.com/T04U03DJ31D-U059TB1UQ2Z-0de02bf4e076-192',
            bio: "I am a Full Stack Developer",
            posts: 8,
            followers: 0,
            following: 0,
            coverPhoto: 'https://placekitten.com/1200/400',
        }
        return user
    }, [])
    return (
        <Layout>
            <UserContext>
                <MyProfile user={userDetails} />
            </UserContext>
        </Layout>
    )
}
export default ViewProfile