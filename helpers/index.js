const { sign } = require("jsonwebtoken");
const { jwtSecret } = require("../config");
const moment = require("moment-timezone");

const getUserToken = (user) => {
  const plainObject = {
    ...user?.dataValues,
    userControl: user?.userControl?.dataValues,
  };

  return sign(plainObject, jwtSecret);
};

const getSundayDate = () => {
  const now = moment.now();
  const time = moment.tz(now, "Asia/Jakarta");

  return moment(time).locale("id").startOf("week").format("DD MMMM YYYY");
};

const getMonthFileName = () => {
  return `Foto Video Anak - Bulan ${moment().locale("id").format("MMMM")}`;
};

const getMonthFolderNameBySundayDate = (sundayDate) => {
  const month = sundayDate.split(" ")[1];

  return `Foto Video Anak - Bulan ${month}`;
};

const getFolderClass = (childrenClass, cabangName) => {
  let folderClass = "";

  if (
    (childrenClass == "Pratama" || childrenClass == "Kecil") &&
    cabangName == "Kopo"
  ) {
    folderClass = "Besar";
  } else if (
    childrenClass == "Balita" ||
    childrenClass == "Batita" ||
    childrenClass == "Pratama" ||
    childrenClass == "Kecil" ||
    childrenClass == "Daud" ||
    childrenClass == "Balita/Pratama"
  ) {
    folderClass = "Kecil";
  } else {
    folderClass = "Besaar";
  }

  return folderClass;
};

module.exports = {
  getUserToken,
  getSundayDate,
  getMonthFileName,
  getMonthFolderNameBySundayDate,
  getFolderClass,
};
