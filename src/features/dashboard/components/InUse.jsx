//UI Components : boardingArea (나의 AREX 이용정보)
/**
 * 나의 AREX 이용정보 영역 (마이페이지 대시보드)
 * @param {object} styles - 상위 DashBoard.module.scss에서 내려받는 스타일 객체
 * @param {Array} items - [{ txt, count, href, onClick }] 이용실적 목록
 */
function InUse({ styles, items = [] }) {
  return (
    <div className={styles.boardingArea}>
      <p className={styles.tit}>
        <span>나의 AREX 이용정보<em>(최근 1년)</em></span>
      </p>
      <div className={styles.infoCont}>
        {items.map((item) => (
          <a key={item.txt} href={item.href || '#'} className={styles.box} onClick={item.onClick}>
            <p className={styles.txt}>{item.txt}</p>
            <p className={styles.count}><span className={styles.num}>{item.count}</span>건</p>
          </a>
        ))}
      </div>
    </div>
  );
}

export default InUse;
