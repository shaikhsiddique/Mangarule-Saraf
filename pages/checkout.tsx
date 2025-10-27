import { useState } from 'react';
import { useCart } from '../context/CartContext';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const subtotal = cart.reduce((sum, item) => (parseInt(item.price?.replace(/[^\d]/g, ''), 10) || 0) * item.quantity + sum, 0);
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', payment: 'Card', notes: '' });
  const router = useRouter();

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    clearCart();
    setTimeout(() => router.push('/'), 2600);
  }

  if (!cart.length && !submitted) router.replace('/cart');

  return (
    <div className="max-w-2xl mx-auto py-14 px-4 min-h-[60vh] bg-ms-cream animate-fadeIn">
      <Head><title>Checkout - Mangarule Saraf</title></Head>
      <h1 className="section-heading text-center">Checkout</h1>
      <div className="section-divider mx-auto" />
      {submitted ? (
        <div className="text-center mt-20">
          <span className="text-3xl font-heading text-ms-gold block mb-4">Thank you for your order!</span>
          <p className="text-ms-dark">Your details were submitted. <br />We will contact you soon.</p>
        </div>
      ) : (
      <form className="bg-white rounded-xl shadow-ms-card p-7 space-y-4 text-ms-dark mt-8" onSubmit={onSubmit}>
        <div className="font-heading text-lg text-ms-gold mb-2">Order Summary: <span className="text-ms-dark font-sans">₹{subtotal.toLocaleString()}</span></div>
        <div className="grid gap-4">
          <input required name="name" type="text" placeholder="Full Name" className="rounded border border-ms-gold-light py-2 px-3 " value={form.name} onChange={onChange} />
          <input required name="email" type="email" placeholder="Email" className="rounded border border-ms-gold-light py-2 px-3 " value={form.email} onChange={onChange} />
          <input required name="phone" type="tel" placeholder="Phone Number" minLength={10} className="rounded border border-ms-gold-light py-2 px-3 " value={form.phone} onChange={onChange} />
          <textarea required name="address" placeholder="Shipping Address" className="rounded border border-ms-gold-light py-2 px-3 min-h-[60px]" value={form.address} onChange={onChange} />
          <select name="payment" className="rounded border border-ms-gold-light py-2 px-3 text-sm" value={form.payment} onChange={onChange}>
            <option value="Card">Card</option>
            <option value="UPI">UPI</option>
            <option value="COD">Cash on Delivery</option>
          </select>
          <textarea name="notes" placeholder="Notes (Optional)" className="rounded border border-ms-gold-light py-2 px-3 min-h-[32px]" value={form.notes} onChange={onChange} />
        </div>
        <button className="w-full bg-ms-gold hover:bg-ms-dark text-white py-2 rounded-xl mt-3 font-heading text-base transition">Place Order</button>
      </form>
      )}
    </div>
  );
}








