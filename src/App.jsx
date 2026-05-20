import './App.css';
import LayoutApp from './layouts/LayoutApp';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div>
      <LayoutApp>
        <HomePage />
      </LayoutApp>
    </div>
  );
}

export default App;