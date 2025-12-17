import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import AYCL from "../assets/AYCL.png";

function Header() {
  const { cartItems, search, setSearch } = useContext(CartContext);

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <header className="sticky top-4 z-50 px-4">
      <div className="max-w-[1400px] mx-auto bg-white rounded-2xl shadow-lg px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={AYCL}
            alt="AsYourChoice"
            className="w-9 h-9 object-contain"
          />
          <span className="text-lg font-bold text-gray-800">
            AsYourChoice
          </span>
        </Link>

        {/* SEARCH */}
        <div className="relative w-[420px] hidden md:block">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            placeholder="Search"
            className="
              w-full py-2.5 pl-10 pr-4
              rounded-xl border border-gray-200
              bg-gray-50 text-sm
              outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100
            "
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m1.85-5.65a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
            />
          </svg>
        </div>

        {/* CART */}
        <Link to="/cart" className="relative">
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h13M9 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"
            />
          </svg>

          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
        </Link>

      </div>
    </header>
  );
}

export default Header;
