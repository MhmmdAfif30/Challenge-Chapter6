const router = require('express').Router();
const { image } = require('../libs/multer');
const { createMedia, indexMedia, detailMedia, updateMedia, deleteGambar } = require('../controllers/media.controllers');

router.post("/media", image.single("gambar"), createMedia);
router.get('/media', indexMedia);
router.get('/media/:id', detailMedia);
router.put('/media/:id',image.single("gambar"), updateMedia);
router.delete('/media/:id', deleteGambar);

module.exports = router;