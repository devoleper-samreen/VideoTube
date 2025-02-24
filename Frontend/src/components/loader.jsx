import React from "react";
import { CircularProgress, Box } from "@mui/material";

const Loader = ({ size }) => {
    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            <CircularProgress size={30} thickness={4} color="secondery" />
        </Box>
    );
};

export default Loader;
