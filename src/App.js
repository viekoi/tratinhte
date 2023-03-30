
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

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-2_m5RPB1v1gR9TwWPM7KJz6sEZ7ZIBA",
  authDomain: "heicha-97b11.firebaseapp.com",
  projectId: "heicha-97b11",
  storageBucket: "heicha-97b11.appspot.com",
  messagingSenderId: "494495855865",
  appId: "1:494495855865:web:aa243f308c114a2bac9e28",
  measurementId: "G-S16PHPCWWQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

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
