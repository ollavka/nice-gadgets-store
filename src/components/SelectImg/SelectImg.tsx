import cn from 'classnames';
import styles from './SelectImg.module.scss';

type Props = {
  images: string[];
  activeImg: string;
  setActiveImg: (imagePath: string) => void;
  title: string;
  className?: string;
};

export const SelectImg: React.FC<Props> = ({
  images,
  activeImg,
  setActiveImg,
  title,
  className = '',
}) => {
  function selectActiveImg(imagePath: string) {
    setActiveImg(imagePath);
  }

  return (
    <ul className={cn(styles.select__list, className)}>
      {images.map((image) => (
        <li key={image}>
          <button
            type="button"
            className={`${styles.select__item} ${
              activeImg === image ? styles.is__active : ''
            }`}
            onClick={() => selectActiveImg(image)}
          >
            <img src={image} alt={title} className={styles.select__item__img} />
          </button>
        </li>
      ))}
    </ul>
  );
};
