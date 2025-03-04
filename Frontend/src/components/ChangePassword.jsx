import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useChangePasswordMutation } from "../../redux/api/auth"

const ChangePassword = () => {
    const navigate = useNavigate()

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [changePassword, { isLoading, isError, }] = useChangePasswordMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await changePassword({ oldPassword, newPassword }).unwrap();
            toast.success(res?.message)
            navigate("/profile")

        } catch (error) {
            toast.error(error?.response?.data?.message || "Error occurred");
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 10, borderTop: 4, borderColor: "primary.main", boxShadow: 3, borderRadius: 2 }}>
            <Box sx={{ textAlign: "center", mt: 3, p: 3, borderRadius: 2 }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
                    Change Password
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                    Enter old and new both password to change your password.
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Old Password"
                        variant="outlined"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        type="password"
                        sx={{ mt: 6 }}
                        helperText={isError ? "Enter a valid  password" : ""}
                    />
                    <TextField
                        fullWidth
                        label="New Password"
                        variant="outlined"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        type="password"
                        sx={{ mt: 3 }}
                        helperText={isError ? "Enter a valid  password" : ""}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={isLoading}
                        sx={{ mt: 4 }}
                    >
                        {isLoading ? "Loading..." : "Submit"}

                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default ChangePassword;
