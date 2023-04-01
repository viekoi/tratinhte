import React from 'react'
import { useLocation } from 'react-router-dom'
import classes from './NewView.module.css'
const NewView = () => {
  let { state } = useLocation();
  const newInfo = state.props
  const date = new Date(newInfo.date)

  return (
    <div className={classes.newView}>
      <div className="grid wide">
        <div className="row">
          <div className="col">
            <div className={classes.newTitle}>
              <h1>{newInfo.title}</h1>
            </div>
            <div className={classes.newDate}>
              <span><i className='fa-solid fa-calendar'> {date.toLocaleString()}</i></span>
            </div>
            <div className={classes.newDSC}>
              <div className={classes[`new-img`]}>
                <img src={newInfo.image} alt="" />
              </div>
              <p>{newInfo.content.map((content, index) => {
                return <p key={index}>{content}</p>
              })}</p>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewView