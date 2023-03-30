
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Product from './pages/Product';
import Catalog from './pages/Catalog';
import News from './pages/News';
import Cart from './pages/Cart';
import CheckOut from './pages/CheckOut'
import NewView from './components/NewView';
import CartProvider from './store/CartProvider';
function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Header></Header>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/catalog/:slug' element={<Product></Product>}></Route>
          <Route path='/catalog' element={<Catalog></Catalog>}></Route>
          <Route path='/cart' element={<Cart></Cart>}></Route>
          <Route path='/news' element={<News></News>}></Route>
          <Route path='/news/:article' element={<NewView></NewView>}></Route>
          <Route path='/checkout' element={<CheckOut></CheckOut>}></Route>
        </Routes>
        <Footer></Footer>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
