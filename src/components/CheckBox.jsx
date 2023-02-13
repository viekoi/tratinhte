import classes from './CheckBox.module.css'
import React from 'react'
import { useRef } from 'react'
import PropTypes from 'prop-types'

const CheckBox = props => {

    const inputRef = useRef(null)

    const onChange = () => {
        if (props.onChange) {
            props.onChange(inputRef.current)
        }
    }

    return (
        <label className={classes["custom-checkbox"]}>
            <input type="checkbox" ref={inputRef} onChange={onChange} checked={props.checked}/>
            <span className={classes.checkmark}>
                <i className="fa-solid fa-check"></i>
            </span>
            {props.label}
        </label>
    )
}

CheckBox.propTypes = {
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool
}

export default CheckBox
