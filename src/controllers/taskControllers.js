const {
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require("../services/taskService");

//CREATE
const postCreateTask = async (req, res) => {
  let result = await createTask(req.body);
  return res.status(200).json({
    EC: 0,
    data: result,
  });
};

//GET ALL
const getAllTask = async (req, res) => {
  let result = await getTask(req.query);
  return res.status(200).json({
    EC: 0,
    data: result,
  });
};

//UPDATE
const putUpdateTask = async (req, res) => {
  let result = await updateTask(req.body);
  return res.status(200).json({
    EC: 0,
    data: result,
  });
};

// DELETE
const deleteTaskApi = async (req, res) => {
  let result = await deleteTask(req.body.id);
  return res.status(200).json({
    EC: 0,
    data: result,
  });
};

module.exports = {
  postCreateTask,
  getAllTask,
  putUpdateTask,
  deleteTaskApi,
};
