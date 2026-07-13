import { Fragment } from 'react';
import styles from './TicketSeat.module.scss';

// ui components : comSeat
// 원본 퍼블리싱 파일: docs/html-src/html/common/comSeat.html

/**
 * 좌석변경 컴포넌트
 *
 * @param {'map'|'summary'} variant - 'map'(기본) = 좌석 범례 + 좌석 배치도(.seatBox).
 *   'summary' = 선택좌석 요약 바(.sltInfo)만 보여준다.
 *
 * variant='map' 전용:
 * @param {Array} rows - 좌석 배치도의 줄 목록. [{ seats: [seat], aisleAfter }]
 *   seat 필드: id, label, direction('re'|'fo'), checked, disabled, empty(빈 좌석), unselectable(선택 불가 표시)
 *   aisleAfter: true면 이 줄 다음에 통로(.aisle)를 그린다.
 * @param {boolean} aisleReverse - 통로 방향을 반대로(.aisleRe) 그릴지 여부
 * @param {function} onToggleSeat - 좌석 체크박스 클릭 시 (id)를 인자로 호출
 *
 * variant='summary' 전용:
 * @param {number} checkedCount - 현재 선택한 좌석 수
 * @param {number} totalCount - 선택 가능한 총 좌석 수
 * @param {Array} checkedSeats - 선택된 좌석 라벨 목록(예: ['5A', '6B'])
 */
function TicketSeat({
  variant = 'map',
  rows = [],
  aisleReverse = false,
  onToggleSeat,
  checkedCount = 0,
  totalCount = 0,
  checkedSeats = [],
}) {
  if (variant === 'summary') {
    return (
      <div className={styles.comSeat}>
        <div className={styles.seatWrap}>
          <div className={styles.sltInfo}>
            <div className={styles.left}>
              <p className={styles.txtGray}>선택좌석</p>
              <p className={styles.txtBlack}>
                <span className={styles.checked}>{checkedCount}</span>
                <em className={styles.txtBlack}>/</em>
                <span>{totalCount}</span>
                <em className={styles.txtBlack}>석</em>
              </p>
              <p className={`${styles.txtBlack} ${styles.txtLast}`}>선택</p>
            </div>
            <div className={styles.right}>
              {checkedSeats.map((label) => (
                <p key={label} className={styles.seatChkd}>
                  {label}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.comSeat}>
      <div className={styles.seatWrap}>
        <div className={styles.seatFilter}>
          <div className={styles.filterBox}>
            <p>
              <img src="/images/common/ic_50_seat_dft.svg" alt="" />
            </p>
            <p className={styles.txt}>순방향</p>
          </div>
          <div className={styles.filterBox}>
            <p>
              <img src="/images/common/ic_50_seat_dft_re.svg" alt="" />
            </p>
            <p className={styles.txt}>역방향</p>
          </div>
          <div className={styles.filterBox}>
            <p>
              <img src="/images/common/ic_50_seat_chk.svg" alt="" />
            </p>
            <p className={styles.txt}>선택불가</p>
          </div>
        </div>

        <div className={styles.seatBox} role="list" aria-label="좌석 목록">
          <div className={styles.seatArea}>
            {rows.map((row, rowIdx) => (
              <Fragment key={rowIdx}>
                <div className={styles.seatRow}>
                  <div className={styles.defaultArea}>
                    {row.seats.map((seat) => {
                      if (seat.empty) {
                        return (
                          <div key={seat.id} className={styles.seat} aria-hidden="true">
                            <span className={styles.seatEmpty} />
                          </div>
                        );
                      }

                      const directionClass = seat.direction === 're' ? styles.seatRe : styles.seatFo;

                      if (seat.unselectable) {
                        return (
                          <div
                            key={seat.id}
                            className={`${styles.seat} ${directionClass}`}
                            role="img"
                            aria-label="선택 불가능한 좌석"
                          >
                            <span
                              className={seat.direction === 're' ? styles.notSltSeatRe : styles.notSltSeatFo}
                            />
                          </div>
                        );
                      }

                      return (
                        <div key={seat.id} className={`${styles.seat} ${directionClass}`}>
                          <input
                            type="checkbox"
                            className="blind"
                            id={seat.id}
                            aria-label={`${seat.label} ${seat.direction === 're' ? '역방향' : '순방향'} 좌석`}
                            checked={seat.checked}
                            disabled={seat.disabled}
                            onChange={() => onToggleSeat?.(seat.id)}
                          />
                          <label htmlFor={seat.id}>
                            <span>{seat.label}</span>
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {row.aisleAfter && (
                  <div className={`${styles.aisle} ${aisleReverse ? styles.aisleRe : ''}`.trim()}>
                    <span aria-hidden="true" />
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketSeat;
