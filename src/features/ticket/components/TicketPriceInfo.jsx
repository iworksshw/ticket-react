import Button from '@/components/common/forms/Button';
import ButtonGroup from '@/components/common/forms/ButtonGroup';
import styles from './TicketPriceInfo.module.scss';

// ui components : comTicketPriceInfo
// 원본 퍼블리싱 파일: docs/html-src/html/common/comTicketPriceInfo.html

/**
 * 결제정보 컴포넌트
 *
 * @param {Array} priceList - 가격 항목 목록. [{ id, label, price, won, divLine, total }]
 *   - divLine: true면 원본 html의 .info.divLine으로 그린다.
 *   - total: true면 합계 행(.info.total)으로 그리며, 바로 위 행과의 사이에 점선 구분선이 들어간다.
 *   - won: price 뒤에 작게 붙는 단위 텍스트(예: '원')를 분리해서 보여줄 때 사용.
 * @param {string} cartLabel - 장바구니 버튼 텍스트. 기본값 '장바구니'
 * @param {string} payLabel - 결제 버튼 텍스트. 기본값 '결제하기'
 * @param {function} onCart - 장바구니 버튼 클릭 핸들러
 * @param {function} onPay - 결제 버튼 클릭 핸들러
 */
function TicketPriceInfo({
  priceList = [],
  cartLabel = '장바구니',
  payLabel = '결제하기',
  onCart,
  onPay,
}) {
  return (
    <div className={styles.comTicketPriceInfo}>
      {priceList.map((item) => {
        const infoClass = [
          styles.info,
          item.divLine && styles.divLine,
          item.total && styles.total,
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <dl key={item.id} className={infoClass}>
            <dt className={styles.tit}>{item.label}</dt>
            <dd className={styles.desc}>
              {item.price}
              {item.won && <span className={styles.won}>{item.won}</span>}
            </dd>
          </dl>
        );
      })}

      <ButtonGroup isCta>
        <Button variant="dkLine" size="lg" onClick={onCart}>
          {cartLabel}
        </Button>
        <Button variant="blue" size="lg" onClick={onPay}>
          {payLabel}
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default TicketPriceInfo;
