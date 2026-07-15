import { useContext } from 'react';
import { CartContext } from '../../context/cartContext.js';
import CartItem from '../CartItem/CartItem.jsx';
import { Link } from 'react-router';
import './Cart.css';

const Cart = () => {
  const { cart, deleteProductById, deleteCart, totalPrice } = useContext(CartContext);

  // Renderizado condicional: carrito vacío
  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <h2>No hay productos en el carrito</h2>
        <Link to="/" className="button-to-home">Volver al inicio</Link>
      </div>
    );
  }

  return (
    <section className="cart">
      <h1>Tu carrito</h1>
      <div className="cart-items">
        {cart.map((productCart) => (
          <CartItem
            key={productCart.id}
            product={productCart}
            onRemove={() => deleteProductById(productCart.id)}
          />
        ))}
      </div>

      <div className="cart-summary">
        <p className="cart-total">Total: $ {totalPrice()}</p>
        <Link to="/checkout" className="button-to-checkout">Ir a checkout</Link>
        <button type="button" className="button-clear-cart" onClick={deleteCart}>
          Vaciar carrito
        </button>
      </div>
    </section>
  );
};

export default Cart;