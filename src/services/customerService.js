const Customer = require("../models/customer");

const createCustomerService = async (customerData) => {
  console.log("customerData>>> ", customerData);
  try {
    let customer = await Customer.create({
      name: customerData.name,
      address: customerData.address,
      phone: customerData.phone,
      email: customerData.email,
      description: customerData.description,
      image: customerData.image,
    });
    return customer;
  } catch (error) {
    console.log("error>>> ", error);
    return null;
  }
};

const createArrayCustomerService = async (arr) => {
  try {
    let result = await Customer.insertMany(arr);
    return result;
  } catch (error) {
    console.log("error>>> ", error);
    return null;
  }
};

const getAllCustomerService = async () => {
  try {
    let result = await Customer.find({});
    return result;
  } catch (error) {
    console.log("error>>> ", error);
    return null;
  }
};

const putUpdateCustomerService = async (customerData) => {
  try {
    let result = await Customer.updateOne(
      { _id: customerData.id },
      {
        name: customerData.name,
        address: customerData.address,
        phone: customerData.phone,
        email: customerData.email,
        description: customerData.description,
      }
    );
    console.log(result);
    return result;
  } catch (error) {
    console.log("error>>> ", error);
    return null;
  }
};
const deleteCustomerService = async (id) => {
  try {
    let result = await Customer.deleteById(id);
    return result;
  } catch (error) {
    console.log("error>>> ", error);
    return null;
  }
};

const deleteArrayCustomerService = async (arrId) => {
  try {
    let result = await Customer.delete({ _id: { $in: arrId } });
    return result;
  } catch (error) {
    console.log("error>>> ", error);
    return null;
  }
};

module.exports = {
  createCustomerService,
  createArrayCustomerService,
  getAllCustomerService,
  putUpdateCustomerService,
  deleteCustomerService,
  deleteArrayCustomerService,
};
