import { FC, lazy, Suspense, useState } from 'react';
import { Box } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Loader from '@/custom/loader/Loader';
import AboutUser from './About';
import { useUser } from '../context/UserContext';
import { CoverContainer, EditIconContainer, EditIcons, InsideCover, MainContainer, MoreIconContainer, Profile, ProfileContainer, TabButton, TabListContainer, TabpanelContainer, Tabs, Text } from '../styles/Myprofile.styled';
import EditProfileDialog from './EditDialog';
import { updateProfileAndCoverPic } from '@/service/apiUrls';
import { toast } from 'react-toastify';
const EditProfile = lazy(() => import('./EditProfile'))
const UserList = lazy(() => import('./Follower'))
const IncomingRequests = lazy(() => import('./Request'))

export const MyProfile: FC<{ user: any }> = ({ user }) => {
    const [value, setValue] = useState('1');
    const { userData, setUserData } = useUser()
    const [image, setImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isOpenCover, setIsOpenCover] = useState<boolean>(false)

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const handleOpen = () => {
        setIsOpen(true)
    }

    const handleClose = () => {
        setIsOpen(false)
        setIsOpenCover(false)
        setImage(null)
        setImageUrl(null)
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const url = URL?.createObjectURL(file)
            setImage(file);
            setImageUrl(url)
        }
    };

    const handleReset = () => {
        setImage(null)
        setImageUrl(null)
    }

    const handleUpload = (name: string) => {
        let formData = new FormData()
        if (image instanceof File) {
            formData.append(name, image);
        }
        updateProfileAndCoverPic(formData).then((res) => {
            setUserData((prev: any) => ({ ...prev, profile: res.data.profile, cover: res.data.cover }))
            toast.success("Profile Updated Successfully")
            handleClose()
        }).catch((err) => {
            toast.success("Profile is not updated",err.message)
        })
    };

    return (
        <MainContainer>
            <CoverContainer bgImage={userData.cover}>
                <InsideCover>
                    <ProfileContainer onClick={handleOpen}>
                        <Profile
                            src={userData.profile}
                            alt={userData?.firstName}
                        />
                        <Text variant="h6">{userData?.firstName} {userData?.lastName ? userData.lastName : ''}</Text>
                        <EditIconContainer>
                            <EditIcons/>
                        </EditIconContainer>
                    </ProfileContainer>
                </InsideCover>
                <MoreIconContainer onClick={() => setIsOpenCover(true)}>
                    <EditIcons/>
                </MoreIconContainer>
            </CoverContainer>
            <EditProfileDialog open={isOpen} imageUrl={imageUrl} handleImageChange={handleImageChange} handleReset={handleReset} handleUpload={handleUpload} handleClose={handleClose} type="profilePic" />
            <EditProfileDialog open={isOpenCover} imageUrl={imageUrl} handleImageChange={handleImageChange} handleReset={handleReset} handleUpload={handleUpload} handleClose={handleClose} type="coverPic" />
            <Box>
                <TabContext value={value} >
                    <TabListContainer>
                        <Tabs onChange={handleChange} aria-label="lab API tabs example" >
                            <TabButton label="About" value="1" />
                            <TabButton label="Edit" value="2" />
                            <TabButton label="Connections" value="3" />
                            <TabButton label="Requests" value="4" />
                        </Tabs>
                    </TabListContainer>
                    <Suspense fallback={<Loader />}>
                        <TabpanelContainer>
                            <TabPanel value="1"><AboutUser /></TabPanel>
                            <TabPanel value="2"><EditProfile /></TabPanel>
                            <TabPanel value="3"><UserList /></TabPanel>
                            <TabPanel value="4"><IncomingRequests /></TabPanel>
                        </TabpanelContainer>
                    </Suspense>
                </TabContext>
            </Box>
        </MainContainer>
    );
};