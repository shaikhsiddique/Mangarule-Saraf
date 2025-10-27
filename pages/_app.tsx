import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CartProvider, useCart } from "../context/CartContext";

function MyAppContent({ Component, pageProps }: AppProps) {
  const { cart } = useCart();
  return (
    <>
      <Navbar cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default function App(props: AppProps) {
  return (
    <CartProvider>
      <MyAppContent {...props} />
    </CartProvider>
  );
}
