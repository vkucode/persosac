import React from 'react'
import { Link } from 'react-router-dom'
import classes from '../assets/css/accueil.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'animate.css'
import sacBlancAvecPoignet from '../assets/img/Sac_Plate.png'
import sacBrunBoutique from '../assets/img/Sac_Rorsade.png'
import sacSOS from '../assets/img/Sac_SOS.png'
import redEllipse from '../assets/img/elipse.png'
import blueEllipse from '../assets/img/blueEllipse.svg'
import compositionAccueil from '../assets/img/sacComposition.png'



const Accueil = () => {



  const TopVenteProduct = ({imageProduct, prix, titleProduct, typePoignee, dimensions, tag1, tag2, tag3}) => {
    return (
      <div className={`${classes.productCard}`}>
        <div className={`${classes.productTopPart}`}>
          <img src={imageProduct} alt="" className={`${classes.productImage}`} />
          <div>
           <img src={blueEllipse} alt="" className={`${classes.blueEllipse} blueEllipse`} />
          </div>
          <div className={`${classes.productPrix}`}>
            <div className='d-flex flex-row'><h1>0</h1>
              <div className='d-flex flex-column'>
                <span>.{prix}€</span>
                <p>&nbsp;ht unite</p>
              </div>
            </div>
          </div>
        </div>
        <div className={`${classes.productDetails}`}>
          <h1>{titleProduct}</h1>
          <p>{typePoignee}</p>
          <h4>{dimensions}</h4>
          <div className={`${classes.productTags}`}>
            <span>{tag1}</span>
            <span>{tag2}</span>
            <span>{tag3}</span>
          </div>
        </div>
        <div className={`${classes.productButton}`}>
          <Link to="/boutique">Ajouter au panier</Link>
        </div>
      </div>
    )
  }

  return (
    <>
    <section className={`${classes.heroSection}`}>
      <div className='container'>
        <div className={`${classes.carouselWrap}`}>
          <div className={`${classes.carouselElement}`}> 
            <div className={`${classes.carouselElementText} animate__animated animate__fadeInDown`}>
              <h1>Personalisez</h1>
              <h2>Votre&nbsp;<span>Sac</span><img src={redEllipse} className='animate__animated animate__delay-1s animate__bounceIn' alt=""/></h2>
            </div>
            <div className={`${classes.carouselElementImage} animate__animated animate__fadeInUp`}>
              <img src={compositionAccueil} alt="" width={"100%"} />
            </div>
          </div>
        </div>
        </div>
      </section>
      <section className={`${classes.topVenteSection} mt-5 mb-5`}>
        <div className={`${classes.TPHeaderText}`}>
          <h1>Top Vente<img src={redEllipse} alt="" width={"20px"} /></h1>
          <p>restauration</p>
        </div>
        {/* Products Section */}
        <div className='container'>
          <div className={`${classes.topVenteProduits}`}>
            <TopVenteProduct imageProduct={sacBrunBoutique} prix={19} titleProduct={"Sak Kraft brun"} typePoignee={"Poignees torsades"} dimensions={"22 x 10 x 30cm"} tag1={"livraison"} tag2={"personalisable"} tag3={"boutique"} ></TopVenteProduct>
            <TopVenteProduct imageProduct={sacSOS} prix={19} titleProduct={"Sak Kraft brun"} typePoignee={"Sans Poignees"} dimensions={"20 x 16 x 40cm"} tag1={"livraison"} tag2={"personalisable"} tag3={"restauration"} ></TopVenteProduct>
            <TopVenteProduct imageProduct={sacBlancAvecPoignet} prix={19} titleProduct={"Sak Kraft blanc"} typePoignee={"Poignees plates"} dimensions={"26 x 14 x 30cm"} tag1={"livraison"} tag2={"personalisable"} tag3={"restauration"} ></TopVenteProduct>
          </div>
        </div>

      </section>  

    </>
  )
}

export default Accueil