import React, { useEffect, useRef } from 'react';
import '../../assets/css/navbar.css';
import { Link } from 'react-router-dom'
import gsap from 'gsap';
import { Power2 } from 'gsap';
import ImgPersoconept from '../../assets/img/partners/PersoConcept_Logo.svg';
import logoVkuCode from '../../assets/img/partners/VKUlogoNOBG.svg'

const Navbar = () => {
  const dateRef = useRef(null);
  const menuToggleRef = useRef(null);
  const menuBar = gsap.timeline({ paused: true });
  const tl = gsap.timeline({ paused: true });
  function closeMenu() {
    if (!tl.reversed()) {
      menuBar.reversed(true);
      tl.reversed(true);
    }
  }
  useEffect(() => {
    if (dateRef.current) {
      dateRef.current.innerHTML = new Date().getFullYear();
    }

   

    menuBar.to(".bar-1", 0.5, {
      attr: { d: "M8,2 L2,8" },
      x: 1,
      ease: Power2.easeInOut,
    }, "start");

    menuBar.to(".bar-2", 0.5, {
      autoAlpha: 0,
    }, "start");

    menuBar.to(".bar-3", 0.5, {
      attr: { d: "M8,8 L2,2" },
      x: 1,
      ease: Power2.easeInOut,
    }, "start");

    menuBar.reverse();

    

    tl.to(".fullpage-menu", {
      duration: 0,
      display: "block",
      ease: "Expo.easeInOut",
    });

    tl.from(".menu-bg span", {
      duration: 1,
      x: "100%",
      stagger: 0.1,
      ease: "Expo.easeInOut",
    });

    tl.from(".main-menu li a", {
      duration: 1.5,
      y: "100%",
      stagger: 0.2,
      ease: "Expo.easeInOut",
    }, "-=0.5");

    tl.from(".social-links li", {
      duration: 1,
      y: "-100%",
      opacity: 0,
      stagger: 0.1,
      ease: "Expo.easeInOut",
    }, "-=0.5");

    tl.reverse();

    const handleClick = () => {
      if (!tl.reversed()) {
          menuBar.reversed(true);
          tl.reversed(true);
      } else {
          menuBar.reversed(!menuBar.reversed());
          tl.reversed(!tl.reversed());
      }
  };


    if (menuToggleRef.current) {
      menuToggleRef.current.addEventListener("click", handleClick);
  }

 const returnRemove = () =>{
    if (menuToggleRef.current) {
      menuToggleRef.current.removeEventListener("click", handleClick);
    }
  }

    // Cleanup la unmount
    return () => {
      returnRemove();
    };
}, []);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      <header>
        <div className="header-row">
          <div className="brand-logo">
            <Link onClick={closeMenu} to="/accueil"><img src={ImgPersoconept} alt="" /></Link>
          </div>
          <button className="menu-toggle" id="menuToggle" ref={menuToggleRef}>
            <svg viewBox="0 0 12 10" className="hamburger" height="40px" width="40px">
              <path d="M10,2 L2,2" className="bar-1"></path>
              <path d="M2,5 L10,5" className="bar-2"></path>
              <path d="M10,8 L2,8" className="bar-3"></path>
            </svg>
          </button>
        </div>
      </header>

      <section className="fullpage-menu">
        <div className="fullpage-menu-inner">
          <div className="menu-bg">
            <span></span>
          </div>

          <nav>
            <ul className="main-menu">
              <li><Link onClick={closeMenu} to="/accueil">Accueil</Link></li>
              <li><Link onClick={closeMenu} to="/info">Info</Link></li>
              <li><Link onClick={closeMenu} to="/boutique">Boutique</Link></li>
              <li><Link onClick={closeMenu} to="/legales">Legales</Link></li>
              <li><Link onClick={closeMenu} to="/contact">Contact</Link></li>
            </ul>
          </nav>

          <div className="header-nav-footer">
            <ul className="social-links">
              <li><a href="#">&nbsp;</a></li>
              <li><a href="https://www.facebook.com/profile.php?id=100086298938654"><i className="fa-brands fa-square-facebook"></i></a></li>
              <li><a href="https://www.instagram.com/diwadrink/"><i className="fa-brands fa-instagram"></i></a></li>
              <li className="copyrightPart">
                &copy;<span id="date" ref={dateRef}></span>&nbsp;Diwa-drink&nbsp;Designed&nbsp;by&nbsp;<a href="https://www.persoconcept.fr/"><img src={ImgPersoconept} alt="" width="30px" /></a>&nbsp;|&nbsp;Powered&nbsp;by&nbsp;<a href="https://vkucode.com/"><img src={logoVkuCode} alt="" width="25px" /></a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export default Navbar;
