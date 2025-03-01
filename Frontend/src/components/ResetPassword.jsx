import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import Loader from "./Loader";
import { useResetPasswordMutation } from "../../redux/api/auth"
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
    const { id, token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [resetPassword, { isLoading, isError }] = useResetPasswordMutation();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const res = await resetPassword({ id, token, newPassword: password, confiremPassword: confirmPassword }).unwrap();
            console.log("response : ", res);

            toast.success(res?.message);
            navigate("/login");

        } catch (error) {
            console.error("Forgot Password Failed:", error);
            toast.error(error.data?.message || "Password reset failed");

        }

    };

    return (
        <Container maxWidth="sm" sx={{ mt: 10, borderTop: 4, borderColor: "primary.main", boxShadow: 3, borderRadius: 2 }}>
            <Box sx={{ textAlign: "center", mt: 3, p: 3, borderRadius: 2 }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
                    Reset Password
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                    Enter new password to reset your password.
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="New Password"
                        variant="outlined"
                        onChange={(event) =>
                            setPassword(event.target.value)}
                        type="password"
                        value={password}
                        sx={{ mt: 6 }}
                        helperText={isError ? "Enter a valid  password" : ""}
                    />
                    <TextField
                        fullWidth
                        label="Confirm Password"
                        variant="outlined"
                        onChange={(event) =>
                            setConfirmPassword(event.target.value)}
                        type="password"
                        value={confirmPassword}
                        sx={{ mt: 3 }}
                        helperText={isError ? "Enter a valid  password" : ""}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={!password || isError}
                        sx={{ mt: 4 }}
                    >
                        {isLoading ? <Loader /> : "Submit"}

                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default ResetPassword;
