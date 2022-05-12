const { compareSync } = require("bcrypt");
const { request, response } = require("express");
const Joi = require("joi");
const { getUserToken } = require("../../helpers");
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
      email: Joi.string().email().required().messages({
        "string.base": "User email must be a type of string",
        "string.email": "User email must be an active email",
        "any.required": "Please insert user email",
      }),
      password: Joi.string().required().messages({
        "string.base": "User password must be a type of string",
        "any.required": "Please insert user password",
      }),
    });

    const validation = scheme.validate(req.body);

    if (validation.error)
      return res.status(400).json({
        status: "error",
        message: validation.error.details[0].message,
      });

    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      include: "userControl",
    });

    if (!user)
      return res.status(404).json({
        status: "error",
        message: "Can't find user with that email",
      });

    if (!user?.active)
      return res.status(401).json({
        status: "error",
        message: "Please wait the admin to activate your account",
      });

    const validatePass = compareSync(password, user?.password);

    if (!validatePass)
      return res.status(401).json({
        status: "error",
        message: "Wrong password",
      });

    delete user.dataValues.password;

    const token = getUserToken(user);

    res.send({
      status: "success",
      data: {
        user,
        token,
        tokenType: "Bearer",
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
