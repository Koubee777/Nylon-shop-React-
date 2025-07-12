
import './App.css';
import { Provider } from './components/ui/provider';
import { BrowserRouter, Routes, Route } from 'react-router';
import { Main } from './components/all/main';
import Cart from './components/all/cart';
import { Header } from './components/all/header';
import { Catalog } from './components/all/catalog';
import ItemProducs from './components/all/productItem';
import { useEffect, useState } from 'react';
import AboutUs from './components/all/aboutUs';

import { Testdb } from './components/all/testdb';

const products = [
  { url: 'product1',
    id: 1,
    name: 'product1',
    title: 'Шапка ушанка Nixon',
    img: '/img/01.webp',
    desc: 'Утепленная шапка ушанка',
    price: 25000,
    oldPrice: 35000,
    category: 'Одежда',
    left: 45,
    countInCart: 0,
  },
  { url: 'product2',
    id: 2,
    name: 'product2',
    title: 'Перчатки Nixon',
    img: '/img/04.webp',
    desc: 'Утепленная шапка ушанка',
    price: 25000,
    oldPrice: 35000,
    category: 'Одежда',
    left: 18,
    countInCart: 0,
  },
  { url: 'product3',
    id: 3,
    name: 'product3',
    title: 'Ботинки Nixon',
    img: '/img/03.jpg',
    desc: 'Утепленная шапка ушанка',
    price: 25000,
    oldPrice: 35000,
    category: 'Одежда',
    left: 63,
    countInCart: 0,
  },
  { url: 'product4',
    id: 4,
    name: 'product4',
    title: 'Пуховик Nixon',
    img: '/img/02.jpg',
    desc: 'Утепленная шапка ушанка',
    price: 25000,
    oldPrice: 35000,
    category: 'Одежда',
    left: 28,
    countInCart: 0,
  },
];

function App() {
  
  const [cartProducts, setCartProducts] = useState([])


  return (
    <Provider>
      <BrowserRouter>
      <Header />
      <Testdb productsdb={products}/>
        <Routes>
          <Route path="/about" element={<AboutUs />} />
          <Route path="/" element={<Main />} />
          <Route path="/cart" element={<Cart setCartProducts={setCartProducts} cartProducts={cartProducts} />} />
          <Route path="/catalog" element={<Catalog products={products} setCartProducts={setCartProducts} cartProducts={cartProducts}/>} />
          <Route path="/catalog/:name" element={<ItemProducs products={products} setCartProducts={setCartProducts} cartProducts={cartProducts}/>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}


export default App;
