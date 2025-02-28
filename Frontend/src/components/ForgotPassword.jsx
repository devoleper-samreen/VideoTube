import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import Loader from "./Loader";
import { useForgotPasswordMutation } from "../../redux/api/auth"
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [ForgotPassword, { isLoading, isError }] = useForgotPasswordMutation()

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const response = await ForgotPassword({ email }).unwrap();
            toast.success(response?.message || "Forgot Password Successfully!");
            navigate("/login");

        } catch (error) {
            console.error("Forgot Password Failed:", error);
            toast.error(error?.data?.message || "Forgot Password failed. Please try again.");


        }

    };

    return (
        <Container maxWidth="sm" sx={{ mt: 10, borderTop: 4, borderColor: "primary.main", boxShadow: 3, borderRadius: 2 }}>
            <Box sx={{ textAlign: "center", mt: 3, p: 3, borderRadius: 2 }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
                    Forgot Password
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                    Enter your registered email to reset your password.
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Email Address"
                        variant="outlined"
                        onChange={(event) =>
                            setEmail(event.target.value)}
                        type="email"
                        value={email}
                        sx={{ mt: 6 }}
                        helperText={isError ? "Enter a valid email" : ""}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={!email || isError}
                        sx={{ mt: 4 }}
                    >
                        {isLoading ? <Loader /> : "Submit"}

                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default ForgotPassword;
