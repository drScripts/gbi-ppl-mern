const { request, response } = require("express");
const { UserPermissionRequest, User, UserControl } = require("../../models");

/**
 *
 * @param {request} req
 * @param {response} res
 *
 */
module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    const permissionRequest = await UserPermissionRequest.findByPk(id);

    if (!permissionRequest)
      return res.status(404).json({
        status: "error",
        message: "Can't find request with that id",
      });

    await User.update(
      {
        active: true,
      },
      { where: { id: permissionRequest.userId } }
    );

    await UserControl.update(
      { role: permissionRequest.requestAs },
      { where: { userId: permissionRequest.userId } }
    );

    permissionRequest.destroy();

    res.status(201).json({
      status: "created",
      message: "success update user role and active!",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
