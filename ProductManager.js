const fs = require('fs/promises');
const path = require('path');

class ProductManager {
  static id = 0; 

  constructor(filePath) {
    this.path = filePath;
  }

  async _readFile() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        return []; 
      } else {
        throw new Error(`Error reading file: ${error.message}`);
      }
    }
  }

  async _writeFile(data) {
    try {
      await fs.writeFile(this.path, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
      throw new Error(`Error writing file: ${error.message}`);
    }
  }

  async addProduct({ title, description, price, thumbnail, code, stock }) {
    const products = await this._readFile();
    const codeExists = products.some(product => product.code === code);
    if (codeExists) {
      throw new Error("The code already exists.");
    }

    const newProduct = {
      id: ++ProductManager.id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    };

    products.push(newProduct);
    await this._writeFile(products);
    return newProduct;
  }

  async getProducts() {
    return await this._readFile();
  }

  async getProductById(id) {
    const products = await this._readFile();
    const product = products.find(product => product.id === id);
    if (!product) {
      throw new Error("Product not found.");
    }
    return product;
  }

  async updateProduct(id, updates) {
    const products = await this._readFile();
    const productIndex = products.findIndex(product => product.id === id);
    if (productIndex === -1) {
      throw new Error("Product not found.");
    }
    const updatedProduct = { ...products[productIndex], ...updates, id };
    products[productIndex] = updatedProduct;
    await this._writeFile(products);
    return updatedProduct;
  }

  async deleteProduct(id) {
    const products = await this._readFile();
    const productIndex = products.findIndex(product => product.id === id);
    if (productIndex === -1) {
      throw new Error("Product not found.");
    }
    products.splice(productIndex, 1);
    await this._writeFile(products);
    return { message: "Product deleted successfully." };
  }
}

module.exports = ProductManager;