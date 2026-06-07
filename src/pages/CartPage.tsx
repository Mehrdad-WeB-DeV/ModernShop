import { useContext } from "react";
import { Cartcontext } from "../context/CartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function CartPage() {
  const context = useContext(Cartcontext);

  if (!context) return null;

  const { cart, removeFromCart, decraseQty, incraseQty } = context;

  const totalpraice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  return (
    <>
      <Header />
      <div className="min-h-screen bg-zinc-950 text-white p-6">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        {cart.length === 0 ? (
          <p className="text-zinc-400">Cart is empty</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-zinc-900 p-4 rounded-xl border border-zinc-800"
              >
                <div className="flex items-center gap-4">
                  <img src={item.image} className="h-16 w-16 object-contain" />

                  <div>
                    <h2 className="font-medium">{item.title}</h2>

                    <p className="text-violet-400">
                      ${item.price * item.quantity}{" "}
                    </p>
                    <div className="item-center gap-3 mt-2">
                      <button
                      onClick={() => incraseQty(item.id)}
                      className="px-3 py-2 bg-zinc-800 rounded"
                    >
                      +
                    </button>
                    <span className="px-3 py-1 bg-violet-500 rounded ">
                      {item.quantity}
                      </span>
                    <button
                      onClick={() => decraseQty(item.id)}
                      className="px-3 py-2 bg-zinc-800 rounded"
                    >
                      -
                    </button>
                    </div>
                  </div>
                  
                </div>
                <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Delete
                  </button>
              </div>
            ))}
          </div>
        )}
        <div className=" mt-8 border-t border-zinc-800 pt-6">
          <h2 className="text-2xl font-bold">
            Total: ${totalpraice.toFixed(2)}
          </h2>
        </div>
      </div>
      <Footer/>
    </>
  );
}
