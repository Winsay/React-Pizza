import './App.scss';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Main from './pages/Main';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import PizzaPage from './components/PizzaPage/PizzaPage';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/pizza/:pizzaId" element={<PizzaPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
