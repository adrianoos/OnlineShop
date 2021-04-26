import React from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core'
import useStyles from './styles'
import CartItem from './CartItem/CartItem'
import { Link } from 'react-router-dom'

const Cart = ({ cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart }) => {

    const classes = useStyles()
    if ( !cart.hasOwnProperty('line_items') ) {
        return <div>
            Loading...
        </div>
    }

    const renderEmptyCart = () => (
        <Typography variant="subtitle1">You have no items in your shopping cart,
          <Link className={classes.link} to="/">start adding some</Link>!
        </Typography>
      );

    const renderCart = () => (
        <>
        <Grid container spacing={3}>
        { cart.line_items.map((item) => (
            <Grid item xs={12} sm={4} key={item.id}>
            <CartItem item={item} handleUpdateCartQty={handleUpdateCartQty} handleRemoveFromCart={handleRemoveFromCart}/>
            </Grid>

        ))}
        </Grid>
        <div className={classes.cardDetails}>
            <Typography variant='h4'>
                Subtotal: { cart.subtotal.formatted_with_symbol}
            </Typography>
            <div>
                <Button className={classes.emptyButton} size='large' type='button' variant='contained' color='secondary' onClick={handleEmptyCart}>Empty Cart</Button>
                <Button className={classes.checkOutButton} size='large' type='button' variant='contained' color='primary'>Checkout</Button>
            </div>
        </div>
        </>
    );

    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant='h3' gutterBottom>Your ShoppingCart</Typography>
            { !cart.line_items.length ? renderEmptyCart() : renderCart() }
        </Container>
    )
}

export default Cart
