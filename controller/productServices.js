const serviceModel = require('../models/productServicesSchema');

// @desc Create new service
const createService = async (req, res) => {
  try {
    const { language, title, description, imageUrl } = req.body;

    if (!language || !title || !description) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newService = new serviceModel({
      language,
      title,
      description,
      imageUrl: Array.isArray(imageUrl) ? imageUrl : [imageUrl].filter(Boolean),
    });

    await newService.save();
    res.status(201).json({ message: 'Service created', service: newService });
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// @desc Get all services
const getAllServices = async (req, res) => {
  try {
    const services = await serviceModel
      .find()
      .sort({ createdAt: -1 })
      .lean();
    res.status(200).json(services);
  } catch (error) {
    console.error('Fetch All Services Error:', error);
    res.status(500).json({ message: 'Error fetching services', error });
  }
};

// @desc Get a service by ID
const getServiceById = async (req, res) => {
  try {
    const service = await serviceModel.findById(req.params.id).lean();
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching service', error });
  }
};

// @desc Update a service
const updateService = async (req, res) => {
  try {
    const { title, description, imageUrl, language } = req.body;

    const updatedService = await serviceModel.findByIdAndUpdate(
      req.params.id,
      { title, description, imageUrl: Array.isArray(imageUrl) ? imageUrl : [imageUrl].filter(Boolean), language },
      { new: true }
    );

    if (!updatedService) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json({ message: 'Service updated successfully', service: updatedService });
  } catch (error) {
    res.status(500).json({ message: 'Error updating service', error });
  }
};

// @desc Delete a service
const deleteService = async (req, res) => {
  try {
    const deletedService = await serviceModel.findByIdAndDelete(req.params.id);
    if (!deletedService) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting service', error });
  }
};

module.exports = {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService
};