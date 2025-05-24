const serviceModel = require('../models/productServicesSchema');
const path = require('path');

// @desc Create new service with image
const createService = async (req, res) => {

  console.log('Req body:', req.body);
  console.log('Req files:', req.files);
  try {
    const { language, title, description } = req.body;

    if (!language || !title || !description) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const imageUrls = req.files.map(file => `/uploads/${file.filename}`);

    const newService = new serviceModel({
      language,
      title,
      description,
      imageUrl: imageUrls,
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
    const services = await serviceModel.find().sort({ createdAt: -1 });
    res.status(200).json(services);
  } catch (error) {
    console.error('Fetch All Services Error:', error);
    res.status(500).json({ message: 'Error fetching services', error });
  }
};

// @desc Get a service by ID
const getServiceById = async (req, res) => {
  try {
    const service = await serviceModel.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json(service);
  } catch (error) {
    console.error('Fetch Service By ID Error:', error);
    res.status(500).json({ message: 'Error fetching service', error });
  }
};

// @desc Update a service with optional image update
const updateService = async (req, res) => {
  try {
    const { title, description } = req.body;

    let imageUrl = req.body.imageUrl || null;
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedService = await serviceModel.findByIdAndUpdate(
      req.params.id,
      { title, description, imageUrl },
      { new: true }
    );

    if (!updatedService) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json({ message: 'Service updated successfully', service: updatedService });
  } catch (error) {
    console.error('Update Service Error:', error);
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
    console.error('Delete Service Error:', error);
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
/*const serviceModel = require('../models/productServicesSchema');
const path = require('path');

// Helper to build filter by page + language
const buildFilter = (page, lang) => ({ page: page, language: lang });

// @desc Create or update (upsert) service by page + language
const upsertservice = async (req, res) => {
  try {
    const { page, language, title, description, imageUrl, servicesDetails } = req.body;

    if (!page || !language) {
      return res.status(400).json({ message: 'page and language are required' });
    }

    // Handle image upload for main imageUrl if file uploaded
    let mainImageUrl = imageUrl || null;
    if (req.file) {
      mainImageUrl = `/uploads/${req.file.filename}`;
    }

    const filter = buildFilter(page, language);
    const update = {
      title,
      description,
      imageUrl: mainImageUrl,
      servicesDetails
    };

    // { new: true, upsert: true } => create if not exists, and return the new document
    const updatedService = await serviceModel.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    });

    res.status(200).json({ message: 'Service upserted successfully', service: updatedService });
  } catch (error) {
    console.error('Upsert Service Error:', error);
    res.status(500).json({ message: 'Error upserting service', error });
  }
};

// @desc Get service by page + language
const getservice = async (req, res) => {
  try {
    const { page, lang } = req.params;
    const service = await serviceModel.findOne(buildFilter(page, lang));
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json(service);
  } catch (error) {
    console.error('Get Service Error:', error);
    res.status(500).json({ message: 'Error fetching service', error });
  }
};

// @desc Update service by page + language
const updateservice = async (req, res) => {
  try {
    const { page, lang } = req.params;
    const { title, description, imageUrl, servicesDetails } = req.body;

    // Handle image upload if present
    let mainImageUrl = imageUrl || null;
    if (req.file) {
      mainImageUrl = `/uploads/${req.file.filename}`;
    }

    const filter = buildFilter(page, lang);
    const update = {
      title,
      description,
      imageUrl: mainImageUrl,
      servicesDetails
    };

    const updatedService = await serviceModel.findOneAndUpdate(filter, update, { new: true });
    if (!updatedService) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json({ message: 'Service updated successfully', service: updatedService });
  } catch (error) {
    console.error('Update Service Error:', error);
    res.status(500).json({ message: 'Error updating service', error });
  }
};

// @desc Delete service by page + language
const deleteservice = async (req, res) => {
  try {
    const { page, lang } = req.params;
    const deletedService = await serviceModel.findOneAndDelete(buildFilter(page, lang));
    if (!deletedService) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Delete Service Error:', error);
    res.status(500).json({ message: 'Error deleting service', error });
  }
};

module.exports = {
  upsertservice,
  getservice, 
  updateservice,
  deleteservice
}; */