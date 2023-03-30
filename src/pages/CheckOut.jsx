import React, { useContext, useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import useInput from '../hooks/use-input'
import classes from './CheckOut.module.css'
import CartItem from '../components/CartItem'
import CartContext from '../store/cart-context'
import Button from '../../src/components/Button'


const CheckOut = () => {
  const [ward, setWard] = useState();
  const [district, setDistrict] = useState();
  const [data, setData] = useState([])
  const [submitData,setSubmitData] = useState()
  const cartCtx = useContext(CartContext)
  const cartItems = cartCtx.items

  const resetCart = ()=>{
    cartCtx.reset()
  }





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


  const isNotEmpty = (value) => value.trim() !== '';
  const isEmail = (value) => value.includes('@');
  const isPhoneNumber = (value)=>{
  var phoneno = /^\d{10}$/;
  if(value.match(phoneno))
        {
      return true;
        }
      else
        {
        return false;
        }
}

   const {
    value: fullNameValue,
    isValid: fullNameIsValid,
    isAfterInputedValueValid:fullNameAfterInput,
    hasError: fullNameHasError,
    valueChangeHandler: fullNameChangeHandler,
    inputBlurHandler: fullNameBlurHandler,
    reset: resetFullName,
  } = useInput(isNotEmpty);
  const {
    value: emailValue,
    isValid: emailIsValid,
    isAfterInputedValueValid:emailAfterInput,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmail);

  const {
    value: addressValue,
    isValid: addressIsValid,
    isAfterInputedValueValid:addressAfterInput,
    hasError: addressHasError,
    valueChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
    reset: resetAddress,
  } = useInput(isNotEmpty);

  const {
    value: phoneNumberValue,
    isValid: phoneNumberIsValid,
    isAfterInputedValueValid:phoneNumberAfterInput,
    hasError: phoneNumberHasError,
    valueChangeHandler: phoneNumberChangeHandler,
    inputBlurHandler: phoneNumberBlurHandler,
    reset: resetPhoneNumber,
  } = useInput(isPhoneNumber);


  let formIsValid = false;

  if (fullNameIsValid && emailIsValid && phoneNumberIsValid &&  district!== undefined && ward !== undefined) {
    formIsValid = true;
  }

  const submitHandler = event => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    

    resetFullName()
    resetEmail()
    resetAddress()
    resetCart()
    
  };

  useEffect(() => {
    fetchData()
  }, []);



  return (
    <div className={classes.checkout}>
      {cartItems.length > 0 ? 
      <form onSubmit={submitHandler}>

      <div className={classes.row}>

        <div className={classes.col}>

          <h3 className={classes.title}>THÔNG TIN GIAO HÀNG</h3>

          <div className={`${classes.inputBox} ${fullNameAfterInput? "":`${classes.invalid}`}`}>
            <span>Họ Tên  :  {fullNameHasError && <p className={classes["error-text"]}>Hãy nhập họ và tên của bạn.</p>}</span>
            <input type="text" placeholder="Nguyễn Văn A" id='fullName' value={fullNameValue} onChange={fullNameChangeHandler} onBlur={fullNameBlurHandler}/>
           
          </div>
          <div className={`${classes.inputBox} ${emailAfterInput? "":`${classes.invalid}`}`}>
            <span>email : {emailHasError && <p className={classes["error-text"]}>Hãy nhập Email bạn.</p>}</span>
            <input type="email" placeholder="example@example.com" id='email' value={emailValue} onChange={emailChangeHandler} onBlur={emailBlurHandler} />
            

          </div>
          <div className={`${classes.inputBox} ${phoneNumberAfterInput? "":`${classes.invalid}`}`}>
            <span>Số điện thoai : {phoneNumberHasError && <p className={classes["error-text"]}>Hãy nhập số điện thoại của bạn.</p>}</span>
            <input type="text" placeholder="03xxx" id='email' value={phoneNumberValue} onChange={phoneNumberChangeHandler} onBlur={phoneNumberBlurHandler} />     
          </div>
          <div className={`${classes.inputBox} ${addressAfterInput? "":`${classes.invalid}`}`}>
            <span>Địa chỉ giao hàng : {addressHasError && <p className={classes["error-text"]}>Hãy nhập địa ch của bạn.</p>}</span>
            <input type="text" placeholder="Địa chỉ" id='address' value={addressValue} onChange={addressChangeHandler} onBlur={addressBlurHandler} />
          </div>
          <div className={classes.inputBox}>
            <span>Thành Phố / Tỉnh:</span>
            <input className={classes.inactive} type="text" value={`TP Hồ Chí Minh`} disabled={true} />
          </div>

          <div className={classes.flex}>
            <div className={classes.inputBox}>
              <span>Quận / Huyện :</span>
              <div className="">
                {!!data.districts && <select onChange={selectDistrict} defaultValue={""}>
                  <option value="" disabled hidden>chọn</option>
                  {data.districts.map((entry, index) => {
                    return (
                      <option key={index} value={entry.name}>
                        {entry.name}
                      </option>
                    );
                  })}
                </select> }
                
              </div>

            </div>
            <div className={classes.inputBox}>
              <span>Phường / Xã :</span>
              <div className="">
                {!!district ?
                  <select onChange={selectWard} defaultValue={""}>
                    <option value="">chọn</option>
                    {district.wards.sort((a, b) =>
              a.name.localeCompare(b.name)).map((ward, index) => {
                       
                      return (
                        <option   value={ward.name} key={index}>
                          {ward.name}
                        </option>
                      );
                    })}
                  </select>:<select disabled defaultValue={""}>
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
            <input className={classes.inactive} type="text" value={`Cash On Delivery(thanh toán khi nhận hàng)`} disabled={true} />
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

      <button type="submit"  className={`${classes[`submit-btn`]} ${formIsValid? `${classes.active}`:`${classes.inactive}`}`} disabled={!formIsValid}>Mua Hàng </button>

    </form>
      :
      <div className={classes[`end-form`]}>
       <h1>GIAO DỊCH THÀNH CÔNG</h1>
       <h1><i class="fas fa-check-circle"></i></h1>
       <Link to='/'>
        <Button
        size="l"
        backgroundColor={"desert"}
        >quay về trang chủ</Button>
       </Link>
       
      </div>}
      
    </div>
  )
}

export default CheckOut



