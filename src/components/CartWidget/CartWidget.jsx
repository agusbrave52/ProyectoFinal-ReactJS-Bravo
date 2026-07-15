import { useContext } from 'react';
import { CartContext } from '../../context/cartContext.js';
import { FaCartShopping } from 'react-icons/fa6';
import { Link } from 'react-router';

const CartWidget = () => {
  const { totalQuantity } = useContext(CartContext);
  const total = totalQuantity();

  return (
    <Link to="/cart" className="cartWidget" aria-label="Carrito de compras">
      <FaCartShopping className="cart-icon" size={20} />
      <span className="cart-count">{total}</span>
    </Link>
  );
};

export default CartWidget;