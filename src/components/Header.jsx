import React from 'react'
import ReactDOM from "react-dom" 
import classes from './Header.module.css'
import { Link, useLocation } from 'react-router-dom'
import { useRef, useEffect } from 'react'




const logo_image = require('../assets/img/logo.jpg')


const mainNav = [
  {
    display: "Trang chủ",
    path: "/"
  },
  {
    display: "Sản phẩm",
    path: "/catalog"
  },
  {
    display: "không gian quán",
    path: "/store"
  },
  {
    display: "Về Chúng tôi",
    path: "/aboutUs"
  },

]

const Header = () => {

  const portalElement = document.getElementById('overlays');
  const { pathname } = useLocation()
  const activeNav = mainNav.findIndex(e => e.path === pathname)
  const headerRef = useRef(null)
  //   
  const navRef = useRef(null)
  const mobileNavRef = useRef(null)
  const navToggle = () => navRef.current.classList.toggle('active')
  const mobileNavToggle = () =>{
    mobileNavRef.current.classList.toggle('active')
  }

 





  useEffect(()=>{
    window.addEventListener("scroll", () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
          headerRef.current.classList.add(`shrink`)
      } else {
          headerRef.current.classList.remove(`shrink`)
      }
  })
  return()=>{
    window.removeEventListener("scroll",() => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
          headerRef.current.classList.add(`shrink`)
      } else {
          headerRef.current.classList.remove(`shrink`)
      }
  })
  }
  },[])

  return (
      <div className={classes.header} ref={headerRef}>
        <div className="grid wide">
          <div className="row">
            <div className={`${classes.logo} col l-3 m-3 `}>
              <Link to='/'>
                <img src={logo_image} alt="" />
              </Link>
            </div>
            <div className={classes.mobile}>
              <div className={classes[`mobile-nav-button`]}>
                <a type="button"><span><i className="fa-solid fa-cart-shopping"></i></span></a>
                <a onClick={mobileNavToggle} type="button"><span><i className="fa-solid fa-bars"></i></span></a>
              </div>
            </div>
            <div className={`${classes[`nav`]} col l-9 m-9 `} ref={navRef}>
              {
                mainNav.map((item, index) => (
                  <div
                    key={index}
                    // className={`header__menu__item header__menu__left__item ${index === activeNav ? 'active' : ''}`}
                    className={`${classes[`lv-0`]} ${index === activeNav ? 'active' : ''}`}
                    onClick={navToggle}
                  >
                    <Link to={item.path}>
                      <span>{item.display}</span>
                    </Link>
                  </div>
                ))
              }
              <div className={`${classes[`nav-button`]}`} >
                <a type="button"><span><i className="fa-solid fa-user"></i></span></a>
                <a type="button"><span><i className="fa-solid fa-cart-shopping"></i></span></a>
                
                {/* cart here */}
              </div>

            </div>
          </div>
        </div>
        {ReactDOM.createPortal(<div className={classes[`mobile-nav`]} ref={mobileNavRef}>
        <div className="">
        {mainNav.map((item, index)=> (
          <div
            key={index}
            // className={`header__menu__item header__menu__left__item ${index === activeNav ? 'active' : ''}`}
            className={`${classes[`lv-0`]} ${index === activeNav ? 'active' : ''}`}
            onClick={navToggle}
          >
            <Link to={item.path}>
              <span>{item.display}</span>
            </Link>
          </div>
          ))}
           <div className={`${classes['lv-0']} ${classes.close}`} >
            <a onClick={mobileNavToggle} type="button"><i className="fa-regular fa-circle-xmark"></i></a>
          </div>
        </div>
       
         
      </div>,portalElement)}
      </div>
      
  )
}

export default Header
