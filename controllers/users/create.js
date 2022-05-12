const { request, response } = require("express");
const Joi = require("joi");
const { User, UserControl, UserPermissionRequest } = require("../../models");
const { hashSync } = require("bcrypt");

/**
 *
 * @param {request} req
 * @param {response} res
 *
 */
module.exports = async (req, res) => {
  try {
    const scheme = Joi.object({
      name: Joi.string().required().messages({
        "string.base": "User name must be a type of string",
        "any.required": "Please inser user name",
      }),
      email: Joi.string().email().required().messages({
        "string.email": "User email must be an active email",
        "any.required": "Please insert user email",
      }),
      password: Joi.string().min(8).required().messages({
        "string.base": "User password must be a type of string",
        "string.min": "Your password length must be greather than 8 character",
        "any.required": "Please insert user password",
      }),
      cabangId: Joi.number().required().messages({
        "number.base": "Cabang id must be a type of number",
        "any.required": "Please insert cabang id",
      }),
      requestPermission: Joi.string().valid("admin", "superadmin").messages({
        "string.base": "Request permission must be a type of string",
        "any.only":
          "Request permission value must be either admin or superadmin",
      }),
    });

    const validation = scheme.validate(req.body);

    if (validation.error)
      return res.status(400).json({
        status: "error",
        message: validation.error.details[0].message,
      });

    const { name, email, password, cabangId, requestPermission } = req.body;
    const hashedPass = hashSync(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPass,
      cabangId,
    });

    await UserControl.create({
      userId: user?.id,
    });

    await UserPermissionRequest.create({
      requestAs: requestPermission,
      userId: user?.id,
    });

    res.status(201).json({
      status: "created",
      message: "Successfully register please login!",
    });
  } catch (err) {
    if (err?.name === "SequelizeUniqueConstraintError")
      return res.status(409).json({
        status: "error",
        message: "Email already registered",
      });
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
