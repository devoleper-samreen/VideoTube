import React, { useState } from "react";
import { useUpdateProfileMutation } from "../../redux/api/profileApi";
import { TextField, Button, Avatar, Typography, Paper, Box } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "./loader"

const ProfileUpdate = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        description: ""
    });
    const [profilePic, setProfilePic] = useState(null);
    const [coverImage, setCoverImage] = useState(null);

    const [updateProfile, { isLoading }] = useUpdateProfileMutation();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e, setImage) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!profilePic) {
            toast.error("Profile Picture is required")
            return
        }

        if (!coverImage) {
            toast.error("Cover Image is required")
            return
        }
        const updatedData = new FormData();
        updatedData.append("name", formData.name);
        updatedData.append("description", formData.description);
        if (profilePic) updatedData.append("profilePicture", profilePic);
        if (coverImage) updatedData.append("coverImage", coverImage);

        try {
            const response = await updateProfile(updatedData);
            console.log("response : ", response);

            toast.success(response?.data?.message || "Profile updated successfully!");
            navigate("/profile");

        } catch (error) {
            toast.error(error?.message || "An error occurred. Please try again.");

        }

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
                    required
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
                    required
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
                    {isLoading ? <Loader /> : "Update Profile"}
                </Button>
            </form>
        </Paper>
    );
};

export default ProfileUpdate;
