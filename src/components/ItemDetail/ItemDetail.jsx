import { useContext } from 'react';
import ItemCount from '../ItemCount/ItemCount.jsx';
import { CartContext } from '../../context/cartContext.js';
import { toast } from 'react-toastify';
import './ItemDetail.css';
import { Link } from 'react-router';

const ItemDetail = ({ product }) => {
  const { addProductInCart, isInCart } = useContext(CartContext);

  const addToCart = (count) => {
    const newProduct = { ...product, quantity: count };
    addProductInCart(newProduct);
    toast.success('Producto agregado al carrito');
  };

  const productIsInCart = isInCart(product.id);

  return (
    <section className="item-detail">
      <div className="detail-image">
        <img src={product.image_url} alt={product.title} />
        <span className="detail-category">{product.category}</span>
      </div>

      <div className="detail-content">
        <span className="detail-eyebrow">Detalle del producto</span>
        <h2>{product.title}</h2>
        <p className="detail-description">{product.description}</p>

        <div className="detail-meta">
          <div>
            <span className="detail-label">Precio</span>
            <strong>$ {product.price}</strong>
          </div>
          <div>
            <span className="detail-label">Talles disponibles</span>
            <p>{product.sizes.map((size) => size).join(", ")}</p>
          </div>
        </div>

        {/* Renderizado condicional: sin stock / ya está en el carrito / elegir cantidad */}
        {product.stock < 1 ? (
          <p className="detail-feedback">Producto sin stock</p>
        ) : productIsInCart ? (
          <Link to="/cart" className="detail-feedback-link">
            Ya está en tu carrito — ir a comprar
          </Link>
        ) : (
          <ItemCount stock={product.stock} addToCart={addToCart} />
        )}
      </div>
      <div>
        <Link to={'/'}>Volver al inicio</Link>
      </div>
    </section>
  );
};

export default ItemDetail;