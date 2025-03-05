import { Video } from "../models/video.js";

export const searchVideos = async (req, res) => {
    try {
        const query = req.query.q;
        console.log("Query", query);

        const videos = await Video.aggregate([
            // Owner ka data lao
            {
                $lookup: {
                    from: "users",
                    localField: "owner",
                    foreignField: "_id",
                    as: "ownerDetails"
                }
            },
            {
                $unwind: "$ownerDetails"
            },
            // Profile picture bhi lao
            {
                $lookup: {
                    from: "profiles",
                    localField: "ownerDetails._id",
                    foreignField: "userDetail",
                    as: "profileDetails"
                }
            },
            {
                $unwind: {
                    path: "$profileDetails",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $addFields: {
                    "ownerDetails.profilePicture": "$profileDetails.profilePicture"
                }
            },
            // Search apply karo
            {
                $match: {
                    $or: [
                        { title: { $regex: query, $options: "i" } },
                        { description: { $regex: query, $options: "i" } },
                        { "ownerDetails.name": { $regex: query, $options: "i" } }
                    ]
                }
            }
        ]);

        return res.status(200).json({
            message: "Videos fetched successfully!",
            videos
        });

    } catch (error) {
        console.error("Error in search: ", error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};
