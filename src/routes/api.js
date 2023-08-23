const express = require("express");

const routerAPI = express.Router();
const {
  getUsersApi,
  postCreateUser,
  putUpdateUserAPI,
  deleteUserAPI,
  postUploadSingleFileApi,
  postUploadMutipleFileApi,
} = require("../controllers/apiControllers");

const {
  postCreateCustomer,
  postCreateArrayCustomer,
  getAllCustomerApi,
  putUpdateCustomer,
  deleteCustomerApi,
  deleteArrayCustomer,
} = require("../controllers/customerController");

//Khai báo routes
routerAPI.get("/users", getUsersApi);
routerAPI.post("/users", postCreateUser);
routerAPI.put("/users", putUpdateUserAPI);
routerAPI.delete("/users", deleteUserAPI);

routerAPI.post("/file", postUploadSingleFileApi);
routerAPI.post("/files", postUploadMutipleFileApi);

//Customer
routerAPI.get("/customers", getAllCustomerApi);
routerAPI.post("/customers", postCreateCustomer);
routerAPI.post("/customers-many", postCreateArrayCustomer);
routerAPI.put("/customers", putUpdateCustomer);
routerAPI.delete("/customers", deleteCustomerApi);
routerAPI.delete("/customers-many", deleteArrayCustomer);

//Req Querry ==> nên dùng vì ko phải khai báo nhiều như req.params
routerAPI.get("/info", (req, res) => {
  return res.status(200).json({ data: req.query });
});

//Req Params cách viết dễ hơn nhưng phải khai báo thêm nhiều route => nên ko dc sử dụng nhiều
routerAPI.get("/info/:name/:address", (req, res) => {
  console.log("req.params>>> ", req.params);
  return res.status(200).json({ data: req.params });
});

module.exports = routerAPI;
