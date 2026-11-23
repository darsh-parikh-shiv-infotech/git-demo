import { useState } from "react";

function App() {
  const [products, setProducts] = useState([
    { id: 1, name: "Laptop", price: 50000, stock: 5 },
    { id: 2, name: "Mouse", price: 500, stock: 10 },
  ]);

  // Calculate product price
  const calculatePrice = (product) => {
    const tax = product.price * 0.18;
    return product.price + tax;
  };

  // Update product
  const updateProduct = (id, quantity) => {
    setProducts((previous) =>
      previous.map((product) =>
        product.id === id
          ? {
              ...product,
              stock: product.stock - quantity,
              sold: (product.sold || 0) + quantity,
            }
          : product,
      ),
    );
  };

  // Generate inventory report
  const generateReport = () => {
    const totalProducts = products.length;
    const totalStock = products.reduce(
      (total, product) => total + product.stock,
      0,
    );
    const lowStock = products.filter((product) => product.stock < 5).length;

    return { totalProducts, totalStock, lowStock };
  };

  const report = generateReport();

  return (
    <div>
      <h1>Inventory Manager</h1>

      <p>Total Products: {report.totalProducts}</p>
      <p>Total Stock: {report.totalStock}</p>

      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>Price: ₹{calculatePrice(product)}</p>
          <p>Stock: {product.stock}</p>
          <p>Low Stock Products: {report.lowStock}</p>
          <button onClick={() => updateProduct(product.id, 1)}>Sell One</button>
        </div>
      ))}
    </div>
  );
}

export default App;
