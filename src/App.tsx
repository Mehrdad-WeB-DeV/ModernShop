import { RouterProvider } from "react-router-dom";
import "./App.css";
import { CartProvider } from "./context/CartContext";
import { router } from "./router/Router";

function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default App;
