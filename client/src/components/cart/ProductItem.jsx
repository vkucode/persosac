import React, { useState, useRef, useEffect } from 'react';
import { useCartContext } from '../../ctx/cartContext';
import classes from './product.module.css';
import { products } from '../../data/data';
import 'bootstrap/dist/css/bootstrap.min.css';
import lineRightImg from '../../assets/img/Bande_rouge_avec_poignet.png'
import 'animate.css'
import imgMyLogoImg from '../../assets/img/Logo.png'
import lottie from 'lottie-web'
import { defineElement } from 'lord-icon-element';

const Products = () => {
    const { addProduct } = useCartContext();
    defineElement(lottie.loadAnimation);
    const [product] = useState(products[0]); // presupunem că vrem primul produs
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    // Referința pentru input-ul de tip file
    const fileInputRef = useRef();

    // Starea pentru a stoca URL-ul imaginii încărcate de utilizator
    const [userLogo, setUserLogo] = useState(null);
    const [animate, setAnimate] = useState(false);
    const [iconTrigger, setIconTrigger] = useState('');
    const [activeDimensionIndex, setActiveDimensionIndex] = useState(0);
    const [isUserInteractionAllowed, setIsUserInteractionAllowed] = useState(true);
    // Funcția care gestionează încărcarea și previzualizarea logotipului
    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.type.includes('image')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUserLogo(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            alert("Veuillez télécharger un fichier image.");
        }
    };

    // Funcția care este apelată atunci când butonul este apăsat
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const changeImageColor = (index) => {
        if (isUserInteractionAllowed) {
            setCurrentImageIndex(index);
            setAnimate(true);
            setIsUserInteractionAllowed(false);
        }
    };

    
    const changeDimensionProduct = (index) => {
        if (isUserInteractionAllowed) {
            setActiveDimensionIndex(index); // Setează indexul butonului apăsat ca activ
        }
    };
        const handleAddProduct = () => {
        addProduct(product);
        setIconTrigger('loop'); // Setează trigger-ul la 'click' când butonul este apăsat
    };

    useEffect(() => {
        if (iconTrigger === 'loop') {
            // Resetează trigger-ul după 1 secundă
            const timer = setTimeout(() => {
                setIconTrigger('');
            }, 1300);

            // Curăță timer-ul la demontarea componentei sau la următoarea redare
            return () => clearTimeout(timer);
        }
    }, [iconTrigger]);
    
    useEffect(() => {
        if (animate) {
            const timer = setTimeout(() => {
                setAnimate(false);
                setIsUserInteractionAllowed(true);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [animate]);

    return (
        <section className={`${classes.containerProducts} container-fluid`}>
            <div className={`${classes.BackgroundS1}`}></div>
            <div className={`${classes.containerWrapper}`}>
            {products.map((product) => (
            <section className={`${classes.productContainer} container`} key={product.id}>
                <div className={`row`}> 
                    <div className={`${classes.textHDContainerProduct} col-12`}>
                        <h1>{product.category}</h1>
                        <div>
                        <img src={lineRightImg} alt="" className={`${classes.lineImg}`} />&nbsp;
                        <h3>{product.type}</h3>
                        </div>
                    </div>
                    <div className={`${classes.imgProducts} col-12 ${animate ? 'animate__animated animate__jello' : ''}`}>
                        <img src={product.img[currentImageIndex]} alt="" className={`${classes.productImgSac}`} />
                        <img src={userLogo || imgMyLogoImg} alt="" className={`${classes.myLogoOnProduct}`} />
                    </div>
                    <div className={`${classes.dimensionsContainer}`}>
                        <button className={`${classes.dimenionsBTN}`}>Dimensions</button>
                        <div className={`${classes.dimensionsDetails}`}>
                        {product.dimensions && product.dimensions.map((dimension, index) => (
                    <button 
                        key={index} 
                        onClick={() => changeDimensionProduct(index)}
                        className={activeDimensionIndex === index ? `${classes.active}` : ''}
                        disabled={!isUserInteractionAllowed}
                    >
                        <h3>{dimension.dimensionName}</h3>
                        <p>{dimension.dimensionsCM}</p>
                    </button>
                    ))}              
                    </div>
                </div>
                 <div className={`${classes.productDetails} col-12`}>
                    <button onClick={handleButtonClick}>Ajouter votre logo</button>
                            {/* Input-ul de tip file este ascuns și referința sa este stocată în fileInputRef */}
                            <input 
                                type="file" 
                                onChange={handleLogoUpload} 
                                ref={fileInputRef} 
                                style={{ display: 'none' }} 
                            />
                        <div className={`${classes.colorSwitchContainer}`}>
                                        {/* Iterăm prin culorile disponibile și creăm un buton pentru fiecare */}
                                        {product.colorSac.map((color, index) => (
                                            <button 
                                                key={index} 
                                                onClick={() => changeImageColor(index)} // La click, schimbăm imaginea
                                                className={currentImageIndex === index ? `animate__animated animate__jello ${classes.active}` : ''}
                                                disabled={!isUserInteractionAllowed}
                                            >
                                                {color}
                                            </button>
                                        ))}
                                    </div>
                        <div>
                            <button onClick={handleAddProduct}  className={`${classes.CommandBTN}`}>Ajouter&nbsp;
                             <lord-icon  src="https://cdn.lordicon.com/mecwbjnp.json"
                            trigger={iconTrigger}
                            delay="0"
                            style={{width: '40px', height: '40px'}}
                            colors="primary:#fff,secondary:#fff" >
                            </lord-icon></button>
                        </div>
                    </div>
                    
                    
                </div>
            </section>
            ))};
            </div>
            
        </section>
    );
}

export default Products;
