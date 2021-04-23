
import React, { useState, useEffect } from 'react';
import './App.css';
import Products from './components/Products/Products'
import NavBar from './components/NavBar/NavBar'
import Cart from './components/Cart/Cart'
import { commerce } from './lib/commerce'

function App() {
  const [ products, setProducts ] = useState([])
  const [ cart, setCart ] = useState({})

 const fetchProducts = async () => {
 const { data } = await commerce.products.list()
 setProducts(data)
  }

  const fetchCart = async () => {
    const cart = await commerce.cart.retrieve()
    setCart(cart)
  }

  const handleAddToCart = async (productId, quantity) =>{
    const item = await commerce.cart.add(productId, quantity)
    setCart(item.cart)
  }


  useEffect(() => {
  fetchProducts()
  fetchCart()
  }
  , [])


  return (
    <div className="App">
      <NavBar totalItems={cart.total_items}/>
     {/* <Products 
      products={products}
      onAddtoCart={handleAddToCart} 
      /> */}
    <Cart cart={cart}/>
    </div>
  );
}

export default App;
