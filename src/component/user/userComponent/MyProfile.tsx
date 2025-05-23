import { FC, lazy, Suspense, useState } from 'react';
import { Box } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Loader from '@/custom/loader/Loader';
import AboutUser from './About';
import { useUser } from '../context/UserContext';
import FilterIcon from '@mui/icons-material/Filter';
import InfoIcon from '@mui/icons-material/Info';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { CoverContainer, InsideCover, MainContainer, Profile, ProfileContainer, Span, TabButton, TabListContainer, TabpanelContainer, Tabs, Text } from '../styles/Myprofile.styled';
const EditProfile = lazy(() => import('./EditProfile'))
const UploadPosts = lazy(() => import('./UploadPosts'))

export const MyProfile = () => {
    const [value, setValue] = useState('1');
    const { userData } = useUser()

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <MainContainer>
            <CoverContainer bgImage={userData.cover}>
                <InsideCover>
                    <ProfileContainer>
                        <Profile
                            src={userData.profile}
                            alt={userData?.firstName}
                        />
                        <Text variant="h6">{userData?.firstName} {userData?.lastName ? userData.lastName : ''}</Text>
                    </ProfileContainer>
                </InsideCover>
            </CoverContainer>
            <Box>
                <TabContext value={value} >
                    <TabListContainer>
                        <Tabs onChange={handleChange} aria-label="lab API tabs example" >
                            <TabButton label={<Span>
                                <InfoIcon sx={{ height: "15px", width: "15px" }} />
                                About
                            </Span>} value="1" />
                            <TabButton label={<Span>
                                <AssignmentIcon sx={{ height: "15px", width: "15px" }} />
                                Edit Details
                            </Span>} value="2" />
                            <TabButton label={<Span>
                                <FilterIcon sx={{ height: "15px", width: "15px" }} />
                                Upload Images
                            </Span>} value="3" />
                        </Tabs>
                    </TabListContainer>
                    <Suspense fallback={<Loader />}>
                        <TabpanelContainer>
                            <TabPanel value="1"><AboutUser /></TabPanel>
                            <TabPanel value="2"><EditProfile /></TabPanel>
                            <TabPanel value="3"><UploadPosts /></TabPanel>
                        </TabpanelContainer>
                    </Suspense>
                </TabContext>
            </Box>
        </MainContainer>
    );
};