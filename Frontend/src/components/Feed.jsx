import { useEffect } from "react";
import { useGetMixedVideosQuery } from "../../redux/api/videoApi";
import { useGetVideosQuery } from "../../redux/api/searchApi";
import { Link, useSearchParams } from "react-router-dom";

const Feed = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const {
    data: videosData,
    isLoading: isLoadingVideos,
    refetch,
    error,
  } = useGetMixedVideosQuery();
  const { data: searchData, isLoading: isLoadingSearch } = useGetVideosQuery(
    query,
    { skip: !query }
  );

  const videos = query ? searchData?.videos : videosData?.videos;
  const isLoading = query ? isLoadingSearch : isLoadingVideos;

  useEffect(() => {
    refetch();
  }, [videosData, searchData]);

  if (isLoading) {
    return (
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array(6)
          .fill()
          .map((_, i) => (
            <div key={i} className="animate-pulse space-y-3">
              <div className="bg-gray-200 h-48 w-full rounded-xl" />
              <div className="flex gap-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }

  if (error)
    return (
      <div className="text-center text-red-500 mt-20">
        Failed to load videos.
      </div>
    );

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {videos?.map((video) => (
        <Link to={`/video/${video._id}`} key={video._id} className="group">
          <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300">
            <img
              src={video?.thumbnail}
              alt={video?.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="flex p-4 gap-4">
              <img
                src={video?.profileDetails?.profilePicture || "/avatar.png"}
                alt="channel"
                className="w-12 h-12 rounded-full object-cover bg-gray-300"
              />
              <div className="flex flex-col">
                <h3 className="text-md font-semibold text-gray-800 line-clamp-2">
                  {video?.title}
                </h3>
                <span className="text-sm text-gray-500">
                  {video?.ownerDetails?.name}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Feed;
