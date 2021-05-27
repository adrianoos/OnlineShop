
import React, { useState, useEffect } from 'react';
import Products from './components/Products/Products'
import NavBar from './components/NavBar/NavBar'
import Cart from './components/Cart/Cart'
import Checkout from './components/CheckoutForm/Checkout/Checkout'
import { commerce } from './lib/commerce'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  const [ products, setProducts ] = useState([])
  const [ cart, setCart ] = useState({})
  const [ order, setOrder] = useState({})
  const [ errorMessage, setErrorMessage ] = useState('')

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

  const refreshCart = async () => {
  const newCart = await commerce.cart.refresh()
  setCart(newCart)
  }

  const handleCaptureCheckOut = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder)
      setOrder(incomingOrder)
      refreshCart()
    } catch (error) {
      setErrorMessage(error.data.error.message)
    }
  };

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
        <Route exact path='/OnlineShop'>
          <Products products={products} onAddtoCart={handleAddToCart} /> 
        </Route>
        <Route exact path='/Cart'>
          <Cart cart={cart}
           handleUpdateCartQty={handleUpdateCartQty}
           handleRemoveFromCart={handleRemoveFromCart}
           handleEmptyCart={handleEmptyCart}
          />
        </Route>
        <Route exact path='/checkout'>
        <Checkout
        cart={cart}
        order={order}
        onCaptureCheckOut={handleCaptureCheckOut}
        error={errorMessage}
        />
        </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
