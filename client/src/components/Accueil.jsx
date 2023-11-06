import React from 'react'
import classes from '../assets/css/accueil.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import ImgPersoSac from '../assets/img/LogoPersosac.svg'
import 'animate.css'

const Accueil = () => {
  return (
    <>
        <div className={`${classes.mainContainerAccueil} container-fluid`}>
          <img src={ImgPersoSac} alt="" className={`${classes.LogoMainPage}`} />
        </div>
    </>
  )
}

export default Accueil