import { useState } from "react";
import { usePublishVideoMutation } from "../../redux/api/upload";
import { Button, TextField, Card, CardContent, Typography, CircularProgress } from "@mui/material";

const Upload = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [video, setVideo] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const [publishVideo, { isLoading }] = usePublishVideoMutation();

    const handleUpload = async () => {
        if (!title || !description || !video || !thumbnail) {
            alert("All fields are required");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("video", video);
        formData.append("thumbnail", thumbnail);

        try {
            publishVideo(formData).unwrap();
            alert("Video published successfully");
        } catch (error) {
            alert("Error publishing video");
        }
    };

    return (
        <Card sx={{ maxWidth: 500, margin: "auto", mt: 5, p: 3, boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h5" gutterBottom>Upload Video</Typography>
                <TextField
                    label="Title"
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    margin="normal"
                />
                <TextField
                    label="Description"
                    fullWidth
                    multiline
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    margin="normal"
                />
                <input type="file" accept="video/*" onChange={(e) => setVideo(e.target.files[0])} className="bg-gray-300 rounded p-2 my-2 cursor-pointer" />
                <input type="file" className="bg-gray-300 rounded p-2 my-2 cursor-pointer" onChange={(e) => setThumbnail(e.target.files[0])} />

                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 4 }}
                    onClick={handleUpload}
                    disabled={isLoading}
                >
                    {isLoading ? <CircularProgress size={24} /> : "Publish"}
                </Button>
            </CardContent>
        </Card>
    );
};

export default Upload;
