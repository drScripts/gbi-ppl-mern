const { google } = require("googleapis");
const {
  googleClientId,
  googleClientSecret,
  googleDriveRootFolderId,
} = require("../config");
const fs = require("fs");
const { getMonthFileName, getSundayDate } = require(".");

class GoogleDriveApi {
  constructor(redirectUrl, refreshToken) {
    this.redirectUri = redirectUrl;
    this.refreshToken = refreshToken;

    const oauth2Client = new google.auth.OAuth2({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
      redirectUri: redirectUrl,
    });

    oauth2Client.setCredentials({
      refresh_token: refreshToken,
    });

    this.drive = google.drive({
      version: "v3",
      auth: oauth2Client,
    });
  }

  uploadFile = async (filePath, name, mimeType, parents = []) => {
    try {
      const res = await this.drive.files.create({
        requestBody: {
          name,
          parents,
          mimeType,
          permissions: [
            {
              type: "domain",
              role: "writer",
              domain: "gmail.com",
            },
          ],
        },
        media: {
          mimeType,
          body: fs.createReadStream(filePath),
        },
        fields: ["id"],
      });

      return res?.data?.id;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  createFolder = async (name, parents = []) => {
    try {
      const res = await this.drive.files.create({
        requestBody: {
          name,
          mimeType: "application/vnd.google-apps.folder",
          parents,
        },
        media: {
          mimeType: "application/vnd.google-apps.folder",
        },
        fields: ["id"],
      });

      return res?.data?.id;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  searchFile = async (name, parentsId) => {
    try {
      let q = `mimeType != 'application/vnd.google-apps.folder' and name contains '${name}' and trashed=false`;

      if (parentsId) {
        q += ` and '${parentsId}' in parents`;
      }

      const res = await this.drive.files.list({
        q,
      });

      return res?.data?.files;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  searchFolder = async (name, parentsId) => {
    try {
      let q = `mimeType = 'application/vnd.google-apps.folder' and name contains '${name}' and trashed=false`;

      if (parentsId) {
        q += ` and '${parentsId}' in parents`;
      }

      const res = await this.drive.files.list({
        q,
      });

      return res?.data?.files;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  deleteFile = async (id) => {
    try {
      const res = await this.drive.files.update({
        fileId: id,
        requestBody: { trashed: true },
      });

      return res?.data;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  checkRequirementFolder = async (
    regionFolderName,
    classFolderName,
    defaultWeek,
    defaultMonth
  ) => {
    const monthName = defaultMonth ? defaultMonth : getMonthFileName();
    const weekName = defaultWeek ? defaultWeek : getSundayDate();

    let monthFolder = await this.searchFolder(monthName, [
      googleDriveRootFolderId,
    ]);

    if (!monthFolder.length) {
      monthFolder[0] = {
        id: await this.createFolder(monthName, [googleDriveRootFolderId]),
      };
    }

    let sundayFolder = await this.searchFolder(weekName, [monthFolder[0].id]);

    if (!sundayFolder.length) {
      sundayFolder[0] = {
        id: await this.createFolder(weekName, [monthFolder[0].id]),
      };
    }

    let regionFolder = await this.searchFolder(regionFolderName, [
      sundayFolder[0].id,
    ]);

    if (!regionFolder.length) {
      regionFolder[0] = {
        id: await this.createFolder(regionFolderName, [sundayFolder[0].id]),
      };
    }

    let classFolder = await this.searchFolder(classFolderName, [
      regionFolder[0].id,
    ]);

    if (!classFolder.length) {
      classFolder[0] = {
        id: await this.createFolder(classFolderName, [regionFolder[0].id]),
      };
    }
    let imageFolder = await this.searchFolder("Foto", [classFolder[0].id]);
    if (!imageFolder.length) {
      imageFolder[0] = {
        id: await this.createFolder("Foto", [classFolder[0].id]),
      };
    }

    let videoFolder = await this.searchFolder("Video", [classFolder[0].id]);

    if (!videoFolder.length) {
      videoFolder[0] = {
        id: await this.createFolder("Video", [classFolder[0].id]),
      };
    }
  };

  insertFolderByMonth = async (
    file,
    fileNameConvert,
    regionFolderName,
    classFolderName,
    defaultMonth,
    defaultWeek
  ) => {
    const monthName = defaultMonth ? defaultMonth : getMonthFileName();
    const weekName = defaultWeek ? defaultWeek : getSundayDate();

    let monthFolder = await this.searchFolder(monthName, [
      googleDriveRootFolderId,
    ]);

    if (!monthFolder.length) {
      monthFolder[0] = {
        id: await this.createFolder(monthName, [googleDriveRootFolderId]),
      };
    }

    let sundayFolder = await this.searchFolder(weekName, [monthFolder[0].id]);

    if (!sundayFolder.length) {
      sundayFolder[0] = {
        id: await this.createFolder(weekName, [monthFolder[0].id]),
      };
    }

    let regionFolder = await this.searchFolder(regionFolderName, [
      sundayFolder[0].id,
    ]);

    if (!regionFolder.length) {
      regionFolder[0] = {
        id: await this.createFolder(regionFolderName, [sundayFolder[0].id]),
      };
    }

    let classFolder = await this.searchFolder(classFolderName, [
      regionFolder[0].id,
    ]);

    if (!classFolder.length) {
      classFolder[0] = {
        id: await this.createFolder(classFolderName, [regionFolder[0].id]),
      };
    }

    let usedParentsId = "";

    if (file.fieldname === "image") {
      let imageFolder = await this.searchFolder("Foto", [classFolder[0].id]);
      if (!imageFolder.length) {
        imageFolder[0] = {
          id: await this.createFolder("Foto", [classFolder[0].id]),
        };
      }

      usedParentsId = imageFolder[0].id;
    } else {
      let videoFolder = await this.searchFolder("Video", [classFolder[0].id]);

      if (!videoFolder.length) {
        videoFolder[0] = {
          id: await this.createFolder("Video", [classFolder[0].id]),
        };
      }

      usedParentsId = videoFolder[0].id;
    }

    const fileId = await this.uploadFile(
      file.path,
      fileNameConvert,
      file.mimetype,
      [usedParentsId]
    );

    return fileId;
  };
}

module.exports = GoogleDriveApi;
