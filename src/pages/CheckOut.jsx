import React, { useContext, useState, useEffect } from 'react'
import classes from './CheckOut.module.css'
import CartItem from '../components/CartItem'
import CartContext from '../store/cart-context'

const CheckOut = () => {
  const [ward, setWard] = useState();
  const [district, setDistrict] = useState();
  const [data, setData] = useState([])
  const [submitData,setSubmitData] = useState()
  const cartCtx = useContext(CartContext)
  const cartItems = cartCtx.items

  console.log(submitData)



  const handleInput = (e) => {
    const id = e.target.id;
    let value = e.target.value


    setSubmitData({ ...submitData, [id]: value });
  };





  const fetchData = async () => {
    const response = await fetch("https://provinces.open-api.vn/api/?depth=3")
    const data = await response.json();
    const result = data.find((data) => {
      return (data.code === 79)
    })
    setData(result)
    
  }

  const selectDistrict = (e) => {
    const selectedDisctrict = data.districts.find(
      (entry) => entry.name === e.target.value
    );
    setWard(undefined);
    setDistrict(selectedDisctrict);
    const id = e.target.id;
    let value = e.target.value
    setSubmitData({ ...submitData, [id]: value });
  
  };

  const selectWard = (e) => {
    setWard(e.target.value);
    const id = e.target.id;
    let value = e.target.value
    setSubmitData({ ...submitData, [id]: value });
  };

  
const onSubmitHandler=(e)=>{
  e.preventDefault()
}



  useEffect(() => {
    fetchData()
  }, []);



  return (
    <div className={classes.checkout}>
      <form onSubmit={onSubmitHandler}>

        <div className={classes.row}>

          <div className={classes.col}>

            <h3 className={classes.title}>THÔNG TIN GIAO HÀNG</h3>

            <div className={classes.inputBox}>
              <span>Họ Tên :</span>
              <input id="fullname" type="text" placeholder="Nguyễn Văn A"  onChange={handleInput}/>
            </div>
            <div className={classes.inputBox}>
              <span>email :</span>
              <input id="email" type="email" placeholder="example@example.com" onChange={handleInput}/>
            </div>
            <div className={classes.inputBox}>
              <span>Địa chỉ giao hàng :</span>
              <input id="address" type="text" placeholder="đại chỉ" onChange={handleInput}/>
            </div>
            <div className={classes.inputBox}>
              <span>Thành Phố / Tỉnh:</span>
              <input id="province" className={classes.disabled} type="text" placeholder="mumbai" value={`TP Hồ Chí Minh`} disabled={true} />
            </div>

            <div className={classes.flex}>
              <div className={classes.inputBox}>
                <span>Quận / Huyện :</span>
                <div className="">
                  {!!data.districts && <select id="district" onChange={selectDistrict} defaultValue={""}>
                    <option value="" disabled hidden>chọn</option>
                    {data.districts.sort(function (a, b) {
                      if (a.name < b.name) {
                        return -1;
                      }
                      if (a.name > b.name) {
                        return 1;
                      }
                      return 0;
                    }).map((entry, index) => {
                      return (
                        <option key={index} value={entry.name}>
                          {entry.name}
                        </option>
                      );
                    })}
                  </select>}

                </div>

              </div>
              <div className={classes.inputBox}>
                <span>Phường / Xã :</span>
                <div className="">
                  {!!district ?
                    <select id="ward" onChange={selectWard} defaultValue={""}>
                      <option value="" disabled hidden>chọn</option>
                      {district.wards.sort(function (a, b) {
                        if (a.name < b.name) {
                          return -1;
                        }
                        if (a.name > b.name) {
                          return 1;
                        }
                        return 0;
                      }).map((ward, index) => {

                        return (
                          <option value={ward.name} key={index}>
                            {ward.name}
                          </option>
                        );
                      })}
                    </select> : <select disabled defaultValue={""}>
                      <option value="">chọn</option>
                    </select>
                  }

                </div>
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



