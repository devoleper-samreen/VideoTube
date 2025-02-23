import React from 'react'
import { TextField, Button } from "@mui/material";

function Signup() {
    return (
        <>
            <div className='w-[50%] mx-auto mt-10'>
                <h1 className='text-4xl text-center'>Signup</h1>
                <TextField
                    label="Enter Text"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Enter Text"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                />
                <Button variant="contained" color="primary">
                    Submit
                </Button>
            </div>
        </>
    )
}

export default Signup