import Link from 'next/link';

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

const socials = [
  {
    name: 'Instagram',
    href: 'https://instagram.com/',
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
        <path d="M12 2.2c3.2 0 3.584.012 4.847.07 1.17.056 1.97.24 2.426.409.54.197.928.435 1.334.841.406.406.644.794.841 1.334.169.456.353 1.256.409 2.426.058 1.264.07 1.647.07 4.847 0 3.2-.012 3.584-.07 4.847-.056 1.17-.24 1.97-.409 2.426a2.86 2.86 0 0 1-.841 1.334 2.864 2.864 0 0 1-1.334.841c-.456.169-1.256.353-2.426.409-1.263.058-1.647.07-4.847.07-3.2 0-3.584-.012-4.847-.07-1.17-.056-1.97-.24-2.426-.409a2.862 2.862 0 0 1-1.334-.841 2.86 2.86 0 0 1-.841-1.334c-.169-.456-.353-1.256-.409-2.426C2.212 15.63 2.2 15.247 2.2 12.047c0-3.2.012-3.584.07-4.847.056-1.17.24-1.97.409-2.426.197-.54.435-.928.841-1.334.406-.406.794-.644 1.334-.841.456-.169 1.256-.353 2.426-.409C8.416 2.212 8.8 2.2 12 2.2zm0-2C8.71.2 8.313.213 7.047.27 5.768.327 4.724.497 3.903.735c-.875.247-1.635.629-2.343 1.337C.488 2.779.106 3.54-.141 4.414c-.238.82-.408 1.864-.465 3.143C-.213 8.313-.2 8.71-.2 12c0 3.29.013 3.687.07 4.953.057 1.279.227 2.323.465 3.143.247.875.629 1.635 1.337 2.343.708.708 1.468 1.09 2.343 1.337.82.238 1.864.408 3.143.465C8.313 23.787 8.71 23.8 12 23.8c3.29 0 3.687-.013 4.953-.07 1.279-.057 2.323-.227 3.143-.465.875-.247 1.635-.629 2.343-1.337.708-.708 1.09-1.468 1.337-2.343.238-.82.408-1.864.465-3.143.057-1.267.07-1.664.07-4.953 0-3.29-.013-3.687-.07-4.953-.057-1.279-.227-2.323-.465-3.143-.247-.875-.629-1.635-1.337-2.343C19.155.488 18.395.106 17.52-.141c-.82-.238-1.864-.408-3.143-.465C15.687.213 15.29.2 12 .2zm0 5.333c-3.668 0-6.667 2.999-6.667 6.667A6.675 6.675 0 0 0 12 18.867a6.675 6.675 0 0 0 6.667-6.667A6.675 6.675 0 0 0 12 5.533zm0 10.8A4.133 4.133 0 0 1 7.867 12 4.133 4.133 0 0 1 12 7.867 4.133 4.133 0 0 1 16.133 12 4.133 4.133 0 0 1 12 16.333zm7.2-10.333a1.6 1.6 0 1 1-3.2 0 1.6 1.6 0 0 1 3.2 0z"/>
      </svg>
    )
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com/',
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M17.525 8.998h-2.265V7.396c0-.481.32-.592.547-.592h1.687V4.173l-2.328-.009c-2.591 0-3.185 1.937-3.185 3.183V8.998h-1.595v3.062h1.595v7.767h3.239v-7.767h2.187l.078-3.062z"/></svg>
    )
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/',
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.031-.967-.273-.099-.471-.148-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.655-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.149-.174.198-.297.298-.496.099-.198.05-.372-.025-.521-.074-.149-.669-1.611-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.011c-.198 0-.521.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.364.709.306 1.263.489 1.695.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.617c-1.266 0-2.511-.196-3.688-.583l-.263-.084-3.287.995.997-3.205-.086-.263C2.188 17.67 1 15.014 1 12.065 1 6.504 6.149 2 12 2c3.064 0 5.945 1.182 8.093 3.325C22.241 7.469 23.4 10.307 23.4 13.255c0 5.561-5.148 10.064-11 10.064zm0-19.13C7.065 2.869 2.869 7.065 2.869 12.065c0 2.681 1.042 5.171 2.924 7.057l.208.209-.592 1.899 1.953-.593.203.112c1.208.444 2.511.677 3.868.677 5.012 0 9.078-4.034 9.078-8.998 0-2.409-.936-4.677-2.637-6.375C16.677 3.791 14.373 2.868 12.051 2.866h-.001z"/></svg>
    )
  }
]

export default function Footer() {
  return (
    <footer className="bg-ms-cream border-t border-ms-gold-light pt-10 pb-3 px-4 mt-10 text-center animate-fadeIn">
      {/* Logo centered with line */}
      <div className="flex items-center justify-center mb-3">
        <div className="flex-1 h-px bg-ms-gold-light"></div>
        <div className="flex flex-col items-center px-5">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-200 via-ms-gold to-yellow-800 flex items-center justify-center font-heading text-2xl text-white shadow font-bold mb-1">MS</div>
          <span className="text-lg font-heading font-bold text-ms-gold tracking-wide">Mangarule Saraf</span>
        </div>
        <div className="flex-1 h-px bg-ms-gold-light"></div>
      </div>
      {/* Nav links below logo */}
      <nav className="flex flex-wrap justify-center gap-4 mb-6 mt-2">
        {navLinks.map(link => (
          <Link href={link.href} key={link.name} className="text-ms-gold hover:text-ms-dark font-heading text-base transition-colors px-2 py-1 rounded focus:outline-none focus:bg-ms-gold-light">
            {link.name}
          </Link>
        ))}
      </nav>
      {/* Social icons */}
      <div className="flex justify-center space-x-6 mt-4 mb-3">
        {socials.map(s => (
          <a href={s.href} rel="noopener noreferrer" target="_blank" aria-label={s.name} key={s.name}
            className="inline-flex items-center justify-center rounded-full text-ms-gold hover:bg-ms-gold-light focus:outline-none transition p-2">
            {s.icon}
          </a>
        ))}
      </div>
      {/* About section and contact info */}
      <div className="text-ms-dark text-sm max-w-2xl mx-auto mt-2 font-sans">
        <b className="text-ms-gold font-heading">About Mangarule Saraf:</b> <br />
        Mangarule Saraf is your premier destination for sophisticated, minimalistic, and authentically Indian jewelry. Discover luxury handcrafted pieces for every occasion, crafted with unmatched precision and elegance. Let your style sparkle with us!
        <div className="mt-3 text-ms-gold font-semibold font-sans">
          Customer Care: <a href="tel:+911234567890" className="underline hover:text-ms-dark">+91 123-456-7890</a> &bull; Email: <a href="mailto:info@mangarulesaraf.com" className="underline hover:text-ms-dark">info@mangarulesaraf.com</a>
        </div>
      </div>
      {/* Copyright line */}
      <div className="mt-7 pt-2 text-xs text-ms-gold border-t border-ms-gold-light opacity-80">
        © {new Date().getFullYear()} Mangarule Saraf. All rights reserved.
      </div>
    </footer>
  );
}
