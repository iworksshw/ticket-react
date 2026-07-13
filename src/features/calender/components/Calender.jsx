import { useEffect, useState } from 'react';
import styles from './Calender.module.scss';

const WEEKDAY_LABELS = ['월', '화', '수', '목', '금', '토', '일'];

function pad2(n) {
  return String(n).padStart(2, '0');
}

function toDateKey(date) {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
}

// year/month(1~12) 기준으로 월~일 요일 정렬 + 이전/다음달 넘침 + 오늘/지난날짜 판정을 계산한다.
// 실제 코스/버튼 데이터는 여기서 다루지 않고, 바깥에서 data prop으로 날짜별로만 넘겨받는다.
function buildWeeks(year, month) {
  const firstOfMonth = new Date(year, month - 1, 1);
  const daysInMonth = new Date(year, month, 0).getDate();
  const daysInPrevMonth = new Date(year, month - 1, 0).getDate();
  const startOffset = (firstOfMonth.getDay() + 6) % 7; // 월요일 시작 기준 offset

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const makeCell = (cellDate, base) => {
    const weekdayIndex = (cellDate.getDay() + 6) % 7; // 0=월 ... 6=일
    const modifiers = [...base, weekdayIndex >= 5 ? 'weekend' : 'weekday'];
    if (cellDate.getTime() === today.getTime()) modifiers.push('today');
    if (cellDate.getTime() < today.getTime()) modifiers.push('expired');

    return {
      day: cellDate.getDate(),
      dateKey: toDateKey(cellDate),
      modifiers,
    };
  };

  const cells = [];

  for (let i = 0; i < startOffset; i += 1) {
    const day = daysInPrevMonth - startOffset + 1 + i;
    cells.push(makeCell(new Date(year, month - 2, day), ['prev']));
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(makeCell(new Date(year, month - 1, day), []));
  }

  let nextDay = 1;
  while (cells.length % 7 !== 0) {
    cells.push(makeCell(new Date(year, month, nextDay), ['next']));
    nextDay += 1;
  }

  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return weeks;
}

//UI Components : comCalendar

/**
 * 달력형 예약 캘린더 컴포넌트
 * 날짜 grid(요일 정렬/이전·다음달 넘침/오늘·지난날짜 판정)는 컴포넌트가 직접 계산하고,
 * 날짜별 예약 정보(코스/버튼)만 data prop으로 필요한 날짜만 전달받는다.
 *
 * @param {number} year - 표시할 연도
 * @param {number} month - 표시할 월 (1~12)
 * @param {number} count - 표시 중인 달의 시행횟수
 * @param {object} data - 날짜별 예약 정보. key는 'YYYY-MM-DD'.
 *   { [dateKey]: {
 *       modifiers?: ['end'],
 *       finList?: [{ courseNo, time, capacity:{current,total,highlight}, status }],
 *       button?: { label, onClick },
 *   } }
 * @param {function} onMonthChange - 이전/다음 달로 이동했을 때 (year, month)로 호출된다.
 *   해당 달의 count/data를 새로 준비해서 다시 넘겨줘야 한다(예: API 재조회).
 */
function Calender({ year, month, count, data = {}, onMonthChange }) {
  const [viewYear, setViewYear] = useState(year);
  const [viewMonth, setViewMonth] = useState(month);

  useEffect(() => {
    setViewYear(year);
    setViewMonth(month);
  }, [year, month]);

  const moveMonth = (offset) => {
    let nextYear = viewYear;
    let nextMonth = viewMonth + offset;
    if (nextMonth < 1) {
      nextMonth = 12;
      nextYear -= 1;
    } else if (nextMonth > 12) {
      nextMonth = 1;
      nextYear += 1;
    }
    setViewYear(nextYear);
    setViewMonth(nextMonth);
    onMonthChange?.(nextYear, nextMonth);
  };

  const weeks = buildWeeks(viewYear, viewMonth);

  return (
    <div className={styles.comCalendar}>
      <div className={styles.inner}>
        <div className={styles.optionArea}>
          <div className={styles.monthOption}>
            <ul>
              <li className={styles.prev}>
                <button type="button" onClick={() => moveMonth(-1)} />
              </li>
              <li className={styles.date}>
                <p>
                  <span className={styles.year}>{viewYear}</span>년{' '}
                  <span className={styles.month}>{pad2(viewMonth)}</span>월
                </p>
              </li>
              <li className={styles.next}>
                <button type="button" onClick={() => moveMonth(1)} />
              </li>
            </ul>
          </div>

          <div className={styles.infoOption}>
            <div className={styles.leftBox}>
              <p className={styles.month}><span>{viewMonth}월</span> 시행횟수 : </p>
              <p className={styles.count}> <span>{count}</span>건</p>
            </div>
            <div className={styles.rightBox}>
              <p>
                <span className={styles.blue} />
                <span className={styles.purple} />
                예약가능
              </p>
              <p>
                <span className={styles.gray} />
                마감
              </p>
            </div>
          </div>
        </div>

        <div className={styles.calendar}>
          <table>
            <caption>월요일 화요일 수요일 목요일 금요일에 관한 표</caption>
            <colgroup>
              <col span={7} width="14.28%" />
            </colgroup>
            <thead>
              <tr>
                {WEEKDAY_LABELS.map((label) => (
                  <th key={label}>{label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weeks.map((week, weekIdx) => (
                <tr key={weekIdx}>
                  {week.map((cell) => {
                    const extra = data[cell.dateKey];
                    const modifiers = [...cell.modifiers, ...(extra?.modifiers || [])];
                    const finList = extra?.finList;
                    const button = extra?.button;

                    return (
                      <td key={cell.dateKey} className={modifiers.map((mod) => styles[mod]).join(' ')}>
                        <span className={styles.day}>{cell.day}</span>
                        {finList?.length > 0 && (
                          <ul className={styles.finList}>
                            {finList.map((item, idx) => (
                              <li key={idx}>
                                코스<span>{item.courseNo}</span>
                                {item.time && <>({item.time})</>}
                                {item.capacity && (
                                  <span className={styles.cnt}>
                                    (<span className={item.capacity.highlight ? styles.hglt : undefined}>{item.capacity.current}</span>/<span>{item.capacity.total}</span>명)
                                  </span>
                                )}
                                {item.status && <span>{item.status}</span>}
                              </li>
                            ))}
                          </ul>
                        )}
                        {button && (
                          <button type="button" onClick={button.onClick}>{button.label}</button>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Calender;
