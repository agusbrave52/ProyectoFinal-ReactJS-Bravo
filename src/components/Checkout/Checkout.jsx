import { useState, useContext } from 'react';
import { CartContext } from '../../context/cartContext.js';
import { createOrderWithStockUpdate } from '../../services/firestore.js';
import { toast } from 'react-toastify';
import CheckoutForm from '../CheckoutForm/CheckoutForm.jsx';
import { Link } from 'react-router';
import './Checkout.css';

const Checkout = () => {
  const [dataForm, setDataForm] = useState({ fullname: '', phone: '', email: '' });
  const [orderId, setOrderId] = useState(null);
  const { cart, totalPrice, deleteCart } = useContext(CartContext);

  const handleChangeInput = (event) => {
    setDataForm({ ...dataForm, [event.target.name]: event.target.value });
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();

    const order = {
      buyer: { ...dataForm },
      products: [...cart],
      total: totalPrice(),
    };

    try {
      const newOrderId = await createOrderWithStockUpdate(order, cart);
      setOrderId(newOrderId);
      deleteCart();
      toast.success('¡Orden generada correctamente!');
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Renderizado condicional: orden confirmada
  if (orderId !== null) {
    return (
      <div className="checkout-success">
        <h2>¡Compra confirmada!</h2>
        <p>Guardá el número de tu orden: <strong>{orderId}</strong></p>
        <Link to="/">Volver al inicio</Link>
      </div>
    );
  }

  // Renderizado condicional: nada para comprar
  if (cart.length === 0) {
    return (
      <div className="checkout-empty">
        <h2>No hay productos para comprar</h2>
        <Link to="/">Volver al inicio</Link>
      </div>
    );
  }

  return (
    <div className="checkout">
      <h1>Checkout</h1>
      <CheckoutForm
        dataForm={dataForm}
        handleChangeInput={handleChangeInput}
        handleSubmitForm={handleSubmitForm}
      />
    </div>
  );
};

export default Checkout;