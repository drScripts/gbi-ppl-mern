const { request, response } = require("express");
const Joi = require("joi");
const { googleRedirectUrl } = require("../../config");
const {
  getMonthFolderNameBySundayDate,
  getFolderClass,
} = require("../../helpers");
const GoogleDriveApi = require("../../helpers/google-drive");
const { Absensi, Children, Pembimbing, GoogleToken } = require("../../models");

/**
 *
 * @param {request} req
 * @param {response} res
 *
 */
module.exports = async (req, res) => {
  try {
    const scheme = Joi.object({
      quiz: Joi.boolean().messages({
        "boolean.base": "Quiz must be a type of boolean",
      }),
      zoom: Joi.boolean().messages({
        "boolean.base": "Quiz must be a type of boolean",
      }),
      aba: Joi.number().messages({
        "number.base": "Quiz must be a type of number",
      }),
      komsel: Joi.boolean().messages({
        "boolean.base": "Quiz must be a type of boolean",
      }),
      onsite: Joi.boolean().messages({
        "boolean.base": "Quiz must be a type of boolean",
      }),
    });

    const validation = scheme.validate(req.body);

    if (validation.error)
      return res.status(400).json({
        status: "error",
        message: validation.error.details[0].message,
      });

    const { quiz, zoom, aba, komsel, onsite } = req.body;
    const { id } = req.params;
    const { id: userId } = req.user;

    const absensi = await Absensi.findByPk(id, {
      include: {
        as: "children",
        model: Children,
        include: [
          {
            as: "pembimbing",
            model: Pembimbing,
            include: "cabang",
          },
          "kelas",
        ],
      },
    });

    if (!absensi)
      return res.status(404).json({
        status: "error",
        message: "Can't find absen with that id",
      });

    const token = await GoogleToken.findOne();
    const refreshToken = token.refreshToken;
    const driveApi = new GoogleDriveApi(googleRedirectUrl, refreshToken);
    const defaultMonthName = getMonthFolderNameBySundayDate(
      absensi?.sundayDate
    );
    await driveApi.checkRequirementFolder(
      absensi?.children?.pembimbing?.cabang?.name,
      absensi?.children?.kelas?.name,
      absensi?.sundayDate
    );

    const folderClass = getFolderClass(
      absensi?.children?.kelas?.name,
      absensi?.children?.pembimbing?.cabang?.name
    );

    await absensi.update({
      quiz,
      zoom,
      aba,
      komsel,
      onsite,
      updatedBy: userId,
    });

    if (req.files.image) {
      const image = req.files.image[0];
      const fileExt = "." + image?.originalname?.split(".")?.pop();
      driveApi
        .insertFolderByMonth(
          image,
          absensi?.children?.name,
          absensi?.children?.pembimbing?.cabang?.name,
          folderClass,
          defaultMonthName,
          absensi?.sundayDate
        )
        .then((fileId) => {
          absensi.update({
            fotoId: fileId,
            imageName: absensi?.children?.name + fileExt,
            image: true,
          });
        });
      if (absensi?.fotoId) {
        driveApi.deleteFile(absensi?.fotoId);
      }
    }

    if (req.files.video) {
      const video = req.files.video[0];
      const fileExt = "." + video?.originalname?.split(".")?.pop();
      driveApi
        .insertFolderByMonth(
          video,
          absensi?.children?.name,
          absensi?.children?.pembimbing?.cabang?.name,
          folderClass,
          defaultMonthName,
          absensi?.sundayDate
        )
        .then((fileId) => {
          absensi.update({
            videoId: fileId,
            videoName: absensi?.children?.name + fileExt,
            video: true,
          });
        });
      if (absensi?.videoId) {
        driveApi.deleteFile(absensi?.videoId);
      }
    }

    res.status(201).json({
      status: "created",
      data: { absensi },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
