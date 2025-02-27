import { useState, useEffect } from "react";
import { Card, CardContent, CardMedia, Typography, CircularProgress } from "@mui/material";
import { useGetMixedVideosQuery } from "../../redux/api/videoApi";
import { Link } from "react-router-dom";


const Feed = () => {
    const { data, error, isLoading, isFetching, refetch } = useGetMixedVideosQuery();
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        if (data) {
            setVideos((prevVideos) => [...prevVideos, ...data.videos]);
        }
        console.log(data);

        refetch();
    }, [data]);


    if (isLoading) return <CircularProgress className="flex justify-center mt-4" />;
    if (error) return <div className="text-center text-red-500">Failed to load videos.</div>;

    return (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 cursor-pointer">
            {videos?.map((video) => (
                <Link to={`/video/${video._id}`} key={video._id}>
                    <Card className="rounded-lg overflow-hidden shadow-lg">
                        <CardMedia component="img" image={video?.thumbnail} alt={video?.title} height="140" />
                        <CardContent>
                            <Typography variant="h6" component="h3" noWrap>
                                {video?.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {video?.channelName}
                                {video._id}
                            </Typography>
                        </CardContent>
                    </Card>
                </Link>
            ))}
            {isFetching && <CircularProgress className="flex justify-center mt-4" />}
        </div>
    );
};

export default Feed;
