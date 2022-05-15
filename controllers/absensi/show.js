const { request, response } = require("express");
const { Absensi, Children, Pembimbing } = require("../../models");

/**
 *
 * @param {request} req
 * @param {response} res
 *
 */
module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    const absen = await Absensi.findByPk(id, {
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
      paranoid: false,
    });

    if (!absen)
      return res.status(404).json({
        status: "error",
        message: "Can't find absen with that id",
      });

    res.send({
      status: "success",
      data: { absen },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
