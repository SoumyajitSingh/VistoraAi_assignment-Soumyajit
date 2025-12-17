import { createContext, useState } from "react";
export const CartContext = createContext()
export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [search, setSearch] = useState("")


    const addToCart = (product) => {
        setCartItems(prev =>
            prev.some(item => item.id === product.id)
                ? prev.map(item =>
                    item.id === product.id
                        ? { ...item, qty: item.qty + 1 }
                        : item
                )
                : [...prev, { ...product, qty: 1 }]
        );
    };



    const removeFromCart = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };



    const increaseQty = (id) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, qty: item.qty + 1 }
                    : item
            )
        );
    };

    const decreaseQty = (id) => {
        setCartItems(prev =>
            prev
                .map(item =>
                    item.id === id
                        ? { ...item, qty: item.qty - 1 }
                        : item
                )
                .filter(item => item.qty > 0)
        );
    };



    return (
        <CartContext.Provider
            value={{
                cartItems, addToCart, removeFromCart, search, setSearch, increaseQty,
                decreaseQty
            }}
        >
            {children}
        </CartContext.Provider>
    );
}