const ProductManager = require('./ProductManager');

async function main() {
  const productManager = new ProductManager('productos.json');

  try {
    const nuevoProducto = {
      title: 'Producto 1',
      description: 'Este es un producto de prueba',
      price: 100,
      thumbnail: 'ruta/a/imagen.jpg',
      code: 'abc123',
      stock: 50
    };
    const productoCreado = await productManager.addProduct(nuevoProducto);
    console.log('Producto creado:', productoCreado);
  } catch (error) {
    console.error(error.message);
  }

  try {
    const productos = await productManager.getProducts();
    console.log('Productos:', productos);
  } catch (error) {
    console.error(error.message);
  }

  try {
    const producto = await productManager.getProductById(1);
    console.log('Producto encontrado:', producto);
  } catch (error) {
    console.error(error.message);
  }

  try {
    const productoActualizado = await productManager.updateProduct(1, { price: 120 });
    console.log('Producto actualizado:', productoActualizado);
  } catch (error) {
    console.error(error.message);
  }

  try {
    const mensaje = await productManager.deleteProduct(1);
    console.log(mensaje);
  } catch (error) {
    console.error(error.message);
  }

}

main().catch(error => {
  console.error('Error en la ejecución:', error);
});
