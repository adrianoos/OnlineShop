import React from 'react'
import { AppBar, Toolbar, IconButton, Badge, Typography } from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons'
import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/logo.png'
import useStyles from './styles'

const NavBar = ({ totalItems}) => {
    const classes = useStyles()
    const location = useLocation()
    return (
        <div>
            <AppBar position='fixed' className={classes.appBar} color='inherit'>
                <Toolbar>
                    <Typography component={Link} to='/OnlineShop' variant='h6' className={classes.title} color="inherit">
                        <img src={logo} alt='Commerce.js' height='25px' className={classes.image}/>
                        Gaming Shop
                    </Typography>
                    <div className={classes.grow}/>
                    { location.pathname === '/OnlineShop' && (
                        <div className={classes.button}>
                        <IconButton component={Link} to='/Cart' aria-label='Show Cart Items' color='inherit'>
                            <Badge badgeContent={totalItems} color='secondary'>
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </div>
                    ) 
                }        
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar;