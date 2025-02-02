import mongoose from "mongoose"

const profileSchema = new mongoose.Schema(
    {
        userDetail: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        profilePicture: {
            type: String,
        },
        coverImage: {
            type: String
        },
        description: {
            type: String
        }

    },
    {
        timestamps: true
    }
)

export const Profile = mongoose.model("Profile", profileSchema);