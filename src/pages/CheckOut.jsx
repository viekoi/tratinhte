import React, { useContext } from 'react'
import classes from './CheckOut.module.css'
import SearchbarDropdown from '../components/SearchbarDropdown'
import CartItem from '../components/CartItem'
import CartContext from '../store/cart-context'

const CheckOut = () => {
  const cartCtx = useContext(CartContext)
  const cartItems = cartCtx.items

  const defaultOptions = [];
  for (let i = 0; i < 10; i++) {
    defaultOptions.push(`option ${i}`);
    defaultOptions.push(`suggesstion ${i}`);
    defaultOptions.push(`advice ${i}`);
  }
  return (
    <div className={classes.checkout}>
      <form action="">

        <div className={classes.row}>

          <div className={classes.col}>

            <h3 className={classes.title}>THÔNG TIN GIAO HÀNG</h3>

            <div className={classes.inputBox}>
              <span>Họ Tên :</span>
              <input type="text" placeholder="Nguyễn Văn A" />
            </div>
            <div className={classes.inputBox}>
              <span>email :</span>
              <input type="email" placeholder="example@example.com" />
            </div>
            <div className={classes.inputBox}>
              <span>Địa chỉ giao hàng :</span>
              <input type="text" placeholder="đại chỉ" />
            </div>
            <div className={classes.inputBox}>
              <span>Thành Phố / Tỉnh:</span>
              <input className={classes.disabled} type="text" placeholder="mumbai" value={`TP Hồ Chí Minh`} disabled={true} />
            </div>

            <div className={classes.flex}>
              <div className={classes.inputBox}>
                <span>Quận / Huyện :</span>
                <SearchbarDropdown options={defaultOptions} placeholder={`Quận/Huyện`}></SearchbarDropdown>
              </div>
              <div className={classes.inputBox}>
                <span>Phường / Xã :</span>
                <SearchbarDropdown options={defaultOptions} placeholder={`Phường/Xã`}></SearchbarDropdown>
              </div>
            </div>

          </div>

          <div className={classes.col}>

            <h3 className={classes.title}>payment</h3>

            <div className={classes.inputBox}>
              <span>Phương thức thanh toán:</span>
              <input className={classes.disabled} type="text" value={`Cash On Delivery(thanh toán khi nhận hàng)`} disabled={true} />
            </div>
            <div className={classes.inputBox}>
              <span>Giỏ Hàng: {cartItems.reduce((total, item) => total + Number(item.amount), 0)} sản phẩm</span>
              <div className={classes[`cart__list`]}>

                {
                  
                  cartItems.map((item, index) => {
                    return (<CartItem item={item} key={index}></CartItem>)
                  })

                }
              </div>
              <div className={classes.total}>
                <h1>thành tiền: {cartCtx.totalAmount.toLocaleString({ style: "currency", currency: "VND" })}<sup>đ</sup></h1>
              </div>
            </div>

          </div>

        </div>

        <input type="submit" value="MUA HÀNG" className={classes[`submit-btn`]} />

      </form>
    </div>
  )
}

export default CheckOut
