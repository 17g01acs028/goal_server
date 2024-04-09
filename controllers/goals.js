import Goal from  "../models/Goal.js";
import Week from '../models/Week.js';
import Category from '../models/Category.js';

//Create Goals
export const createGoal = async (req, res) => {
  try {
    const { title, description, deadline, category, week, user } = req.body;
    const goal = new Goal({ title, description, deadline, category, week, user });
    await goal.save();
    res.status(201).json(goal);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create goal', message: error.message });
  }
};

// Get all goals
export const getAllGoals = async (req, res) => {
  try {
      const goals = await Goal.find({deleted:false});
      res.json(goals);
  } catch (error) {
      res.status(500).json({ error: 'Failed to fetch goals', message: error.message });
  }
};

export const getGoal = async (req, res) => {
  try {
     const id = req.params.id;
      const goals = await Goal.findById(id,{deleted:false});
      res.json(goals);
  } catch (error) {
      res.status(500).json({ error: 'Failed to fetch goals', message: error.message });
  }
};

// Get goals by category
export const getGoalsByCategory = async (req, res) => {
  try {
      const categoryId = req.params.categoryId;
      const goals = await Goal.find({ category: categoryId,deleted:false });
      res.json(goals);
  } catch (error) {
      res.status(500).json({ error: 'Failed to fetch goals', message: error.message });
  }
};

// Delete a goal
export const deleteGoal = async (req, res) => {
  try {
      const goalId = req.params.id;
      await Goal.findByIdAndUpdate(goalId,{deleted:true});
      res.status(204).end();
  } catch (error) {
      res.status(500).json({ error: 'Failed to delete goal', message: error.message });
  }
};

// Update a goal
export const updateGoal = async (req, res) => {
  try {
      const goalId = req.params.id;
      const updates = req.body;
      const goal = await Goal.findByIdAndUpdate(goalId, updates, { new: true });
      res.json(goal);
  } catch (error) {
      res.status(500).json({ error: 'Failed to update goal', message: error.message });
  }
};

export const userGoals = async (req, res) => {
  try {
    const userId = req.params.id;

    console.log(userId);
    const goals = await Goal.find({ user: userId ,deleted:false}).populate('week category');

    console.log(goals);

    const modifiedGoals = goals.map(goal => {
      const { startDate, endDate } = goal.week;
      const weekString = `${startDate.toISOString().split("T")[0]} ~ ${endDate.toISOString().split("T")[0]}`;
      const categoryName = goal.category.categoryName;

      return { ...goal.toObject(), weekString, categoryName };
    });

    res.status(200).json(modifiedGoals);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get goals for user', message: error.message });
  }
}

export const userWeekGoals =async (req, res) => {
  try {
      const userId = req.params.userId;
      const weekId = req.params.weekId;
      const goals = await Goal.find({ user: userId, week: weekId,deleted:false });
      res.status(200).json(goals);
  } catch (error) {
      res.status(500).json({ error: 'Failed to get goals for user', message: error.message });
  }
}

export const userWeekCategoryGoals =async (req, res) => {
  try {
      const userId = req.params.userId;
      const weekId = req.params.weekId;
      const categoryId = req.params.categoryId;
      const goals = await Goal.find({ user: userId, week: weekId, category: categoryId,deleted:false });
      res.status(200).json(goals);
  } catch (error) {
      res.status(500).json({ error: 'Failed to get goals for user', message: error.message });
  }
}

// Controller function to get goals for a specific user and category
export const getGoalsByUserAndCategory = async (req, res) => {
  try {
      const userId = req.params.userId;
      const categoryId = req.params.categoryId;
      const goals = await Goal.find({ user: userId, category: categoryId,deleted:false });
      res.status(200).json(goals);
  } catch (error) {
      res.status(500).json({ error: 'Failed to get goals for user and category', message: error.message });
  }
}
// Controller function to get completed goals for a specific user and category
export const getCompletedWeekGoalsByUserAndCategory = async (req, res) => {
  try {
    const userId = req.params.userId;
    const categoryId = req.params.categoryId;
    const weekId = req.params.weekId;
    // Retrieve completed goals for the specified user and category
    const completedGoals = await Goal.find({ user: userId,deleted:false, category: categoryId, week:weekId, completed: true });

    res.status(200).json(completedGoals);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get completed goals for user and category', message: error.message });
  }
}
// Controller function to get completed goals for a specific user and category
export const getUnCompletedWeekGoalsByUserAndCategory = async (req, res) => {
  try {
    const userId = req.params.userId;
    const categoryId = req.params.categoryId;
    const weekId = req.params.weekId;
    // Retrieve completed goals for the specified user and category
    const completedGoals = await Goal.find({ user: userId, category: categoryId, deleted:false, week:weekId, completed: false });

    res.status(200).json(completedGoals);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get completed goals for user and category', message: error.message });
  }
}

// Controller function to get completed goals for a specific user and category
export const getCompletedGoalsByUserAndCategory = async (req, res) => {
  try {
    const userId = req.params.userId;
    const categoryId = req.params.categoryId;
    
    // Retrieve completed goals for the specified user and category
    const completedGoals = await Goal.find({ user: userId, category: categoryId,deleted:false, completed: true });

    res.status(200).json(completedGoals);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get completed goals for user and category', message: error.message });
  }
}
// Controller function to get completed goals for a specific user and category
export const getCompletedGoalsByUser= async (req, res) => {
  try {
    const userId = req.params.id;
    const categoryId = req.params.categoryId;
    
    // Retrieve completed goals for the specified user and category
    const completedGoals = await Goal.find({ user: userId,deleted:false, completed: true });

    res.status(200).json(completedGoals);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get completed goals for user and category', message: error.message });
  }
}

// Controller function to get completed goals for a specific user and category
export const getUnCompletedGoalsByUserAndCategory = async (req, res) => {
  try {
    const userId = req.params.userId;
    const categoryId = req.params.categoryId;
    
    // Retrieve completed goals for the specified user and category
    const completedGoals = await Goal.find({ user: userId,deleted:false, category: categoryId, completed: false });

    res.status(200).json(completedGoals);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get completed goals for user and category', message: error.message });
  }
}
// Controller function to get completed goals for a specific user and category
export const getUnCompletedGoalsByUser= async (req, res) => {
  try {
    const userId = req.params.id;
    const categoryId = req.params.categoryId;
    
    // Retrieve completed goals for the specified user and category
    const completedGoals = await Goal.find({ user: userId,deleted:false, completed: false });

    res.status(200).json(completedGoals);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get completed goals for user and category', message: error.message });
  }
}