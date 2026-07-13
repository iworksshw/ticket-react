import Button from '@/components/common/forms/Button';
import styles from './TicketDiscount.module.scss';

//ui components : comTicketDiscount

/**
 * 티켓 할인 컴포넌트
 *
 * @param {Array} discountList - 좌석별 할인 정보 배열
 * @param {object} summary - 하단 운임/할인 요약. 없으면(undefined) 그 영역을 생략한다.
 * @param {'price'|'cancelPrice'} variant - 'price'(기본) = 원본 comTicketDiscount.html처럼
 *   취소선 가격 + "할인선택" 버튼을 보여준다. 'cancelPrice' = 티켓정보 화면 안에 들어가는 형태로,
 *   버튼 없이 운임/할인/결제 3줄 분석표(.cancelPrice)만 보여준다.
 * @param {boolean} selectable - true면 좌석을 체크박스로 선택하는 형태(.frmChoBox)로 alignL을 그린다.
 * @param {Array} selectedSeats - selectable일 때 현재 선택된 좌석 id 배열
 * @param {function} onToggleSeat - selectable일 때 체크박스 클릭 시 (id)를 인자로 호출
 * @param {function} onSelect - variant='price'일 때 "할인선택" 버튼 클릭 시 (item)을 인자로 호출
 *
 * item 필드:
 *  - 공통: id, car, seat, discountLabel(선택)
 *  - variant='price': oldPrice, price
 *  - variant='cancelPrice': fare:{price,won}, discount:{price,won}, payment:{price,won}
 */
function TicketDiscount({
  discountList = [],
  summary,
  variant = 'price',
  selectable = false,
  selectedSeats = [],
  onToggleSeat,
  onSelect,
}) {
  return (
    <div className={styles.comTicketDiscount}>
      <ul className={styles.discountList}>
        {discountList.map((item) => {
          // 좌석 표시 내용(호차/좌석번호/할인뱃지)은 selectable 여부와 상관없이 동일해서
          // 미리 만들어두고, alignL 쪽에서 체크박스로 감쌀지/그냥 보여줄지만 분기한다.
          const seatLabel = (
            <>
              <span>{item.car}</span>
              <span>{item.seat}</span>
              {item.discountLabel && (
                <span className={styles.colorBlue}>{item.discountLabel}</span>
              )}
            </>
          );

          return (
            <li key={item.id} className={styles.discItem}>
              <div className={styles.infoBox}>
                {selectable ? (
                  // frmGroup/frmChoBox/iptChk/iptLbl은 전역 폼 클래스(src/styles/etc/_form.scss)라서
                  // styles.xxx가 아니라 문자열 그대로 사용한다(Button의 .btn과 같은 이유).
                  <div className={styles.alignL}>
                    <div className="frmGroup">
                      <div className="frmChoBox">
                        <input
                          id={item.id}
                          type="checkbox"
                          className="iptChk"
                          checked={selectedSeats.includes(item.id)}
                          onChange={() => onToggleSeat?.(item.id)}
                        />
                        <label htmlFor={item.id} className="iptLbl">
                          {seatLabel}
                        </label>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={styles.alignL}>{seatLabel}</div>
                )}

                {variant === 'cancelPrice' ? (
                  <div className={styles.alignR}>
                    <div className={styles.cancelPrice}>
                      <dl className={styles.info}>
                        <dt className={styles.tit}>운임</dt>
                        <dd className={styles.desc}>
                          <span className={styles.bold}>{item.fare?.price}</span>
                          {item.fare?.won && <span className={styles.won}>{item.fare.won}</span>}
                        </dd>
                      </dl>
                      <dl className={styles.info}>
                        <dt className={styles.tit}>할인</dt>
                        <dd className={styles.desc}>
                          <span className={styles.bold}>{item.discount?.price}</span>
                          {item.discount?.won && (
                            <span className={styles.won}>{item.discount.won}</span>
                          )}
                        </dd>
                      </dl>
                      <dl className={`${styles.info} ${styles.allPrice}`}>
                        <dt className={styles.tit}>결제</dt>
                        <dd className={styles.desc}>
                          <span className={styles.bold}>{item.payment?.price}</span>
                          {item.payment?.won && (
                            <span className={styles.won}>{item.payment.won}</span>
                          )}
                        </dd>
                      </dl>
                    </div>
                  </div>
                ) : (
                  <div className={styles.alignR}>
                    <span className={styles.oldPrice}>{item.oldPrice}</span>
                    <span className={styles.price}>
                      <span className={styles.bold}>{item.price}</span>
                    </span>
                  </div>
                )}
              </div>

              {/* cancelPrice 변형은 원본 html에 버튼이 없는 분석표 전용 형태라서 btnBox를 그리지 않는다. */}
              {variant !== 'cancelPrice' && (
                <div className={styles.btnBox}>
                  <Button variant="dkLine" onClick={() => onSelect?.(item)}>
                    할인선택
                  </Button>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {summary && (
        <ul className={styles.infoList}>
          <li className={styles.item}>
            <dl className={styles.info}>
              <dt className={styles.tit}>운임</dt>
              <dd className={styles.desc}>
                <span className={styles.price}>
                  <span className={styles.bold}>{summary.fare}</span>
                </span>
              </dd>
            </dl>
            <dl className={styles.info}>
              <dt className={styles.tit}>할인</dt>
              <dd className={styles.desc}>
                <span className={styles.price}>
                  <span className={`${styles.bold} ${styles.colorBlue}`}>{summary.discount}</span>
                </span>
              </dd>
            </dl>
          </li>
        </ul>
      )}
    </div>
  );
}

export default TicketDiscount;
