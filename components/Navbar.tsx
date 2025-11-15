import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Necklaces', href: '/collections/necklaces' },
  { name: 'Earrings', href: '/collections/earrings' },
  { name: 'Rings', href: '/collections/rings' },
  { name: 'Bracelets', href: '/collections/bracelets' },
  { name: 'Mangalsutra', href: '/collections/mangalsutra' },
  { name: 'Party Wear', href: '/collections/party-wear' },
  { name: 'Daily Wear', href: '/collections/daily-wear' },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Feedback', href: '/feedback' },
];

const adminNavLinks = [
  { name: 'Admin Panel', href: '/admin/dashboard' },
];

export default function Navbar({ cartCount = 0 }: { cartCount?: number }) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const isAdmin = user?.role === 'admin';
  return (
    <header className="bg-white shadow sticky top-0 z-30">
      <nav className="flex items-center justify-between px-4 py-3 border-b bg-white">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full gradient-gold-silver flex items-center justify-center font-bold text-xl text-white shadow-ms-gold">MS</div>
          <span className="ml-1 text-xl font-semibold tracking-wide text-ms-gray font-heading">Mangarule Saraf</span>
        </Link>
        {/* Links */}
        <div className="hidden md:flex items-center gap-3 lg:gap-5">
          {navLinks.map(link => (
            <Link key={link.name} href={link.href} className={`px-2 py-1 text-sm rounded transition-colors font-heading ${router.pathname === link.href ? 'gradient-gold-silver text-white font-bold shadow-ms-gold' : 'text-ms-gray hover:bg-ms-gold-light'}`}>{link.name}</Link>
          ))}
          {isAdmin && adminNavLinks.map(link => (
            <Link key={link.name} href={link.href} className={`px-2 py-1 text-sm rounded transition-colors font-heading ${router.pathname === link.href ? 'gradient-gold-silver text-white font-bold shadow-ms-gold' : 'text-ms-gray hover:bg-ms-gold-light'}`}>{link.name}</Link>
          ))}
        </div>
        {/* Auth + Cart */}
        <div className="flex items-center gap-3">
          {!user ? (
            <>
              <Link href="/admin/login" className={`hidden md:inline px-3 py-1 text-sm rounded bg-white border-2 border-red-500 text-red-600 hover:bg-red-50 font-heading ${router.pathname === '/admin/login' ? 'bg-red-500 text-white border-transparent' : ''}`}>Admin Login</Link>
              <Link href="/login" className={`hidden md:inline px-3 py-1 text-sm rounded bg-white border-2 border-ms-gold text-black hover:bg-ms-gold-light font-heading ${router.pathname === '/login' ? 'bg-ms-gold text-white border-transparent' : ''}`}>Login</Link>
              <Link href="/signup" className={`hidden md:inline px-3 py-1 text-sm rounded bg-white border-2 border-ms-gold text-black hover:bg-ms-gold-light font-heading ${router.pathname === '/signup' ? 'bg-ms-gold text-white border-transparent' : ''}`}>Sign Up</Link>
            </>
          ) : (
            <>
              <span className="hidden md:inline text-sm font-heading text-ms-gray">Hi, {user.name.split(' ')[0]}</span>
              {isAdmin && (
                <Link href="/admin/dashboard" className="hidden md:inline px-3 py-1 text-sm rounded bg-red-500 text-white hover:bg-red-600 font-heading">
                  Admin
                </Link>
              )}
              <button onClick={async () => { await fetch('/api/auth/logout', { method: 'POST' }); await router.replace('/login'); }} className="hidden md:inline px-3 py-1 text-sm rounded bg-white border-2 border-ms-gold text-black hover:bg-ms-gold-light font-heading">Logout</button>
            </>
          )}
          <Link href="/cart" className="relative flex items-center ml-2">
          <svg className="w-7 h-7 text-ms-gray" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A2 2 0 0 0 7.42 19h9.16a2 2 0 0 0 1.77-3.3L17 13M7 13V6h13m-1 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white rounded-full px-1">{cartCount}</span>
          )}
          </Link>
        </div>
      </nav>
      {/* Moving Banner */}
      <div className="overflow-x-hidden border-b py-2 gradient-gold-silver animate-fadeIn animate-slideInDown">
        <div className="whitespace-nowrap animate-marquee text-black font-medium text-lg font-heading">
          🌟 Founded in 1957 by Late Ramchandra Vishnu Mangarule | 100% Purity Guaranteed | Trustworthy & Reliable | Wide Variety of Gold & Silver Jewelry 🌟
        </div>
      </div>
    </header>
  );
}
