import React from 'react'
import { TextField, Button } from "@mui/material";

function Login() {
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
                />
                <TextField
                    type='password'
                    label="Enter Password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                />
                <TextField
                    type="password"
                    label="Confirm Password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    sx={{ marginTop: '30px' }}
                >
                    Submit
                </Button>
            </div>
        </>
    )
}

export default Login