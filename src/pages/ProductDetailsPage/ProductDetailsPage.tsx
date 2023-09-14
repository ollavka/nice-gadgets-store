/* eslint-disable */
import { useState, useEffect, useMemo, Fragment } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import {
  ColorKey,
  Product,
  ProductCategory,
  ProductDetails,
} from '../../types';
import { SelectImg } from '../../components/SelectImg/SelectImg';
import { ColorFunctionality } from '../../components/ColorFunctionality/ColorFunctionality';
import { toast } from 'react-toastify';
import { CapacityFunctionality } from '../../components/CapacityFunctionality/CapacityFunctionality';
import { ButtonsFunctionality } from '../../components/ButtonsFunctionality/ButtonsFunctionality';
import { SwiperProducts } from '../../components/SwiperProducts/SwiperdProducts';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  selectProductDetails,
  selectSuggestedProducts,
} from '../../redux/selectors';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { fecthSuggestedProducts } from '../../redux/slices/suggestedProductsSlice';
import { scrollToTop } from '../../helpers/scrollToTop';
import {
  clearDetails,
  fecthProductDetails,
} from '../../redux/slices/productDetailsSlice';
import { SkeletonProductPage } from '../../components/Skeletons/SkeletonProductPage/SkeletonProductPage';
import { ProductsListSkeleton } from '../../components/Skeletons/ProductListSkeleton/ProductListSkeleton';
import { normalizeImage } from '../../helpers/normalizeImage';

