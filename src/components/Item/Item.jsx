import { useState } from "react";
import heroImage from "../../assets/hero.png";
import { Link } from "react-router";
import "./Item.css";

const Item = ({ product }) => {
  // Guarda la imagen actual de la tarjeta y usa un fallback si la original falla
  const [imageSrc, setImageSrc] = useState(product.image_url || heroImage);

  return (
    <article className="item-card">
      <div className="item-image">
        <img
          src={imageSrc}
          alt={product.title}
          // Si la imagen del producto no existe mostramos una imagen de respaldo
          onError={() => setImageSrc(heroImage)}
        />
        <span className="item-category">{product.category}</span>
      </div>
      <div className="item-details">
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <div className="item-info">
          <span>Talles: {product.sizes.map((size) => size).join(", ")}</span>
          <strong>${product.price}</strong>
        </div>
        {product.stock < 1 && (
          <span className="item-no-stock">Sin stock</span>
        )}

        <Link
          to={`/product/${product.id}`}
          className="item-button"
        >
          Ver producto
        </Link>
      </div>
    </article>
  );
};

export default Item;
