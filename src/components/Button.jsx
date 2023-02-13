import classes from './Button.module.css'
import React from 'react'
import PropTypes from 'prop-types'

const Button = props => {

    const bg = props.backgroundColor ? 'bg-' + props.backgroundColor : ''

    const size = props.size ? 'btn-' + props.size : ''

    const animate = props.animate ? 'btn-animate' : ''
    
    return (
        <button
            className={`${classes.btn} ${bg} ${size} ${animate}`}
            onClick={props.onclick ? () => props.onclick() : null}
        >
            <span className={classes.txt}>{props.children}</span>
            {
                props.icon ? (
                    <span className={classes.icon}>
                        <i className={`${props.icon}`}></i>
                    </span>
                ) : null
            }
        </button>
    )
}

Button.propTypes = {
    backgroundColor: PropTypes.string,
    size: PropTypes.string,
    icon: PropTypes.string,
    animate: PropTypes.bool,
    onclick: PropTypes.func
}

export default Button
