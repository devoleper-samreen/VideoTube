import { Video } from "../models/video.js";

export const increaseViewCount = async (req, res) => {
    try {
        const { videoId } = req.params;
        const userId = req.user.id;

        const video = await Video.findById(videoId);

        // Agar user already dekh chuka hai to views na badhao
        if (video.viewedBy.includes(userId)) {
            return res.status(200).json({
                message: "Already viewed"
            });
        }

        // Views count badhao aur user ko list me add karo
        const updatedVideo = await Video.findByIdAndUpdate(
            videoId,
            {
                $inc: {
                    views: 1
                },
                $push: {
                    viewedBy: userId
                }
            },
            { new: true }
        );

        return res.status(200).json({
            message: "View count updated",
            views: updatedVideo.views

        });

    } catch (error) {
        return res.status(500).json({
            message: "Error updating view count",
            error
        });
    }
};
