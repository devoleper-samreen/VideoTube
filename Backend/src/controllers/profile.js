
import Profile from "../models/profile.js";

export const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        if (!userId) {
            return res.status(400).json({
                status: "failed",
                message: "User ID is required"
            });
        }

        const { name, profilePicture, coverImage, description } = req.body;

        if (!name && !profilePicture && !coverImage && !description) {
            return res.status(400).json({
                status: "failed",
                message: "At least one of name, profile picture, cover image, or description is required"
            });
        }

        // update name
        if (name) {
            const user = await User.findById(userId);
            if (user) {
                user.name = name;
                await user.save();
            } else {
                return res.status(404).json({
                    message: "User not found"
                });
            }
        }


        // find profile
        let profile = await Profile.findOne({
            userDetail: userId
        });

        if (!profile) {
            // if profile not found, then create new profile
            profile = new Profile({
                userDetail: userId,
                profilePicture,
                coverImage,
                description
            });
        } else {
            // if profile found, then update profile
            profile.profilePicture = profilePicture
            profile.coverImage = coverImage
            profile.description = description
        }

        // save profile
        await profile.save();

        return res.status(200).json({
            status: "success",
            message: "Profile updated successfully",
            profile
        });

    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: "Profile update error",
            error: error.message
        });
    }
};
