import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";

function Cart() {
  const { cartItems, increaseQty, decreaseQty, removeFromCart } =
    useContext(CartContext);

  if (cartItems.length === 0) {
    return <h2 className="text-center mt-10">🛒 Cart is empty</h2>;
  }

  const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="p-5">
      <h2 className="text-center mb-5">Your Cart</h2>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6 max-w-[1100px] mx-auto">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="border border-[#e5e7eb] rounded-xl p-3.5 shadow-[0_4px_10px_rgba(0,0,0,0.05)] bg-white flex flex-col justify-between"
          >
            <div>
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover rounded-[10px] mb-2.5"
              />

              <h4 className="my-1.5">{item.name}</h4>

              <p className="font-semibold my-1">
                ₹{item.price} × {item.qty}
              </p>

              <p className="text-[#6b7280] text-sm">
                Subtotal: ₹{item.price * item.qty}
              </p>

              <div className="flex items-center gap-3 mt-2.5">
                <button
                  onClick={() => {
                    decreaseQty(item.id);
                    toast.info("Quantity decreased");
                  }}
                  className="w-8 h-8 rounded-md border border-[#ddd] bg-[#f9fafb] cursor-pointer text-lg font-semibold"
                >
                  −
                </button>

                <span className="font-semibold">{item.qty}</span>

                <button
                  onClick={() => {
                    increaseQty(item.id);
                    toast.info("Quantity increased");
                  }}
                  className="w-8 h-8 rounded-md border border-[#ddd] bg-[#f9fafb] cursor-pointer text-lg font-semibold"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-2.5 mt-3.5">
              <button
                className="flex-1 py-2.5 bg-[#16a34a] text-white border-none rounded-lg font-semibold cursor-pointer"
                onClick={() => toast.success("Proceeding to checkout")}
              >
                Buy Now
              </button>

              <button
                className="py-2.5 px-3.5 bg-[#ef4444] text-white border-none rounded-lg cursor-pointer"
                onClick={() => {
                  removeFromCart(item.id);
                  toast.error("Item removed");
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-[1100px] mt-[30px] mx-auto flex justify-end">
        <h2 className="font-bold">
          Subtotal ({totalItems} items):{" "}
          <span className="text-[#B12704]">
            ₹
            {subtotal.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
            })}
          </span>
        </h2>
      </div>
    </div>
  );
}

export default Cart;
