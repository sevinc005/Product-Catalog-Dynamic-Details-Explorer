import { Link } from 'react-router-dom';
import { ShoppingCart, Store, Search } from 'lucide-react';

function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo hissəsi */}
          <Link to="/" className="flex items-center gap-2 group transition-transform hover:scale-105">
            <Store className="text-blue-600" size={28} />
            <span className="text-xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              CatalogExplorer
            </span>
          </Link>

          {/* Axtarış və Linklər */}
          <div className="flex items-center gap-8">
            <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Məhsullar
            </Link>
            
            <div className="relative cursor-pointer group">
              <ShoppingCart className="text-gray-600 group-hover:text-blue-600 transition-colors" size={26} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                0
              </span>
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;