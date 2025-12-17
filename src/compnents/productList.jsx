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
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100 py-14">
      <div className="max-w-[1300px] mx-auto px-6">

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-10">
          {paginatedProducts.map((product) => {
            const cartItem = getCartItem(product.id);

            return (
              <div
                key={product.id}
                className="
                  relative bg-white/70 backdrop-blur-lg
                  rounded-2xl border border-white/60
                  shadow-md hover:shadow-2xl
                  transition-all duration-500
                  hover:-translate-y-3 hover:border-blue-400
                "
              >
                {/* IMAGE */}
                <div className="h-44 flex items-center justify-center p-6">
                  <img
                    src={product.image || "./download.jpg"}
                    alt={product.name}
                    className="h-full object-contain"
                  />
                </div>

                {/* CONTENT */}
                <div className="px-6 pb-6 text-center">
                  <h3 className="text-sm font-semibold text-gray-800 mb-2">
                    {product.name}
                  </h3>

                  <p className="text-sm text-gray-500 mb-4">
                    ₹{product.price.toLocaleString("en-IN")}
                  </p>

                  {/* CART AREA */}
                  {cartItem ? (
                    <div className="flex items-center justify-center gap-3 bg-white rounded-xl py-2 shadow-inner border">

                      <button
                        onClick={() => {
                          decreaseQty(product.id);
                          toast.info("Quantity decreased");
                        }}
                        className="w-8 h-8 rounded-lg border text-gray-700 hover:bg-gray-100"
                      >
                        −
                      </button>

                      <span className="font-semibold">
                        {cartItem.qty}
                      </span>

                      <button
                        onClick={() => {
                          increaseQty(product.id);
                          toast.info("Quantity increased");
                        }}
                        className="w-8 h-8 rounded-lg border text-gray-700 hover:bg-gray-100"
                      >
                        +
                      </button>

                      <button
                        onClick={() => {
                          removeFromCart(product.id);
                          toast.error("Removed from cart");
                        }}
                        className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center"
                      >
                        <img
                          src={Delete}
                          alt="delete"
                          className="w-4 h-4 brightness-0 invert"
                        />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        addToCart(product);
                        toast.success("Added to cart");
                      }}
                      className="
                        w-full py-2 rounded-lg
                        border border-blue-500
                        text-blue-600 font-medium
                        hover:bg-blue-500 hover:text-white
                        transition
                      "
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-16">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="px-3 py-1 border rounded-lg bg-white"
            >
              ‹
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-9 h-9 rounded-full text-sm font-semibold ${
                  currentPage === i + 1
                    ? "bg-blue-500 text-white"
                    : "bg-white border hover:bg-blue-100"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(p + 1, totalPages))
              }
              className="px-3 py-1 border rounded-lg bg-white"
            >
              ›
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductList;
