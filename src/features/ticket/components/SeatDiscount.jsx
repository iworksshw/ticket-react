import styles from './SeatDiscount.module.scss';

// ui components : comDiscount
// 원본 퍼블리싱 파일: docs/html-src/html/common/comDiscount.html

/**
 * 할인선택 - 좌석/요금 정보 컴포넌트
 *
 * @param {string} carNum - 호차 (예: '5호차')
 * @param {string} seatNum - 좌석 번호 (예: '5D')
 * @param {string} regularPrice - 운임 (예: '13,000원')
 * @param {string} discountPrice - 할인 금액 (예: '3,500원')
 * @param {string} finalPrice - 결제금액 (예: '9,500원')
 */
function SeatDiscount({ carNum, seatNum, regularPrice, discountPrice, finalPrice }) {
  return (
    <div className={styles.comDiscount}>
      <div className={styles.ticketInfo}>
        <div className={styles.inner}>
          <div className={styles.seatPlan}>
            <span className={styles.carNum}>{carNum}</span>
            <span>{seatNum}</span>
          </div>
          <div className={styles.price}>
            <div className={styles.regular}>
              <span>운임</span>
              <p>{regularPrice}</p>
            </div>
            <div className={styles.subtract}>
              <span className="blind">- 빼기</span>
            </div>
            <div className={styles.discount}>
              <span>할인</span>
              <p>{discountPrice}</p>
            </div>
            <div className={styles.equal}>
              <span className="blind">= 등호</span>
            </div>
            <div className={styles.finalPrice}>
              <span>결제금액</span>
              <p>{finalPrice}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeatDiscount;
