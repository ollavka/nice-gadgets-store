/* eslint-disable max-len */
import {
  FC,
  FormEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { debounce } from 'lodash';
import styles from './SearchInput.module.scss';
import searchIcon from '../../assets/icons/search.svg';
import closeIcon from '../../assets/icons/close.svg';
import searchIconDark from '../../assets/icons-dark/Search.svg';
import closeIconDark from '../../assets/icons-dark/Close.svg';
import { Button } from '../Buttons/Button';
import { ButtonType, QueryParams, SearchParams } from '../../types';
import { getSearchWith } from '../../helpers/searchHelper';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectQueryProducts } from '../../redux/selectors';
import {
  clearQueryProducts,
  fecthQueryProducts,
} from '../../redux/slices/queryProductsSlice';
import { useClickOutside } from '../../hooks/useClickOutside';
import { Loader } from '../Loader';
import { ThemeContext } from '../../context/ThemeContext';

type Props = {
  className?: string;
};

export const SearchInput: FC<Props> = ({ className = '' }) => {
  const [isOpenInput, setIsOpenInput] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const { pathname, search } = useLocation();

  const dispatch = useAppDispatch();
  const { items, loaded } = useAppSelector(selectQueryProducts);

  const queryParam = searchParams.get(QueryParams.Query) || '';

  const isThemeModeDark = useContext(ThemeContext).theme === 'dark';
  const iconTypeLight = isOpenInput ? closeIconDark : searchIconDark;
  const iconTypeDark = isOpenInput ? closeIcon : searchIcon;
  const icon = isThemeModeDark ? iconTypeLight : iconTypeDark;
  const currnetSearchIcon = isThemeModeDark ? searchIconDark : searchIcon;
  const inputRef = useRef<null | HTMLFormElement>(null);

  useEffect(() => {
    if (!queryParam) {
      return;
    }

    dispatch(fecthQueryProducts(queryParam));
  }, [queryParam]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
  }

  const setSearchWith = (params: SearchParams) => {
    const newSearchParams = getSearchWith(searchParams, params);

    setSearchParams(newSearchParams);
  };

  const aplyQuery = useCallback(debounce(setSearchWith, 1000), [
    searchParams,
    pathname,
  ]);

  const clearAplyQuery = () => {
    aplyQuery.cancel();
    setQuery('');
  };

  const onCloseSeacrh = useCallback(() => {
    setIsOpenInput(false);
    setIsDropdownOpen(false);
    setSearchWith({
      search: null,
    });

    clearAplyQuery();
  }, [pathname, search]);

  const toggleButton = () => {
    if (!isOpenInput) {
      setIsOpenInput(true);
    }

    if (isOpenInput) {
      onCloseSeacrh();
    }
  };

  useClickOutside(inputRef, onCloseSeacrh);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    aplyQuery({
      search: event.target.value.trim() || null,
    });

    setIsDropdownOpen(true);

    if (event.target.value.trim().length === 0) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    setQuery(queryParam);

    return () => clearAplyQuery();
  }, [searchParams, pathname]);

  useEffect(() => {
    dispatch(clearQueryProducts());
  }, [pathname, isOpenInput, queryParam]);

  useEffect(() => {
    if (!queryParam) {
      return;
    }

    setIsDropdownOpen(true);
    setIsOpenInput(true);
  }, [queryParam]);

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className={styles.search}
      ref={inputRef}
    >
      <div
        className={cn(styles.search__wrapper, {
          [styles.isOpened]: isOpenInput,
        })}
      >
        <img src={currnetSearchIcon} alt="icon" />
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleQueryChange}
          className={styles.search__input}
        />
      </div>

      <Button
        className={cn(className, styles.trigger)}
        type={ButtonType.Button}
        iconPath={icon}
        onClick={toggleButton}
      />

      {isDropdownOpen && (
        <div className={styles.dropdown__menu}>
          <div className={styles.dropdown__content}>
            {items.length > 0
              && loaded
              && items.map((item) => (
                <div className={styles.dropdown__item} key={item.id}>
                  <Link
                    to={`../${item.category}/${item.itemId}`}
                    className={styles.dropdown__link}
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    {item.name}
                  </Link>
                </div>
              ))}

            {!loaded && <Loader />}

            {loaded && !items.length && (
              <div className={styles.dropdown__error}>
                <p>No results found</p>
              </div>
            )}
          </div>
        </div>
      )}
    </form>
  );
};
