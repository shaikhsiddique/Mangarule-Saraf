import Head from "next/head";
import ProductCard from "../../components/ProductCard";
import Link from "next/link";

const IMAGES = [
  "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1468746582214-d9a91807b3b8?auto=format&fit=crop&w=400&q=80",
  "https://cdn.pixabay.com/photo/2016/11/29/04/18/adult-1866792_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/01/20/00/30/people-1990737_1280.jpg",
  "https://cdn.pixabay.com/photo/2014/09/21/17/56/jewelry-455111_1280.jpg",
  "https://cdn.pixabay.com/photo/2020/12/08/19/43/woman-5815572_1280.jpg"
];
const PRICES = [
  '₹3,990', '₹2,750', '₹5,500', '₹2,999', '₹4,299', '₹6,200', '₹3,799', '₹2,950', '₹4,849', '₹2,599'
];

const topFilters = [
  { name: 'All', active: true },
  { name: 'Faster Delivery', active: false },
  { name: 'New In', active: false },
  { name: 'Designs in Store', active: false },
  { name: 'Try at Home', active: false }
];

const priceRanges = [
  { label: 'Under ₹5,000', count: 10 },
  { label: '₹5,001 - ₹10,000', count: 157 },
  { label: '₹10,001 - ₹15,000', count: 211 },
  { label: '₹20,001 - ₹30,000', count: 337 }
];

const productTypes = [
  { label: 'Necklaces', count: 818, checked: true },
  { label: 'Earrings', count: 2784, checked: false },
  { label: 'Rings', count: 2102, checked: false }
];

export default function Necklaces() {
  return (
    <div className="bg-ms-cream min-h-screen">
      <Head>
        <title>Necklaces Collection - Mangarule Saraf</title>
      </Head>
      <div className="max-w-7xl mx-auto py-8 px-4">
        <h1 className="section-heading text-center mb-8">Necklaces Collection</h1>
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
                <button className="text-xs text-ms-gold hover:text-ms-dark">10 More ↓</button>
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
                <Link key={i} href={`/product/necklace-${i}`} className="bg-white rounded-xl shadow-ms-card overflow-hidden hover:shadow-xl transition-shadow group block">
                  <div className="relative">
                    <img src={src} alt={`Necklace ${i+1}`} className="w-full h-64 object-cover" />
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
                        <span className="text-sm text-gray-400 line-through">₹4,200</span>
                      )}
                    </div>
                    <p className="text-sm text-ms-gold hover:text-ms-dark cursor-pointer mb-2">Check delivery date</p>
                    <h3 className="font-heading text-ms-gold text-base mb-3">Designer Necklace #{i+1}</h3>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        // Add to cart logic here
                      }}
                      className="w-full bg-ms-gold hover:bg-ms-dark text-white py-2 rounded-lg font-heading transition-colors"
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
