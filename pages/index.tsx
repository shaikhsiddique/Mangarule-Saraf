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
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIndex((i) => (i + 1) % BANNER_IMAGES.length);
    }, 3500);
    return () => timeoutRef.current && clearTimeout(timeoutRef.current);
  }, [index]);

  return (
    <div>
      <Head>
        <title>Mangarule Saraf - Jewelry Shop</title>
        <meta name="description" content="Elegant Classy Minimalistic Jewelry Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      

      {/* Hero Section - Timeless Elegance */}
      <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden rounded-2xl shadow-ms-card mb-12">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1920&q=80" 
            alt="Luxury Jewelry" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-4">
            <span className="block text-white">Timeless Elegance</span>
            <span className="block gradient-gold-silver bg-clip-text text-transparent">Crafted Forever</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
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
              className="bg-white/10 backdrop-blur-sm border-2 border-ms-gold text-ms-gold-light px-8 py-4 rounded-full font-heading font-semibold text-lg hover:bg-white hover:text-ms-gold transition-all duration-300"
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
          <div className="gradient-gold-silver rounded-xl p-8 text-white relative overflow-hidden shadow-ms-gold">
            <div className="relative z-10">
              <h2 className="font-heading text-3xl font-bold mb-2">MANGAULE SARAF</h2>
              <p className="text-lg mb-6 opacity-90">Celebrate with Elegance</p>
              <Link href="/collections/necklaces" className="inline-block bg-white text-ms-gold px-6 py-3 rounded-full font-heading font-semibold hover:bg-gray-100 transition-colors shadow-lg">
                Explore Collection
              </Link>
            </div>
            <div className="absolute top-4 right-4 w-32 h-32 opacity-20">
              <img src={featuredProducts[0].image} alt="Featured" className="w-full h-full object-cover rounded-full" />
            </div>
          </div>

          {/* Right: Latest Designs */}
          <div className="gradient-silver-gold rounded-xl p-8 text-white relative overflow-hidden shadow-ms-silver">
            <div className="relative z-10">
              <h2 className="font-heading text-3xl font-bold mb-2">LATEST Designs</h2>
              <p className="text-lg mb-6 opacity-90">All that glitters, now with a festive twist!</p>
              <Link href="/collections/earrings" className="inline-block bg-white text-ms-silver-dark px-6 py-3 rounded-full font-heading font-semibold hover:bg-gray-100 transition-colors shadow-lg">
                SHOP NOW
              </Link>
            </div>
            <div className="absolute top-4 right-4 flex gap-2">
              <img src={featuredProducts[1].image} alt="Latest 1" className="w-16 h-16 object-cover rounded shadow-lg" />
              <img src={featuredProducts[2].image} alt="Latest 2" className="w-16 h-16 object-cover rounded shadow-lg" />
            </div>
          </div>
        </div>

        {/* Service Promotions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Fast Delivery */}
          <div className="gradient-violet-gold rounded-xl p-8 text-white relative overflow-hidden shadow-ms-card">
            <div className="relative z-10">
              <h3 className="font-heading text-2xl font-bold mb-2">Jewelry delivered in just <span className="text-ms-gold-light">6 hours</span></h3>
              <p className="text-lg opacity-90">Mumbai | Delhi-NCR | Bengaluru</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12"></div>
          </div>

          {/* Contact Support */}
          <div className="gradient-gold-violet rounded-xl p-8 text-white relative overflow-hidden shadow-ms-gold">
            <div className="relative z-10">
              <h3 className="font-heading text-2xl font-bold mb-2">Need Help Choosing?</h3>
              <p className="text-lg opacity-90 mb-4">Our experts are here to help</p>
              <button className="bg-white text-ms-gold px-6 py-2 rounded-full font-heading font-semibold hover:bg-gray-100 transition-colors shadow-lg">
                Chat Now
              </button>
            </div>
            <div className="absolute top-4 right-4 w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
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
