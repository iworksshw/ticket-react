//UI Components : boardingArea (나의 신청정보)
/**
 * 나의 신청정보 영역 (마이페이지 대시보드)
 * @param {object} styles - 상위 DashBoard.module.scss에서 내려받는 스타일 객체
 * @param {Array} items - [{ txt, current, total, href, onClick }] 신청정보 목록
 */
function InMy({ styles, items = [] }) {
  return (
    <div className={styles.boardingArea}>
      <p className={styles.tit}>나의 신청정보</p>
      <div className={styles.myCont}>
        {items.map((item) => (
          <a key={item.txt} href={item.href || '#'} className={styles.box} onClick={item.onClick}>
            <p className={styles.txt}>{item.txt}</p>
            <p className={styles.count}>
              <span className={styles.blueTxt}>{item.current}</span>건 / <span>{item.total}</span>건
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}

export default InMy;
