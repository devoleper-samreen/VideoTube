import React from 'react'
import { TextField, Button } from "@mui/material";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../../redux/api/auth'
import { toast } from 'react-hot-toast';
import Loader from './loader';

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [register, { isLoading, isError, error }] = useRegisterMutation();
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await register({ name, email, password }).unwrap();
            toast.success("OTP sent to your email!");
            navigate("/verify-email");
        } catch (err) {
            toast.error(err?.data?.message || "Registration failed. Please try again.");
        }
    };
    return (
        <>
            <div className='mx-auto mt-24 w-[40%] shadow-md px-5 py-10 border-t-4 border-blue-400 rounded'>
                <h1 className='text-4xl text-center mb-4 font-sans'>Create Account</h1>
                <TextField
                    label="Enter Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
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
                    type="password"
                    label="Enter Password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    sx={{ marginTop: '30px' }}
                    onClick={handleRegister
                    }
                >
                    {isLoading ? <Loader /> : "Submit"}

                </Button>
                <p className='text-center mt-8'>
                    do you want to login?
                    <Link to='/login' className='text-blue-700'> Login</Link>
                </p>
            </div>
        </>
    )
}

export default Signup