import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { Video } from "../models/video.js"

export const publishVideo = async (req, res) => {
    try {
        console.log("Publishing video");

        const { title, description } = req.body;

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
            thumbnail: thumbnail.secure_url
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