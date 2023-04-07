import React,{useEffect,useRef} from 'react'
import classes from "./Alert.module.css"
const Alert = (props) => {

 const alertRef = useRef(null)


  useEffect(() => {
    const slideIn = setTimeout(()=>{
      alertRef.current.classList.remove(`${classes[`slide-in-right`]}`)
      alertRef.current.classList.add(`${classes[`slide-out-right`]}`)
    },2000)
    const alertOff = setTimeout(()=>{
      props.onShow(false)
    },3000)
    return () => {
      clearInterval(alertOff)
      clearInterval(slideIn)
  }
  }, []);

  return (
    <div className={`${classes[`alert`]} ${classes[`slide-in-right`]}`} ref={alertRef}>
       <div className={classes.content}>
       {props.alert}
       </div>
    </div>
  )
}

export default Alert


