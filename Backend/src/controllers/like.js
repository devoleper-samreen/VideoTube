import { Like } from '../models/like.js';

export const addLike = async (req, res) => {
    try {
        const { userId, videoId } = req.body;
        const newLike = new Like({
            onVideo: videoId,
            likedBy: userId
        });

        await newLike.save();
        return res.status(201).json({
            message: 'Like added successfully',
            like: newLike
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Error adding like',
            error
        });
    }
};

export const deleteLike = async (req, res) => {
    try {
        const { userId, videoId } = req.body;

        const like = await Like.findOneAndDelete({
            likedBy: userId,
            onVideo: videoId
        });

        if (!like) {
            return res.status(404).json({
                message: 'Like not found'
            });
        }
        return res.status(200).json({
            message: 'Like removed successfully'
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Error removing like',
            error
        });
    }
};

export const getLikesByVideo = async (req, res) => {
    try {
        const { videoId } = req.params;
        const likes = await Like.find({ videoId });

        return res.status(200).json({
            message: "get success",
            likes
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching likes',
            error
        });
    }
};

export const getLikesCountByVideo = async (req, res) => {
    try {
        const { videoId } = req.params;

        if (!videoId) {
            return res.status(400).json({
                message: "videoId is required"
            });
        }

        const likesCount = await Like.find({ onVideo: videoId }).countDocuments();

        return res.status(200).json({
            message: "Likes count retrieved successfully",
            likesCount
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error fetching likes count",
            error
        });
    }
};
