import React, { useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import classes from './HeroSlider.module.css'
import Button from '../components/Button'



const HeroSlider = props => {

    const data = props.data



    const timeOut = props.timeOut ? props.timeOut : 3000

    const [activeSlide, setActiveSlide] = useState(0);

    const nextSlide = useCallback(
        () => {
            const index = activeSlide + 1 === data.length ? 0 : activeSlide + 1
            setActiveSlide(index)
        },
        [activeSlide, data],
    )

    const prevSlide = () => {
        const index = activeSlide - 1 < 0 ? data.length - 1 : activeSlide - 1
        setActiveSlide(index)
    }

    useEffect(() => {
        if (props.auto) {
            const slideAuto = setInterval(() => {
                nextSlide()
            }, timeOut);
            return () => {
                clearInterval(slideAuto)
            }
        }
    }, [nextSlide, timeOut, props])

    return (
        <>

            <div className={classes[`hero-slider`]}>
                {

                    data.map((item, index) => (

                        <HeroSliderItem key={index} item={item} active={index === activeSlide} />
                    ))
                }
                {
                    props.control ? (
                        <div className={classes[`control`]}>
                            <div className={classes[`control-item`]} onClick={prevSlide}>
                                <i className="fa-solid fa-angle-left"></i>
                            </div>
                            <div className={classes[`control-item`]}>
                                <div className={classes[`index`]}>
                                    {activeSlide + 1}/{data.length}
                                </div>
                            </div>
                            <div className={classes[`control-item`]} onClick={nextSlide}>
                                <i className="fa-solid fa-angle-right"></i>
                            </div>
                        </div>
                    ) : null
                }
            </div>
        </>
    )
}

HeroSlider.propTypes = {
    data: PropTypes.array.isRequired,
    control: PropTypes.bool,
    auto: PropTypes.bool,
    timeOut: PropTypes.number
}

const HeroSliderItem = (props) => {



    return (

        <div className={`${classes[`item`]} ${props.active ? 'active' : ''}`}>
            <div className={classes.info} >
                <div className={`${classes.title} color-${props.item.color}`}>
                    <span>{props.item.title}</span>
                </div>
                <div className={classes.description}>
                    <span>{props.item.description}</span>
                </div>
                <div className={classes.btn}>
                    <Link to={`/catalog/${props.item.slug}`} state={{ item: props.item }}>
                        <Button
                            backgroundColor={props.item.color}
                            icon="fa-solid fa-arrow-pointer"
                            animate={true}
                        >
                            xem chi tiết
                        </Button>
                    </Link>
                </div>
            </div>
            <div className={classes.image}>
                <div className={`${classes.shape} bg-${props.item.color}`}></div>
                <img src={props.item.image} alt="" />
            </div>
        </div>
    )
}

export default HeroSlider
