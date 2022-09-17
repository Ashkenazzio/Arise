import FormField from '@/entries/FormField';
import Button from '@/ui/Button';
import Link from 'next/link';
import styles from './RegPage.module.css';

import bear from '@/public/avatars/bear.svg';
import cat from '@/public/avatars/cat.svg';
import dog from '@/public/avatars/dog.svg';
import fox from '@/public/avatars/fox.svg';
import horse from '@/public/avatars/horse.svg';
import owl from '@/public/avatars/owl.svg';
import penguin from '@/public/avatars/penguin.svg';
import pig from '@/public/avatars/pig.svg';

const RegPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.register}>
        <h1 className={styles.title}>Register</h1>
        <form className={styles.form}>
          <div className={styles.credentials}>
            <FormField
              title='Name'
              type='text'
              info='Please enter your name.'
            />
            <FormField
              title='Email'
              type='email'
              info='Please enter a valid email address.'
            />
            <FormField
              title='Password'
              type='text'
              info='Please enter a password at least 8 characters long.'
            />
          </div>
          <div className={styles.avatar}>
            <span>Choose an Avatar:</span>
            <div className={styles.options}>
              <div className={styles['avatar-option']}>
                <label htmlFor='bear'>
                  <img className={styles.badge} src={bear.src}></img>
                </label>
                <input type='radio' id='bear' value='bear' />
              </div>

              <div className={styles['avatar-option']}>
                <label htmlFor='cat'>
                  <img className={styles.badge} src={cat.src}></img>
                </label>
                <input type='radio' id='cat' value='cat' />
              </div>

              <div className={styles['avatar-option']}>
                <label htmlFor='dog'>
                  <img className={styles.badge} src={dog.src}></img>
                </label>
                <input type='radio' id='dog' value='dog' />
              </div>

              <div className={styles['avatar-option']}>
                <label htmlFor='fox'>
                  <img className={styles.badge} src={fox.src}></img>
                </label>
                <input type='radio' id='fox' value='fox' />
              </div>

              <div className={styles['avatar-option']}>
                <label htmlFor='horse'>
                  <img className={styles.badge} src={horse.src}></img>
                </label>
                <input type='radio' id='horse' value='horse' />
              </div>

              <div className={styles['avatar-option']}>
                <label htmlFor='owl'>
                  <img className={styles.badge} src={owl.src}></img>
                </label>
                <input type='radio' id='owl' value='owl' />
              </div>

              <div className={styles['avatar-option']}>
                <label htmlFor='penguin'>
                  <img className={styles.badge} src={penguin.src}></img>
                </label>
                <input type='radio' id='penguin' value='penguin' />
              </div>

              <div className={styles['avatar-option']}>
                <label htmlFor='pig'>
                  <img className={styles.badge} src={pig.src}></img>
                </label>
                <input type='radio' id='pig' value='pig' />
              </div>
            </div>
          </div>
          <div className={styles.actions}>
            <Button>Register</Button>
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
