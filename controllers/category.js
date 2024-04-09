import Category from "../models/Category.js";

// Create a new category
export const createCategory = async (req, res) => {
    try {
        const { categoryName } = req.body;
        const category = new Category({ categoryName });
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create category', message: error.message });
    }
};

// Get all categories
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({deleted:false});
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch categories', message: error.message });
    }
};

// Get single category
export const getCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const categories = await Category.findById(id,{deleted:false});
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch categories', message: error.message });
    }
};
// Delete a category
export const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        await Category.findByIdAndUpdate(categoryId,{deleted:true});
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete category', message: error.message });
    }
};

// Update a category
export const updateCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const updates = req.body;
        const category = await Category.findByIdAndUpdate(categoryId, updates, { new: true });
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update category', message: error.message });
    }
};