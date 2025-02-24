import React, { useState, useRef } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

const OTPInput = ({ onVerify }) => {
    const [otp, setOtp] = useState(new Array(4).fill(""));
    const inputRefs = useRef([]);

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (isNaN(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1); // Only allow 1 digit per box
        setOtp(newOtp);

        // Move to next input
        if (value && index < 3) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleVerify = () => {
        const enteredOtp = otp.join("");
        onVerify(enteredOtp);
    };

    return (
        <div className="max-w-[1200ppx] mx-auto w-[40%] mt-20 shadow-md p-5 rounded-md border-t-4 border-blue">
            <Box textAlign="center" p={3}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", marginBottom: "30px", fontSize: "24px" }}>
                    Enter OTP
                </Typography>
                <Box display="flex" justifyContent="center" gap={1}>
                    {otp.map((value, index) => (
                        <TextField
                            key={index}
                            value={value}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            inputRef={(el) => (inputRefs.current[index] = el)}
                            variant="outlined"
                            size="small"
                            sx={{
                                width: "50px",
                                textAlign: "center",
                                "& input": { textAlign: "center", fontSize: "22px" },
                            }}
                        />
                    ))}
                </Box>
                <Button
                    variant="contained"
                    sx={{ mt: 2, marginTop: '50px', width: '130px', bgcolor: "blue", color: "white", "&:hover": { bgcolor: "darkblue" } }}
                    onClick={handleVerify}
                    disabled={otp.includes("")}
                >
                    Verify
                </Button>
            </Box>
        </div>
    );
};

export default OTPInput;
