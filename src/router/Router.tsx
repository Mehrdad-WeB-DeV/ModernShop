import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import CartPage from "../pages/CartPage";
import ProductDetails from "../pages/ProductDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path:'/product/:id',
    element:<ProductDetails/>,
  },
]);
