import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please enter your name"],
    },

    quantity: {
      type: Number,
      required: [true, "please enter your quantity"],
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "please enter your price"],
      default: 0,
    },
    image: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema)

export {Product}
