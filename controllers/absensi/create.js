const { request, response } = require("express");
const Joi = require("joi");
const { googleRedirectUrl } = require("../../config");
const { getSundayDate, getFolderClass } = require("../../helpers");
const GoogleDriveApi = require("../../helpers/google-drive");
const { Absensi, GoogleToken, Children, Pembimbing } = require("../../models");

/**
 *
 * @param {request} req
 * @param {response} res
 *
 */
module.exports = async (req, res) => {
  try {
    const scheme = Joi.object({
      childrenId: Joi.number().required().messages({
        "number.base": "Children must be a type of number",
        "any.required": "Please insert children",
      }),
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

    const { id } = req.user;
    const { childrenId, quiz, zoom, aba, komsel, onsite } = req.body;

    const child = await Children.findByPk(childrenId, {
      include: [
        "kelas",
        {
          as: "pembimbing",
          model: Pembimbing,
          include: "cabang",
        },
      ],
    });

    if (!child)
      return res.status(404).json({
        status: "error",
        message: "Can't find children with that id",
      });

    const token = await GoogleToken.findOne();
    const refreshToken = token.refreshToken;
    const driveApi = new GoogleDriveApi(googleRedirectUrl, refreshToken);

    const folderClass = getFolderClass(
      child?.kelas?.name,
      child?.pembimbing?.cabang?.name
    );

    await driveApi.checkRequirementFolder(
      child?.pembimbing?.cabang?.name,
      folderClass
    );
    const sundayDate = getSundayDate();

    const absensi = await Absensi.create({
      childrenId,
      quiz,
      zoom,
      aba,
      komsel,
      onsite,
      createdBy: id,
      sundayDate: sundayDate,
    });

    if (req.files.image) {
      const image = req.files.image[0];
      const fileExt = "." + image?.originalname?.split(".")?.pop();
      driveApi
        .insertFolderByMonth(
          image,
          child.name,
          child?.pembimbing?.cabang?.name,
          folderClass
        )
        .then((fileId) => {
          absensi.update({
            image: true,
            fotoId: fileId,
            imageName: child.name + fileExt,
          });
        });
    }

    if (req.files.video) {
      const video = req.files.video[0];
      const fileExt = "." + video?.originalname?.split(".")?.pop();
      driveApi
        .insertFolderByMonth(
          video,
          child.name,
          child?.pembimbing?.cabang?.name,
          folderClass
        )
        .then((fileId) => {
          absensi.update({
            video: true,
            videoId: fileId,
            videoName: child.name + fileExt,
          });
        });
    }

    res.status(201).json({
      status: "created",
      data: { absensi: req.body },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
