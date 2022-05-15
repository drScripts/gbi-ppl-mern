const multer = require("multer");
const os = require("os");

/**
 * @param {fieldsName} string[]
 * @param {isRequired} boolean
 *
 */
module.exports = (isRequired = false) => {
  const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, os.tmpdir());
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + file.originalname);
    },
  });

  const upload = multer({
    storage: diskStorage,
    fileFilter: (req, file, cb) => {
      if (file.fieldname === "image") {
        if (file.mimetype.search("image") === -1) {
          req.validationFileError = {
            message: "Please upload a valid image file",
          };
          cb(new Error("Please upload a valid image file"), false);
        }
      }

      if (file.fieldname === "video") {
        if (file.mimetype.search("video") === -1) {
          req.validationFileError = {
            message: "Please upload a valid video file",
          };

          cb(new Error("Please upload a valid video file"), false);
        }
      }

      cb(null, true);
    },
  }).fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "video",
      maxCount: 1,
    },
  ]);

  return (req, res, next) => {
    upload(req, res, (err) => {
      if (req.validationFileError)
        return res.status(400).json({
          status: "error",
          message: req.validationFileError.message,
        });

      if (isRequired) {
        if (!req.files.image && !req.files.video && !err)
          return res.status(400).json({
            status: "error",
            message: "Please upload file image and pdf",
          });
      }

      if (err) {
        if (err.code === "LIMIT_UNEXPECTED_FILE")
          return res.status(400).json({
            status: "error",
            message: `File ${err.field} only 1 file you can upload`,
          });

        return res.status(400).json({
          stats: "error",
          message: err.message,
        });
      }

      next();
    });
  };
};
