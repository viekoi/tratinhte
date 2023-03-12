import React, { useState, useRef, useEffect } from 'react';
import classes from './SearchbarDropdown.module.css'
const SearchbarDropdown = (props) => {
    
    const [options, setOptions] = useState([])

    const ulRef = useRef();
    const inputRef = useRef();
    const optionsRef = useRef();


    const onInputChange = (event) => {
        const filter = optionsRef.current.filter((option) => option[`name_with_type`].includes(event.target.value))
        const result = optionsRef.current.filter((option) => option[`name_with_type`] === (event.target.value))
        console.log(result)
        if (event.target.value === "") {
            setOptions(optionsRef.current)
            props.onSetProvinceCode && props.onSetProvinceCode(``)
        } else {
            setOptions(
                filter
            )
            if(props.onSetProvinceCode){
               props.onSetProvinceCode(result[0][`code`])
            }
        }

    };
    useEffect(() => {
        props.onLoad()
      .then(data => {
        console.log(data)
        setOptions(data.data.data)
        optionsRef.current = data.data.data
      })
      .catch(error => {
        console.error(error)
      });
  }, []);


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
                autoComplete="off"
            />
            <ul id={classes["results"]} className={classes["list-group"]} ref={ulRef}>
                {options.map((option, index) => {
                    return (
                        <button
                            type="button"
                            key={index}
                            onClick={(e) => {
                                inputRef.current.value = option[`name_with_type`];
                                props.onSetProvinceCode && props.onSetProvinceCode(option[`code`])
                            }}
                            className={classes["list-group-item"]}
                        >
                            {option[`name_with_type`]}
                        </button>
                    );
                })}
            </ul>
        </div>
    );
};


export default SearchbarDropdown