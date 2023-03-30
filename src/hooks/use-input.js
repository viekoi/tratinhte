import { useReducer } from 'react';

const initialInputState = {
  value: '',
  isTouched: false,
  isValid:true,
};

const inputStateReducer = (state, action) => {
  if (action.type === 'INPUT') {
    return { value: action.value, isTouched: state.isTouched,isValid:action.isValid};
  }
  if (action.type === 'BLUR') {
    return { isTouched: true, value: state.value,isValid:action.isValid};
  }
  if (action.type === 'RESET') {
    return { isTouched: false, value: '',isValid:true};
  }
  return inputStateReducer;
};

const useInput = (validateValue) => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    const isAfterInputedValueValid = validateValue(event.target.value);
    dispatch({ type: 'INPUT', value: event.target.value,isValid: isAfterInputedValueValid});
  };

  const inputBlurHandler = (event) => {
    const isAfterInputedValueValid = validateValue(event.target.value);
    dispatch({ type: 'BLUR',isValid: isAfterInputedValueValid});
  };

  const reset = () => {
    dispatch({ type: 'RESET' });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    isAfterInputedValueValid: inputState.isValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;