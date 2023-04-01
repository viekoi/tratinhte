import React from 'react'
import classes from './Loading.module.css'

const Loading = () => {
  return (
   
      <div className="grid wide">
        <div className="row">
        <div className={classes.loading}>
          <h1>LOADING...</h1>
        </div>
        </div>
      </div>
      
  
  )
}

export default Loading
