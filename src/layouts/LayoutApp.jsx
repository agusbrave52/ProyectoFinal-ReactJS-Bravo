import NavBar from '../components/NavBar/NavBar';

const LayoutApp = ({ children }) => {
  return (
    <>
      <NavBar />
      <main style={{ marginTop: '70px', padding: '20px' }}>
        {children}
      </main>
    </>
  );
};

export default LayoutApp;