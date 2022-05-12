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
    const { id } = req.params;

    const userPermissionRequest = await UserPermissionRequest.findByPk(id);

    if (!userPermissionRequest)
      return res.status(404).json({
        status: "error",
        message: "Can't find permission request with that id",
      });

    await userPermissionRequest.destroy();

    res.status(201).json({
      status: "success",
      message: "permission successfully deleted!",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
