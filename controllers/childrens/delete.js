const { request, response } = require("express");
const { Children } = require("../../models");

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

    const children = await Children.findByPk(id);

    if (!children)
      return res.status(404).json({
        status: "error",
        message: "Can't find children with that id",
      });

    await children.update({ deletedBy: userId });
    children.destroy();

    res.status(201).json({
      status: "created",
      message: "Children successfully deleted!",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
