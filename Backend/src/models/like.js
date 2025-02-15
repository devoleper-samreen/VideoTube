import mongoose from "mongoose";

const likeSchema = mongoose.Schema({
    onVideo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
        required: true
    },
    likedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},
    { timestamps: true }
)

export const Like = mongoose.model("Like", likeSchema)