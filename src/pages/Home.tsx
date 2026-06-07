import { useContext, useEffect, useState } from "react";

import axios from "axios";
import type { Product } from "../types/product";
import { Cartcontext } from "../context/CartContext";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectCategory, setSelectCategory] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const context = useContext(Cartcontext);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const res = await axios.get<Product[]>(
          "https://fakestoreapi.com/products",
        );
        setProducts(res.data);
      } catch (error) {
        console.log("Error Fetch Product...");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const categories = ["all", ...new Set(products.map((i) => i.category))];

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectCategory === "all" || product.category === selectCategory;

    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return <div className=" text-white text-center mt-20">Loading...</div>;
  }
const handleScroll = () => {
  window.scrollTo({
    top: window.innerHeight * 1,
    behavior: "smooth",
  });
};

const handlenrmore =()=>{
  window.scroll({
    top: window.innerHeight * 3.5,
    behavior: "smooth",

  })
}
  return (
    <>
      <div className="min-h-screen bg-zinc-950 text-white">
        <Header />

        <main className="mx-auto max-w-7xl px-6 py-24">
          <section className="text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">

              <span className="text-violet-500">Modern</span> E-Commerce Built with React & TypeScript
            </h1>

            <p className="mt-6 text-lg text-zinc-400 max-w-2xl mx-auto">
              A responsive online store featuring product browsing, cart management, routing, API integration, and a modern UI powered by React, TypeScript, and Tailwind CSS.
            </p>

            <div className="mt-10 flex items-center justify-center gap-4">
              <button onClick={handleScroll} className="bg-violet-500 hover:bg-violet-400 transition px-6 py-3 rounded-full font-medium">
                Start Shopping
              </button>

              <button onClick={handlenrmore} className="border border-zinc-700 hover:border-zinc-500 transition px-6 py-3 rounded-full">
                Learn More
              </button>
            </div>
          </section>
        </main>
      </div>
      <div className="min-h-screen bg-zinc-950 text-white p-6">
        <h1 className="text-3xl font-bold mb-8 text-center">Products</h1>

        <div className="space-y-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectCategory(category)}
                  className={`px-4 py-2 rounded-full transition text-sm md:text-base ${
                    selectCategory === category
                      ? "bg-violet-500 text-white"
                      : "bg-zinc-800 text-zinc-300"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-96 px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 outline-none focus:border-violet-500"
            />
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-10">
              <p className="text-xl font-semibold">No products found</p>

              <p className="text-zinc-400 mt-2">Try another search term.</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              onClick={() => navigate(`/product/${product.id}`)}
              key={product.id}
              className="cursor-pointer bg-zinc-900 border border-zinc-800 rounded-2xl p-4 hover:border-violet-500 transition "
            >
              <img
                src={product.image}
                className="h-32 mx-auto object-contain"
              />

              <h2 className="mt-4 text-sm">{product.title}</h2>

              <p className="mt-2 text-violet-400">${product.price}</p>
              <div className="w-full text-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    context?.addToCart(product);
                  }}
                  className="mt-4 w-full bg-violet-500 hover:bg-violet-400 transition py-2 rounded-xl"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-6 px-8 text-2xl text-zinc-400 max-w-2xl mx-auto">
        This project was developed as a portfolio demonstration to showcase my frontend development skills and problem-solving abilities. It simulates a real-world e-commerce application built with React and TypeScript, focusing on clean architecture, reusable components, and responsive design.

The goal of this project was not only to build a functional shopping experience but also to challenge myself by solving real development issues, improving code quality, and handling typical frontend challenges such as state management, API integration, and UI design consistency.
      </p>
      <Footer />
    </>
  );
}
