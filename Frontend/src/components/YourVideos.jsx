import React from 'react';
import { useGetUserVideosQuery } from '../../redux/api/videoApi';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const YourVideos = () => {
    const { data, error, isLoading } = useGetUserVideosQuery();

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error fetching videos: {error.message}</p>;
    if (data?.AllVideos?.length === 0) return <p>No videos found for this user.</p>;

    return (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 cursor-pointer">
            {data?.AllVideos?.map((video) => (
                <Link to={`/video/${video._id}`} key={video._id}>
                    <Card className="rounded-lg overflow-hidden shadow-lg min-h-[260px]">
                        <CardMedia component="img" image={video?.thumbnail} alt={video?.title} sx={{ height: 200 }} />
                        <CardContent className="flex items-center justify-between">
                            <div className="flex flex-col text-center w-full">
                                <Typography component="h5" noWrap>
                                    {video?.title}
                                </Typography>

                            </div>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
    );
};

export default YourVideos;
