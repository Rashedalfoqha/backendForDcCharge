const Brand = require('../models/brand');

const createBrand = async (req, res) => {
  try {
    const { title, description, image } = req.body;

    if (
      !title || !title.en || !title.ar ||
      !description || !description.en || !description.ar ||
      !image
    ) {
      return res.status(400).json({ message: "Please provide both English and Arabic for title and description, and an image." });
    }

    const newBrand = new Brand({ title, description, image });
    await newBrand.save();
    res.status(201).json({ message: "Brand created successfully", brand: newBrand });
  } catch (error) {
    console.error('Error creating brand:', error);
    res.status(500).json({ message: "Error creating brand", error: error.message });
  }
};

const getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find().select('title description image').lean();
    res.status(200).json({ brands });
  } catch (error) {
    res.status(500).json({ message: "Error fetching brands", error: error.message });
  }
};

const deleteBrand = async (req, res) => {
  try {
    const deletedBrand = await Brand.findByIdAndDelete(req.params.id);
    if (!deletedBrand) {
      return res.status(404).json({ message: "Brand not found" });
    }
    res.status(200).json({ message: "Brand deleted successfully", brand: deletedBrand });
  } catch (error) {
    res.status(500).json({ message: "Error deleting brand", error: error.message });
  }
};

const updateBrand = async (req, res) => {
  try {
    const { title, description, image } = req.body;

    if (
      !title || !title.en || !title.ar ||
      !description || !description.en || !description.ar ||
      !image
    ) {
      return res.status(400).json({ message: "Please provide both English and Arabic for title and description, and an image." });
    }

    const updatedBrand = await Brand.findByIdAndUpdate(
      req.params.id,
      { title, description, image },
      { new: true }
    );

    if (!updatedBrand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    res.status(200).json({ message: "Brand updated successfully", brand: updatedBrand });
  } catch (error) {
    res.status(500).json({ message: "Error updating brand", error: error.message });
  }
};

const updateBrandImages = async (req, res) => {
  try {
    const { imageToRemove, newImage } = req.body;
    const brandDoc = await Brand.findById(req.params.id);
    if (!brandDoc) {
      return res.status(404).json({ message: "Brand not found" });
    }

    // هنا نفترض أن image هو مصفوفة (لكن حسب سكيما هو Mixed، فلو مصفوفة نقدر نستخدمها)
    if (!Array.isArray(brandDoc.image)) {
      return res.status(400).json({ message: "Brand images field is not an array." });
    }

    brandDoc.image = brandDoc.image.filter(img => img !== imageToRemove);

    if (newImage) {
      brandDoc.image.push(newImage);
    }

    await brandDoc.save();

    res.status(200).json({ message: "Images updated successfully", brand: brandDoc });
  } catch (error) {
    res.status(500).json({ message: "Error updating images", error: error.message });
  }
};

module.exports = {
  createBrand,
  getAllBrands,
  deleteBrand,
  updateBrand,
  updateBrandImages,
};
