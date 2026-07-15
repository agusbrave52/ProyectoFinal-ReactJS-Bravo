import { Link } from 'react-router';

const ErrorPage = () => {
  return (
    <div className="error-page">
      <h1>404</h1>
      <p>La página que buscás no existe.</p>
      <Link to="/">Volver al inicio</Link>
    </div>
  );
};

export default ErrorPage;