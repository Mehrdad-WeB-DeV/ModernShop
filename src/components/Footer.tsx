import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-zinc-800 bg-zinc-950 text-zinc-300">

      <div className="mx-auto max-w-7xl px-6 py-12">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-xl font-bold text-white">
              ModernShop
            </h2>

            <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
              © 2026 ModernShop. A portfolio project designed and developed by Mehrdad to showcase frontend development skills.
              
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-violet-400 transition">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/cart" className="hover:text-violet-400 transition">
                  Cart
                </Link>
              </li>

            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Contact
            </h3>

            <ul className="space-y-2 text-sm text-zinc-400">
              <li>Email: info@codemehrdad.ir</li>
              <li>Location: Online Store</li>
              <li>Phone: +98 123 45 67</li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-zinc-800 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-zinc-500">

          <p>
            © {new Date().getFullYear()} ModernShop. All rights reserved.
          </p>

          <p className="mt-2 md:mt-0">
            Built with ❤️ using React + TypeScript
          </p>

        </div>

      </div>

    </footer>
  );
}