import Layout from '@/component/layout/Layout';
import { PostList, ProfileHeader } from '@/component/user/userComponent/UsersProfiles';
import useFetch from '@/custom/api/Fetch';
import { getUsersDetails } from '@/service/apiUrls';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

export interface Post {
    _id: String,
    url: String,
    message: String
}

const UserPrfile = () => {
    const router = useRouter();
    const { id } = router.query;
    const { data } = useFetch({ request: getUsersDetails, params: id as string })
    const user = data?.user;
    const profile = data?.profile;

    const userDetails = useMemo(() => {
        if (user) {
            const userData = {
                username: user?.firstName + ' ' + (user?.lastName ? user?.lastName : ''),
                profilePicture: user?.profile || 'https://ca.slack-edge.com/T04U03DJ31D-U059TB1UQ2Z-0de02bf4e076-192',
                bio: user?.bio,
                posts: profile?.length,
                followers: 2,
                coverPhoto: user?.cover,
            }
            return userData
        }
        return {}
    }, [user])

    const userPosts = useMemo(() => {
        if (profile) {
            const arr = profile?.map((post: Post) => {
                return {
                    id: post._id,
                    image: post.url,
                    description: post.message || ' '
                }
            })
            return arr
        }
        return []
    }, [profile])

    return (
        <Layout>
            <ProfileHeader user={userDetails} />
                <PostList posts={userPosts} otherUser={true} />
        </Layout>
    );
};

export default UserPrfile;