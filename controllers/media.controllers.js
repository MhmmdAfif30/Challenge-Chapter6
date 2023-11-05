const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const path = require("path");
const Imagekit = require("../libs/imagekit");

module.exports = {
  //menambahkan media
  createMedia: async (req, res, next) => {
    try {
      let { judul, deskripsi } = req.body;

      let strFile = req.file.buffer.toString("base64");

      let { url } = await Imagekit.upload({
        fileName: Date.now() + path.extname(req.file.originalname),
        file: strFile,
      });

      let media = await prisma.image.create({
        data: {
          judul,
          deskripsi,
          gambar: url,
        },
      });

      if (!media) {
        return res.status(400).json({
          status: false,
          message: "Bad Request!",
          err: err.message,
          data: null,
        });
      }
      return res.status(201).json({
        status: true,
        message: "OK!",
        err: null,
        data: { media },
      });
    } catch (err) {
      next(err);
    }
  },

  //menampilkan seluruh media
  indexMedia: async (req, res, next) => {
    try {
      let media = await prisma.image.findMany();

      if (!media) {
        return res.status(400).json({
          status: false,
          message: "Bad Request!",
          err: err.message,
          data: null,
        });
      }

      return res.status(200).json({
        status: true,
        message: "Ok!",
        err: null,
        data: { media },
      });
    } catch (err) {
      next(err);
    }
  },

  //menampilkan detail media
  detailMedia: async (req, res, next) => {
    try {
      let { id } = req.params;
      let media = await prisma.image.findUnique({
        where: { id: Number(id) },
      });

      if (!media) {
        return res.status(400).json({
          status: false,
          message: "Bad Request",
          data: `Data dengan ${id} tidak ditemukan `,
        });
      }
      res.status(200).json({
        status: true,
        message: "OK",
        data: media,
      });
    } catch (err) {
      next(err);
    }
  },

  //update media
  updateMedia: async (req, res, next) => {
    try {
      let { id } = req.params;
      let { judul, deskripsi } = req.body;
      let strFile = req.file.buffer.toString("base64");

      let { url } = await Imagekit.upload({
        fileName: Date.now() + path.extname(req.file.originalname),
        file: strFile,
      });

      let media = await prisma.image.update({
        where: { id: Number(id) },
        data: {
          judul,
          deskripsi,
          gambar: url,
        },
      });

      if (!media) {
        return res.status(400).json({
          status: false,
          message: "Bad Request",
          data: `Data dengan ${id} tidak ditemukan `,
        });
      }

      res.status(200).json({
        status: true,
        message: "OK!",
        data: media,
      });
    } catch (err) {
      next(err);
    }
  },

  //hapus gambar
  deleteGambar: async (req, res, next) => {
    try {
      let { id  } = req.params;

      let media = await prisma.image.delete({
        where: { id: Number(id) },
      });

      res.status(200).json({
        status: true,
        message: "Gambar Telah Dihapus!",
        data: media,
      });
    } catch (err) {
      next(err);
    }
  },
};
