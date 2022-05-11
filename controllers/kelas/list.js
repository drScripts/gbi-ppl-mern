const { request, response } = require("express");
const { Kelas } = require("../../models");

/**
 *
 * @param {request} req
 * @param {response} res
 *
 */
module.exports = async (req, res) => {
  try {
    const classes = await Kelas.findAll();

    res.send({
      status: "success",
      data: { classes },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
