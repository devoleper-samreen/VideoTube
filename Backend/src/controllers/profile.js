import { Profile } from "../models/profile.js";
import { User } from "../models/user.js";

export const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        if (!userId) {
            return res.status(400).json({
                status: "failed",
                message: "User ID is required"
            });
        }

        //find profile
        const profile = await Profile.findOne({
            userDetail: userId
        }).populate("userDetail", "name email");

        if (!profile) {
            return res.status(404).json({
                status: "failed",
                message: "Profile not found"
            });
        }

        return res.status(200).json({
            status: "success",
            profile
        });

    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: "Error fetching profile",
            error: error.message
        });
    }
};


export const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        if (!userId) {
            return res.status(400).json({
                status: "failed",
                message: "User ID is required"
            });
        }

        const { name, description } = req.body;

        if (!name && !profilePicture && !coverImage && !description) {
            return res.status(400).json({
                status: "failed",
                message: "At least one of name, profile picture, cover image, or description is required"
            });
        }
        const profilePictureLocalPath = req.files?.profilePicture[0]?.path
        const coverImageLocalPath = req.files?.coverImage[0]?.path

        const profilePicture = await uploadOnCloudinary(profilePictureLocalPath)
        const coverImage = await uploadOnCloudinary(coverImageLocalPath)

        if (!profilePicture) {
            return res.status(400).json({
                status: "failed",
                message: "Profile picture upload failed"
            });
        }

        if (!coverImage) {
            return res.status(400).json({
                status: "failed",
                message: "Cover image upload failed"
            });

        }

        // update name
        const user = await User.findById(userId);
        if (name) {
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
                profilePicture: profilePicture?.url || "",
                coverImage: coverImage?.url || "",
                description
            });
        } else {
            // if profile found, then update profile
            profile.profilePicture = profilePicture
            profile.coverImage = coverImage?.url || ""
            profile.description = description?.url || ""
        }

        // save profile
        await profile.save();

        console.log("Profile Picture:", profilePicture);
        console.log("Cover Image:", coverImage);

        return res.status(200).json({
            status: "success",
            message: "Profile updated successfully",
            profile,
            user

        });

    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: "Profile update error",
            error: error.message
        });
    }
};
