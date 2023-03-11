import React, { useState, useRef, useEffect } from 'react';
import classes from './SearchbarDropdown.module.css'
const SearchbarDropdown = (props) => {
    const [options, setOptions] = useState(props.options)
    console.log(options)
    const ulRef = useRef();
    const inputRef = useRef();

    const onInputChange = (event) => {
        if (event.target.value === "") {
            setOptions(props.options)
        } else {
            setOptions(
                options.filter((option) => option.includes(event.target.value))
            );
        }

    };

    useEffect(() => {
        inputRef.current.addEventListener('click', (event) => {
            event.stopPropagation();
            ulRef.current.style.display = 'block';
            onInputChange(event);
        });
        document.addEventListener('click', (event) => {
            ulRef.current.style.display = 'none';
        });
    }, []);
    return (
        <div className={classes["search-bar-dropdown"]}>
            <input
                id={classes["search-bar"]}
                type="text"
                placeholder={props.placeholder}
                ref={inputRef}
                onChange={onInputChange}
            />
            <ul id={classes["results"]} className={classes["list-group"]} ref={ulRef}>
                {options.map((option, index) => {
                    return (
                        <button
                            type="button"
                            key={index}
                            onClick={(e) => {
                                inputRef.current.value = option;
                            }}
                            className={classes["list-group-item"]}
                        >
                            {option}
                        </button>
                    );
                })}
            </ul>
        </div>
    );
};


export default SearchbarDropdown
