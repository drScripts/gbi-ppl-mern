const { request, response } = require("express");
const { googleRedirectUrl } = require("../../config");
const GoogleDriveApi = require("../../helpers/google-drive");
const { Absensi, GoogleToken } = require("../../models");

/**
 *
 * @param {request} req
 * @param {response} res
 *
 */
module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const { id: userId } = req.user;

    const absen = await Absensi.findByPk(id);

    if (!absen)
      return res.status(404).json({
        status: "error",
        message: "Can't find absensi with that id",
      });

    const token = await GoogleToken.findOne();

    const driveApi = new GoogleDriveApi(googleRedirectUrl, token?.refreshToken);

    if (absen?.fotoId) driveApi.deleteFile(absen?.fotoId);
    if (absen?.videoId) driveApi.deleteFile(absen?.videoId);

    absen.update({
      deletedBy: userId,
    });

    absen.destroy();

    res.status(201).json({
      status: "created",
      message: "absen successfully delted!",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
