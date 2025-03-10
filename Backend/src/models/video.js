import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
    {
        video: {
            type: String,
            required: true
        },
        thumbnail: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true

        },
        description: {
            type: String,
            required: true
        },
        duration: {
            type: Number
        },
        views: {
            type: Number,
            default: 0
        },
        viewedBy: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        isPublished: {
            type: Boolean,
            default: true
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
)

export const Video = mongoose.model("Video", videoSchema);