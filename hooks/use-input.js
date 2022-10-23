import { useState } from 'react';

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState({
    value: '',
    payload: null,
  });

  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue.value);

  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (e) => {
    if (e.type === 'select-one') {
      const state = { value: e.value, payload: e.payload };
      // console.log('state from select-one', state);
      setEnteredValue(state);
      return;
    }

    if (e.type === 'update-input') {
      const state = { value: e.value, payload: null };
      setEnteredValue(state);
      return;
    }

    if (e.type === 'update-category') {
      const state = { value: e.value, payload: e.payload };
      // console.log('state from update-category', state);
      setEnteredValue(state);
      return;
    }

    const state = { value: e.target.value, payload: null };
    setEnteredValue(state);
  };

  const inputBlurHandler = (e) => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue({ value: '', payload: null });

    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
