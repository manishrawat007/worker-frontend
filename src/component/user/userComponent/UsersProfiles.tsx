import { FC, useState } from 'react';
import { Box, Typography, Grid2 } from '@mui/material';
import { Dialog, DialogContent } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { BioText, CardContainer, CustomAvatar, CustomIcon, DetailsContainer, ImageContainer, InnerContainer, InnerPostsContainer, MainContainer, PostsContainer, PreviewImageContainer, ProfileContainer, UserNametext } from '../styles/UsersProfiles.styled';
import { Error } from '../styles/Connections.styled';
import { Heading, ProfileCard } from '../styles/About.styled';

export const ProfileHeader: FC<{ user: any }> = ({ user }) => {
  return (
    <MainContainer>
      <InnerContainer bgImage={user.coverPhoto} />
      <ProfileContainer>
        <CustomAvatar
          src={user.profilePicture}
          alt={user.username}
        />
      </ProfileContainer>
      <DetailsContainer>
        <UserNametext>
          {user.username}
        </UserNametext>
        <BioText>
          {user.bio}
        </BioText>
        <PostsContainer>
          <InnerPostsContainer>
            <Typography variant="body2">{user.posts}</Typography>
            <Typography variant="body2"> Posts</Typography>
          </InnerPostsContainer>
          <InnerPostsContainer>
            <Typography variant="body2">{user.followers}</Typography>
            <Typography variant="body2">Connections</Typography>
          </InnerPostsContainer>
        </PostsContainer>
      </DetailsContainer>
    </MainContainer>
  );
};

export const PostList: FC<{ posts: any[] }> = ({ posts }) => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Heading variant="h5" >Posts</Heading>
      <ProfileCard>
        <Grid2 container spacing={2}>
          {posts.length > 0 ? posts.map((post) => (
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={post.id}>
              <CardContainer
                onClick={() => handleImageClick(post.image)}
              >
                <ImageContainer
                  src={post.image}
                  alt={post.description}
                />
                <Typography variant="body2" sx={{ padding: 1 }}>
                  {post.description || ''}
                </Typography>
              </CardContainer>

            </Grid2>
          )) :
            <Grid2 size={{ xs: 12, sm: 6, md: 12 }}>
              <Error>No Post found</Error>
            </Grid2>
          }

        </Grid2>
      </ProfileCard>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogContent sx={{ padding: 0 }}>
          <Box sx={{ position: 'relative' }}>
            <CustomIcon
              onClick={handleClose}
            >
              <CloseIcon sx={{ height: "20px", width: "20px" }} />
            </CustomIcon>
            <PreviewImageContainer
              src={selectedImage ?? ''}
              alt="Preview"
            />
          </Box>
        </DialogContent>
      </Dialog>
    </Box >
  );
};
