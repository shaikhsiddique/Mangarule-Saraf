import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { useCart } from "../../context/CartContext";

// Sample product data - in real app, this would come from API/database
const productData: { [key: string]: any } = {
  "featured-1": {
    id: "featured-1",
    name: "Elegant Gold Necklace",
    price: "₹15,999",
    originalPrice: "₹18,500",
    images: [
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Handcrafted with precision, this elegant gold necklace features intricate detailing and timeless design. Perfect for special occasions and everyday elegance.",
    inStock: true,
    colors: ["Gold", "Rose Gold"],
    offers: [
      "Buy 3 at ₹45,000 Use Code: MEGA3 at checkout",
      "Buy 4 at ₹55,000 Use Code: MEGA4 at checkout", 
      "Buy 1 Get 1 Free Use Code: B1G1 at checkout"
    ]
  },
  "necklace-0": {
    id: "necklace-0",
    name: "Designer Necklace #1",
    price: "₹3,990",
    originalPrice: "₹4,200",
    images: [
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=800&q=80"
    ],
    description: "A stunning designer necklace that combines traditional craftsmanship with modern aesthetics.",
    inStock: true,
    colors: ["Gold", "Silver"],
    offers: [
      "Buy 2 at ₹7,500 Use Code: PAIR2 at checkout",
      "Free shipping on orders above ₹5,000"
    ]
  },
  "earring-0": {
    id: "earring-0", 
    name: "Elegant Earring #1",
    price: "₹1,450",
    originalPrice: "₹1,800",
    images: [
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502741126161-b048400d98b2?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Elegant earrings that add sophistication to any outfit. Perfect for both casual and formal occasions.",
    inStock: true,
    colors: ["Gold", "Rose Gold", "Silver"],
    offers: [
      "Buy 1 Get 1 Free Use Code: B1G1 at checkout"
    ]
  }
};

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);

  const product = productData[id as string];

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-heading text-ms-gold mb-4">Product Not Found</h1>
          <button 
            onClick={() => router.push('/')}
            className="gradient-gold-silver text-white px-6 py-2 rounded-lg font-heading shadow-ms-gold"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <Head>
        <title>{product.name} - Mangarule Saraf</title>
        <meta name="description" content={product.description} />
      </Head>

      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-white rounded-xl shadow-ms-card overflow-hidden">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-96 object-cover"
              />
              {/* Navigation Arrows */}
              <button 
                onClick={() => setSelectedImage(Math.max(0, selectedImage - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                disabled={selectedImage === 0}
              >
                <svg className="w-5 h-5 text-ms-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={() => setSelectedImage(Math.min(product.images.length - 1, selectedImage + 1))}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                disabled={selectedImage === product.images.length - 1}
              >
                <svg className="w-5 h-5 text-ms-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-2">
              {product.images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-ms-gold' : 'border-gray-200'
                  }`}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="space-y-6">
            {/* Offers */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-heading text-lg text-ms-gold mb-3">Special Offers</h3>
              <div className="space-y-2">
                {product.offers.map((offer: string, index: number) => (
                  <p key={index} className="text-sm text-ms-dark">{offer}</p>
                ))}
                <p className="text-xs text-gray-600 mt-2">Note: You need to add minimum 2 products to avail this discount.</p>
                <button className="text-sm text-ms-gold hover:text-ms-dark underline">See All Offers</button>
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-green-600 font-medium">In stock - ready to ship</span>
            </div>

            {/* Color Options */}
            <div>
              <h3 className="font-heading text-lg text-ms-gold mb-3">Color</h3>
              <div className="flex gap-3">
                {product.colors.map((color: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(index)}
                    className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                      selectedColor === index 
                        ? 'border-ms-gold bg-ms-gold-light text-ms-gold' 
                        : 'border-gray-300 text-gray-700 hover:border-ms-gold'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-ms-gold">{product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through">{product.originalPrice}</span>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="font-heading text-lg text-ms-gold mb-3">Description</h3>
              <p className="text-ms-dark leading-relaxed">{product.description}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => addToCart({ id: product.id, name: product.name, image: product.images[0] })}
                className="flex-1 gradient-gold-silver hover:shadow-ms-gold text-white py-3 rounded-lg font-heading font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A2 2 0 0 0 7.42 19h9.16a2 2 0 0 0 1.77-3.3L17 13M7 13V6h13m-1 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
                ADD TO CART
              </button>
              <button className="gradient-silver-gold hover:shadow-ms-silver text-white py-3 px-6 rounded-lg font-heading font-semibold transition-colors">
                BUY IT NOW
              </button>
              <button className="w-12 h-12 bg-white border border-gray-300 rounded-lg flex items-center justify-center hover:border-ms-gold transition-colors">
                <svg className="w-5 h-5 text-ms-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-heading font-bold text-ms-gold mb-8 text-center">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.values(productData).slice(0, 4).map((relatedProduct) => (
              <div key={relatedProduct.id} className="bg-white rounded-xl shadow-ms-card overflow-hidden hover:shadow-ms-gold transition-shadow group">
                <div className="relative">
                  <img src={relatedProduct.images[0]} alt={relatedProduct.name} className="w-full h-48 object-cover" />
                  <div className="absolute top-2 left-2 bg-ms-gold text-white text-xs px-2 py-1 rounded font-bold">
                    RELATED
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-heading text-ms-gold text-base mb-2">{relatedProduct.name}</h3>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-ms-gold">{relatedProduct.price}</span>
                    {relatedProduct.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">{relatedProduct.originalPrice}</span>
                    )}
                  </div>
                  <button 
                    onClick={() => router.push(`/product/${relatedProduct.id}`)}
                    className="w-full gradient-gold-silver text-white py-2 rounded-lg font-heading transition-colors hover:shadow-ms-gold"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
