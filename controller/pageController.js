const PageContent = require('../models/pageContent');

// Get content by page and language
exports.getPageContent = async (req, res) => {
    try {
        const { page, lang } = req.params;
        const content = await PageContent.findOne({ page, language: lang }).lean();
        if (!content) return res.status(404).json({ message: 'Content not found' });
        res.json(content);
    } catch (error) {
        console.error("Error fetching page content:", error);
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
};

// Assuming you updated your model to use `sections` instead of `content`
exports.upsertPageContent = async (req, res) => {
  try {
    const { page, language, title, sections } = req.body;

    if (!page || !language || !sections) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const updated = await PageContent.findOneAndUpdate(
      { page, language },
      {
        title,
        sections,
        lastUpdated: new Date()
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true
      }
    ).lean();

    res.status(200).json(updated);
  } catch (error) {
    console.error("Error upserting page content:", error);
    res.status(500).json({ message: "Server error", error });
  }
};


exports.createPageContent = async (req, res) => {
  try {
    const { page, language, title, sections } = req.body;

    // Validate required fields
    if (!page || !language || !sections || !Array.isArray(sections)) {
      return res.status(400).json({ message: "Missing or invalid required fields" });
    }

    // Check if content already exists for this page and language
    const existing = await PageContent.findOne({ page, language });
    if (existing) {
      return res.status(409).json({ message: "Page content already exists for this page and language" });
    }

    // Create new content
    const newContent = new PageContent({
      page,
      language,
      title,
      sections,
      lastUpdated: new Date()
    });

    const saved = await newContent.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Error creating page content:", error);
    res.status(500).json({ message: "Server error", error });
  }
};


exports.getAllPages = async (req, res) => {
  try {
    const pages = await PageContent.find().select('page language title lastUpdated').sort({ page: 1, language: 1 }).lean();
    res.json(pages);
  } catch (error) {
    console.error("Error fetching all pages:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.deletePageContent = async (req, res) => {
  try {
    const { id } = req.params;
    await PageContent.findByIdAndDelete(id);
    res.json({ message: "Page content deleted successfully" });
  } catch (error) {
    console.error("Error deleting page content:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
