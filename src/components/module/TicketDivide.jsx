import styles from './TicketDivide.module.scss';

//UI Components : cptTicketDivide
// 원본 퍼블리싱 파일: docs/html-src/html/component/cptTicketDivide.html
// divideGroup 안쪽은 다른 컴포넌트들이 들어오는 영역이라 이 컴포넌트는 구조(divideArea/divideL/divideR/divideGroup)만 담당하고,
// 실제 내용은 left/right로 외부(사용하는 쪽)에서 그대로 주입받는다.

/**
 * 승차권 분할 레이아웃 (좌 : 예약/결제정보, 우 : 결제금액)
 * @param {ReactNode} left - divideL > divideGroup 안에 들어갈 콘텐츠
 * @param {ReactNode} right - divideR > divideGroup 안에 들어갈 콘텐츠
 */
function TicketDivide({ left, right }) {
  return (
    <div className={styles.cptTicketDivide}>
      <div className={styles.divideArea}>
        {/* 좌측 영역 */}
        <div className={styles.divideL}>
          <div className={styles.divideGroup}>{left}</div>
        </div>

        {/* 우측 영역 */}
        <div className={styles.divideR}>
          <div className={styles.divideGroup}>{right}</div>
        </div>
      </div>
    </div>
  );
}

export default TicketDivide;
