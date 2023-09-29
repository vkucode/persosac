import React, { useState } from 'react';
import { useCartContext } from '../../ctx/cartContext';
import { products } from '../../data/data';
import classes from './product.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import lineRightImg from '../../assets/img/Bande_rouge_avec_poignet.png'
import SacPoignetBrun from '../../assets/img/Sac_PoignetBrun_logo.png'
import fondBleu from '../../assets/img/Fond_Bleu.png'
import SacPoignetBrunDouble from '../../assets/img/Sac_BrunDouble.png'
import sphereWhite from '../../assets/img/Rond_Blanc.png'

const Products = () => {
    const { addProduct } = useCartContext();
    const [hoveredCard, setHoveredCard] = useState(null);


    


    return (
        <section className={`${classes.containerProducts} container-fluid`}>
            <section className={`${classes.SacAvecPoignetSection} container-fluid`}>
                <div className={`${classes.BackgroundS1}`}></div>
                <div className={`row`}>
                    <div className={`${classes.productContainer} col-12`}>
                        <div className={`${classes.textHDContainerProduct}`}>
                            <h1>LE SAC</h1>
                            <div className={`d-flex flex-row justify-conten-center align-items-center`}>
                                <img src={lineRightImg} alt="" className={`${classes.lineImg}`} />&nbsp;<h3>avec poignet</h3>
                            </div>
                        </div>
                        <div className={`${classes.imgProducts}`}>
                            <img src={SacPoignetBrunDouble} alt="" />
                            <div className={`${classes.dimensionsContainer}`}>
                                <button className={`${classes.dimenionsBTN}`}>Dimmensions</button>
                                <div className={`${classes.dimensionsDetails}`}>
                                    <div>
                                        <h4>Standard</h4>
                                        <p>20-16-40 cm</p>
                                    </div>
                                    <hr />
                                    <div>
                                        <h4>Petit Model</h4>
                                        <p>10-11-34 cm</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`${classes.productDetails}`}>
                            <button>Ajouter votre logo</button>
                            <div className={`${classes.colorSwitchContainer}`}>
                                <div className={`${classes.spehereClick}`} >
                                    <img src={sphereWhite} alt="" />
                                </div>
                                <div className={`d-flex align-items-center`}>
                                    <h2 className={`${classes.frstColorText}`}>Brun</h2>
                                    <h2 className={`${classes.scndColorText}`}>Blanc</h2>
                                </div>
                            </div>
                            
                            <div>
                                <button className={`${classes.CommandBTN}`}>Je commande</button>
                            </div>
                        </div>  
                    </div>
                </div>
            </section>
        </section>
    );
}

export default Products;
