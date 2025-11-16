import "../styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from 'next/dynamic';
import Footer from "../components/Footer";
import { CartProvider, useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { AuthProvider } from "../context/AuthContext";
import { ProductProvider } from "../context/ProductContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Navbar = dynamic(() => import('../components/Navbar'), { ssr: false });



function MyAppContent({ Component, pageProps }: AppProps) {
  const { cart } = useCart();
  const { user, loading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const publicRoutes = new Set<string>(['/login', '/signup']);
  const adminRoutes = new Set<string>(['/admin/dashboard', '/admin/products', '/admin/users']);
  const isPublic = mounted && publicRoutes.has(router.pathname);
  const isAdminRoute = mounted && adminRoutes.has(router.pathname);

  // Redirect unauthenticated users away from private routes in an effect
  useEffect(() => {
    if (mounted && !loading) {
      if (!user && !isPublic) {
        router.replace('/login');
      } else if (user && isAdminRoute && user.role !== 'admin') {
        router.replace('/');
      }
    }
  }, [loading, user, isPublic, isAdminRoute, router, mounted]);

  if (!mounted) {
    return (
      <>
        <Navbar cartCount={0} />
        <div className="min-h-[50vh] flex items-center justify-center text-ms-gold">Loading...</div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} />
      {loading ? (
        <div className="min-h-[50vh] flex items-center justify-center text-ms-gold">Loading...</div>
      ) : (!user && !isPublic) ? (
        <div className="min-h-[50vh]" />
      ) : (
        <Component {...pageProps} />
      )}
      <Footer />
    </>
  );
}

export default function App(props: AppProps) {
  return (
    <AuthProvider>
      <CartProvider>
        <ProductProvider>
          <MyAppContent {...props} />
        </ProductProvider>
      </CartProvider>
    </AuthProvider>
  );
}
