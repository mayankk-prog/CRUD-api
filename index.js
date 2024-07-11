import express from "express";
import mongoose from "mongoose";
import { Product } from "./models/product.models.js";
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("server is started on port 3000");
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/products", async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: "Request Body is empty" });
  }
  try {
    const product = await Product.create(req.body);
    res.header("Content-Type", "application/json");

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/api/product/:id", async (req, res) => {
  try {
    const {id} = req.params
    const product= await Product.findByIdAndUpdate(id, req.body)

    if(!product){
      return res.status(404).json({message: "product not found"})
    }

    const updatedProduct= await Product.findById(id)
    res.status(200).json(updatedProduct)

  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

app.delete("/api/product/:id", async (req, res) => {
  try {
    const {id} = req.params
    const product= await P  roduct.findByIdAndDelete(id)

    if(!product){
      return res.status(404).json({message: "product not found"})
    }
    res.status(200).json({message: "product deleted successfully"})
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})




mongoose
  .connect(
    "mongodb+srv://bhmayank001:bhmayank@cluster0.t3a9ghn.mongodb.net/Node-Api?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("MongoDB Connected...");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => console.log("mongodc connection failed", error));
