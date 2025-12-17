import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

function Header() {
  const { cartItems, search, setSearch } = useContext(CartContext);

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <header className="sticky top-0 z-50 bg-black/95 shadow-2xl">
      <div className="max-w-[1400px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link
            to="/"
            className="flex items-center gap-3 no-underline text-inherit group"
          >
            <div className="w-12 h-12 bg-[#47c49c] rounded-2xl flex items-center justify-center shadow-lg shadow-[#47c49c]/20 group-hover:scale-110 group-hover:shadow-[#47c49c]/40 transition-all duration-300">
              <span className="text-2xl">🛍️</span>
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-white tracking-tight group-hover:text-[#47c49c] transition-colors duration-300">
                ShopHub
              </h1>
              <p className="text-xs text-gray-400 group-hover:text-[#47c49c]/80 transition-colors duration-300">
                Premium Shopping
              </p>
            </div>
          </Link>

          {/* Search and Cart Section */}
          <div className="flex items-center gap-6">
            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-xl">🔍</span>
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value.toLowerCase())}
                placeholder="Search products..."
                className="py-3 pl-12 pr-4 w-80 rounded-2xl bg-[#2a2a35] border border-gray-700 text-gray-200 placeholder-gray-500 outline-none focus:border-[#47c49c] focus:ring-4 focus:ring-[#47c49c]/20 transition-all duration-300 shadow-lg"
              />
            </div>

            {/* Cart Icon */}
            <Link to="/cart" className="relative group">
              <div className="w-14 h-14 bg-[#47c49c] rounded-2xl flex items-center justify-center shadow-lg shadow-[#47c49c]/20 group-hover:shadow-2xl group-hover:shadow-[#47c49c]/40 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 cursor-pointer">
                <span className="text-3xl">🛒</span>
              </div>

              {cartCount > 0 && (
                <div className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold shadow-lg animate-pulse border-2 border-[#1c1c22]">
                  {cartCount}
                </div>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom solid border */}
      <div className="h-1 bg-[#47c49c]"></div>
    </header>
  );
}

export default Header;
