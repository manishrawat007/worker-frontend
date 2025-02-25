import { feeds, passlike } from "@/service/apiUrls";
import { useEffect, useRef, useState } from "react";
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import useFetch from "@/custom/api/Fetch";
import Loader from "@/custom/loader/Loader";
import { Container, CustomActions, CustomCard, CustomCardMedia, HighlightText, LikeButton, MediaContainer, PassButton, ProfileCard, ProfileContainer, ProfileName, SkillLabel, SkillsContainer } from "./UserFeeds.styled";
import { Box } from "@mui/material";

type UserProfile = {
    _id: string;
    firstName: string;
    lastName: string;
    profile: string;
    age: number;
    gender: string;
    skills: string[];
    bio: string;
    cover:string
};

export const UserFeeds = () => {
    const [page, setpage] = useState<number>(1)
    const lastCardRef = useRef<HTMLDivElement | null>(null);
    const { data: feedData, loading, setData: setFeedData, reFetch } = useFetch({
        request: feeds,
        params: page,
    });

    // Function to handle swiping
    const swiped = (direction: string, id: string) => {
        setFeedData((prev: any) => {
            const { data } = prev
            return { data: data.filter((item: any) => item._id != id) }
        })
        passlike(direction, id).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log("err---", err.message)
        })
    };

    useEffect(() => {
        if (!lastCardRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    reFetch()
                }
            },
            { threshold: 1 }
        );

        observer.observe(lastCardRef.current);

        return () => observer.disconnect();
    }, [lastCardRef.current]);

    if (loading || feedData?.data?.length == 0) {
        return <Loader />
    }

    return (
        <Container>
            {feedData?.data?.map((feed: UserProfile, index: number) => (
                <ProfileContainer
                    key={feed._id}
                    ref={index === 0 ? lastCardRef : null}
                    sx={{
                        zIndex: feedData.data.length - index,
                    }}
                >
                    <ProfileCard >
                        <CustomCard bgImage={feed.cover}/>
                        <MediaContainer >
                            <CustomCardMedia
                                image={feed.profile}
                                title={`${feed.firstName} ${feed.lastName}`}
                            />
                            <ProfileName>
                                {feed.firstName} {feed?.lastName ? feed.lastName : ''}
                            </ProfileName>
                        </MediaContainer>
                    </ProfileCard>
                    <CardContent>
                        <SkillsContainer direction="row" spacing={1}>
                            {feed?.skills?.map((skill, index) => (
                                <SkillLabel label={skill} key={index} />
                            ))}
                        </SkillsContainer>
                        <HighlightText>{feed.bio.slice(0,120)}</HighlightText>
                    </CardContent>
                    <CustomActions>
                        <PassButton variant="outlined" onClick={() => swiped("ignored", feed._id)}>Pass</PassButton>
                        <LikeButton variant="contained" onClick={() => swiped("interested", feed._id)}>Like</LikeButton>
                    </CustomActions>
                </ProfileContainer>
            ))}
        </Container>
    );
};

