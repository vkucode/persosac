import React from 'react'
import { Link } from 'react-router-dom'
import classes from '../assets/css/accueil.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import ImgPersoSac from '../assets/img/LogoPersosacPoignetBlanc.png'
import 'animate.css'
import redBlob from '../assets/img/Stars.png'
import sacBrun from '../assets/img/Sac_SosBrun_Logo.png'
import sacBlancAvecPoignet from '../assets/img/Sac_PoignetBlanc_logo.png'
import sacBrunAvecPoignet from '../assets/img/Sac_PoignetBrun_logo.png'
import sacComposition from '../assets/img/sacComposition.png'
const Accueil = () => {
  return (
    <>
    <section>
        <div className={`${classes.mainContainerAccueil} container-fluid`}>
          <div className={`${classes.mainContainerOverlay}`}></div>
          <div className={`${classes.mainContainerContent} container`}>
            <div className='row'>
              <div className={`${classes.LogoMainPage} col-12`}  >
                <img src={ImgPersoSac} alt="" className='animate__animated animate__fadeInUp'/>
              </div>
              <div className={`${classes.heroSacsContainer}`}>
                <div>
                  <img src={redBlob} alt="" className={`${classes.redBlobAnim}`} width={"100px"} />
                </div>
                <div className={`${classes.SacsContainer}`}>
                  <img src={sacComposition} alt="" className='animate__animated animate__zoomIn' />
                </div>
              </div>
            </div>
          
          </div>
        </div>
      </section>
      <section>
          <div className='container'>
            <div className='row'>
              <div className={`${classes.boutiqueTittle} col-12`}>
                <h1>sacs&nbsp;papier</h1>
                <span>a&nbsp;votre&nbsp;image</span>
              </div>
              <div className={`${classes.boutiqueProducts} mt-5`}>
                <div className={`${classes.productCard}`}>
                  <img src={sacBlancAvecPoignet} alt="" />
                  <h1>Sacs</h1>
                  <p>poignees&nbsp;plates</p>
                  <Link to="/boutique">en&nbsp;savoir&nbsp;plus</Link>
                </div>
                <div className={`${classes.productCard}`}>
                  <img src={sacBrun} alt="" />
                  <h1>Sacs</h1>
                  <p>sans&nbsp;poigne</p>
                  <Link to="/boutique">en&nbsp;savoir&nbsp;plus</Link>
                </div>
                <div className={`${classes.productCard}`}>
                  <img src={sacBrunAvecPoignet} alt="" />
                  <h1>Sacs</h1>
                  <p>poignees&nbsp;torsade</p>
                  <Link to="/boutique">en&nbsp;savoir&nbsp;plus</Link>
                </div>
              </div>
            </div>
          </div>
      </section>
    </>
  )
}

export default Accueil