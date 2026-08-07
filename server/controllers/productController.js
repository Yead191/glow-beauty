const Product = require('../models/Product');

//    Fetch all products with filtering & search
//   GET /api/products
const getProducts = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    const products = await Product.find(query).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//    Fetch single product by ID
//   GET /api/products/:id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//    Create a product (Admin)
//   POST /api/products
const createProduct = async (req, res) => {
  try {
    const { name, description, category, price, stock, image: bodyImage } = req.body;
    let imagePath = bodyImage || '/uploads/products/default.png';

    if (req.file) {
      imagePath = `/uploads/products/${req.file.filename}`;
    }

    const product = new Product({
      name,
      description,
      category,
      price: Number(price),
      stock: Number(stock),
      image: imagePath,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//    Update a product (Admin)
//   PUT /api/products/:id
const updateProduct = async (req, res) => {
  try {
    const { name, description, category, price, stock, image: bodyImage } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.category = category || product.category;
      if (price !== undefined) product.price = Number(price);
      if (stock !== undefined) product.stock = Number(stock);

      if (req.file) {
        product.image = `/uploads/products/${req.file.filename}`;
      } else if (bodyImage) {
        product.image = bodyImage;
      }

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//    Delete a product (Admin)
//   DELETE /api/products/:id
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await Product.findByIdAndDelete(req.params.id);
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
