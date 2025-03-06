import { Video } from "../models/video.js";

export const getStats = async (req, res) => {
    try {
        const stats = await Video.aggregate([
            {
                $match: { owner: req.user._id }
            },
            {
                $lookup: {
                    from: "likes",
                    localField: "_id",
                    foreignField: "onVideo",
                    as: "likesData"
                }
            },
            {
                $group: {
                    _id: null,
                    totalVideos: { $sum: 1 },
                    totalViews: { $sum: "$views" },
                    totalLikes: { $sum: { $size: "$likesData" } }
                }
            }
        ]);

        console.log(stats);


        if (stats.length === 0) {
            return res.status(200).json({
                totalVideos: 0,
                totalViews: 0,
                totalLikes: 0
            });
        }

        const { totalVideos, totalViews, totalLikes } = stats[0];

        res.status(200).json({
            totalVideos,
            totalViews,
            totalLikes
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch stats" });
    }
};

export const deleteVideo = async (req, res) => {
    try {
        const { videoId } = req.params
        const userId = req.user._id
        console.log(videoId, userId);

        if (!videoId || !userId) {
            return res.status(400).json({
                message: "videoId is required"
            })
        }

        const video = await Video.findById(
            { _id: videoId }
        )

        if (!video) {
            return res.status(404).json({
                message: "No video found"
            })
        }

        if (video.owner !== userId) {
            return res.status(403).json({
                message: "You are not owner of this video"
            })
        }

        await Video.findByIdAndDelete({ _id: videoId })

        return res.status(200).json({
            message: "Video deleted successfully",
            video
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error'
        });

    }
}

export const updateVideo = async (req, res) => {
    try {
        const { videoId } = req.params
        const userId = req.user._id
        const { title, description } = req.body
        const thumbnailLocalPath = req.files.thumbnail[0].path;


        if (!videoId || !userId) {
            return res.status(400).json({
                message: "videoId is required"
            })
        }

        if (video.owner !== userId) {
            return res.status(403).json({
                message: "You are not owner of this video"
            })
        }

        if (!thumbnailLocalPath) {
            return res.status(400).json({
                message: "Thumbnail is required"
            });
        }

        const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

        if (!thumbnail) {
            return res.status(400).json({
                message: "Thumbnail could not be uploaded"
            });
        }


        const video = await Video.findByIdAndUpdate(
            { _id: videoId },
            { title, description },
            { thumbnail: thumbnail },
            { new: true }
        )

        if (!video) {
            return res.status(404).json({
                message: "No video found"
            })
        }

        return res.status(200).json({
            message: "Video updated successfully",
            video
        })

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error'
        });

    }
}
