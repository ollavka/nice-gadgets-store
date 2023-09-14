import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './Category.module.scss';

type Props = {
  title: string;
  name: string;
  amount: number;
  img: string;
};

export const Category: FC<Props> = ({
  title, name, amount, img,
}) => (
  <article className={styles.category}>
    <Link to={`/${name}`} className={styles.link}>
      <img src={img} alt={title} className={styles.Category_Img} />
    </Link>

    <h4 className={styles.Category_Title}>{title}</h4>
    <p className={styles.Category_Amount}>{`${amount} models`}</p>
  </article>
);
