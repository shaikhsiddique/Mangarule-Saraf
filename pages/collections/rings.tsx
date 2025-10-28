import Head from "next/head";
import ProductCard from "../../components/ProductCard";
import { useCart } from "../../context/CartContext";
import Link from "next/link";


const IMAGES = [
  "https://plus.unsplash.com/premium_photo-1661308304093-009586f280a5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  "https://plus.unsplash.com/premium_photo-1739548337724-f641c8b5c886?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=880",
  "https://plus.unsplash.com/premium_photo-1678749105251-b15e8fd164bf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1112",
  "https://images.unsplash.com/photo-1542990254-85e6a9a2ef92?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  "https://images.unsplash.com/photo-1663079899584-64acea4d6858?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  "https://images.unsplash.com/photo-1550368566-f9cc32d7392d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  "https://images.unsplash.com/photo-1689287428894-9b52d1534a25?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=608",
  "https://plus.unsplash.com/premium_photo-1678834778658-9862d9987dd3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  "https://images.unsplash.com/photo-1631982690223-8aa4be0a2497?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=764",
];
const PRICES = [
  '₹24,000', '₹18,999', '₹12,540', '₹22,600', '₹20,900', '₹26,499', '₹25,800', '₹21,740', '₹19,990', '₹27,299'
];

const topFilters = [
  { name: 'All', active: true },
  { name: 'Faster Delivery', active: false },
  { name: 'New In', active: false },
  { name: 'Designs in Store', active: false },
  { name: 'Try at Home', active: false }
];

const priceRanges = [
  { label: 'Under ₹10,000', count: 45 },
  { label: '₹10,001 - ₹20,000', count: 234 },
  { label: '₹20,001 - ₹30,000', count: 189 },
  { label: 'Above ₹30,000', count: 67 }
];

const productTypes = [
  { label: 'Rings', count: 2102, checked: true },
  { label: 'Necklaces', count: 818, checked: false },
  { label: 'Earrings', count: 2784, checked: false }
];

export default function Rings() {
  const { addToCart } = useCart();
  return (
    <div className="bg-ms-cream min-h-screen">
      <Head>
        <title>Rings Collection - Mangarule Saraf</title>
      </Head>
      <div className="max-w-7xl mx-auto py-8 px-4">
        <h1 className="section-heading text-center mb-8">Rings Collection</h1>
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
                <button className="text-xs text-ms-gold hover:text-ms-dark">6 More ↓</button>
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
              {IMAGES.map((src, i) => (
                <Link href={`/product/ring-${i}`} key={i} className="bg-white rounded-xl shadow-ms-card overflow-hidden hover:shadow-xl transition-shadow group">
                  <div className="relative">
                    <img src={src} alt={`Ring ${i+1}`} className="w-full h-64 object-cover" />
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
                      <span className="text-lg font-bold text-ms-gold">{PRICES[i % PRICES.length]}</span>
                      {i % 2 === 0 && (
                        <span className="text-sm text-gray-400 line-through">₹28,000</span>
                      )}
                    </div>
                    <p className="text-sm text-ms-gold hover:text-ms-dark cursor-pointer mb-2">Check delivery date</p>
                    <h3 className="font-heading text-ms-gold text-base mb-3">Stylish Ring #{i+1}</h3>
                    <button 
                      onClick={() => addToCart({ id: `ring-${i}`, name: `Stylish Ring #${i+1}`, image: src, price: PRICES[i % PRICES.length], type: 'Rings' })}
                      className="w-full bg-white border-2 border-ms-gold text-black hover:bg-ms-gold-light py-2 rounded-lg font-heading transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
