import { useParams } from "react-router-dom";
import { useGetVideoByIdQuery } from "../../redux/api/videoApi";
import { CircularProgress, Typography, Avatar, Button, TextField } from "@mui/material";
import { ThumbsUp, ThumbsDown } from "lucide-react"; // using lucide-react icons
import { useAddLikeMutation, useDeleteLikeMutation, useGetLikesCountByVideoQuery } from "../../redux/api/likeApi"
import { useState } from "react";
import CommentsSection from "./Comment"
import { useIncreaseViewCountMutation } from "../../redux/api/videoApi";


const VideoPage = () => {
    const { videoId } = useParams();
    const { data, error, isLoading } = useGetVideoByIdQuery(videoId);

    const { data: likesData } = useGetLikesCountByVideoQuery(videoId);

    const [addLike] = useAddLikeMutation();
    const [deleteLike] = useDeleteLikeMutation();

    const [liked, setLiked] = useState(false);
    console.log("data:", data);

    const [increaseViewCount] = useIncreaseViewCountMutation();

    const handleViewCount = async () => {

        try {
            const res = await increaseViewCount(videoId);
            console.log(res);

            console.log("Updated Views:", res.data.views);
        } catch (error) {
            console.error("Failed to update views", error);
        }
    };

    const handleLike = async () => {
        if (!liked) {
            await addLike(videoId);
            setLiked(true);
        } else {
            await deleteLike(videoId);
            setLiked(false);
        }
    };

    if (isLoading) return <CircularProgress className="flex justify-center mt-4" />;
    if (error) return <div className="text-center text-red-500">Failed to load video.</div>;

    return (
        <div className="p-4 max-w-4xl mx-auto">
            {/* Video Player */}
            <video controls className="w-full h-[400px] shadow-lg bg-gray-300 rounded-2xl mb-6" onPlay={handleViewCount}>
                <source src={data?.video.video} type="video/mp4"

                />
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
                    <div className="flex items-center text-gray-600 text-sm">
                        👁️ {data?.video.views || 0} Views
                    </div>

                    <Button variant="outlined" startIcon={<ThumbsUp size={20} />}
                        onClick={handleLike}
                    >
                        {likesData?.likesCount || 0} Like
                    </Button>
                    {/* <Button variant="outlined" startIcon={<ThumbsDown size={20} />}>
                        Dislike
                    </Button> */}
                </div>
            </div>

            {/* Comment Section */}
            <CommentsSection videoId={videoId} />
        </div>
    );
};

export default VideoPage;
