const Customer = require('../models/Customers');

const createCustomer = async (req, res) => {
  try {
    const { title, description, images } = req.body;

    // تحقق من وجود اللغتين وعناوين الصور وشكل الصور (مصفوفة كائنات)
    if (
      !title || !title.en || !title.ar ||
      !description || !description.en || !description.ar ||
      !Array.isArray(images) || images.length === 0 ||
      !images.every(img => img.url && img.caption && img.caption.en && img.caption.ar)
    ) {
      return res.status(400).json({ 
        message: "Please provide both English and Arabic for title and description, and images array with url and captions in both languages." 
      });
    }

    const newCustomer = new Customer({ title, description, images });
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
    const { title, description, images } = req.body;

    if (
      !title || !title.en || !title.ar ||
      !description || !description.en || !description.ar ||
      !Array.isArray(images) || images.length === 0 ||
      !images.every(img => img.url && img.caption && img.caption.en && img.caption.ar)
    ) {
      return res.status(400).json({ 
        message: "Please provide both English and Arabic for title and description, and images array with url and captions in both languages." 
      });
    }

    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      { title, description, images },
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

// تعديل دالة تحديث الصور لتتعامل مع كائنات الصور (url + caption)
const updateCustomerImages = async (req, res) => {
  try {
    const { imageToRemoveUrl, newImage } = req.body; 
    // imageToRemoveUrl: رابط الصورة التي نريد حذفها
    // newImage: كائن الصورة الجديد { url, caption: { en, ar } }

    const customerDoc = await Customer.findById(req.params.id);
    if (!customerDoc) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // إزالة الصورة حسب الرابط
    customerDoc.images = customerDoc.images.filter(img => img.url !== imageToRemoveUrl);

    // إضافة الصورة الجديدة إذا موجودة وصحيحة
    if (newImage && newImage.url && newImage.caption && newImage.caption.en && newImage.caption.ar) {
      customerDoc.images.push(newImage);
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
