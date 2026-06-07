import { useContext } from "react";
import { Link } from "react-router-dom";
import { Cartcontext } from "../context/CartContext";

export default function Header() {
  const context = useContext(Cartcontext);
  
  if (!context) {
    throw new Error("Cartcontext Provider not found");
  }
  const {cart}= context
  return (
    <>
      <header className="border-b border-zinc800 bg-zinc-950/80 bacdrop-blur">
        <div className="mx-auto flex max-w-7xl item-center justify-between px-6 py-4">
          <Link to={"/"} className=" text-2xl font-bold tracking-tight">
            ModernShop
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              to={"/"}
              className="text-zinc-300 transition hover:text-white"
            >
              Home
            </Link>
            <Link
              to={"/cart"}
              className="border border-violet-600 rounded-full  px-4 py-2 font-medium transition hover:bg-violet-600 relative"
            >
               🛒 Cart
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-violet-600 text-xs px-2 py-0.5 rounded-full">
                  {cart.length}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </header>
    </>
  )
}
