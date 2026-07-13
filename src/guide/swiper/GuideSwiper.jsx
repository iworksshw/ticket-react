//스와이퍼
import SwiperProduct from '@/components/swiper/SwiperProduct';

const productImages = [
  { src: '/images/contents/cont_01_01_16_001.jpg', alt: '라인프렌즈 한복 세로형 티머니카드 이미지 1' },
  { src: '/images/contents/cont_01_01_16_001.jpg', alt: '라인프렌즈 한복 세로형 티머니카드 이미지 2' },
  { src: '/images/contents/cont_01_01_16_001.jpg', alt: '라인프렌즈 한복 세로형 티머니카드 이미지 3' },
];

function GuideSwiper() {
  return (
    <>
      <h3>Swiper Guide</h3>
      <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/components/swiper/SwiperProduct.jsx</p>

      <div style={{ marginBottom: '20px' }}>
        <h4>SwiperProduct (상품 이미지 캐러셀)</h4>
        <div style={{ maxWidth: '500px' }}>
          <SwiperProduct images={productImages} />
        </div>
      </div>
    </>
  );
}
export default GuideSwiper;
