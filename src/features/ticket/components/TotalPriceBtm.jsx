import styles from './TotalPriceBtm.module.scss';

// ui components : comTotalPriceBtm
// 원본 퍼블리싱 파일: docs/html-src/html/common/comTotalPriceBtm.html

/**
 * 콘텐츠 하단 총 결제금액 컴포넌트
 * @param {Array} items - 금액 항목 목록. [{ id, label, amount, wonText, highlight }]
 *   - label: 항목명(승차권, 상품 등)
 *   - amount: 금액 텍스트(예: '0원', 'US $1.81')
 *   - wonText: 원화 환산 보조 텍스트(선택, 예: '(₩2,000)')
 *   - highlight: true면 금액에 강조 색상(colorBlue) 적용 (보통 총 결제 금액 항목)
 */
const TotalPriceBtm = ({ items = [] }) => {
  return (
    <div className={styles.comTotalPriceBtm}>
      {items.map((item) => (
        <dl className={styles.info} key={item.id}>
          <dt className={styles.tit}>{item.label}</dt>
          <dd className={styles.desc}>
            <span className={`bold ${item.highlight ? styles.colorBlue : ''}`.trim()}>{item.amount}</span>
            {item.wonText && <span className={styles.won}>{item.wonText}</span>}
          </dd>
        </dl>
      ))}
    </div>
  );
};

export default TotalPriceBtm;
