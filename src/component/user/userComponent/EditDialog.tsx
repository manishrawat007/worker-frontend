import { Box, Dialog, DialogContent } from "@mui/material"
import { ButtonsContainer, ChooseImage, Close, CloseContainer, PostContainer, PreviewContainer, PreviewImage, ProfileCard, ResetButton } from "../styles/Edit.styled";

interface EditProfileProps {
    open: boolean,
    handleClose: () => void,
    imageUrl: string | null,
    handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleReset: () => void,
    handleUpload: (name: string) => void,
    type: string
}

const EditProfileDialog = ({ open, handleClose, imageUrl, handleImageChange, handleReset, handleUpload, type }: EditProfileProps) => {
    return (
        <>
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth sx={{
                "& .MuiPaper-root": {
                    borderRadius: "12px",
                }
            }}>
                <DialogContent sx={{ padding: "0px" }}>
                    <ProfileCard>
                        {imageUrl ? (
                            <PostContainer>
                                <PreviewContainer sx={{ width: "100%" }}>
                                    <PreviewImage src={imageUrl} alt="Uploaded Image" />
                                    <CloseContainer onClick={handleReset}>
                                        <Close />
                                    </CloseContainer>
                                    <ButtonsContainer sx={{ width: "100%", margin: "10px 0px 10px" }} >
                                        <ResetButton onClick={() => handleUpload(type)} variant="outlined">
                                            Upload Picture
                                        </ResetButton>
                                    </ButtonsContainer>
                                </PreviewContainer>
                            </PostContainer>
                        ) : (
                            <Box>
                                <CloseContainer onClick={handleClose}>
                                    <Close />
                                </CloseContainer>
                                <Box sx={{ textAlign: "center", padding: "30px 10px" }}>
                                    <input
                                        accept="image/*"
                                        type="file"
                                        id="upload-button"
                                        style={{ display: "none" }}
                                        onChange={handleImageChange}
                                    />
                                    <label htmlFor="upload-button">
                                        <ChooseImage>
                                            Upload a Picture
                                        </ChooseImage>
                                    </label>
                                </Box>
                            </Box>)}
                    </ProfileCard>
                </DialogContent>
            </Dialog >
        </>
    )
}
export default EditProfileDialog