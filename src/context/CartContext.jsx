import { useState, useEffect } from "react";
import { CartContext } from "./cartContext.js";

export const CartProvider = ({ children }) => {
  const cartLocalStorage = JSON.parse(localStorage.getItem("cart-hering"));
  const [cart, setCart] = useState(cartLocalStorage ? cartLocalStorage : []);

  useEffect(() => {
    // cada vez que cambia el carrito, lo persistimos
    localStorage.setItem("cart-hering", JSON.stringify(cart));
  }, [cart]);

  const isInCart = (productId) => {
    return cart.some((productCart) => productCart.id === productId);
  };

  const addProductInCart = (newProduct) => {
    if (isInCart(newProduct.id)) {
      const indexProduct = cart.findIndex((productCart) => productCart.id === newProduct.id);
      const newCart = [...cart];
      newCart[indexProduct].quantity += newProduct.quantity;
      setCart(newCart);
    } else {
      setCart([...cart, newProduct]);
    }
  };

  const totalQuantity = () => {
    return cart.reduce((total, productCart) => total + productCart.quantity, 0);
  };

  const totalPrice = () => {
    return cart.reduce((total, productCart) => total + productCart.price * productCart.quantity, 0);
  };

  const deleteProductById = (productId) => {
    setCart(cart.filter((productCart) => productCart.id !== productId));
  };

  const deleteCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addProductInCart, totalQuantity, isInCart, deleteProductById, deleteCart, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};