import { useState } from 'react';

const useUpdate = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState({
    value: '',
    payload: null,
  });

  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue.value) && isTouched;

  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (e) => {
    if (e?.type === 'select-one') {
      const state = { value: e?.value, payload: e.payload };
      setEnteredValue(state);
      return;
    }
    const state = { value: e?.target?.value, payload: null };
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

export default useUpdate;
