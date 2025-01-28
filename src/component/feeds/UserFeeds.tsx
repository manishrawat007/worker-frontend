import { feeds, passlike } from "@/service/apiUrls";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useFetch from "@/custom/api/Fetch";
import Loader from "@/custom/loader/Loader";

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
    const [page, setpage] = useState<number>(1)
    const { data:feedData, loading ,setData:setFeedData,reFetch} = useFetch({
        request: feeds,
        params: page,
      });

    // Function to handle swiping
    const swiped = (direction: string, id: string) => {
        if (feedData.length == 1) {
            setpage(prev => prev + 1)
            reFetch()
        }
        setFeedData((prev:UserProfile[]) => prev.filter((item) => item._id != id))
        passlike(direction, id).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log("err---", err.message)
        })
    };

    if(loading || feedData.length ==0 ){
        return <Loader/>
    }

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
            {feedData.map((feed:UserProfile, index:number) => (
                <div
                    key={feed._id}
                    style={{
                        position: 'absolute',
                        zIndex: feedData.length - index,
                    }}
                >
                    <Card sx={{ width: '400px', boxShadow: 3 }}>
                        <CardMedia
                            sx={{ height: '300px', objectFit: "cover", objectPosition: 'center' }}
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
                            <Button size="small" onClick={() => swiped("ignored", feed._id)}>Pass</Button>
                            <Button size="small" onClick={() => swiped("interested", feed._id)}>Like</Button>
                        </CardActions>
                    </Card>
                </div>
            ))}
        </Box>
    );
};

