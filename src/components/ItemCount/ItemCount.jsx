import { useState } from "react";
import "./ItemCount.css";

const ItemCount = ({ stock, addToCart }) => {
  // count representa la cantidad que el usuario quiere agregar
  const [count, setCount] = useState(1);

  const handleClickDecrease = () => {
    // Evita bajar de 1 para que no haya cantidades invalidas
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleClickIncrease = () => {
    // Evita superar el stock disponible
    if (count < stock) {
      setCount(count + 1);
    }
  };

  return (
    <div className="item-count">
      <div className="item-count-controls">
        <button type="button" onClick={handleClickDecrease}>
          -
        </button>
        <p>Cantidad: {count}</p>
        <button type="button" onClick={handleClickIncrease}>
          +
        </button>
      </div>
      <button
        type="button"
        className="item-count-button"
        // Devuelve la cantidad elegida al componente padre
        onClick={() => addToCart(count)}
      >
        Agregar al carrito
      </button>
    </div>
  );
};

export default ItemCount;
