import express from 'express';
import { createPlaylist, getPlaylistsByUser, updatePlaylist, deletePlaylist } from '../controllers/playlist.js';

const router = express.Router();

router.post('/:id', createPlaylist);
router.delete('/:id', deletePlaylist);
router.patch('/id', updatePlaylist)
router.get('/:id', getPlaylistsByUser);
// router.get('/count/videoId', )

export default router;