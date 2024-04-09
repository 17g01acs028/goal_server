import Week from '../models/Week.js';

// Create a new week
export const createWeek = async (req, res) => {
    try {
        const { startDate, endDate, user } = req.body;
        const week = new Week({ startDate, endDate,user });
        await week.save();
        res.status(201).json(week);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create week', message: error.message });
    }
};

// Retrieve all weeks
export const getAllWeeks = async (req, res) => {
    try {
        const weeks = await Week.find({deleted:false});
        res.json(weeks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weeks', message: error.message });
    }
};

export const getUserWeeks = async (req, res) => {
    try {
        const { id } = req.params;
        const weeks = await Week.find({user:id,deleted:false});
        res.json(weeks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weeks', message: error.message });
    }
};

// Retrieve a specific week by ID
export const getWeekById = async (req, res) => {
    try {
        const { id } = req.params;
        const week = await Week.findById(id,{deleted:false});
        if (!week) {
            return res.status(404).json({ error: 'Week not found' });
        }
        res.json(week);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch week', message: error.message });
    }
};

// Update a specific week by ID
export const updateWeek = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedWeek = await Week.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedWeek) {
            return res.status(404).json({ error: 'Week not found' });
        }
        res.json(updatedWeek);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update week', message: error.message });
    }
};

// Delete a specific week by ID
export const deleteWeek = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedWeek = await Week.findByIdAndUpdate(id,{deleted:true});
        if (!deletedWeek) {
            return res.status(404).json({ error: 'Week not found' });
        }
        res.json({ message: 'Week deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete week', message: error.message });
    }
};
