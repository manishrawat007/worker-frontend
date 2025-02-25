import { FC, lazy, Suspense, useState } from 'react';
import { Box } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Loader from '@/custom/loader/Loader';
import AboutUser from './About';
import { useUser } from '../context/UserContext';
import EditIcon from '@mui/icons-material/Edit';
import { CoverContainer, EditIconContainer, InsideCover, MainContainer, Profile, ProfileContainer, TabButton, TabListContainer, TabpanelContainer, Tabs, Text } from '../styles/Myprofile.styled';
const EditProfile = lazy(() => import('./EditProfile'))
const UserList = lazy(() => import('./Follower'))
const IncomingRequests = lazy(() => import('./Request'))

export const MyProfile: FC<{ user: any }> = ({ user }) => {
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
                        <EditIconContainer>
                            <EditIcon sx={{height:"30px",width:"30px"}}/>
                        </EditIconContainer>
                    </ProfileContainer>
                </InsideCover>
            </CoverContainer>
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