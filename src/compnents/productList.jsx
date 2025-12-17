import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";
import Delete from "../assets/delete.png";
import products from "../data/products.json";

function ProductList() {
  const {
    search,
    addToCart,
    cartItems,
    increaseQty,
    removeFromCart,
    decreaseQty,
  } = useContext(CartContext);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search) ||
      p.category.toLowerCase().includes(search)
  );

  const totalPages = Math.ceil(filteredProducts.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + pageSize
  );

  const getCartItem = (id) => cartItems.find((item) => item.id === id);

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 min-h-screen py-8">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Product Grid */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8 justify-items-center">
          {paginatedProducts.map((product) => {
            const cartItem = getCartItem(product.id);

            return (
              <div
                key={product.id}
                className="group w-full max-w-[320px] bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform duration-500 hover:-translate-y-2 border border-white/50"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image || "./download.jpg"}
                    alt={product.name}
                    className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-3 right-3 bg-[#47c49c] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    {product.category}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 min-h-[3.5rem]">
                    {product.name}
                  </h3>

                  <p className="text-2xl font-extrabold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
                    ₹{product.price.toLocaleString("en-IN")}
                  </p>

                  {cartItem ? (
                    <div className="flex items-center justify-between bg-gray-50 rounded-2xl py-3 px-4 border border-gray-200">
                      <button
                        onClick={() => {
                          decreaseQty(product.id);
                          toast.info("Quantity decreased");
                        }}
                        className="w-10 h-10 rounded-full bg-white border-2 border-[#47c49c] text-[#47c49c] hover:bg-[#47c49c] hover:text-white transition-all font-bold"
                      >
                        −
                      </button>

                      <span className="font-bold text-lg">{cartItem.qty}</span>

                      <button
                        onClick={() => {
                          increaseQty(product.id);
                          toast.info("Quantity increased");
                        }}
                        className="w-10 h-10 rounded-full bg-white border-2 border-[#47c49c] text-[#47c49c] hover:bg-[#47c49c] hover:text-white transition-all font-bold"
                      >
                        +
                      </button>

                      <button
                        onClick={() => {
                          removeFromCart(product.id);
                          toast.error("Removed from cart");
                        }}
                        className="w-10 h-10 rounded-full bg-red-500 hover:bg-red-600 transition-all flex items-center justify-center"
                      >
                        <img
                          src={Delete}
                          alt="Delete"
                          className="w-5 h-5 brightness-0 invert"
                        />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        addToCart(product);
                        toast.success("Added to cart 🛒");
                      }}
                      className="w-full py-3.5 rounded-2xl bg-[#47c49c] text-white font-bold shadow-lg hover:scale-105 transition-transform"
                    >
                      Add to Cart 🛒
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-12 flex-wrap">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg bg-white border disabled:opacity-40"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-lg font-bold border ${
                  currentPage === i + 1
                    ? "bg-[#47c49c] text-white border-[#47c49c]"
                    : "bg-white hover:bg-[#47c49c]/10"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg bg-white border disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductList;
