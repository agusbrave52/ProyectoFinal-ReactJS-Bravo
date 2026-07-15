import './CheckoutForm.css';

const CheckoutForm = ({ dataForm, handleChangeInput, handleSubmitForm }) => {
  return (
    <form onSubmit={handleSubmitForm} className="checkout-form">
      <input
        className="checkout-input"
        type="text"
        name="fullname"
        value={dataForm.fullname}
        onChange={handleChangeInput}
        placeholder="Nombre completo"
        required
      />
      <input
        className="checkout-input"
        type="tel"
        name="phone"
        value={dataForm.phone}
        onChange={handleChangeInput}
        placeholder="Teléfono"
        required
      />
      <input
        className="checkout-input"
        type="email"
        name="email"
        value={dataForm.email}
        onChange={handleChangeInput}
        placeholder="Email"
        required
      />

      <button type="submit" className="checkout-submit">
        Confirmar compra
      </button>
    </form>
  );
};

export default CheckoutForm;