import React, { useState } from "react";
import { useUpdateProfileMutation } from "../../redux/api/profileApi";
import { TextField, Button, Avatar, Typography, Paper, Box } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useNavigate } from "react-router-dom";

const ProfileUpdate = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: ""
    });
    const [profilePic, setProfilePic] = useState(null);
    const [coverImage, setCoverImage] = useState(null);

    const [updateProfile, { isLoading }] = useUpdateProfileMutation();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e, setImage) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedData = new FormData();
        updatedData.append("name", formData.name);
        updatedData.append("description", formData.description);
        if (profilePic) updatedData.append("profilePicture", profilePic);
        if (coverImage) updatedData.append("coverImage", coverImage);

        await updateProfile(updatedData);
        setFormData({ name: "", description: "" });
        setProfilePic(null);
        setCoverImage(null);
        navigate("/profile");

    };

    return (
        <Paper elevation={3} sx={{ padding: 4, maxWidth: 500, margin: "auto", mt: 5, borderRadius: 3 }}>
            <Typography variant="h5" gutterBottom textAlign="center">Update Profile</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="name"
                    name="name"
                    fullWidth
                    margin="normal"
                    value={formData.name}
                    onChange={handleChange}
                />
                <TextField
                    label="Description"
                    name="description"
                    fullWidth
                    margin="normal"
                    multiline
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                />

                <Box display="flex" alignItems="center" gap={2} mt={2}>
                    <Avatar src={profilePic ? URL.createObjectURL(profilePic) : ""} sx={{ width: 56, height: 56 }} />
                    <Button variant="contained" component="label" startIcon={<CloudUploadIcon />}>
                        Upload Profile Picture
                        <input hidden accept="image/*" type="file" onChange={(e) => handleFileChange(e, setProfilePic)} />
                    </Button>
                </Box>

                <Box display="flex" alignItems="center" gap={2} mt={2}>
                    <Avatar variant="rounded" src={coverImage ? URL.createObjectURL(coverImage) : ""} sx={{ width: 100, height: 56 }} />
                    <Button variant="contained" component="label" startIcon={<CloudUploadIcon />}>
                        Upload Cover Image
                        <input hidden accept="image/*" type="file" onChange={(e) => handleFileChange(e, setCoverImage)} />
                    </Button>
                </Box>

                <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3 }} disabled={isLoading}>
                    {isLoading ? "Updating..." : "Update Profile"}
                </Button>
            </form>
        </Paper>
    );
};

export default ProfileUpdate;
