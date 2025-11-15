import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${id}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
      } else {
        setProduct(null);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ms-gold mx-auto mb-4"></div>
          <p className="text-ms-gold">Loading product...</p>
        </div>
      </div>
    );
  }

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
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="space-y-6">
            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <svg className={`w-5 h-5 ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? `In stock (${product.stock} available)` : 'Out of stock'}
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-ms-gold">{product.price}</span>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-heading text-lg text-ms-gold mb-3">Description</h3>
              <p className="text-ms-dark leading-relaxed">{product.description || 'Beautiful handcrafted jewelry piece.'}</p>
            </div>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div>
                <h3 className="font-heading text-lg text-ms-gold mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag: string, index: number) => (
                    <span key={index} className="bg-ms-gold-light text-ms-gold px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => addToCart({
                  id: product._id,
                  name: product.name,
                  image: product.image,
                  price: product.price,
                  type: product.type
                })}
                disabled={product.stock <= 0}
                className={`flex-1 py-3 rounded-lg font-heading font-semibold transition-colors flex items-center justify-center gap-2 ${
                  product.stock > 0
                    ? 'bg-white border-2 border-ms-gold text-black hover:bg-ms-gold-light'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A2 2 0 0 0 7.42 19h9.16a2 2 0 0 0 1.77-3.3L17 13M7 13V6h13m-1 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
                {product.stock > 0 ? 'ADD TO CART' : 'OUT OF STOCK'}
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
      </div>
    </div>
  );
}
