import { useParams } from "react-router-dom";
import { useGetVideoByIdQuery } from "../../redux/api/videoApi";
import { CircularProgress, Typography } from "@mui/material";

const VideoPage = () => {
    const { videoId } = useParams();
    const { data, error, isLoading } = useGetVideoByIdQuery(videoId);

    if (isLoading) return <CircularProgress className="flex justify-center mt-4" />;
    if (error) return <div className="text-center text-red-500">Failed to load video.</div>;

    return (
        <div className="p-4">
            <video controls className="w-full max-w-3xl mx-auto">
                <source src={data?.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <Typography variant="h5" className="mt-4">{data?.title}</Typography>
            <Typography variant="body1" color="textSecondary">{data?.description}</Typography>
        </div>
    );
};

export default VideoPage;
