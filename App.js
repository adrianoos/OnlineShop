
import React, { useState, useEffect } from 'react';
import './App.css';
import Products from './components/Products/Products'
import NavBar from './components/NavBar/NavBar'
import Cart from './components/Cart/Cart'
import { commerce } from './lib/commerce'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

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
    const { cart } = await commerce.cart.add(productId, quantity)
    setCart(cart)
  }

  const handleUpdateCartQty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity })
    setCart(cart)
  }

  const handleRemoveFromCart = async ( productId ) => {
    const { cart } = await commerce.cart.remove(productId)
    setCart(cart)
  }

  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty()
    setCart(cart)
  }

  useEffect(() => {
  fetchProducts()
  fetchCart()
  }
  , [])
 

  return (
    <Router>
    <div className="App">
      <NavBar totalItems={cart.total_items}/>
      <Switch>
        <Route exact path='/'>
          <Products products={products} onAddtoCart={handleAddToCart} /> 
        </Route>
        <Route exact path='/cart'>
          <Cart cart={cart}
           handleUpdateCartQty={handleUpdateCartQty}
           handleRemoveFromCart={handleRemoveFromCart}
           handleEmptyCart={handleEmptyCart}
          />
        </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
