import './PayVisa.scss';

// ui components : comPay
// 원본 퍼블리싱 파일: docs/html-src/html/common/comPay.html

/**
 * 해외통화 결제 카드 컴포넌트
 *
 * @param {Array} cards - 카드 로고 목록. [{ type, image, alt }]
 *   type은 'visa'|'master' 등 브랜드 클래스(.item.visa 처럼 비활성 표시에 쓰인다).
 * @param {string} payChangeLabel - 하단 링크 텍스트. 기본값 '원화(KRW) 결제로 전환'
 * @param {function} onPayChange - 하단 링크 클릭 핸들러
 */
function PayVisa({
  cards = [
    { type: 'visa', image: '/images/common/ic_240_visa.png', alt: '비자카드' },
    { type: 'master', image: '/images/common/ic_240_master.png', alt: '마스터카드' },
  ],
  payChangeLabel = '원화(KRW) 결제로 전환',
  onPayChange,
}) {
  return (
    <div className="comPay">
      <ul className="cardList">
        {cards.map((card) => (
          <li key={card.type} className={`item ${card.type}`}>
            <img src={card.image} alt={card.alt} />
          </li>
        ))}
      </ul>
      <p className="payChange">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onPayChange?.();
          }}
        >
          {payChangeLabel}
        </a>
      </p>
    </div>
  );
}

export default PayVisa;
