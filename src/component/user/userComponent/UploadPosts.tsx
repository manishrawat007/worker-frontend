import { Box } from "@mui/material";
import { ButtonsContainer, ChooseImage, Close, CloseContainer, FormContainer, Heading, PostContainer, PreviewContainer, PreviewImage, ProfileCard, ResetButton, StyledButton } from "../styles/Edit.styled";
import { Inputfield } from "@/component/login/Login.styled";
import { useState } from "react";
import { toast } from "react-toastify";
import { updateProfileAndCoverPic, uploadImageCloudinary, uploadPost } from "@/service/apiUrls";
import { useUser } from "../context/UserContext";

const UploadPosts = () => {
    const { setUserData } = useUser()
    const [image, setImage] = useState<File | null>(null);
    const [uploadImageUrl, setUploadImageUrl] = useState<string | null>(null);
    const [message, setMessage] = useState<string>('Image');
    const [profile, setProfile] = useState<File | null>(null);
    const [profileUrl, setProfileUrl] = useState<string | null>(null);
    const [cover, setCover] = useState<File | null>(null);
    const [coverUrl, setCoverUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false)

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const profileUrl = URL?.createObjectURL(file)
            setImage(file);
            setUploadImageUrl(profileUrl)
        }
    };

    const handleReset = () => {
        setImage(null)
        setUploadImageUrl(null)
    }

    const handleUpload = async () => {
        let formData = new FormData()
        if (image instanceof File) {
            formData.append("file", image);
            formData.append('upload_preset', 'tinder')
        }
        try {
            const res = await uploadImageCloudinary(formData)
            let payload = {
                "message": message,
                "image": res?.data?.secure_url
            }
            await uploadPost(payload)
            setImage(null);
            setUploadImageUrl(null)
            toast.success(`Post uploaded successfully`)
        } catch {
            toast.error("Posts is not uploaded")
        }
    };


    const handleProfileChange = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
        const file = event.target.files?.[0];
        if (file) {
            const url = URL?.createObjectURL(file)
            if (type == "profilePic") {
                setProfile(file);
                setProfileUrl(url)
                setCover(null)
                setCoverUrl(null)
            } else {
                setCover(file)
                setCoverUrl(url)
                setProfile(null);
                setProfileUrl(null)
            }
        }
    };

    const handleResetProfile = () => {
        setProfile(null)
        setProfileUrl(null)
        setCover(null)
        setCoverUrl(null)
    }

    const handleUploadImage = async (name: string) => {
        let obj: { [key: string]: string } = {}
        let formData = new FormData()
        if (profile instanceof File) {
            formData.append("file", profile);
        }
        if (cover instanceof File) {
            formData.append("file", cover);
        }
        formData.append('upload_preset', 'tinder')
        try {
            const res = await uploadImageCloudinary(formData)
            obj[name] = res?.data?.secure_url
            return obj
        } catch {
            toast.error("Profile is not updated")
        }

    }
    const handleUploadCoverAndProfile = async (name: string) => {
        try {
            setLoading(true)
            const payload = await handleUploadImage(name)
            updateProfileAndCoverPic(payload).then((res) => {
                setUserData((prev: any) => ({ ...prev, profile: res.data.profile, cover: res.data.cover }))
                toast.success("Profile Updated Successfully")
                handleResetProfile()
            }).catch((err) => {
                toast.error("Profile is not updated", err.message)
            })
        } catch (err) {
            toast.error("Profile is not updated")
        } finally {
            setLoading(true)
        }
    };

    return (
        <FormContainer>
            <Heading variant="h5">Profile Image</Heading>
            <ProfileCard>
                {profileUrl ? (
                    <Box>
                        <PreviewContainer sx={{ width: "100%" }}>
                            <PreviewImage src={profileUrl} alt="Uploaded Image" />
                            <CloseContainer onClick={handleResetProfile}>
                                <Close />
                            </CloseContainer>
                        </PreviewContainer>
                        <ResetButton onClick={() => handleUploadCoverAndProfile("profilePic")} variant="outlined" sx={{ margin: "10px 0px" }}>
                            {!loading ? "Upload Picture" : "Uploading..."}
                        </ResetButton>
                    </Box>
                ) : (
                    <Box>
                        <Box sx={{ textAlign: "center", padding: "30px 10px" }}>
                            <input
                                accept="image/*"
                                type="file"
                                id="profile-upload-button"
                                style={{ display: "none" }}
                                onChange={(event) => handleProfileChange(event, "profilePic")}
                            />
                            <label htmlFor="profile-upload-button">
                                <ChooseImage>
                                    Edit Profile Picture
                                </ChooseImage>
                            </label>
                        </Box>
                    </Box>)}
            </ProfileCard>
            <Heading variant="h5">Cover Image</Heading>
            <ProfileCard>
                {coverUrl ? (
                    <Box>
                        <PreviewContainer sx={{ width: "100%" }}>
                            <PreviewImage src={coverUrl} alt="Uploaded Image" />
                            <CloseContainer onClick={handleResetProfile}>
                                <Close />
                            </CloseContainer>
                        </PreviewContainer>
                        <ResetButton onClick={() => handleUploadCoverAndProfile("coverPic")} variant="outlined" sx={{ margin: "10px 0px" }}>
                            {!loading ? "Upload Picture" : "Uploading..."}
                        </ResetButton>
                    </Box>
                ) : (
                    <Box>
                        <Box sx={{ textAlign: "center", padding: "30px 10px" }}>
                            <input
                                accept="image/*"
                                type="file"
                                id="cover-upload-button"
                                style={{ display: "none" }}
                                onChange={(event) => handleProfileChange(event, "coverPic")}
                            />
                            <label htmlFor="cover-upload-button">
                                <ChooseImage>
                                    Edit Cover Picture
                                </ChooseImage>
                            </label>
                        </Box>
                    </Box>)}
            </ProfileCard>
            <Heading variant="h5">Upload a Post</Heading>
            <ProfileCard >
                {uploadImageUrl ? (
                    <PostContainer>
                        <PreviewContainer>
                            <PreviewImage src={uploadImageUrl} alt="Uploaded Image" />
                            <CloseContainer onClick={handleReset}>
                                <Close />
                            </CloseContainer>
                        </PreviewContainer>
                        <ButtonsContainer>
                            <Inputfield
                                label="Write a caption"
                                fullWidth
                                margin="normal"
                                rows={4}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                InputLabelProps={{ shrink: true }}
                            />
                            <ResetButton onClick={handleUpload} variant="outlined">
                                Upload Post
                            </ResetButton>
                        </ButtonsContainer>
                    </PostContainer>
                ) : (
                    <Box sx={{ textAlign: "center", padding: 2 }}>
                        <input
                            accept="image/*"
                            type="file"
                            id="post-upload-button"
                            style={{ display: "none" }}
                            onChange={handleImageChange}
                        />
                        <label htmlFor="post-upload-button">
                            <ChooseImage>
                                Upload a Post
                            </ChooseImage>
                        </label>
                    </Box>)}
            </ProfileCard>

        </FormContainer>
    )

}
export default UploadPosts