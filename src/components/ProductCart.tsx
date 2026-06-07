import type { Product } from "../types/product";
import Footer from "./Footer";
import Header from "./Header";

type Props = {
  product: Product;
  addToCart: (product: Product) => void;
};

export default function ProductCard({ product, addToCart }: Props) {
  return (
    <>
    <Header/>
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 hover:border-violet-500 transition">

      <img
        src={product.image}
        className="h-40 mx-auto object-contain"
      />

      <h2 className="mt-4 font-medium text-zinc-100 line-clamp-2">
        {product.title}
      </h2>

      <p className="mt-2 text-zinc-400">
        ${product.price}
      </p>

      <button
        onClick={() => addToCart(product)}
        className="mt-4 w-full bg-violet-500 hover:bg-violet-400 transition py-2 rounded-xl"
      >
        Add to Cart
      </button>

    </div>
    <Footer/>
    </>
  );
}