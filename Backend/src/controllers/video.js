import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { Video } from "../models/video.js"

export const publishVideo = async (req, res) => {
    try {
        console.log("Publishing video");

        const { title, description } = req.body;
        const { userId } = req.params

        if (!userId) {
            return res.status(400).json({
                message: 'User ID is required'
            });
        }

        const videoLocalPath = req.files.video[0].path;
        const thumbnailLocalPath = req.files.thumbnail[0].path;


        console.log(title, description, videoLocalPath, thumbnailLocalPath);


        if (!title || !description || !videoLocalPath || !thumbnailLocalPath) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const video = await uploadOnCloudinary(videoLocalPath);
        const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

        console.log(video.secure_url, thumbnail.secure_url);


        const createdVideo = await Video.create({
            title,
            description,
            video: video.secure_url,
            thumbnail: thumbnail.secure_url,
            owner: userId
        });

        const savedVideo = await createdVideo.save();

        if (!savedVideo) {
            return res.status(400).json({
                message: 'Video could not be published'
            });
        }

        return res.status(201).json({
            message: 'Video published successfully',
            video: savedVideo
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error'
        });

    }

}

export const getAllVideos = async (req, res) => {

    try {
        const { userId } = req.params

        if (!userId) {
            return res.status(400).json({
                message: "userId is required"
            })
        }

        const AllVideos = await Video.find({ owner: userId })

        if (!AllVideos) {
            return res.status(404).json({
                message: "No videos found"
            })
        }

        return res.status(200).json({
            message: "All videos fetched successfully",
            AllVideos

        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error'
        });

    }
}

export const getVideoById = async (req, res) => {
    try {
        const { videoId } = req.params
        console.log(videoId);


        if (!videoId) {
            return res.status(400).json({
                message: "videoId is required"
            })
        }

        const video = await Video.findById({ _id: videoId })

        if (!video) {
            return res.status(404).json({
                message: "No video found"
            })
        }

        return res.status(200).json({
            message: "Video fetched successfully",
            video
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error'
        });

    }
}

export const deleteVideo = async (req, res) => {
    try {
        const { userId, videoId } = req.params
        console.log(videoId, userId);

        if (!videoId || !userId) {
            return res.status(400).json({
                message: "videoId is required"
            })
        }

        const video = await Video.findById(
            { _id: videoId }
        )

        if (!video) {
            return res.status(404).json({
                message: "No video found"
            })
        }

        if (video.owner !== userId) {
            return res.status(403).json({
                message: "You are not owner of this video"
            })
        }

        await Video.findByIdAndDelete({ _id: videoId })

        return res.status(200).json({
            message: "Video deleted successfully",
            video
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error'
        });

    }
}

export const updateVideo = async (req, res) => {
    try {
        const { userId, videoId } = req.params
        const { title, description } = req.body
        const thumbnailLocalPath = req.files.thumbnail[0].path;


        if (!videoId || !userId) {
            return res.status(400).json({
                message: "videoId is required"
            })
        }

        if (video.owner !== userId) {
            return res.status(403).json({
                message: "You are not owner of this video"
            })
        }

        if (!thumbnailLocalPath) {
            return res.status(400).json({
                message: "Thumbnail is required"
            });
        }

        const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

        if (!thumbnail) {
            return res.status(400).json({
                message: "Thumbnail could not be uploaded"
            });
        }


        const video = await Video.findByIdAndUpdate(
            { _id: videoId },
            { title, description },
            { thumbnail: thumbnail },
            { new: true }
        )

        if (!video) {
            return res.status(404).json({
                message: "No video found"
            })
        }

        return res.status(200).json({
            message: "Video updated successfully",
            video
        })

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error'
        });

    }
}
