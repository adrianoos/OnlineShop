import React from 'react';
import { Grid } from '@material-ui/core';
import Product from './Product/Product'

const products = [
    {id: 1, name: 'Shoes', description: 'Running shoes', price: '79 USD', image: 'https://50style.pl/media/cache/gallery/rc/ywdwd5sd/adidas-strutter-damskie-buty-lifestyle-bialy-fy8613.jpg'},
    {id: 1, name: 'Macbook', description: 'Apple macbook', price: '119 USD', image: 'https://stat-m1.ms-online.pl/media/cache/gallery/rc/ewec5vwq/images/10/1055917/3815c75987aeac53c28dddca4bef4a70.jpg'}
]

const Products = () =>{
    return (
        <main>
    <Grid container justify="center" spacing={4}>
      { products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Product product={product}/>
          </Grid>
      ))}
    </Grid>
</main>
    )

}

export default Products;