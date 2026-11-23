import { useState } from "react";

function App() {
  const [products, setProducts] = useState([
    { id: 1, name: "Laptop", price: 50000, stock: 5 },
    { id: 2, name: "Mouse", price: 500, stock: 10 },
  ]);

  // Calculate product price
  const calculatePrice = (product) => {
    const tax = product.price * 0.18;
    const discount = product.price * 0.05;

    return (product.price + tax) - discount;
  };

  // Update product
  const updateProduct = (id, quantity) => {
    setProducts((previous) =>
      previous.map((product) =>
        product.id === id
          ? {
             
              ...product,
             
              stock: Math.max(0, product.stock - quantity),
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
    const totalValue = products.reduce(
      (total, product) => total + product.price * product.stock,
      0,
    );

    return { totalProducts, totalStock, lowStock, totalValue };
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
          <p>Total Inventory Value: ₹{report.totalValue}</p>
          <button onClick={() => updateProduct(product.id, 1)}>Sell One</button>
        </div>
      ))}
    </div>
  );
}

export default App;
