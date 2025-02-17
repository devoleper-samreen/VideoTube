import { Video } from "../models/video.js";

export const searchVideos = async (req, res) => {
    try {
        const query = req.query.q;

        // Case-insensitive search
        const videos = await Video.find({
            $or: [
                {
                    title: {
                        $regex: query,
                        $options: "i"
                    }
                },
                {
                    description: {
                        $regex: query,
                        $options: "i"
                    }
                },
            ],
        });

        return res.status(200).json(videos);

    } catch (error) {
        console.error("Error in search: ", error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};
