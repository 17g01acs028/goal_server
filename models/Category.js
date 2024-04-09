import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    deleted:{
      type:Boolean,
      default:false
    }

  },
  { timestamps: true }
);

const Category = mongoose.model("Category", CategorySchema);
export default Category;
