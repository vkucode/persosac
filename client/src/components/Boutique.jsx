import React from 'react'
import classes from '../assets/css/boutique.module.css'
import Cart from './cart/Cart';
import ProductItem from './cart/ProductItem';
import 'bootstrap/dist/css/bootstrap.min.css'

const Boutique = () => {

  return (
    <>
        <div className={`${classes.mainContainerBoutique} container-fluid`}>
          <div className={`${classes.ContainerWrapItems} container`}>
            <h1>Boutique</h1>
            <hr />
            <ProductItem />
            </div>
          <Cart />
        </div>
    
    </>
  )
}

export default Boutique