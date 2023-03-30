import React from 'react'
import classes from './NewCard.module.css'
import {Link} from 'react-router-dom'
const NewCard = (props) => {
    const date = new Date(props.item.date)
  return (
   <div className={`${classes.new} col l-${props.lcol} m-${props.mcol} c-${props.ccol} `}>
    <Link to={`/news/${props.item.title}`}  state={{props:props.item}}>
        <div className={classes.img}>
            <a href="" className="">
                <img src={props.item.image} alt="" />
            </a>
        </div>
        <div className={classes.tend}>
            <h3>
                <a href="">{props.item.title}</a>
            </h3>  
        </div>
        <div className={classes.date}>
            <span><i className='fa-solid fa-calendar'></i> {date.toLocaleString()}</span>
        </div>
    </Link>
   </div>
  )
}

export default NewCard