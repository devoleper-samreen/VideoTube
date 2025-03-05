import { Video } from "../models/video.js"

export const getMixedVideos = async (req, res) => {
    try {
        const videos = await Video.aggregate([
            {
                $group: {
                    _id: "$userId",
                    videos: { $push: "$$ROOT" }
                }
            },
            {
                $sample: {
                    size: 10
                }
            }, // Pick 10 random users
            {
                $unwind: "$videos"
            },
            {
                $replaceRoot: {
                    newRoot: "$videos"
                }
            },
            {
                $sort: {
                    createdAt: -1
                }
            },
            {
                $limit: 20
            },
            {
                $lookup: {
                    from: "users", // Your user collection name
                    localField: "owner",
                    foreignField: "_id",
                    as: "ownerDetails"
                }
            },
            {
                $unwind: "$ownerDetails"
            },
            {
                $lookup: {
                    from: "profiles", // Profile collection name
                    localField: "ownerDetails._id",
                    foreignField: "userDetail",
                    as: "profileDetails"
                }
            },
            {
                $unwind: {
                    path: "$profileDetails",
                    preserveNullAndEmptyArrays: true // Keep videos even if no profile exists
                }
            },
            {
                $addFields: {
                    "ownerDetails.profilePicture": "$profileDetails.profilePicture"
                }
            },
        ]);

        return res.status(200).json({
            message: "feched successfully",
            videos
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error fetching mixed videos",
            error
        });
    }
};


export const getRandomVideos = async (req, res) => {
    try {
        const videos = await Video.aggregate([
            {
                $sample: {
                    size: 20
                }
            }
        ]); // 20 random videos

        return res.status(200).json({
            message: "get success",
            videos
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error fetching random videos", error
        });
    }
};

export const getTrendingVideos = async (req, res) => {
    try {
        // Top 20 videos by views
        const videos = await Video.find().sort({
            views: -1,
            createdAt: -1
        }).limit(20);

        return res.status(200).json(videos);

    } catch (error) {

        return res.status(500).json({
            message: "Error fetching trending videos", error
        });
    }
};



