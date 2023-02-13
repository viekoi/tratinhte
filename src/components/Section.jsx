import React from 'react'
import classes from './Section.module.css'
const Section = props => {
    return (
        <div className={classes.section}>
            {props.children}
        </div>
    )
}

export const SectionTitle = props => {
    return (
        <div className={classes.title}>
            {props.children}
        </div>
    )
}

export const SectionBody = props => {
    return (
        <div className={classes.body}>
            {props.children}
        </div>
    )
}

export default Section
