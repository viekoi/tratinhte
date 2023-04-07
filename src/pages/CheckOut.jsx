import React, { useContext, useState, useEffect } from 'react'
import * as Realm from "realm-web"
import { Link } from 'react-router-dom'
import useInput from '../hooks/use-input'
import classes from './CheckOut.module.css'
import CartItem from '../components/CartItem'
import CartContext from '../store/cart-context'
import Button from '../../src/components/Button'
import Loading from '../components/Loading'



const CheckOut = () => {
  const [ward, setWard] = useState();
  const [district, setDistrict] = useState();
  const [data, setData] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext)
  const cartItems = cartCtx.items

  const resetCart = () => {
    cartCtx.reset()
  }


  const fetchData = async () => {
    try {
      const response = await fetch("https://provinces.open-api.vn/api/?depth=3")
      const data = await response.json();
      const result = data.find((data) => {
        return (data.code === 79)
      })
      setData(result)

    } catch (err) {
      console.error("Failed to log in", err);
    }

  }

  const postData = async (data) => {
    const app = new Realm.App({ id: "application-0-xxkdi" });
    const credentials = Realm.Credentials.anonymous();
    const uidMaker = () =>
      String(
        Date.now().toString(32) +
        Math.random().toString(16)
      ).replace(/\./g, '')
    try {
      setIsSubmitting(true);
      const user = await app.logIn(credentials);
      const mongo = app.currentUser.mongoClient("mongodb-atlas");
      const userCollection = mongo.db("myDB").collection("users");
      const isAlreadyUser = await userCollection.findOne({ email: data.email })
      const orderCollection = mongo.db("myDB").collection("orders");
      if (!isAlreadyUser) {
        const id = uidMaker()
        const result = await orderCollection.insertOne({ uid: "anonymous", id: id , ...data});
      } else {
        const id = uidMaker()
        const result = await orderCollection.insertOne({uid: isAlreadyUser.uid, id: id , ...data});
      }

      setIsSubmitting(false);
      setDidSubmit(true);

    } catch (err) {
      console.error("Failed to log in", err);
    }



  }




  const selectDistrict = (e) => {
    const selectedDisctrict = data.districts.find(
      (entry) => entry.name === e.target.value
    );
    setWard(undefined);
    setDistrict(selectedDisctrict);
  };

  const selectWard = (e) => {
    const selectedWard = district.wards.find(
      (entry) => entry.name === e.target.value
    );
    setWard( selectedWard);
  };


  const isInputValid = (value) =>{
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const str = value.trim()
    return(str!== '' && str.length <100 && !specialChars.test(str))
}  

  const isAddress = (value) =>{
    const nonAddressChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|<>\?~]/;
    const str = value.trim()
    return(str!== '' && str.length <100 && !nonAddressChars.test(str))
  } 

  const isEmail = (value) =>{
    const nonEmailChars = /[`!#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;
    const str = value.trim()
    return(!nonEmailChars.test(str) && str.includes('@') && str.length <100)
  }

  const isPhoneNumber = (value) => {
    var phoneno = /^\d{10}$/;
    if (value.match(phoneno)) {
      return true;
    }
    else {
      return false;
    }
  }

  const {
    value: fullNameValue,
    isValid: fullNameIsValid,
    isAfterInputedValueValid: fullNameAfterInput,
    hasError: fullNameHasError,
    valueChangeHandler: fullNameChangeHandler,
    inputBlurHandler: fullNameBlurHandler,
    reset: resetFullName,
  } = useInput(isInputValid);
  const {
    value: emailValue,
    isValid: emailIsValid,
    isAfterInputedValueValid: emailAfterInput,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmail);

  const {
    value: addressValue,
    isValid: addressIsValid,
    isAfterInputedValueValid: addressAfterInput,
    hasError: addressHasError,
    valueChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
    reset: resetAddress,
  } = useInput(isAddress);

  const {
    value: phoneNumberValue,
    isValid: phoneNumberIsValid,
    isAfterInputedValueValid: phoneNumberAfterInput,
    hasError: phoneNumberHasError,
    valueChangeHandler: phoneNumberChangeHandler,
    inputBlurHandler: phoneNumberBlurHandler,
    reset: resetPhoneNumber,
  } = useInput(isPhoneNumber);


  let formIsValid = false;

  if (fullNameIsValid && emailIsValid && phoneNumberIsValid && addressIsValid && district !== undefined && ward !== undefined) {
    formIsValid = true;
  }

  const submitHandler = event => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

  

    const checkoutData = {
      billingEmail: emailValue,
      billingName: fullNameValue,
      billingPhoneNumber: phoneNumberValue,
      billingAddress:`${addressValue}, ${district.name}, ${ward.name}`  ,
      inCart: cartCtx,
      discounts: [],
      billingAmount: cartCtx.totalAmount,
      status: "pending",
      transactionTime: new Date()
    }
    console.log(checkoutData)

    postData(checkoutData)
    resetFullName()
    resetEmail()
    resetAddress()
    resetCart()
    resetPhoneNumber()

  };



  useEffect(() => {
    fetchData()
  }, []);


  if (!isSubmitting && !didSubmit) {
    return (
      <div className={classes.checkout}>
        <form onSubmit={submitHandler}>

          <div className={classes.row}>

            <div className={classes.col}>

              <h3 className={classes.title}>THÔNG TIN GIAO HÀNG</h3>

              <div className={`${classes.inputBox} ${fullNameAfterInput ? "" : `${classes.invalid}`}`}>
                <span>Họ Tên  :  {fullNameHasError && <p className={classes["error-text"]}>Hãy nhập họ và tên của bạn.</p>}</span>
                <input type="text" placeholder="Nguyễn Văn A" id='fullName' value={fullNameValue} onChange={fullNameChangeHandler} onBlur={fullNameBlurHandler} autoComplete={"off"}  />

              </div>
              <div className={`${classes.inputBox} ${emailAfterInput ? "" : `${classes.invalid}`}`}>
                <span>email : {emailHasError && <p className={classes["error-text"]}>Hãy nhập Email bạn.</p>}</span>
                <input type="email" placeholder="example@example.com" id='email' value={emailValue} onChange={emailChangeHandler} onBlur={emailBlurHandler} autoComplete={"off"}/>


              </div>
              <div className={`${classes.inputBox} ${phoneNumberAfterInput ? "" : `${classes.invalid}`}`}>
                <span>Số điện thoai : {phoneNumberHasError && <p className={classes["error-text"]}>Hãy nhập số điện thoại của bạn.</p>}</span>
                <input type="text" placeholder="03x-xxx-xxxx" id='email' value={phoneNumberValue} onChange={phoneNumberChangeHandler} onBlur={phoneNumberBlurHandler} autoComplete={"off"}/>
              </div>
              <div className={`${classes.inputBox} ${addressAfterInput ? "" : `${classes.invalid}`}`}>
                <span>Địa chỉ giao hàng : {addressHasError && <p className={classes["error-text"]}>Hãy nhập địa ch của bạn.</p>}</span>
                <input type="text" placeholder="Địa chỉ" id='address' value={addressValue} onChange={addressChangeHandler} onBlur={addressBlurHandler} autoComplete={"off"}/>
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
                      {data.districts.sort((a, b) =>
                          a.name.localeCompare(b.name)).map((entry, index) => {
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
                      <select onChange={selectWard} defaultValue={""}>
                        <option value="" disabled hidden>chọn</option>
                        {district.wards.sort((a, b) =>
                          a.name.localeCompare(b.name)).map((ward, index) => {

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

          <button type="submit" className={`${classes[`submit-btn`]} ${formIsValid ? `${classes.active}` : `${classes.inactive}`}`} disabled={!formIsValid}>Mua Hàng </button>

        </form>
      </div>
    )
  } else if (isSubmitting && !didSubmit) {
    return (<Loading></Loading>)
  } else if (!isSubmitting && didSubmit) {
    return (
      <div className={classes.checkout}>
        <div className={classes[`end-form`]}>
          <h1>GIAO DỊCH THÀNH CÔNG</h1>
          <h1><i class="fas fa-check-circle"></i></h1>
          <Link to='/'>
            <Button
              size="l"
              backgroundColor={"desert"}
            >quay về trang chủ</Button>
          </Link>

        </div>
      </div>
    )
  }

}


export default CheckOut



