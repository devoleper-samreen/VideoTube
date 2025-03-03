import { useParams } from "react-router-dom";
import { useGetVideoByIdQuery } from "../../redux/api/videoApi";
import { CircularProgress, Typography, Avatar, Button, TextField } from "@mui/material";
import { ThumbsUp, ThumbsDown } from "lucide-react"; // using lucide-react icons

const VideoPage = () => {
    const { videoId } = useParams();
    const { data, error, isLoading } = useGetVideoByIdQuery(videoId);
    console.log("data:", data);

    if (isLoading) return <CircularProgress className="flex justify-center mt-4" />;
    if (error) return <div className="text-center text-red-500">Failed to load video.</div>;

    return (
        <div className="p-4 max-w-4xl mx-auto">
            {/* Video Player */}
            <video controls className="w-full h-[400px] shadow-lg bg-gray-300 rounded-2xl mb-6">
                <source src={data?.video.video} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Title */}
            <Typography className="mt-6 font-bold mb-4">{data?.video?.title}</Typography>
            <Typography variant="body1" color="textSecondary">{data?.video?.description}</Typography>

            {/* Channel Info + Like/Dislike */}
            <div className="flex items-center justify-between mt-6">
                {/* Channel Info */}
                <div className="flex items-center gap-4">
                    {/* <Avatar src={data?.video.owner.profilePicture} alt="Channel Logo" /> */}
                    <img src={data?.ownerProfilePicture.profilePicture
                    } alt="Channel Logo" className="rounded-full w-10 h-10" />
                    <Typography variant="subtitle1" className="ml-3 font-medium">
                        {data?.video.owner.name || "Channel Name"}
                    </Typography>
                </div>

                {/* Like/Dislike */}
                <div className="flex items-center space-x-4 gap-4">
                    <Button variant="outlined" startIcon={<ThumbsUp size={20} />}>
                        Like
                    </Button>
                    <Button variant="outlined" startIcon={<ThumbsDown size={20} />}>
                        Dislike
                    </Button>
                </div>
            </div>

            {/* Comment Section */}
            <div className="mt-8">
                <Typography variant="h6" className="mb-4 font-semibold">Comments</Typography>
                {/* Comment Input */}
                <div className="flex items-start space-x-3">
                    <Avatar alt="User" />
                    <TextField
                        placeholder="Add a comment..."
                        multiline
                        fullWidth
                        rows={2}
                        variant="outlined"
                    />
                </div>

                {/* Example Comments */}
                <div className="mt-6 space-y-4">
                    <div className="flex items-start space-x-3">
                        <Avatar alt="User" />
                        <div>
                            <Typography variant="subtitle2">User1</Typography>
                            <Typography variant="body2">This is an awesome video!</Typography>
                        </div>
                    </div>
                    <div className="flex items-start space-x-3">
                        <Avatar alt="User" />
                        <div>
                            <Typography variant="subtitle2">User2</Typography>
                            <Typography variant="body2">Thanks for sharing!</Typography>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoPage;
