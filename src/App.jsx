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
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </>
  );
}

export default App
