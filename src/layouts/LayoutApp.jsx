import NavBar from '../components/NavBar/NavBar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer/Footer';

const LayoutApp = () => {
  return (
    <>
      <NavBar />
      <main className="page-shell">
        {/* Outlet renderiza la pagina hija definida en router jsx */}
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default LayoutApp;
