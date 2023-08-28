const Project = require("../models/project");
const aqp = require("api-query-params");

//CREATE Project
const createProject = async (data) => {
  //EMPTY PROJECT
  if (data.type === "EMPTY-PROJECT") {
    let result = await Project.create(data);
    return result;
  }

  //ADD USERS
  if (data.type === "ADD-USERS") {
    let myProject = await Project.findById(data.projectId).exec();
    console.log("myProject>>> ", myProject);
    for (let i = 0; i < data.usersArr.length; i++) {
      myProject.usersInfor.push(data.usersArr[i]);
    }
    let newResult = await myProject.save();
    return newResult;
  }

  //ADD TASKs
  if (data.type === "ADD-TASKS") {
    let myProject = await Project.findById(data.projectId).exec();

    for (let i = 0; i < data.taskArr.length; i++) {
      myProject.tasks.push(data.taskArr[i]);
    }
    let newResult = await myProject.save();
    return newResult;
  }

  //REMOVE USER
  if (data.type === "REMOVE-USERS") {
    let myProject = await Project.findById(data.projectId).exec();
    for (let i = 0; i < data.usersArr.length; i++) {
      myProject.usersInfor.pull(data.usersArr[i]);
    }
    let newProject = await myProject.save();
    return newProject;
  }

  return null;
};

//GET project
const getProject = async (queryString) => {
  const page = queryString.page;
  const { filter, limit, population } = aqp(queryString);
  console.log("filter>>> ", filter);
  delete filter.page;
  let offset = (page - 1) * limit;
  result = await Project.find(filter)
    .populate(population)
    .skip(offset)
    .limit(limit)
    .exec();
  console.log("data>> ", queryString);
  return result;
};

//DELETE a project
const deleteProject = async (id) => {
  try {
    let result = await Project.deleteById(id);
    return result;
  } catch (error) {
    console.log("error>>> ", error);
    return null;
  }
};

//UPDATE a Project
const updateProject = async (dataUpdate) => {
  try {
    let result = await Project.updateOne(
      { _id: dataUpdate.id },
      {
        name: dataUpdate.name,
        startDate: dataUpdate.startDate,
        endDate: dataUpdate.endDate,
        description: dataUpdate.description,
      }
    );
    console.log(result);
    return result;
  } catch (error) {
    console.log("error>>> ", error);
    return null;
  }
};

module.exports = {
  createProject,
  getProject,
  deleteProject,
  updateProject,
};
