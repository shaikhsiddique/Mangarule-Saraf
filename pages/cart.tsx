import { useCart } from '../context/CartContext';
import Head from 'next/head';
import Link from 'next/link';

export default function Cart() {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  function getPriceValue(price: string|undefined) {
    return parseInt((price || '').replace(/[^\d]/g, ''), 10) || 0;
  }
  const subtotal = cart.reduce(
    (sum, item) => sum + getPriceValue(item.price) * item.quantity,
    0
  );

  function handleRemove(id: string, name: string) {
    if (window.confirm(`Remove '${name}' from your cart?`)) removeFromCart(id);
  }

  function handleClearCart() {
    if (window.confirm('This will remove all items from your cart. Continue?')) clearCart();
  }

  return (
    <div className="max-w-3xl mx-auto py-14 px-4 min-h-[60vh] bg-ms-cream animate-fadeIn">
      <Head>
        <title>Your Cart - Mangarule Saraf</title>
      </Head>
      <h1 className="section-heading text-center">Your Cart</h1>
      <div className="section-divider mx-auto" />
      {cart.length === 0 ? (
        <div className="mt-14 text-ms-gold text-xl font-heading text-center">
          Your cart is empty.<br />
          <span className="text-ms-dark text-sm font-sans">Discover and add beautiful jewelry from our collections!</span>
        </div>
      ) : (
        <div className="mt-6">
          <ul>
            {cart.map(item => {
              const price = getPriceValue(item.price);
              const total = price * item.quantity;
              return (
                <li key={item.id} className="flex items-center gap-4 mb-7 border-b border-ms-gold-light pb-5">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded border border-ms-gold-light bg-white" />
                  <div className="flex-1">
                    <div className="font-heading font-bold text-ms-gold text-base">{item.name}</div>
                    <div className="text-ms-dark mt-1 mb-2 font-sans flex flex-wrap items-center gap-2">
                      <span>{item.price || '₹2,999'}</span>
                      <span className="text-ms-gold/60">× {item.quantity}</span>
                      <span className="text-ms-dark/80">= ₹{total.toLocaleString()}</span>
                    </div>
                    <div className="flex gap-3 items-center">
                      <button onClick={() => addToCart(item)} className="bg-ms-gold hover:bg-ms-dark text-white rounded-full w-7 h-7 flex items-center justify-center">+</button>
                      <span className="min-w-[2rem] text-center font-heading">{item.quantity}</span>
                      <button onClick={() => handleRemove(item.id, item.name)} className="bg-ms-gold hover:bg-ms-dark text-white rounded-full w-7 h-7 flex items-center justify-center">-</button>
                    </div>
                  </div>
                  <button onClick={() => handleRemove(item.id, item.name)} className="ml-3 text-xs text-ms-gold hover:text-red-600 px-2 py-1 rounded transition border border-transparent hover:border-red-200">Remove</button>
                </li>
              );
            })}
          </ul>
          <div className="flex flex-col sm:flex-row justify-between items-center mt-8 mb-4 px-2">
            <div className="text-lg font-bold text-ms-gold font-heading">Subtotal: ₹{subtotal.toLocaleString()}</div>
            <Link href="/checkout" className="mt-4 sm:mt-0 ml-0 sm:ml-2 bg-ms-gold hover:bg-ms-dark text-white font-heading px-7 py-2 rounded-full shadow transition-all text-center">Checkout</Link>
          </div>
          <button onClick={handleClearCart} className="block mx-auto mt-1 text-xs text-ms-dark border-b border-ms-gold-light hover:text-red-600">Clear Cart</button>
        </div>
      )}
    </div>
  );
}
