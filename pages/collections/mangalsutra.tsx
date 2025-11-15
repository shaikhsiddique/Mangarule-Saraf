import Head from "next/head";
import { useMemo } from "react";
import { useCart } from "../../context/CartContext";
import { useProducts } from "../../context/ProductContext";
import Link from "next/link";


interface Product {
  _id: string;
  name: string;
  image: string;
  price: string;
  type: string;
  stock: number;
  description: string;
  tags: string[];
}

const topFilters = [
  { name: 'All', active: true },
  { name: 'Faster Delivery', active: false },
  { name: 'New In', active: false },
  { name: 'Designs in Store', active: false },
  { name: 'Try at Home', active: false }
];

const priceRanges = [
  { label: 'Under ₹8,000', count: 12 },
  { label: '₹8,001 - ₹12,000', count: 156 },
  { label: '₹12,001 - ₹18,000', count: 89 },
  { label: 'Above ₹18,000', count: 34 }
];

const productTypes = [
  { label: 'Mangalsutra', count: 291, checked: true },
  { label: 'Necklaces', count: 818, checked: false },
  { label: 'Earrings', count: 2784, checked: false }
];

export default function Mangalsutra() {
  const { addToCart } = useCart();
  const { products: allProducts } = useProducts();

  const products = useMemo(() => {
    return allProducts.filter(product => product.type === 'mangalsutra');
  }, [allProducts]);


  return (
    <div className="bg-ms-cream min-h-screen">
      <Head>
        <title>Mangalsutra Collection - Mangarule Saraf</title>
      </Head>
      <div className="max-w-7xl mx-auto py-8 px-4">
        <h1 className="section-heading text-center mb-8">Mangalsutra Collection</h1>
        <div className="section-divider mx-auto mb-8" />
        
        {/* Top Filter Bar */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {topFilters.map(filter => (
            <button
              key={filter.name}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter.active 
                  ? 'bg-ms-gold text-white shadow-md' 
                  : 'bg-white text-ms-gold border border-ms-gold-light hover:bg-ms-gold-light'
              }`}
            >
              {filter.name}
            </button>
          ))}
        </div>

        <div className="flex gap-8">
          {/* Left Sidebar Filters */}
          <div className="w-64 bg-white rounded-xl shadow-ms-card p-6 h-fit sticky top-4">
            <h3 className="font-heading text-lg text-ms-gold mb-4">Filters</h3>
            
            {/* Price Filter */}
            <div className="mb-6">
              <h4 className="font-heading text-ms-gold mb-3">Price</h4>
              <div className="space-y-2">
                {priceRanges.map(range => (
                  <label key={range.label} className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm text-ms-dark">{range.label}</span>
                    <span className="text-xs text-ms-gold/60">({range.count})</span>
                  </label>
                ))}
                <button className="text-xs text-ms-gold hover:text-ms-dark">7 More ↓</button>
              </div>
            </div>

            {/* Discount Filter */}
            <div className="mb-6">
              <h4 className="font-heading text-ms-gold mb-3">Discounts</h4>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-ms-dark">Flat 5% off on Making Charges</span>
                <span className="text-xs text-ms-gold/60">(752)</span>
              </label>
            </div>

            {/* Product Type Filter */}
            <div className="mb-6">
              <h4 className="font-heading text-ms-gold mb-3">Product Type</h4>
              <div className="space-y-2">
                {productTypes.map(type => (
                  <label key={type.label} className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm text-ms-dark">{type.label}</span>
                    <span className="text-xs text-ms-gold/60">({type.count})</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Main Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.length > 0 ? products.map((product, i) => (
                <Link href={`/product/${product._id}`} key={product._id} className="bg-white rounded-xl shadow-ms-card overflow-hidden hover:shadow-xl transition-shadow group">
                  <div className="relative">
                    <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
                    {/* Badge */}
                    {i % 3 === 0 && (
                      <div className="absolute top-2 left-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded font-bold">
                        LATEST
                      </div>
                    )}
                    {i % 3 === 1 && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded font-bold">
                        BESTSELLER
                      </div>
                    )}
                    {/* Wishlist Icon */}
                    <button className="absolute top-2 right-2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-4 h-4 text-ms-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-bold text-ms-gold">{product.price}</span>
                      {i % 2 === 0 && (
                        <span className="text-sm text-gray-400 line-through">₹15,000</span>
                      )}
                    </div>
                    <p className="text-sm text-ms-gold hover:text-ms-dark cursor-pointer mb-2">Check delivery date</p>
                    <h3 className="font-heading text-ms-gold text-base mb-3">{product.name}</h3>
                    <button
                      onClick={() => addToCart({ id: product._id, name: product.name, image: product.image, price: product.price, type: product.type })}
                      className="w-full bg-white border-2 border-ms-gold text-black hover:bg-ms-gold-light py-2 rounded-lg font-heading transition-colors"
                      disabled={product.stock === 0}
                    >
                      {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                  </div>
                </Link>
              )) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 text-lg">No products available in this collection.</p>
                  <p className="text-gray-400 text-sm mt-2">Products will be added by the admin soon.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
