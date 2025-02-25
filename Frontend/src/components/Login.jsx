import React from 'react'
import { TextField, Button } from "@mui/material";
import { Link } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../redux/api/auth'
import toast from "react-hot-toast";
import Loader from './loader';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [login, { isLoading, isError, error }] = useLoginMutation();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await login({ email, password }).unwrap(); //
            console.log("Login Successful:", response);
            toast.success(response.message || " Login Successfully!");
            navigate("/");
        } catch (err) {
            console.error("Login Failed:", err);

            if (err?.data?.message === "User not found") {
                toast.error("Email not registered!");
            } else if (err?.data?.message === "Invalid password") {
                toast.error("Incorrect password!");
            } else {
                toast.error(err?.data?.message || "Login failed. Please try again.");
            }
        }
    };


    return (
        <>
            <div className='mx-auto mt-24 w-[38%] shadow-md px-5 py-10 border-t-4 border-blue-400 rounded'>
                <h1 className='text-4xl text-center mb-4 font-sans'>Login</h1>
                <TextField
                    type='email'
                    label="Enter Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    type='password'
                    label="Enter Password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Link
                    href="/forgot-password"
                    sx={{ marginTop: '10px', display: 'block', textAlign: 'right' }}>
                    Forgot Password?
                </Link>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    sx={{ marginTop: '30px' }}
                    onClick={handleLogin}
                    disabled={isLoading}
                >
                    {isLoading ? <Loader /> : <p>Submit</p>}
                </Button>
                <p className='text-center mt-8'>
                    dont have account? <Link
                        href="/signup"
                    > Signup
                    </Link>
                </p>

            </div>
        </>
    )
}

export default Login