import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import styles from './SwiperProduct.module.scss';

//UI Components : productSlide (swiper-container)
/**
 * 상품 이미지 캐러셀(스와이퍼) 컴포넌트
 * @param {Array} images - 이미지 목록 [{ src, alt }]
 */
const SwiperProduct = ({ images = [] }) => {
  const swiperRef = useRef(null);

  return (
    <Swiper
      className={styles.productSlide}
      slidesPerView={1}
      spaceBetween={0}
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
      }}
    >
      <div className={styles.arrowBox}>
        <button
          type="button"
          className={`${styles.btnArrow} ${styles.prev}`}
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <span className="blind">이전 이미지</span>
        </button>
        <button
          type="button"
          className={`${styles.btnArrow} ${styles.next}`}
          onClick={() => swiperRef.current?.slideNext()}
        >
          <span className="blind">다음 이미지</span>
        </button>
      </div>
      {images.map((image, index) => (
        <SwiperSlide key={`${image.src}-${index}`}>
          <img src={image.src} alt={image.alt} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperProduct;
