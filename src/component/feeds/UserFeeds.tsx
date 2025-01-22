import { feeds, passlike } from "@/service/apiUrls";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TinderCard from 'react-tinder-card';  // Import the TinderCard component

type UserProfile = {
    _id: string;
    firstName: string;
    lastName: string;
    profile: string;
    age: number;
    gender: string;
    skills: string[];
    bio: string;
};

export const UserFeeds = () => {
    const [feedData, setFeedData] = useState<UserProfile[] | []>([]);
    const [page,setpage]=useState<number>(1)

    useEffect(() => {
        feedapi()
    }, []);

    const feedapi=()=>{
        feeds(page).then((res) => {
            setFeedData(res?.data?.data);
        }).catch((err) => {
            console.error("Error fetching data:", err);
        });
    }

    // Function to handle swiping
    const swiped = (direction: string, id: string) => {
        if(feedData.length==1){
            setpage(prev=>prev+1)
            feedapi()
        }
        setFeedData((prev)=>prev.filter((item)=>item._id != id))
        passlike(direction,id).then((res)=>{
            console.log(res)
        }).catch((err)=>{
            console.log("err---",err.message)
        })
    };

    return (
        <Box
            sx={{
                position: 'relative',
                width: '100vw',
                maxWidth: '600px',
                height: '100vh',
                margin: 'auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {feedData.map((feed, index) => (
                <div
                    key={feed._id}
                    style={{
                        position: 'absolute',
                        zIndex: feedData.length - index,
                    }}
                >
                    <TinderCard
                        onSwipe={(dir) => swiped(dir, feed._id)}
                        preventSwipe={['up', 'down']}
                        className="swipe-card"
                    >
                        <Card sx={{ width: '400px', boxShadow: 3 }}>
                            <CardMedia
                                sx={{ height: '300px',objectFit: "cover",objectPosition: 'center' }}
                                image={feed.profile}
                                title={`${feed.firstName} ${feed.lastName}`}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {feed.firstName} {feed.lastName}
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    {feed?.skills?.map((skill, index) => (
                                        <Typography key={index} variant="body2" sx={{ color: 'gray' }}>
                                            {skill}
                                        </Typography>
                                    ))}
                                </Box>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {feed.bio}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => swiped("ignored",feed._id)}>Pass</Button>
                                <Button size="small" onClick={() => swiped("interested",feed._id)}>Like</Button>
                            </CardActions>
                        </Card>
                    </TinderCard>
                </div>
            ))}
        </Box>
    );
};

