import { useEffect, useRef, useState } from 'react';
import styles from './Product.module.scss';
import Select from '@/components/common/forms/Select';
import NumberInput from '@/components/common/forms/NumberInput';
import SwiperProduct from '@/components/swiper/SwiperProduct';

//UI Components : cptProduct

const SECTION_LABELS = ['상품상세', '상품수령안내', '반품/교환 방법'];
const SECTION_KEYS = ['detail', 'receive', 'method'];

let cartLineUid = 0;

/**
 * 추천상품 상세 컴포넌트
 * @param {Array} images - 상품 이미지 목록 [{ src, alt }], SwiperProduct(이미지 캐러셀)에 전달된다
 * @param {string} title - 상품명
 * @param {number} originalPrice - 할인 전 가격(취소선 표시), 없으면 생략
 * @param {number} price - 판매 가격
 * @param {boolean} soldOut - 품절 여부
 * @param {string} discountLabel - 할인 뱃지 텍스트 (예: '기간할인')
 * @param {string} expiry - 판매/할인 종료 안내 텍스트
 * @param {number} stock - 재고 수량
 * @param {Array} options - 옵션 셀렉트 목록 [{ label, choices: [{ label, value }] }]
 * @param {Array} initialCartLines - 담긴 상품 목록 초기값 [{ label, unitPrice, quantity, hasOptions }]
 *   - hasOptions가 true면 삭제 버튼과 옵션별 소계(subDesc)가 함께 표시된다.
 * @param {function} onCartLinesChange - cartLines(수량 등)가 바뀔 때마다 호출된다. "담기" 버튼처럼
 *   이 컴포넌트 바깥(팝업 footer 등)에서 현재 담긴 수량/총액을 알아야 할 때 사용한다.
 * @param {ReactNode} detailContent - "상품상세" 섹션 콘텐츠
 * @param {ReactNode} receiveContent - "상품수령안내" 섹션 콘텐츠
 * @param {ReactNode} methodContent - "반품/교환 방법" 섹션 콘텐츠
 */
const Product = ({
  images = [],
  title,
  originalPrice,
  price = 0,
  soldOut = false,
  discountLabel,
  expiry,
  stock,
  options = [],
  initialCartLines = [],
  onCartLinesChange,
  detailContent,
  receiveContent,
  methodContent,
}) => {
  const sectionRefs = useRef({});
  const [cartLines, setCartLines] = useState(() =>
    initialCartLines.map((line) => ({ ...line, id: line.id ?? `cart-${cartLineUid++}` }))
  );
  // 옵션 셀렉트마다 선택값을 추적 (index를 key로 사용, options는 정적 목록이라 안전하다)
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    onCartLinesChange?.(cartLines);
  }, [cartLines, onCartLinesChange]);

  const handleOptionChange = (index, value) => {
    setSelectedOptions((prev) => ({ ...prev, [index]: value }));
  };

  const handleQuantityChange = (id, nextValue) => {
    setCartLines((prev) => prev.map((line) => (line.id === id ? { ...line, quantity: nextValue } : line)));
  };

  const handleRemoveLine = (id) => {
    setCartLines((prev) => prev.filter((line) => line.id !== id));
  };

  const totalPrice = cartLines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0);

  const scrollToSection = (index) => {
    sectionRefs.current[SECTION_KEYS[index]]?.scrollIntoView({ behavior: 'smooth' });
  };

  // 세 박스(상세/수령안내/반품교환)가 각각 자기 위치에 맞는 탭만 nth-child로 고정 강조한다.
  // swiper 없는 정적 탭바라, 열고닫는 탭이 아니라 "여기로 이동" 앵커라서 클릭해도 강조 위치는
  // 바뀌지 않고 스크롤만 이동한다.
  const renderAnchorTabs = (highlightIndex) => (
    <div className={styles.modTab}>
      <div className={styles.tabSwiper}>
        <ul className={`${styles.tabMenu} ${styles[`tabMenu${highlightIndex + 1}`]}`}>
          {SECTION_LABELS.map((label, index) => (
            <li className={styles.tabItem} key={label}>
              <button type="button" className={styles.tabName} onClick={() => scrollToSection(index)}>
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div className={styles.cptProduct}>
      <div className={styles.productArea}>
        <div className={styles.productBox}>
          <SwiperProduct images={images} />

          <div className={styles.productPay}>
            <p className={styles.tit}>{title}</p>
            {originalPrice != null && <p className={styles.subDiscount}>{originalPrice.toLocaleString()}원</p>}
            <p className={`${styles.subTit} ${soldOut ? styles.soldOut : ''}`.trim()}>
              {price.toLocaleString()}원
              {soldOut && <span className={styles.soldOutTxt}>품절</span>}
            </p>

            {(discountLabel || expiry || stock != null) && (
              <div className={styles.dateBox}>
                {discountLabel && <p className={styles.txt}>{discountLabel}</p>}
                {expiry && <p className={styles.expiry}>{expiry}</p>}
                {stock != null && <p className={styles.stock}>재고 {stock}개</p>}
              </div>
            )}

            {options.length > 0 && (
              <div className={styles.infoOption}>
                {options.map((option, index) => (
                  <div className={styles.box} key={`${option.label}-${index}`}>
                    <div className={styles.txt}>{option.label}</div>
                    <div className="frmGroup">
                      <div className="frmBox">
                        <Select
                          title="옵션 분류"
                          options={option.choices}
                          value={selectedOptions[index] ?? ''}
                          onChange={(e) => handleOptionChange(index, e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {cartLines.map((line) => (
              <dl className={styles.info} key={line.id}>
                <dt className={styles.top}>
                  <span className={styles.cardTxt}>
                    {line.label}
                    {line.hasOptions && (
                      <button type="button" className={styles.deleteBtn} onClick={() => handleRemoveLine(line.id)}>
                        삭제
                      </button>
                    )}
                  </span>
                </dt>
                <dd className={styles.desc}>
                  <NumberInput
                    value={line.quantity}
                    min={0}
                    unit="개"
                    onChange={(next) => handleQuantityChange(line.id, next)}
                  />
                </dd>
                {line.hasOptions && (
                  <dd className={styles.subDesc}>{(line.unitPrice * line.quantity).toLocaleString()}원</dd>
                )}
              </dl>
            ))}

            <div className={styles.payTit}>
              <p className={styles.txt}>총 결제 금액</p>
              <p className={styles.money}>{totalPrice.toLocaleString()}원</p>
            </div>
          </div>
        </div>

        <div className={styles.boxArea}>
          <div className={styles.detailBox} ref={(el) => { sectionRefs.current.detail = el; }}>
            {renderAnchorTabs(0)}
            <div className={styles.editorBox}>{detailContent}</div>
          </div>
          <div className={styles.guideBox} ref={(el) => { sectionRefs.current.receive = el; }}>
            {renderAnchorTabs(1)}
            <div className={styles.editorBox}>{receiveContent}</div>
          </div>
          <div className={styles.methodBox} ref={(el) => { sectionRefs.current.method = el; }}>
            {renderAnchorTabs(2)}
            <div className={styles.editorBox}>{methodContent}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
