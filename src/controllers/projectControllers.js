const {
  createProject,
  getProject,
  deleteProject,
  updateProject,
} = require("../services/productService");
const Joi = require("joi");
//CREATE
const postCreateProject = async (req, res) => {
  let result = await createProject(req.body);
  return res.status(200).json({
    EC: 0,
    data: result,
  });
};

//GET ALL
const getAllProject = async (req, res) => {
  let result = await getProject(req.query);
  return res.status(200).json({
    EC: 0,
    data: result,
  });
};

//DELETE All
const deleteProjectApi = async (req, res) => {
  let result = await deleteProject(req.body.id);
  return res.status(200).json({
    EC: 0,
    data: result,
  });
};

//UPDATE
const putUpdateProject = async (req, res) => {
  let result = await updateProject(req.body);
  return res.status(200).json({
    EC: 0,
    data: result,
  });
};

module.exports = {
  postCreateProject,
  getAllProject,
  deleteProjectApi,
  putUpdateProject,
};
