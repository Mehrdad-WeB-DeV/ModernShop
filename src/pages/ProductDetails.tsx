import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Footer from '../components/Footer';
import { Cartcontext } from '../context/CartContext';
import Header from '../components/Header';
import type { Product } from '../types/product';

export default function ProductDetails() {
// type Product = {
//   id: number;
//   title: string;
//   price: number;
//   description: string;
//   image: string;
// };
const [product , setProduct]=useState<Product | null>(null);
const [loading, setLoading]=useState<boolean>(true);
const {id} = useParams()

const context = useContext(Cartcontext)

useEffect(() => {
  async function fetchProduct() {
    try {
      setLoading(true);

      const res = await axios.get<Product>(
        `https://fakestoreapi.com/products/${id}`
      );

      setProduct(res.data);
    } catch (error) {
      console.log("Error loading product");
    } finally {
      setLoading(false);
    }
  }

  fetchProduct();
}, [id]);

if (loading) {
  return (
    // <div className="text-white text-center mt-20">
    //   Loading product...
    // </div>
    <div className="animate-pulse bg-zinc-800 h-40 rounded-xl"></div>
  );
}

if (!product) return null;

return (

  <>
  <Header/>
  <div className="min-h-screen bg-zinc-950 text-white p-10">

    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">

      {/* Image */}
      <div className="bg-white rounded-2xl p-10 flex items-center justify-center">
        <img
          src={product.image}
          className="h-80 object-contain"
        />
      </div>

      {/* Info */}
      <div>

        <h1 className="text-3xl font-bold">
          {product.title}
        </h1>

        <p className="mt-4 text-violet-400 text-xl">
          ${product.price}
        </p>

        <p className="mt-6 text-zinc-400 leading-relaxed">
          {product.description}
        </p>

        <button onClick={()=> context?.addToCart(product)} className="mt-8 bg-violet-500 hover:bg-violet-400 transition px-6 py-3 rounded-xl">
          Add to Cart
        </button>

      </div>

    </div>

  </div>
  <Footer/>
  </>
);
}
