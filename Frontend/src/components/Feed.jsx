import { useState, useEffect } from "react";
import { Card, CardContent, CardMedia, Typography, CircularProgress } from "@mui/material";
import { useGetMixedVideosQuery } from "../../redux/api/videoApi";
import { Link } from "react-router-dom";


const Feed = () => {
    const { data, error, isLoading, isFetching, refetch } = useGetMixedVideosQuery();
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        if (data) {
            setVideos(data.videos);
        }
        console.log('feed data', data);

        refetch();
    }, [data]);

    if (isFetching) {
        console.log("API se fresh data aa raha hai");
    } else {
        console.log("Cache se data load ho raha hai");
    }


    if (isLoading) {
        return (
            <div className="h-screen w-screen flex justify-center items-center">
                <CircularProgress />;
            </div>
        )

    }
    if (error) return <div className="text-center text-red-500">Failed to load videos.</div>;

    return (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 cursor-pointer">
            {videos?.map((video) => (
                <Link to={`/video/${video._id}`} key={video._id}>
                    <Card className="rounded-lg overflow-hidden shadow-lg h-[260px]">
                        <CardMedia component="img" image={video?.thumbnail} alt={video?.title} sx={{ height: 200 }} />
                        <CardContent className="flex items-center justify-between">
                            {/* Left Side - Profile Picture */}
                            <img
                                src={video?.userProfilePicture || "/default-avatar.png"}  // Default image if null

                                className="w-8 h-8 rounded-full object-cover bg-amber-300"
                            />

                            {/* Right Side - Title & Channel Name */}
                            <div className="flex flex-col text-right w-full ml-3">
                                <Typography variant="h6" component="h3" noWrap>
                                    {video?.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {video?.channelName}
                                </Typography>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            ))}
            {isFetching && <CircularProgress className="flex justify-center items-center mt-10" />}
        </div>
    );
};

export default Feed;
