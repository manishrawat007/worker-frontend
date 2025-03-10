import { feeds, passlike } from "@/service/apiUrls";
import { useEffect, useRef, useState } from "react";
import CardContent from "@mui/material/CardContent";
import useFetch from "@/custom/api/Fetch";
import Loader from "@/custom/loader/Loader";
import Slide from "@mui/material/Slide"; // Import MUI Slide
import {
    Container,
    CustomActions,
    CustomCard,
    CustomCardMedia,
    HighlightText,
    LikeButton,
    MediaContainer,
    PassButton,
    ProfileCard,
    ProfileContainer,
    ProfileName,
    SkillLabel,
    SkillsContainer,
} from "./UserFeeds.styled";

type UserProfile = {
    _id: string;
    firstName: string;
    lastName: string;
    profile: string;
    age: number;
    gender: string;
    skills: string[];
    bio: string;
    cover: string;
};

export const UserFeeds = () => {
    const [page, setPage] = useState<number>(1);
    const lastCardRef = useRef<HTMLDivElement | null>(null);
    const { data: feedData, loading, setData: setFeedData, reFetch } = useFetch({
        request: feeds,
        params: page,
    });

    const [swipedId, setSwipedId] = useState<string | null>(null);
    const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | undefined>(undefined);

    const swiped = (direction: "left" | "right", id: string) => {
        setSwipeDirection(direction);
        setSwipedId(id);

        setTimeout(() => {
            setFeedData((prev: any) => {
                const { data } = prev;
                return { data: data.filter((item: any) => item._id !== id) };
            });

            passlike(direction === "left" ? "interested" : "ignored", id)
                .then((res) => console.log(res))
                .catch((err) => console.log("err---", err.message));

            setSwipedId(null);
            setSwipeDirection(undefined);
        }, 500);
    };


    useEffect(() => {
        if (!lastCardRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    reFetch();
                }
            },
            { threshold: 1 }
        );

        observer.observe(lastCardRef.current);

        return () => observer.disconnect();
    }, [lastCardRef.current]);

    if (loading) {
        return <Loader />;
    }

    if (feedData.data.length == 0) {
        return (
            <Container>
                <ProfileContainer>
                    <ProfileCard>
                        <MediaContainer>
                            <CustomCardMedia
                                image="/images/duumy_user.jpg"
                                title="No Data Found"
                            />
                            <ProfileName>No Data Found</ProfileName>
                        </MediaContainer>
                    </ProfileCard>
                    <CardContent>
                        <HighlightText>
                            Oops! It looks like there are no profiles available right now. Please check back later.
                        </HighlightText>
                    </CardContent>
                </ProfileContainer>
            </Container>
        )
    }

    return (
        <Container>
            {feedData?.data?.map((feed: UserProfile, index: number) => (
                <Slide
                    key={feed._id}
                    direction={swipedId === feed._id ? swipeDirection : "down"}
                    in={swipedId !== feed._id}
                    timeout={500}
                    mountOnEnter
                    unmountOnExit
                >
                    <ProfileContainer ref={index === 0 ? lastCardRef : null}>
                        <ProfileCard>
                            <CustomCard bgImage={feed.cover} />
                            <MediaContainer>
                                <CustomCardMedia
                                    image={feed.profile}
                                    title={`${feed.firstName} ${feed.lastName}`}
                                />
                                <ProfileName>
                                    {feed.firstName} {feed?.lastName ? feed.lastName : ""}
                                </ProfileName>
                            </MediaContainer>
                        </ProfileCard>
                        <CardContent>
                            <SkillsContainer direction="row" spacing={1}>
                                {feed?.skills?.map((skill, index) => (
                                    <SkillLabel label={skill} key={index} />
                                ))}
                            </SkillsContainer>
                            <HighlightText>{feed.bio.slice(0, 120)}</HighlightText>
                        </CardContent>
                        <CustomActions>
                            <PassButton variant="outlined" onClick={() => swiped("right", feed._id)}>
                                Pass
                            </PassButton>
                            <LikeButton variant="contained" onClick={() => swiped("left", feed._id)}>
                                Like
                            </LikeButton>
                        </CustomActions>
                    </ProfileContainer>
                </Slide>
            ))}
        </Container>
    );
};
