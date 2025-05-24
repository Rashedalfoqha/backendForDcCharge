const Customer = require('../models/Customers');

const createCustomer = async (req, res) => {
  try {
    const { title, description, image } = req.body;

    // تحقق وجود اللغتين ووجود مصفوفة الصور
    if (
      !title || !title.en || !title.ar ||
      !description || !description.en || !description.ar ||
      !Array.isArray(image) || image.length === 0
    ) {
      return res.status(400).json({ message: "Please provide both English and Arabic for title and description, and at least one image." });
    }

    const newCustomer = new Customer({ title, description, image });
    await newCustomer.save();
    res.status(201).json({ message: "Customer created successfully", customer: newCustomer });
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(500).json({ message: "Error creating customer", error: error.message });
  }
};

const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json({ customers });
  } catch (error) {
    res.status(500).json({ message: "Error fetching customers", error: error.message });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
    if (!deletedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json({ message: "Customer deleted successfully", customer: deletedCustomer });
  } catch (error) {
    res.status(500).json({ message: "Error deleting customer", error: error.message });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const { title, description, image } = req.body;

    // تحقق بسيط كما في الإنشاء
    if (
      !title || !title.en || !title.ar ||
      !description || !description.en || !description.ar ||
      !Array.isArray(image) || image.length === 0
    ) {
      return res.status(400).json({ message: "Please provide both English and Arabic for title and description, and at least one image." });
    }

    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      { title, description, image },
      { new: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({ message: "Customer updated successfully", customer: updatedCustomer });
  } catch (error) {
    res.status(500).json({ message: "Error updating customer", error: error.message });
  }
};

const updateCustomerImages = async (req, res) => {
  try {
    const { imageToRemove, newImage } = req.body;
    const customerDoc = await Customer.findById(req.params.id);
    if (!customerDoc) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // إزالة الصورة المحددة
    customerDoc.image = customerDoc.image.filter(img => img !== imageToRemove);

    // إضافة الصورة الجديدة إذا موجودة
    if (newImage) {
      customerDoc.image.push(newImage);
    }

    await customerDoc.save();

    res.status(200).json({ message: "Images updated successfully", customer: customerDoc });
  } catch (error) {
    res.status(500).json({ message: "Error updating images", error: error.message });
  }
};

module.exports = {
  createCustomer,
  getAllCustomers,
  deleteCustomer,
  updateCustomer,
  updateCustomerImages,
};
