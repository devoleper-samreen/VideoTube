import mongoose from "mongoose";

const channelSchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    subscriberCount: {
        type: Number,
        required: true
    },
    subscriptionCount: {
        type: Number,
        required: true
    },
    videosCount: {
        type: Number,
        required: true
    }
},
    { timestamps: true }
)

export const Channel = mongoose.model("Channel", channelSchema)