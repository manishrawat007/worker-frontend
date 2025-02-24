import Layout from '@/component/layout/Layout';
import { PostList, ProfileHeader } from '@/component/user/userComponent/UsersProfiles';
import useFetch from '@/custom/api/Fetch';
import { getUsersDetails } from '@/service/apiUrls';
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

    const userDetails = useMemo(() => {
        if (data) {
            const user = {
                username: data.user.firstName + ' ' + (data?.user?.lastName ?  data?.user?.lastName :'') ,
                profilePicture: data.user.profile || 'https://ca.slack-edge.com/T04U03DJ31D-U059TB1UQ2Z-0de02bf4e076-192',
                bio: data.user.bio,
                posts: data.profile.length,
                followers: 1540,
                following: 180,
                coverPhoto: 'https://placekitten.com/1200/400',
            }
            return user
        }
        return {}
    }, [data])

    const userPosts = useMemo(() => {
        if (data) {
            const arr = data?.profile?.map((post: Post) => {
                return {
                    id: post._id,
                    image: post.url,
                    description: post.message || ' '
                }
            })
            return arr
        }
        return []
    }, [data?.profile])

    return (
        <Layout>
            <ProfileHeader user={userDetails} />
            <PostList posts={userPosts} />

        </Layout>
    );
};

export default UserPrfile;