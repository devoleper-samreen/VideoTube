import { useEffect } from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useGetMixedVideosQuery } from "../../redux/api/videoApi";
import { Link, useSearchParams } from "react-router-dom";
import { useGetVideosQuery } from "../../redux/api/searchApi"
import { Skeleton } from "@mui/material";



const Feed = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");

    const { data: videosData, isLoading: isLoadingVideos, refetch, error } = useGetMixedVideosQuery();
    const { data: searchData, isLoading: isLoadingSearch } = useGetVideosQuery(query, { skip: !query });

    const videos = query ? searchData?.videos : videosData?.videos;
    const isLoading = query ? isLoadingSearch : isLoadingVideos;

    useEffect(() => {
        refetch();
    }, [videosData, searchData]);


    if (isLoading) {
        return (
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 cursor-pointer">
                {Array.from(new Array(6)).map((_, index) => (
                    <Card key={index} className="rounded-lg overflow-hidden shadow-lg min-h-[260px]">
                        <Skeleton variant="rectangular" height={200} />
                        <CardContent className="flex items-center justify-between">
                            <Skeleton variant="circular" width={48} height={48} />
                            <div className="flex flex-col text-right w-full ml-3">
                                <Skeleton width="80%" height={20} />
                                <Skeleton width="60%" height={15} />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    if (error) return <div className="flex items-center justify-center h-screen text-red-500">Failed to load videos.</div>;

    return (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 cursor-pointer">
            {videos?.map((video) => (
                <Link to={`/video/${video._id}`} key={video._id}>
                    <Card className="rounded-lg overflow-hidden shadow-lg min-h-[260px]">
                        <CardMedia component="img" image={video?.thumbnail} alt={video?.title} sx={{ height: 200 }} />
                        <CardContent className="flex items-center justify-between">
                            {/* Left Side - Profile Picture */}
                            <img
                                src={video?.profileDetails?.profilePicture}

                                className="w-12 h-12 rounded-full object-cover bg-amber-300"
                            />

                            {/* Right Side - Title & Channel Name */}
                            <div className="flex flex-col text-right w-full ml-3">
                                <Typography component="h5" noWrap>
                                    {video?.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {video?.ownerDetails?.name}
                                </Typography>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
    );
};

export default Feed;
