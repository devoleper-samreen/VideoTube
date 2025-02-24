import React from 'react'
import { TextField, Button } from "@mui/material";
// import { Link } from 'react-router-dom';
import { Link } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../redux/api/auth'

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
            navigate("/");
        } catch (err) {
            console.error("Login Failed:", err);
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
                    Submit
                </Button>
                <p className='text-center mt-8'>
                    dont have account? <Link
                        href="/signup"
                    > Signup
                    </Link>
                </p>
                {isLoading && "Logging in..."}
                {isError && <p className="text-red-500 mt-2">{error?.data?.message || "Login failed"}</p>}

            </div>
        </>
    )
}

export default Login