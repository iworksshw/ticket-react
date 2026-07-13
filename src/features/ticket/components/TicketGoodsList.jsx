import styles from './TicketGoodsList.module.scss';

// ui components : comTicketGoodsList
// 원본 퍼블리싱 파일: docs/html-src/html/common/comTicketGoodsList.html

/**
 * 추천상품목록 컴포넌트
 *
 * @param {Array} goodsList - 화면에 그릴 상품 목록 배열. 기본값은 빈 배열.
 * @param {'link'|'itemBox'} variant - 'link'(기본) = comTicketGoodsList.html의 클릭 가능한 링크형 카드.
 *   'itemBox' = 티켓정보 화면 안에 들어가는, 클릭 불가능한 정보 표시형 카드
 *   (결제완료/취소 뱃지, 옵션 텍스트, 가격·수량·반환금액 같은 자유로운 행을 보여준다).
 * @param {boolean} half - itemBox일 때 한 줄에 2개씩(50% 너비) 배치할지 여부.
 * @param {function} onSelect - variant='link'일 때 카드 클릭 시 (goods)를 인자로 호출.
 *
 * variant='link' item 필드: id, image, alt, name, oldPrice, price, soldOut, won, badge, badgeLabel, date, num
 * variant='itemBox' item 필드:
 *  - id, image, alt, name, optionLabel(선택, 파란색 옵션 텍스트)
 *  - eyebrow: { type: 'complete'|'cancel', label } (선택, 결제완료/결제취소 뱃지)
 *  - infoRows: [{ label, value, sub }] (가격/수량/반환금액 등 자유로운 행. sub는 작은 보조 텍스트(won))
 */
function TicketGoodsList({ goodsList = [], variant = 'link', half = false, onSelect }) {
  const listClassName = half ? `${styles.goodsList} ${styles.half}` : styles.goodsList;

  return (
    <div className={styles.comTicketGoodsList}>
      <ul className={listClassName}>
        {goodsList.map((goods) =>
          variant === 'itemBox' ? (
            <li key={goods.id} className={styles.item}>
              <div className={styles.itemBox}>
                <div className={styles.imgBox}>
                  <img src={goods.image} alt={goods.alt} />
                </div>
                <div className={styles.goodsTit}>
                  {goods.eyebrow && (
                    <div className={`${styles.eyebrow} ${styles[goods.eyebrow.type]}`}>
                      {goods.eyebrow.label}
                    </div>
                  )}
                  <div className={styles.tit}>
                    {goods.name}
                    {goods.optionLabel && (
                      <>
                        {' / '}
                        <span className={styles.colorBlue}>{goods.optionLabel}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className={styles.goodInfo}>
                  {goods.infoRows.map((row) => (
                    <dl key={row.label} className={styles.info}>
                      <dt className={styles.tit}>{row.label}</dt>
                      <dd className={styles.desc}>
                        {row.value}
                        {row.sub && <span className={styles.won}>{row.sub}</span>}
                      </dd>
                    </dl>
                  ))}
                </div>
              </div>
            </li>
          ) : (
            <li key={goods.id} className={styles.item}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onSelect?.(goods);
                }}
              >
                <div className={styles.imgBox}>
                  <img src={goods.image} alt={goods.alt} />
                </div>
                <dl className={styles.info}>
                  <dt className={styles.name}>{goods.name}</dt>
                  <dd className={styles.desc}>
                    <span className={styles.oldPrice}>{goods.oldPrice}</span>
                    <span className={styles.price}>
                      {goods.price}
                      {goods.soldOut && <span className={styles.soldout}>품절</span>}
                    </span>
                    <span className={styles.won}>{goods.won}</span>
                    <span className={styles.other}>
                      <span className={styles[goods.badge]}>{goods.badgeLabel}</span>
                      <span className={styles.date}>{goods.date}</span>
                      <span className={styles.num}>{goods.num}</span>
                    </span>
                  </dd>
                </dl>
              </a>
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export default TicketGoodsList;
