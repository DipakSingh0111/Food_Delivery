import foodModel from "../models/foodModel.js";
import fs from "fs";

// add food items
// ====================

const addFood = async (req, res) => {
  try {
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filename,
    });

    await food.save();
    res.status(200).json({ success: true, message: "Food Added Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error in AddFood" });
  }
};

// All food list food
// =========================

const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.status(200).json({ success: true, data: foods });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error in listFood" });
  }
};

// remove food item
// =========================

const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});

    await foodModel.findByIdAndDelete(req.body.id);
    res.status(200).json({ success: true, message: "Food Removed." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error in removeFood" });
  }
};
export { addFood, listFood, removeFood };
