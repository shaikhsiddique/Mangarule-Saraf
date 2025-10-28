import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const BANNER_IMAGES = [
  "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
  "https://cdn.pixabay.com/photo/2017/03/28/12/10/wedding-rings-2184517_1280.jpg",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80"
];

const featuredProducts = [
  {
    id: "featured-1",
    name: "Elegant Gold Necklace",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=600&q=80",
    price: "₹15,999",
    description: "Handcrafted with precision"
  },
  {
    id: "featured-2", 
    name: "Diamond Stud Earrings",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
    price: "₹8,500",
    description: "Timeless elegance"
  },
  {
    id: "featured-3",
    name: "Gold Ring Collection",
    image: "https://cdn.pixabay.com/photo/2017/03/28/12/10/wedding-rings-2184517_1280.jpg",
    price: "₹12,200",
    description: "Perfect for special occasions"
  }
];

export default function Home() {
  // Simple carousel state
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  
    timeoutRef.current = setTimeout(() => {
      setIndex((i) => (i + 1) % BANNER_IMAGES.length);
    }, 3500);
  
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [index]);
  

  return (
    <div>
      <Head>
        <title>Mangarule Saraf - Jewelry Shop</title>
        <meta name="description" content="Elegant Classy Minimalistic Jewelry Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      

      {/* Hero Section - Timeless Elegance */}
      <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden rounded-b-2xl shadow-ms-card mb-12">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1920&q=80" 
            alt="Luxury Jewelry" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-black/10"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-heading font-extrabold mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)]">
            <span className="block">Timeless Elegance</span>
          </h1>
          <div className="text-lg md:text-2xl font-heading text-white/90 mb-5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
            Crafted for life’s precious moments
          </div>
          
          <p className="text-lg md:text-xl text-white mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
            Discover handcrafted jewelry that captures life's most precious moments. Each piece tells a story of exceptional artisanship and enduring beauty.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/collections/necklaces" 
              className="gradient-gold-silver text-white px-8 py-4 rounded-full font-heading font-semibold text-lg hover:shadow-ms-gold transition-all duration-300 transform hover:scale-105"
            >
              Explore Collections
            </Link>
            <Link 
              href="/about" 
              className="bg-white border-2 border-ms-gold text-black px-8 py-4 rounded-full font-heading font-semibold text-lg hover:bg-ms-gold-light transition-all duration-300"
            >
              Schedule Consultation
            </Link>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-ms-gold-light animate-bounce">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      {/* Featured Collections Showcase */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left: Featured Collection */}
          <div className="relative rounded-xl overflow-hidden shadow-ms-gold min-h-[260px]">
            <img
              src={featuredProducts[0].image}
              alt="Featured Collection"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 p-8 text-white">
              <h2 className="font-heading text-3xl font-bold mb-2">MANGARULE SARAF</h2>
              <p className="text-lg text-white/90 mb-6">Celebrate with Elegance</p>
              <Link href="/collections/necklaces" className="inline-block bg-white border-2 border-ms-gold text-black px-6 py-3 rounded-full font-heading font-semibold hover:bg-ms-gold-light transition-colors shadow-lg">
                Explore Collection
              </Link>
            </div>
          </div>

          {/* Right: Latest Designs */}
          <div className="relative rounded-xl overflow-hidden shadow-ms-silver min-h-[260px]">
            <img
              src={featuredProducts[1].image}
              alt="Latest Designs"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/35" />
            <div className="relative z-10 p-8 text-white">
              <h2 className="font-heading text-3xl font-bold mb-2">LATEST Designs</h2>
              <p className="text-lg text-white/90 mb-6">All that glitters, now with a festive twist!</p>
              <Link href="/collections/earrings" className="inline-block bg-white border-2 border-ms-gold text-black px-6 py-3 rounded-full font-heading font-semibold hover:bg-ms-gold-light transition-colors shadow-lg">
                SHOP NOW
              </Link>
            </div>
          </div>
        </div>

        {/* Service Promotions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Fast Delivery */}
          <div className="relative rounded-xl overflow-hidden shadow-ms-card min-h-[220px]">
            <img
              src="https://images.unsplash.com/photo-1517840933437-c41356892b35?auto=format&fit=crop&w=1200&q=80"
              alt="Fast delivery"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/45" />
            <div className="relative z-10 p-8 text-white">
              <h3 className="font-heading text-2xl font-bold mb-2">Jewelry delivered in just <span className="text-ms-gold-light">6 hours</span></h3>
              <p className="text-lg text-white/90">Mumbai | Delhi-NCR | Bengaluru</p>
            </div>
          </div>

          {/* Contact Support */}
          <div className="relative rounded-xl overflow-hidden shadow-ms-gold min-h-[220px]">
            <img
              src="https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=1200&q=80"
              alt="Expert support"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 p-8 text-white">
              <h3 className="font-heading text-2xl font-bold mb-2">Need Help Choosing?</h3>
              <p className="text-lg text-white/90 mb-4">Our experts are here to help</p>
              <button className="bg-white border-2 border-ms-gold text-black px-6 py-2 rounded-full font-heading font-semibold hover:bg-ms-gold-light transition-colors shadow-lg">
                Chat Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Collections Section */}
      <main className="max-w-7xl mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-ms-gold mb-4">Featured Collections</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-ms-gold to-ms-silver mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-ms-gray max-w-2xl mx-auto">
            Discover our exquisite range of handcrafted jewelry, each piece telling a unique story of elegance and craftsmanship.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[
            { name: "Necklaces", icon: "💎", href: "/collections/necklaces" },
            { name: "Earrings", icon: "✨", href: "/collections/earrings" }, 
            { name: "Rings", icon: "💍", href: "/collections/rings" },
            { name: "Bracelets", icon: "🔗", href: "/collections/bracelets" },
            { name: "Mangalsutra", icon: "🕉️", href: "/collections/mangalsutra" },
            { name: "Party Wear", icon: "🎉", href: "/collections/party-wear" },
            { name: "Daily Wear", icon: "☀️", href: "/collections/daily-wear" }
          ].map((section, i) => (
            <Link 
              key={section.name} 
              href={section.href} 
              className="group aspect-square rounded-2xl shadow-ms-card bg-white flex flex-col items-center justify-center text-center p-6 border-2 border-transparent hover:border-ms-gold hover:shadow-ms-gold transition-all duration-300 transform hover:scale-105"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {section.icon}
              </div>
              <h3 className="text-lg font-heading font-semibold text-ms-gray group-hover:text-ms-gold transition-colors">
                {section.name}
              </h3>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
