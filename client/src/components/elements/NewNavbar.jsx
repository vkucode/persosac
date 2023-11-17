import React from 'react'
import 'animate.css'
import styles from '../../assets/css/newnavbar.module.css'
import { motion } from "framer-motion";
import ImgPersosac from '../../assets/img/LogoPersosacPoignetBlanc.svg';
import 'bootstrap/dist/css/bootstrap.css'
import { CiSearch, CiUser } from "react-icons/ci";
import { IoBagHandleOutline } from "react-icons/io5";

const NewNavbar = () => {

    const NavLink = ({ children }) => {
        return (
          <a href="#" rel="nofollow" className={`${styles.navLink}`}>
            <motion.div
              whileHover={{ y: -20 }}
              transition={{ ease: "backInOut", duration: 0.5 }}
              style={{height:"20px"}}
            >
              <span className="d-flex align-items-center" style={{height:"20px"}}>{children}</span>
              <span className="d-flex align-items-center" style={{height:"20px"}}>
                {children}
              </span>
            </motion.div>
          </a>
        );
      };
      
  return (
    <nav className={`${styles.navbarMain}`}>
        <div className='container'>
            <div className='row d-flex flex-row justify-content-center align-items-center'>
                <div className='col-4'>
                    <div className={`${styles.leftLinks}`}>
                        <NavLink>Boutique</NavLink>
                        <NavLink>Perso</NavLink>
                        <NavLink>Devis</NavLink>
                    </div>
                </div>
                <div className='col-4'>
                    <div className={`${styles.imgContainer}`}>
                        <img src={ImgPersosac} alt="" width={"100px"} />
                    </div>
                </div>
                <div className='col-4'>
                    <div className={`${styles.rightLinks}`}>
                      <div>
                        <button><CiSearch/></button>
                        <input type="text" placeholder='Chercher un produit' name='search' id='searchProduct' />
                      </div>
                      <div>
                        <button><CiUser/></button>
                        
                      </div>  
                      <div>
                        <button><IoBagHandleOutline/></button>

                      </div>
                    </div>
                </div>

            </div>
        </div>
    </nav>
    
  )
}

export default NewNavbar