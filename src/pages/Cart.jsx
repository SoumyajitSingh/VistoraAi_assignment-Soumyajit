import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";

function Cart() {
  const { cartItems, increaseQty, decreaseQty, removeFromCart } =
    useContext(CartContext);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <h2 className="text-2xl font-semibold text-gray-500">
          🛒 Your cart is empty
        </h2>
      </div>
    );
  }

  const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const shipping = 0;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100 py-14">
      <div className="max-w-[1200px] mx-auto px-6">

        {/* PAGE TITLE */}
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-12">
          Cart
        </h2>

        {/* CART ITEMS */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-8">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="
                bg-white/70 backdrop-blur-lg
                rounded-2xl border border-white/60
                shadow-md hover:shadow-xl
                transition-all
                p-5 flex flex-col
              "
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-contain mb-4"
              />

              <h4 className="font-semibold text-gray-800 text-sm mb-1">
                {item.name}
              </h4>

              <p className="text-gray-500 text-sm mb-2">
                ₹{item.price.toLocaleString("en-IN")}
              </p>

              {/* QUANTITY CONTROLS */}
              <div className="flex items-center gap-3 mb-4">
                <button
                  onClick={() => {
                    decreaseQty(item.id);
                    toast.info("Quantity decreased");
                  }}
                  className="w-8 h-8 rounded-md border bg-white hover:bg-gray-100 font-bold"
                >
                  −
                </button>

                <span className="font-semibold">{item.qty}</span>

                <button
                  onClick={() => {
                    increaseQty(item.id);
                    toast.info("Quantity increased");
                  }}
                  className="w-8 h-8 rounded-md border bg-white hover:bg-gray-100 font-bold"
                >
                  +
                </button>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                Subtotal:{" "}
                <span className="font-semibold">
                  ₹{(item.price * item.qty).toLocaleString("en-IN")}
                </span>
              </p>

              <button
                onClick={() => {
                  removeFromCart(item.id);
                  toast.error("Item removed");
                }}
                className="mt-auto py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* ORDER SUMMARY */}
        <div className="mt-20 flex justify-center">
          <div className="w-full max-w-md bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 border">
            <h3 className="text-lg font-bold mb-6 text-gray-800">
              Order Summary
            </h3>

            <div className="flex justify-between text-sm mb-3">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>

            <div className="flex justify-between text-sm mb-3">
              <span>Shipping Estimate</span>
              <span>₹{shipping.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-sm mb-4">
              <span>Estimated Tax</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>

            <div className="border-t pt-4 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* CHECKOUT BUTTON */}
        <div className="flex justify-center mt-10">
          <button
            onClick={() => toast.success("Proceeding to checkout")}
            className="
              px-10 py-4 rounded-xl
              bg-gradient-to-r from-blue-500 to-blue-600
              text-white font-semibold text-lg
              shadow-lg hover:shadow-xl
              transition
            "
          >
            Proceed to Checkout
          </button>
        </div>

        {/* FOOTER INFO */}
        <p className="text-center text-sm text-gray-500 mt-6">
          {totalItems} items in cart
        </p>
      </div>
    </div>
  );
}

export default Cart;
