const { request, response } = require("express");
const Joi = require("joi");
const { Model } = require("sequelize");
const { User, UserControl } = require("../../models");

/**
 *
 * @param {request} req
 * @param {response} res
 *
 */
module.exports = async (req, res) => {
  try {
    const scheme = Joi.object({
      name: Joi.string().messages({
        "string.base": "User name must be a type of string",
      }),
      cabangId: Joi.number().messages({
        "number.base": "Cabang id must be a type of number",
      }),
      quiz: Joi.boolean().messages({
        "boolean.base": "Quiz controll must be a type of boolean",
      }),
      aba: Joi.boolean().messages({
        "boolean.base": "Aba controll must be a type of boolean",
      }),
      komsel: Joi.boolean().messages({
        "boolean.base": "Komsel controll must be a type of boolean",
      }),
      zoom: Joi.boolean().messages({
        "boolean.base": "Zoom controll must be a type of boolean",
      }),
      image: Joi.boolean().messages({
        "boolean.base": "Image controll must be a type of boolean",
      }),
      video: Joi.boolean().messages({
        "boolean.base": "Video controll must be a type of boolean",
      }),
      onsite: Joi.boolean().messages({
        "boolean.base": "Onsite controll must be a type of boolean",
      }),
    });

    const validation = scheme.validate(req.body);

    if (validation.error)
      return res.status(400).json({
        status: "error",
        message: validation.error.details[0].message,
      });

    const { name, quiz, aba, komsel, zoom, image, video, onsite } = req.body;
    const { id } = req.user;

    const user = await User.findByPk(id);

    if (!user)
      return res.status(401).json({
        status: "error",
        message: "Please login!",
      });

    await user.update({ name });

    await UserControl.update(
      { quiz, aba, komsel, zoom, image, video, onsite },
      { where: { userId: id } }
    );

    const newUser = await User.findByPk(id, {
      include: "userControl",
      attributes: {
        exclude: ["password"],
      },
    });

    res.status(201).json({
      status: "created",
      data: { user: newUser },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
