import React from 'react'
import classes from './Order.module.css'
import Button from '../../src/components/Button'

const Order = () => {
  return (
    <div className={classes.order}>
      <div className={classes.wrap}>
        <div className={classes.cartInfo}>
          <div className="">
            <span>Đơn hàng(1 sản phẩm)</span>
            <span>177,000đ</span>
          </div>
          <div className="">
            <input type="text" placeholder="Nhập mã giảm giá" />
            <Button>Áp dụng</Button>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Order