import container from '../../styles/utils/container.module.scss';
import styles from './ProductDetailsPage.module.scss';
import notifStyles from '../../styles/utils/notification.module.scss';
import arrowRightDisable from '../../assets/icons/gray-arrows/arrow-left.svg';

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const { pathname } = useLocation();

  const dispatch = useAppDispatch();
  const [activeImg, setActiveImg] = useState('');

  const {
    item: productDetails,
    loaded: detailsLoaded,
    hasError: detailsError,
  } = useAppSelector(selectProductDetails);

  const {
    data: { discount },
    loaded: suggestedLoaded,
    hasError: suggestedError,
  } = useAppSelector(selectSuggestedProducts);

  const emptyDetails = !detailsLoaded || !Object.keys(productDetails).length;

  const productImages = useMemo(() => {
    if (emptyDetails) {
      return [];
    }

    return productDetails.images.map(normalizeImage);
  }, [productId, detailsLoaded, productDetails]);

  const currentProduct = useMemo(() => {
    if (emptyDetails) {
      return null;
    }

    const { priceDiscount, priceRegular } = productDetails;
    const [productCategory] = pathname.split('/').filter(Boolean);

    const product: Product = {
      id: '',
      category: productCategory as ProductCategory,
      phoneId: '',
      itemId: '',
      name: '',
      fullPrice: priceRegular,
      price: priceDiscount,
      screen: '',
      capacity: '',
      color: '',
      ram: '',
      year: 0,
      image: activeImg,
    };

    for (const key in productDetails) {
      if (!(key in product)) {
        continue;
      }

      product[key] = productDetails[key];
    }

    return product;
  }, [productId, detailsLoaded, activeImg]);

  const redirectToProduct = (
    options: Partial<Pick<ProductDetails, 'capacity' | 'color'>>,
  ) => {
    if (!productDetails) {
      return '.';
    }

    const { color, capacity } = options;

    const { namespaceId } = productDetails;

    const currentColor = color || productDetails.color || '';
    const currentCapacity = capacity || productDetails.capacity || '';

    const urlPaths = [namespaceId, currentCapacity, currentColor].filter(
      Boolean,
    );

    const url = `../${urlPaths.join('-')}`;

    return url.toLowerCase().trim();
  };

  useEffect(() => {
    scrollToTop();

    if (!productId) {
      return;
    }

    dispatch(fecthProductDetails(productId));
  }, [productId]);

  useEffect(() => {
    if (suggestedLoaded) {
      return;
    }

    dispatch(fecthSuggestedProducts());
  }, [suggestedLoaded]);

  useEffect(() => {
    if (!productImages.length) {
      return;
    }

    setActiveImg(productImages[0]);
  }, [productImages]);

  useEffect(() => {
    return () => {
      dispatch(clearDetails());
    };
  }, [productId]);

  useEffect(() => {
    if (!currentProduct && detailsLoaded) {
      toast.error('Something went wrong!', {
        bodyClassName: notifStyles.notification,
      });
    }

  }, [currentProduct, detailsLoaded])

  if (!currentProduct && detailsLoaded) {
    return (
      <div className={styles.PhonesDetails}>
        <div className={container.limit}>
          <Breadcrumbs className={styles.breadcrumbs} />
          <Link to="/phones" className={styles.button}>
            <img src={arrowRightDisable} alt="arrow" />
            Back
          </Link>

          <h2 className={styles.error}>No such product was found 🧐</h2>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.PhonesDetails}>
      <div className={container.limit}>
        <Breadcrumbs className={styles.breadcrumbs} />
        <Link to="/phones" className={styles.button}>
          <img src={arrowRightDisable} alt="arrow" />
          Back
        </Link>

        {!detailsLoaded || !currentProduct || !suggestedLoaded ? (
          <>
            <SkeletonProductPage />
            <ProductsListSkeleton className={styles.skeletonList} />
          </>
        ) : (
          <>
            <h2 className={styles.PhonesDetails__title}>
              {productDetails.name}
            </h2>

            <div className={styles.detailsCard}>
              <div className={styles.photo}>
                <SelectImg
                  images={productImages}
                  activeImg={activeImg}
                  setActiveImg={setActiveImg}
                  title={productDetails.name}
                  className={styles.thumbImages}
                />

                <div className={styles.photo__current}>
                  <img
                    className={styles.image}
                    src={activeImg}
                    alt={productDetails.name}
                  />
                </div>
              </div>

              <div className={styles.functional}>
                {productDetails.colorsAvailable &&
                  productDetails.colorsAvailable.length > 0 && (
                    <ColorFunctionality
                      colors={productDetails.colorsAvailable as ColorKey[]}
                      redirect={redirectToProduct}
                    />
                  )}

                {productDetails.capacityAvailable &&
                  productDetails.capacityAvailable.length > 0 && (
                    <CapacityFunctionality
                      capacityList={productDetails.capacityAvailable}
                      redirect={redirectToProduct}
                    />
                  )}

                {!detailsError && (
                  <ButtonsFunctionality
                    product={currentProduct}
                    productDetails={productDetails}
                  />
                )}
              </div>
            </div>

            <div className={styles.GridContainer}>
              <article className={styles.About}>
                <h3
                  className={`${styles.GridContainer__title} ${styles.About__title}`}
                >
                  About
                </h3>
                {!detailsError &&
                  productDetails.description.map((info) => (
                    <Fragment key={info.title}>
                      <h4 className={styles.About__info}>{info.title}</h4>
                      <p className={styles.About__text}>{info.text.join()}</p>
                    </Fragment>
                  ))}
              </article>

              <article className={styles.TechInfo}>
                <h3
                  className={`${styles.GridContainer__title} ${styles.TechInfo__title}`}
                >
                  Tech specs
                </h3>

                <ul className={styles.TechInfo__characteristics}>
                  <li className={styles.TechInfo__characteristic}>
                    <p>Screen</p>
                    <p className={styles.TechInfo__value}>
                      {productDetails.screen || '-'}
                    </p>
                  </li>
                  <li className={styles.TechInfo__characteristic}>
                    <p>Resolution</p>
                    <p className={styles.TechInfo__value}>
                      {productDetails.resolution || '-'}
                    </p>
                  </li>
                  <li className={styles.TechInfo__characteristic}>
                    <p>Processor</p>
                    <p className={styles.TechInfo__value}>
                      {productDetails.processor || '-'}
                    </p>
                  </li>
                  <li className={styles.TechInfo__characteristic}>
                    <p>RAM</p>
                    <p className={styles.TechInfo__value}>
                      {productDetails.ram || '-'}
                    </p>
                  </li>
                  <li className={styles.TechInfo__characteristic}>
                    <p>Built in memory</p>
                    <p className={styles.TechInfo__value}>
                      {productDetails.capacity || '-'}
                    </p>
                  </li>
                  <li className={styles.TechInfo__characteristic}>
                    <p>Camera</p>
                    <p className={styles.TechInfo__value}>
                      {productDetails.camera || '-'}
                    </p>
                  </li>
                  <li className={styles.TechInfo__characteristic}>
                    <p>Zoom</p>
                    <p className={styles.TechInfo__value}>
                      {productDetails.zoom || '-'}
                    </p>
                  </li>
                  <li className={styles.TechInfo__characteristic}>
                    <p>Cell</p>
                    <p className={styles.TechInfo__value}>
                      {!productDetails.cell || !productDetails.cell.length
                        ? '-'
                        : productDetails.cell.join(' ')}
                    </p>
                  </li>
                </ul>
              </article>
            </div>
            {!suggestedError && (
              <div className={styles.swiperContainer}>
                <SwiperProducts title="You may also like" items={discount} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
