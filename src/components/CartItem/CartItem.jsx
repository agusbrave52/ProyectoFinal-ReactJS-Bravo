import { FaTrashAlt } from 'react-icons/fa';
import './CartItem.css';

const CartItem = ({ product, onRemove }) => {
  return (
    <article className="cart-item">
      <img src={product.image_url} alt={product.title} />
      <div className="cart-item-info">
        <h3>{product.title}</h3>
        <p>Precio unitario: $ {product.price}</p>
        <p>Cantidad: {product.quantity}</p>
        <p>Subtotal: $ {product.price * product.quantity}</p>
      </div>
      <button type="button" className="cart-item-remove" onClick={onRemove} aria-label="Quitar producto">
        <FaTrashAlt />
      </button>
    </article>
  );
};

export default CartItem;