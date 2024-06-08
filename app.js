const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const port = 8080;

const productManager = new ProductManager('./products.json');

app.use(express.urlencoded({extended:true}))

app.get('/products', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit); 
    const products = await productManager.getProducts();

    if (!isNaN(limit)) {
      
      res.json(products.slice(0, limit));
    } else {
      
      res.json(products);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/products/:pid', async (req, res) => {
  try {
    const pid = parseInt(req.params.pid); 
    const product = await productManager.getProductById(pid);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
