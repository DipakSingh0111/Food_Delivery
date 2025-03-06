import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      requare: true,
    },
    description: {
      type: String,
      requare: true,
    },
    price: {
      type: Number,
      requare: true,
    },
    image: {
      type: String,
      requare: true,
    },
    category: {
      type: String,
      requare: true,
    },
  },
  { timestamps: true }
);

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);
export default foodModel;
