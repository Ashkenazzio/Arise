import styles from './RegPage.module.css';
import useInput from 'hooks/use-input';
import { useRouter } from 'next/router';

import FormField from '@/ui/FormField';
import Button from '@/ui/Button';
import Link from 'next/link';

import AvatarOption from './AvatarOption';
import bear from '@/images/avatars/bear.svg';
import cat from '@/images/avatars/cat.svg';
import dog from '@/images/avatars/dog.svg';
import fox from '@/images/avatars/fox.svg';
import horse from '@/images/avatars/horse.svg';
import owl from '@/images/avatars/owl.svg';
import penguin from '@/images/avatars/penguin.svg';
import pig from '@/images/avatars/pig.svg';

const isNotEmpty = (value) => value.trim() !== '';
const isEmail = (value) => value.includes('@');
const eightCharacters = (value) => value?.trim().length >= 8;

const RegPage = () => {
  const router = useRouter();

  const {
    value: enteredName,
    isValid: nameIsValid,
    hasError: nameInputInvalid,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput(isNotEmpty);

  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailInputInvalid,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput(isNotEmpty && isEmail);

  const {
    value: enteredPassword,
    isValid: passwordIsValid,
    hasError: passwordInputInvalid,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput(isNotEmpty && eightCharacters);

  const isEquelToPassword = (value) => value === enteredPassword.value;

  const {
    value: enteredConfirmedPassword,
    isValid: confirmedPasswordIsValid,
    hasError: confirmedPasswordInputInvalid,
    valueChangeHandler: confirmedPasswordChangeHandler,
    inputBlurHandler: confirmedPasswordBlurHandler,
    reset: resetConfirmedPasswordInput,
  } = useInput(isEquelToPassword);

  let avatarValue = null;

  const changeAvatarValue = (e) => {
    avatarValue = e.target.value;
  };

  let formIsValid = false;

  if (
    nameIsValid &&
    emailIsValid &&
    passwordIsValid &&
    confirmedPasswordIsValid
  ) {
    formIsValid = true;
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (!formIsValid) {
      return;
    }

    const userData = {
      name: enteredName,
      email: enteredEmail,
      password: enteredPassword,
      avatar: avatarValue,
    };

    resetNameInput();
    resetEmailInput();
    resetPasswordInput();
    resetConfirmedPasswordInput();

    console.log({ ...userData });
    router.push('/login');
  };

  return (
    <div className={styles.container}>
      <div className={styles.register}>
        <h1 className={styles.title}>Register</h1>
        <form className={styles.form} onSubmit={onSubmitHandler}>
          <div className={styles.credentials}>
            <FormField
              title='Name'
              type='text'
              info='Please enter your name.'
              value={enteredName.value}
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
              error={!!nameInputInvalid ? nameInputInvalid : undefined}
              valid={!!nameIsValid ? nameIsValid : undefined}
            />
            <FormField
              title='Email'
              type='email'
              info='Please enter a valid email address.'
              value={enteredEmail.value}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              error={emailInputInvalid ? emailInputInvalid : undefined}
              valid={emailIsValid ? emailIsValid : undefined}
            />
            <FormField
              title='Password'
              type='password'
              info={`Please enter a password that's at least 8 characters long.`}
              value={enteredPassword.value}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              error={passwordInputInvalid ? passwordInputInvalid : undefined}
              valid={passwordIsValid ? passwordIsValid : undefined}
            />

            <FormField
              title='Confirm Password'
              type='password'
              info='Please enter your chosen password again.'
              value={enteredConfirmedPassword.value}
              onChange={confirmedPasswordChangeHandler}
              onBlur={confirmedPasswordBlurHandler}
              error={confirmedPasswordInputInvalid}
              valid={confirmedPasswordIsValid}
            />
          </div>

          <div className={styles.avatar}>
            <span>Choose an Avatar:</span>
            <div onChange={changeAvatarValue} className={styles.options}>
              <AvatarOption avatar='bear' img={bear} />
              <AvatarOption avatar='cat' img={cat} />
              <AvatarOption avatar='dog' img={dog} />
              <AvatarOption avatar='fox' img={fox} />
              <AvatarOption avatar='horse' img={horse} />
              <AvatarOption avatar='owl' img={owl} />
              <AvatarOption avatar='penguin' img={penguin} />
              <AvatarOption avatar='pig' img={pig} />
            </div>
          </div>
          <div className={styles.actions}>
            <Button disabled={!formIsValid}>Register</Button>
            <Link href='/login' className={styles.link}>
              <a className={styles.link}>
                Already have an account? Click here to login
              </a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegPage;
