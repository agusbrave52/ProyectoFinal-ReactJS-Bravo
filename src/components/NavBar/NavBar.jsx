import logo from '../../img/Hering.png';
import CartWidget from '../CartWidget/CartWidget';
import './NavBar.css';
import { Link } from 'react-router';


const NavBar = () => {
  // Este array solo alimenta las opciones visuales del menu
  const categories = [
  { id: 1, label: 'Mujer', path: 'mujer' },
  { id: 2, label: 'Hombre', path: 'hombre' },
  { id: 3, label: 'Niños', path: 'ninos' },
  { id: 4, label: 'Intima', path: 'intima' },
];

  return (
    <nav className='navBar'>
      <Link to="/" className="brandBlock">
        <h2 className='brand'>
          <img src={logo} alt="Hering Logo" />
          <span>Hering</span>
        </h2>
        <p className="brandTagline">Moda comoda con estilo actual</p>
      </Link>
      <ul className='categories'>
        {categories.map((category) => (
          <li key={category.id}>
            <Link to={`/category/${category.path}`}>
              <button type="button">{category.label}</button>
            </Link>
          </li>
        ))}
      </ul>
      <CartWidget />
    </nav>
  );
};

export default NavBar;
