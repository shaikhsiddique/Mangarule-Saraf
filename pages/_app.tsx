import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CartProvider, useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { AuthProvider } from "../context/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

function MyAppContent({ Component, pageProps }: AppProps) {
  const { cart } = useCart();
  const { user, loading } = useAuth();
  const router = useRouter();
  const publicRoutes = new Set<string>(['/login', '/signup']);
  const isPublic = publicRoutes.has(router.pathname);
  // Redirect unauthenticated users away from private routes in an effect
  useEffect(() => {
    if (!loading && !user && !isPublic) {
      router.replace('/login');
    }
  }, [loading, user, isPublic, router]);
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
        <MyAppContent {...props} />
      </CartProvider>
    </AuthProvider>
  );
}
