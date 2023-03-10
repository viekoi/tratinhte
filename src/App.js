
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Product from './pages/Product';
import Catalog from './pages/Catalog';
import Cart from './pages/Cart';
import CartProvider from './store/CartProvider';
import Order from './pages/Order';
function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Header></Header>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/catalog/:slug' element={<Product></Product>}></Route>
          <Route path='/catalog' element={<Catalog></Catalog>}></Route>
          <Route path='/Cart' element={<Cart></Cart>}></Route>
          <Route path='/order/' element={<Order></Order>}></Route>
        </Routes>
        <Footer></Footer>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
