import { FC, useEffect, useRef, useState } from 'react';
import { Box, Typography, Grid2 } from '@mui/material';
import { Dialog, DialogContent } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { BioText, CardContainer, CustomAvatar, CustomIcon, DetailsContainer, Image, ImageContainer, InnerContainer, InnerPostsContainer, MainContainer, Menu, MenuItem, PostsContainer, PreviewImageContainer, ProfileContainer, UserNametext } from '../styles/UsersProfiles.styled';
import { Error } from '../../connections/Connections.styled';
import { Heading, ProfileCard } from '../styles/About.styled';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { deletePost, isPostArchive } from '@/service/apiUrls';
import { toast } from 'react-toastify';

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

export const PostList: FC<{ posts: any[], isArchieve?: boolean }> = ({ posts: userPosts, isArchieve = false }) => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState<string | null>("-1")
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [posts, setPosts] = useState(userPosts)

  useEffect(() => {
    if (userPosts.length > 0) {
      setPosts(userPosts)
    }
  }, [userPosts])

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        handleClose();
        setIndex('-1')
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePostArchieve = (id: string) => {
    const payload = {
      archieve: true
    }
    isPostArchive(id, payload).then(() => {
      setIndex('-1')
      setPosts((prev) => prev.filter((post) => post.id != id))
    }).catch((err) => {
      toast.error("Post is not archieve")
    })
  }

  const handleDeletePost = (id: string) => {
    deletePost(id).then(() => {
      setIndex('-1')
      setPosts((prev) => prev.filter((post) => post.id != id))
    }).catch((err) => {
      toast.error("Post is not deleted")
    })
  }

  return (
    <Box sx={{ padding: 2 }}>
      {!isArchieve &&
        <Heading variant="h5" >Posts</Heading>
      }
      <ProfileCard>
        <Grid2 container spacing={2}>
          {posts.length > 0 ? posts.map((post) => (
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={post.id}>
              <CardContainer
                onClick={() => handleImageClick(post.image)}
              >
                <ImageContainer>
                  <Image
                    src={post.image}
                    alt={post.description}
                  />
                  <CustomIcon onClick={(e) => { setIndex((prev) => prev == post.id ? "0" : post.id), e.stopPropagation() }}><MoreVertIcon sx={{ height: "20px", width: "20px" }} /></CustomIcon>
                  {index == post.id &&
                    <Menu onClick={(e) => e.stopPropagation()} ref={menuRef}>
                      <MenuItem onClick={() => handlePostArchieve(post.id)}>Archive</MenuItem>
                      <MenuItem onClick={() => { handleDeletePost(post.id) }}>Delete</MenuItem>
                    </Menu>
                  }
                </ImageContainer>
                <Typography variant="body2" sx={{ padding: 1 }}>
                  {post.description || ''}
                </Typography>
              </CardContainer>

            </Grid2>
          )) :
            <Grid2 size={{ xs: 12, sm: 12, md: 12 }}>
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
