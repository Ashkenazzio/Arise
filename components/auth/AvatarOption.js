import styles from './AvatarOption.module.css';

const AvatarOption = (props) => {
  const { avatar, img } = props;

  return (
    <div className={styles['avatar-option']}>
      <label htmlFor={avatar}>
        <img className={styles.badge} src={img.src}></img>
      </label>
      <input type='radio' name='avatar' id={avatar} value={avatar} />
    </div>
  );
};

export default AvatarOption;
