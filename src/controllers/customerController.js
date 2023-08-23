const { uploadSigleFile } = require("../services/fileService");
const {
  createCustomerService,
  createArrayCustomerService,
  getAllCustomerService,
  putUpdateCustomerService,
  deleteCustomerService,
  deleteArrayCustomerService,
} = require("../services/customerService");
// {key:value}
module.exports = {
  postCreateCustomer: async (req, res) => {
    let { name, address, phone, email, description } = req.body;
    let imageUrl = "";

    if (!req.files || Object.keys(req.files).length === 0) {
      //do nothing
    } else {
      let result = await uploadSigleFile(req.files.image);
      imageUrl = result.path;
    }

    let customerData = {
      name,
      address,
      phone,
      email,
      description,
      image: imageUrl,
    };

    let customer = await createCustomerService(customerData);

    return res.status(200).json({
      EC: 0,
      data: customer,
    });
  },

  postCreateArrayCustomer: async (req, res) => {
    let customers = await createArrayCustomerService(req.body.customers);
    if (customers) {
      return res.status(200).json({
        EC: 0,
        data: customers,
      });
    } else {
      return res.status(200).json({
        EC: -1,
        data: customers,
      });
    }
  },

  //GET ALL CUSTOMER
  getAllCustomerApi: async (req, res) => {
    let result = await getAllCustomerService();
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },

  //PUT CUSTOMER
  putUpdateCustomer: async (req, res) => {
    let { id, name, address, phone, email, description } = req.body;
    let customerData = { id, name, address, phone, email, description };
    console.log("customerData>> ", customerData);
    const result = await putUpdateCustomerService(customerData);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },

  //DELETE a customer
  deleteCustomerApi: async (req, res) => {
    let id = req.body.id;
    let result = await deleteCustomerService(id);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },

  //DELETE array customer
  deleteArrayCustomer: async (req, res) => {
    // console.log("req.body.customerId>>> ", req.body.customerId);
    let customers = await deleteArrayCustomerService(req.body.customerId);
    return res.status(200).json({
      EC: 0,
      data: customers,
    });
  },
};
