import React from 'react'
import classes from './Footer.module.css'
const Footer = () => {
  return (
    <div className={classes.footer}>
      <div className="grid wide">
        <div className="row">
          
          <div className="col l-6 ">
            <div className={classes.title}>
              Social Media
            </div>
            <div className={classes.content}>
              <p>
                <a href="https://www.facebook.com/heichatratinhte"><span><i className="fa-brands fa-facebook"></i></span> Heicha_Trà Tinh Tế</a>
              </p>
              {/* <p>
                <a href="https://www.facebook.com/heichatratinhte"><span><i className="fa-brands fa-facebook"></i></span>  facebook.com/heichatratinhte</a>
              </p> */}
            </div>
          </div>
          <div className="col l-6 ">
            <div className={classes.title}>
              Thông tin liên lạc
            </div>
            <div className={classes.content}>
              <p>
                Liên hệ đặt hàng: <span><a href="tel:076 528 7742" className="">076 528 7742</a></span>
              </p>
              <p>
                Địa chỉ: <span>311 Mã Lò, Phường Bình Trị Đông A, Quận Bình Tân ,TP Hồ Chí Minh, Việt Nam</span>
              </p>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
