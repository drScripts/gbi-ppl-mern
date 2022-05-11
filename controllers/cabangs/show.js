const { request, response } = require("express");
const { Cabang } = require("../../models");

/**
 *
 * @param {request} req
 * @param {response} res
 *
 */
module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    const cabang = await Cabang.findByPk(id, { paranoid: false });

    if (!cabang)
      return res.status(404).json({
        status: "message",
        message: "Can't find cabang with that id",
      });

    res.send({
      status: "success",
      data: { cabang },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
