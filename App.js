
import React, { useState, useEffect } from 'react';
import './App.css';
import Products from './components/Products/Products'
import NavBar from './components/NavBar/NavBar'
import { commerce } from './lib/commerce'

function App() {
  const [ products, setProducts ] = useState([])

 const fetchProducts = async () => {
 const { data } = await commerce.products.list()
 setProducts(data)
  }

  useEffect(() => {
  fetchProducts()
  }
  , [])

  return (
    <div className="App">
      <NavBar />
  <Products products={products} />
  
    </div>
  );
}

export default App;
