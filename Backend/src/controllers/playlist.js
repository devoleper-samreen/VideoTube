import { Playlist } from "../models/playlist.js";

// Create a new playlist
export const createPlaylist = async (req, res) => {
    try {
        const { name, description, videos } = req.body;
        const owner = req.user._id;
        const newPlaylist = new Playlist({
            name,
            description,
            videos,
            owner
        });
        await newPlaylist.save();

        return res.status(201).json(newPlaylist);

    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};

// Get all playlists for a specific user
export const getPlaylistsByUser = async (req, res) => {
    try {
        const owner = req.user._id;
        const playlists = await Playlist.find({ owner }).populate('videos', 'title', 'description');

        return res.status(200).json(playlists);
    } catch (error) {
        return res.status(404).json({
            message: error.message
        });
    }
};

// Update a playlist
export const updatePlaylist = async (req, res) => {
    try {
        const { id } = req.params;//playlist id
        const { name, description, videos } = req.body;

        const updatedPlaylist = await Playlist.findByIdAndUpdate(
            id,
            { name, description, videos },
            { new: true }
        );

        if (!updatedPlaylist) {
            return res.status(404).json({
                message: "Playlist not found"
            });
        }

        return res.status(200).json(updatedPlaylist);

    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};

// Delete a playlist
export const deletePlaylist = async (req, res) => {
    try {
        const { id } = req.params;//playlist id

        const deletedPlaylist = await Playlist.findByIdAndDelete(id);

        if (!deletedPlaylist) {
            return res.status(404).json({
                message: "Playlist not found"
            });
        }
        return res.status(200).json({
            message: "Playlist deleted successfully"
        });

    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};
