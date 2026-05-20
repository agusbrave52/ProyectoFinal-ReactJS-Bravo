import logo from '../../img/Hering.png';
import CartWidget from '../CartWidget/CartWidget';
import './NavBar.css';

const NavBar = () => {

  const categories = [
    { id: 1, label: 'Mujer' },
    { id: 2, label: 'Hombre' },
    { id: 3, label: 'Niños' },
  ];

  return (
    <nav className='navBar'>
      
      <h2 className='brand'><img src={logo} alt="Hering Logo" />Hering</h2>
      <ul className='categories'>
        {
          categories.map((category) => (
            <li key={category.id}>{category.label}</li>
          ))
        }
      </ul>
      <CartWidget />
    </nav>
  );
};

export default NavBar;