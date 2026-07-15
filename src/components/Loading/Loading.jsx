import { ClipLoader } from 'react-spinners';
import './Loading.css';

const Loading = ({ compact = false }) => {
  return (
    // compact sirve para reutilizar el loader en espacios chicos como el contador de productos
    <div className={`loading${compact ? ' loading-compact' : ''}`}>
      <ClipLoader color="#3d4699" size={compact ? 18 : 42} speedMultiplier={0.8} />
      <span>Cargando...</span>
    </div>
  );
};

export default Loading;
