const mongoose = require("mongoose");
const express = require("express");
const Product = require("./models/product.js");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}))

mongoose
  .connect(
    "mongodb+srv://olamiwalepaul:O4ar1kzKJtsKRl68@briitz-backend.ubpfzzj.mongodb.net/?retryWrites=true&w=majority&appName=Briitz-backend"
  )
  .then(() => {
    console.log("connected");
  })
  .catch(() => {
    console.log("Not connected");
  });

app.listen(3000, () => {
  console.log("serve is running on port");
});

app.get("/", (req, res) => {
  res.send("Hello from here");
});

//get products

app.get("/api/product", async (req, res) => {
  try {
    const product = await Product.find(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


//get products by Id
app.get("/api/product/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


//update products

app.put('/api/product/:id', async (req, res) => {
    const productId = req.params.id;
    const updatedProductId = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(productId, updatedProductId);

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//delete product

app.delete('/api/product/:id', async (req, res) => {
    const productId = req.params.id;

    try {
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


//post product

app.post("/api/product", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
