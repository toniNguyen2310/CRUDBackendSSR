const User = require("../models/user");
const {
  uploadSigleFile,
  uploadMultipleFiles,
} = require("../services/fileService");

const getUsersApi = async (req, res) => {
  let results = await User.find({});

  return res.status(200).json({
    errorCode: 0,
    data: results,
  });
};

const postCreateUser = async (req, res) => {
  let { title, body, author, name, email, city } = req.body;

  let user = await User.create({
    title,
    body,
    author,
    name,
    email,
    city,
  });

  return res.status(200).json({
    errorCode: 0,
    data: user,
  });
};

const putUpdateUserAPI = async (req, res) => {
  let { title, body, author, userId } = req.body;

  let user = await User.updateOne(
    { _id: userId },
    { title: title, body: body, author: author }
  );

  return res.status(200).json({
    EC: 0,
    data: user,
  });
};

const deleteUserAPI = async (req, res) => {
  let id = req.body.userId;
  let user = await User.deleteOne({ _id: id });

  return res.status(200).json({
    EC: 0,
    data: user,
  });
};

//Upload single file
const postUploadSingleFileApi = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send("No files were uploaded.");
    return;
  }
  let result = await uploadSigleFile(req.files.image);
  console.log("result>>> ", result);
  return res.status(200).json({
    EC: 0,
    data: result,
  });
};

//Upload mutiple file
const postUploadMutipleFileApi = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send("No files were uploaded.");
    return;
  }
  if (Array.isArray(req.files.image)) {
    let result = await uploadMultipleFiles(req.files.image);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  } else {
    return await postUploadSingleFileApi(req, res);
  }
};

module.exports = {
  getUsersApi,
  postCreateUser,
  putUpdateUserAPI,
  deleteUserAPI,
  postUploadSingleFileApi,
  postUploadMutipleFileApi,
};
