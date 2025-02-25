import { useState, useEffect } from "react";
import { Card, CardContent, CardMedia, Typography, CircularProgress } from "@mui/material";
import { useGetMixedVideosQuery } from "../../redux/api/videoApi";

const Feed = () => {
    const { data, error, isLoading, isFetching } = useGetMixedVideosQuery();
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        if (data) {
            setVideos((prevVideos) => [...prevVideos, ...data.videos]);
        }
    }, [data]);

    // const handleScroll = () => {
    //     if (
    //         window.innerHeight + document.documentElement.scrollTop >=
    //         document.documentElement.offsetHeight - 10 &&
    //         !isFetching
    //     ) {
    //         setPage((prevPage) => prevPage + 1);
    //     }
    // };

    // useEffect(() => {
    //     window.addEventListener("scroll", handleScroll);
    //     return () => window.removeEventListener("scroll", handleScroll);
    // }, []);

    if (isLoading) return <CircularProgress className="flex justify-center mt-4" />;
    if (error) return <div className="text-center text-red-500">Failed to load videos.</div>;

    return (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {videos?.map((video) => (
                <Card key={video._id} className="rounded-lg overflow-hidden shadow-lg">
                    <CardMedia component="img" image={video?.thumbnail} alt={video?.title} height="140" />
                    <CardContent>
                        <Typography variant="h6" component="h3" noWrap>
                            {video?.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {video?.channelName}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
            {isFetching && <CircularProgress className="flex justify-center mt-4" />}
        </div>
    );
};

export default Feed;
