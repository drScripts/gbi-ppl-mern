const { request, response } = require("express");
const { Absensi, Children, Pembimbing, Cabang } = require("../../models");

/**
 *
 * @param {request} req
 * @param {response} res
 *
 */
module.exports = async (req, res) => {
  try {
    const { cabangId } = req.user;

    const absensi = await Absensi.findAll({
      include: {
        as: "children",
        model: Children,
        include: [
          {
            as: "pembimbing",
            model: Pembimbing,
            include: {
              as: "cabang",
              model: Cabang,
            },
          },
          "kelas",
        ],
      },
      where: {
        "$children.pembimbing.cabang.id$": cabangId,
      },
    });

    res.send({
      status: "success",
      data: { absensi },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
