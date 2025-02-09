import Home from './Home.jsx';
import ProductPage from './productPage.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cart from './shoppingCart.jsx';

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Define Routes */}
          <Route path="/serenShop/" element={<Home />} />
          <Route path="/serenShop/shop" element={<ProductPage />} />
          <Route path="/serenShop/cart" element={<Cart />} />
        </Routes>
      </Router>
    </>
  );
}

export default App
