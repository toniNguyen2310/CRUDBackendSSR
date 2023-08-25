const aqp = require("api-query-params");
const Task = require("../models/task");

//CREATE
const createTask = async (data) => {
  if (data.type === "EMPTY-TASK") {
    let result = await Task.create(data);
    return result;
  }
  return null;
};

// GET ALL
const getTask = async (queryString) => {
  const page = queryString.page;
  const { filter, limit, population } = aqp(queryString);
  delete filter.page;
  let offset = (page - 1) * limit;
  result = await Task.find(filter)
    .populate(population)
    .skip(offset)
    .limit(limit)
    .exec();
  return result;
};

//UPDATE
const updateTask = async (dataUpdate) => {
  try {
    let result = await Task.updateOne(
      { _id: dataUpdate.id },
      {
        // name: dataUpdate.name,
        // description: dataUpdate.description,
        // status: dataUpdate.status,
        // startDate: dataUpdate.startDate,
        // endDate: dataUpdate.endDate,
        ...dataUpdate,
      }
    );
    return result;
  } catch (error) {
    console.log("error>>> ", error);
    return null;
  }
};

//DELETE
const deleteTask = async (idDelete) => {
  try {
    let result = await Task.deleteById(idDelete);
    return result;
  } catch (error) {
    console.log("error>>> ", error);
    return null;
  }
};
module.exports = {
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
