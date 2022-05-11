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
    const cabangs = await Cabang.findAll({ paranoid: false });

    res.send({
      status: "success",
      data: { cabangs },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
