const { request, response } = require("express");
const { UserPermissionRequest } = require("../../models");

/**
 *
 * @param {request} req
 * @param {response} res
 *
 */
module.exports = async (req, res) => {
  try {
    const userPermissionRequest = await UserPermissionRequest.findAll({
      include: "user",
    });

    res.send({
      status: "success",
      data: { userPermissionRequest },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
