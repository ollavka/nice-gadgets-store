import { FC } from 'react';
import { Category } from '../Category';
import styles from './Categories.module.scss';
import { CategoryMap, ProductCategory } from '../../types';

type Props = {
  countByGroup: CategoryMap;
};

type CategoryData = {
  [key in ProductCategory]: {
    title: string;
    image: string;
  };
};

export const Categories: FC<Props> = ({ countByGroup }) => {
  const data: CategoryData = {
    [ProductCategory.Phone]: {
      title: 'Mobile phones',
      image: '/product_catalog_fe/img/categories/phones-category.png',
    },
    [ProductCategory.Tablet]: {
      title: 'Tablets',
      image: '/product_catalog_fe/img/categories/tablets-category.png',
    },
    [ProductCategory.Accessory]: {
      title: 'Accessories',
      image: '/product_catalog_fe/img/categories/accessories-category.png',
    },
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Shop by category</h2>
      <div className={styles.categories}>
        {Object.entries(data).map(([category, categoryData]) => (
          <Category
            key={category}
            name={category}
            title={categoryData.title}
            amount={countByGroup[category as ProductCategory]}
            img={categoryData.image}
          />
        ))}
      </div>
    </div>
  );
};
