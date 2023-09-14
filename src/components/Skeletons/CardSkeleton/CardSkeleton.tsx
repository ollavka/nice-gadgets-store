// eslint-disable-next-line import/no-extraneous-dependencies
import ContentLoader from 'react-content-loader';
import { useContext } from 'react';
import styles from './CardSkeleton.module.scss';
import { ThemeContext } from '../../../context/ThemeContext';

const CardSkeleton = () => {
  const { theme } = useContext(ThemeContext);

  const darkSkeleton = theme === 'dark' ? '#75767f' : '#ebebeb';

  return (
    <ContentLoader
      className={styles.card}
      speed={1}
      viewBox="0 0 350 600"
      backgroundColor={darkSkeleton}
      foregroundColor="#ecebeb"
    >
      <rect x="31" y="522" rx="0" ry="0" width="0" height="11" />
      <rect x="31" y="522" rx="0" ry="0" width="0" height="7" />
      <rect x="32" y="520" rx="0" ry="0" width="2" height="0" />
      <rect x="32" y="523" rx="0" ry="0" width="284" height="49" />
      <rect x="32" y="491" rx="0" ry="0" width="284" height="14" />
      <rect x="32" y="470" rx="0" ry="0" width="284" height="13" />
      <rect x="32" y="447" rx="0" ry="0" width="284" height="13" />
      <rect x="31" y="390" rx="0" ry="0" width="54" height="27" />
      <rect x="31" y="342" rx="0" ry="0" width="285" height="22" />
      <rect x="33" y="32" rx="0" ry="0" width="280" height="286" />
      <rect x="33" y="429" rx="0" ry="0" width="282" height="2" />
    </ContentLoader>
  );
};

export default CardSkeleton;
