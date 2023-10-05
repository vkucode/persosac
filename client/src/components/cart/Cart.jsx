import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import classes from './cart.module.css'
import lottie from 'lottie-web'
import { defineElement } from 'lord-icon-element';
import { AiOutlineClose} from 'react-icons/ai'
import {FiChevronsRight} from 'react-icons/fi'
import { useCartContext } from '../../ctx/cartContext'

const Cart = () => {
    defineElement(lottie.loadAnimation);
    const pkstridiw = 'pk_test_51Np7ODGz9y9US4CrIT0z5CZyCOZD38caiLHuBWuQDa5jQljiu6jmTqjysjOyqCFB2Ycsjeh4oA7FJUPxQdKEldBx00qPryLGBw';
    const { products, toggleCart, isOpen, removeProduct } = useCartContext()
    const stripePromise = loadStripe(pkstridiw);



    const handleCheckout = async () => {

        const lineItems = products.map((item) => {
            return {
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: item.name
                    },
                    unit_amount: item.price * 100 // because stripe interprets price in cents
                },
                quantity: item.quantity
            }
        })

    const productDetails = products.map(item => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity
        }));

        const { data } = await axios.post('https://diwa-drink.fr/checkout', { lineItems, productDetails });

        const stripe = await stripePromise;
        await stripe.redirectToCheckout({ sessionId: data.id });
    }

    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <div className={classes.cartIcon} onClick={toggleCart}>
                
                <lord-icon src="https://cdn.lordicon.com/ggihhudh.json"
                        trigger="hover"
                        colors="primary:#121331,secondary:#e8308c,tertiary:#4030e8"
                        >
                </lord-icon>
                    <span className={classes.cartNumber}>
                        {products?.length}
                    </span>
                </div>
                {isOpen &&
                    <div className={classes.cartContainer}>
                        {products?.length > 0 ? (
                            <>
                                <p className={classes.CardTitle}>Produits</p>
                                <div className={classes.productContainer}>
                                    {products.map((product) => (
                                        <div className={classes.product} key={product.id}>
                                            
                                            <div className={classes.productDetails}>
                                                <img src={product.img} alt="" />
                                                <div className={classes.textProduct}>
                                                <h4>{product.name}</h4>
                                                <span>{product.quantity} x €{product.price}</span>
                                                </div>
                                                
                                            </div>
                                            <AiOutlineClose className={classes.closeProductDetails} onClick={() => removeProduct(product)} />
                                        </div>
                                    ))}
                                </div>
                                <div className={classes.controls}>
                                    <span onClick={toggleCart}>Fermer</span>
                                    <button onClick={handleCheckout}>Régler&nbsp;<FiChevronsRight></FiChevronsRight></button>
                                </div>
                            </>
                        ) : (
                            <>
                            <div className={classes.emptyCart}>
                            <lord-icon  src="https://cdn.lordicon.com/dxeczimy.json"
                            trigger="loop"
                            delay="0"
                            style={{width: '70px', height: '70px'}}
                            colors="primary:#e8308c,secondary:#4030e8" >
                            </lord-icon>
                            <h5>Rien pour l'instant</h5>
                            </div>
                            </>
                            
                        )}
                    </div>
                }
            </div>
        </div>
    )
}

export default Cart