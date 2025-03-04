import { Comment } from "../models/comment.js";

// Create a new comment
export const createComment = async (req, res) => {
    try {

        const { videoId } = req.params;
        const userId = req.user._id
        const { content } = req.body;


        if (!userId || !videoId || !content) {
            console.log("inside all fields");

            return res.status(400).json({
                message: "All fields are reqiured"
            })
        }

        const newComment = new Comment({
            content,
            onVideo: videoId,
            commentBy: userId
        });

        if (!newComment) {
            console.log("inside Failed to create comment");

            return res.status(400).json({
                message: "Failed to create comment"
            });
        }

        await newComment.save();

        return res.status(201).json({
            message: "Comment created successfully",
            newComment
        });

    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};

// Get all comments for a specific video
export const getCommentsByVideo = async (req, res) => {
    try {
        const { videoId } = req.params;
        const comments = await Comment.find({
            onVideo: videoId
        }).populate('commentBy', 'name');

        return res.status(200).json({
            message: "Comments retrieved successfully",
            comments
        });

    } catch (error) {
        return res.status(404).json({
            message: error.message
        });
    }
};

// Update a comment
export const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const userId = req.user._id;

        if (!content) {
            return res.status(400).json({
                message: "Content is required"
            });
        }

        const comment = await Comment.findById(id);

        if (!comment) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }

        if (comment.commentBy !== userId) {
            return res.status(403).json({
                message: "You are not authorized to update this comment"
            });
        }

        comment.content = content;
        const updatedComment = await comment.save();

        return res.status(200).json({
            message: "Comment updated successfully",
            updatedComment
        });

    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};

// Delete a comment
export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params; // comment id
        const userId = req.user._id;

        const comment = await Comment.findById(id);

        if (!comment) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }

        if (comment.commentBy !== userId) {
            return res.status(403).json({
                message: "You are not authorized to delete this comment"
            });
        }

        await Comment.findByIdAndDelete(id);

        return res.status(200).json({
            message: "Comment deleted successfully"
        });

    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};

export const getCommentsCountByVideo = async (req, res) => {
    try {
        const { videoId } = req.params;

        if (!videoId) {
            return res.status(400).json({
                message: "videoId is required"
            });
        }

        const commentsCount = await Comment.find({ onVideo: videoId }).countDocuments();

        return res.status(200).json({
            message: "Comments count retrieved successfully",
            commentsCount
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error fetching comments count",
            error
        });
    }
};

