import { useState } from "react";
import { useUpdateProfileMutation } from "../../redux/api/profileApi";
import {
  TextField,
  Button,
  Avatar,
  Typography,
  Box,
  InputLabel,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "./loader";

const ProfileUpdate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", description: "" });
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
    if (!profilePic) return toast.error("Profile Picture is required");
    if (!coverImage) return toast.error("Cover Image is required");

    const updatedData = new FormData();
    updatedData.append("name", formData.name);
    updatedData.append("description", formData.description);
    updatedData.append("profilePicture", profilePic);
    updatedData.append("coverImage", coverImage);

    try {
      const response = await updateProfile(updatedData);
      toast.success(response?.data?.message || "Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      toast.error(error?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        my: 8,
        px: 4,
        py: 5,
        background: "#fff",
        borderRadius: 4,
        boxShadow: "0px 8px 24px rgba(0,0,0,0.1)",
        border: "1px solid #e0e0e0",
      }}
    >
      <Typography
        variant="h4"
        textAlign="center"
        fontWeight={700}
        gutterBottom
        sx={{ color: "#1976d2" }}
      >
        Update Your Profile
      </Typography>

      <form onSubmit={handleSubmit}>
        <InputLabel sx={{ mb: 0.5, fontWeight: 500 }}>Full Name</InputLabel>
        <TextField
          name="name"
          fullWidth
          variant="outlined"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          sx={{ mb: 2 }}
          required
        />

        <InputLabel sx={{ mb: 0.5, fontWeight: 500 }}>Description</InputLabel>
        <TextField
          name="description"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          placeholder="Tell us something about you..."
          value={formData.description}
          onChange={handleChange}
          sx={{ mb: 3 }}
          required
        />

        <Box display="flex" alignItems="center" gap={2} mb={3}>
          <Avatar
            src={profilePic ? URL.createObjectURL(profilePic) : ""}
            sx={{ width: 64, height: 64, border: "2px solid #1976d2" }}
          />
          <Button
            variant="contained"
            component="label"
            startIcon={<CloudUploadIcon />}
            sx={{ textTransform: "none" }}
          >
            Upload Profile Picture
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={(e) => handleFileChange(e, setProfilePic)}
            />
          </Button>
        </Box>

        <Box display="flex" alignItems="center" gap={2} mb={4}>
          <Avatar
            variant="rounded"
            src={coverImage ? URL.createObjectURL(coverImage) : ""}
            sx={{ width: 120, height: 60, border: "2px solid #1976d2" }}
          />
          <Button
            variant="contained"
            component="label"
            startIcon={<CloudUploadIcon />}
            sx={{ textTransform: "none" }}
          >
            Upload Cover Image
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={(e) => handleFileChange(e, setCoverImage)}
            />
          </Button>
        </Box>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{
            py: 1.5,
            fontWeight: 600,
            fontSize: "1rem",
            borderRadius: "8px",
          }}
          disabled={isLoading}
        >
          {isLoading ? <Loader /> : "Save Profile"}
        </Button>
      </form>
    </Box>
  );
};

export default ProfileUpdate;
