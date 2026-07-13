import { useId, useMemo, useRef, useState } from 'react';
import styles from './CalendarPop.module.scss';

// html 원본은 tui-date-picker/tui-time-picker/swiper 같은 외부 라이브러리 스크립트를 끌어다 쓰는
// 정적 데모였지만, 이 프로젝트엔 그 라이브러리들이 설치돼 있지 않다(package.json 확인 결과).
// 그래서 라이브러리를 새로 추가하는 대신, 달력 계산은 순수 JS Date로, 시간 슬라이더는
// 가로 스크롤 + 스크롤 버튼으로 동일한 동작을 직접 구현했다.

const WEEKDAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'];
const HOURS = Array.from({ length: 24 }, (_, i) => i + 1); // 01시 ~ 24시
const TIME_ITEM_WIDTH = 80 + 8; // .swiperTime li의 width(80px) + margin-left(8px)

function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function toDateKey(date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

// 화면에 보여줄 달의 6주(42칸) 격자를 만든다. html 원본도 WEEK1~WEEK6까지 항상 6행을 그려서
// 어떤 달이든 레이아웃 높이가 흔들리지 않게 했는데, 그 구조를 그대로 따른 것이다.
// 이전/다음달로 넘치는 날짜도 실제 날짜(이전/다음달 며칠)로 채워서 비어있는 칸이 없게 한다.
function buildCalendarGrid(year, month) {
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  return Array.from({ length: 42 }, (_, i) => {
    const dayOffset = i - firstWeekday;

    if (dayOffset < 0) {
      return { date: new Date(year, month - 1, daysInPrevMonth + dayOffset + 1), isCurrentMonth: false };
    }
    if (dayOffset >= daysInMonth) {
      return { date: new Date(year, month + 1, dayOffset - daysInMonth + 1), isCurrentMonth: false };
    }
    return { date: new Date(year, month, dayOffset + 1), isCurrentMonth: true };
  });
}

/**
 * 팝업 달력 + 시간 선택 컴포넌트
 * @param {(date: Date) => void} onSelectDate - 날짜를 선택했을 때 호출
 * @param {(hour: number) => void} onSelectTime - 시간(1~24)을 선택했을 때 호출
 */
function CalendarPop({ onSelectDate, onSelectTime }) {
  const idPrefix = useId();
  const timeListRef = useRef(null);

  // 오늘 날짜(시간은 00:00으로 맞춰서 날짜 단위로만 비교).
  const today = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now;
  }, []);

  // 현재 화면에 보여주고 있는 달(매달 1일 기준).
  const [viewDate, setViewDate] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const grid = useMemo(
    () => buildCalendarGrid(viewDate.getFullYear(), viewDate.getMonth()),
    [viewDate],
  );

  // 오늘이 속한 달보다 과거로는 못 넘어가게 한다(지난 달 예약은 의미가 없어서).
  const isCurrentMonthView = viewDate.getFullYear() === today.getFullYear() && viewDate.getMonth() === today.getMonth();

  const handlePrevMonth = () => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleSelectDate = (date) => {
    setSelectedDate(date);
    onSelectDate?.(date);
  };

  const handleSelectTime = (hour) => {
    setSelectedTime(hour);
    onSelectTime?.(hour);
  };

  // '한시간뒤로/한시간후로' 버튼으로 시간 목록을 한 칸씩 가로로 스크롤한다(원본의 swiper 슬라이드 대응).
  const scrollTimeList = (direction) => {
    timeListRef.current?.scrollBy({ left: direction * TIME_ITEM_WIDTH, behavior: 'smooth' });
  };

  return (
    <div className={styles.comCalendarMin}>
      <div className={styles.inner}>
        <div className={styles.optionArea}>
          <div className={styles.monthOption}>
            <ul>
              <li className={styles.prev}>
                <button type="button" onClick={handlePrevMonth} disabled={isCurrentMonthView}>이전달</button>
              </li>
              <li className={styles.date}>
                <p>
                  <span className={styles.year}>{viewDate.getFullYear()}</span>년{' '}
                  <span className={styles.month}>{String(viewDate.getMonth() + 1).padStart(2, '0')}</span>월
                </p>
              </li>
              <li className={styles.next}>
                <button type="button" onClick={handleNextMonth}>다음달</button>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.calendar}>
          <table>
            <caption>월요일 화요일 수요일 목요일 금요일 토요일 일요일에 관한 표</caption>
            <colgroup>
              <col span={7} style={{ width: '14.28%' }} />
            </colgroup>
            <thead>
              <tr>
                {WEEKDAY_LABELS.map((label, index) => (
                  <th key={label} className={index === 0 ? styles.sun : index === 6 ? styles.sat : undefined}>
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 6 }, (_, week) => (
                <tr key={week}>
                  {grid.slice(week * 7, week * 7 + 7).map((cell, col) => {
                    const isPast = cell.date < today;
                    const isOverflow = !cell.isCurrentMonth;
                    const isDisabled = isOverflow || isPast;
                    const isToday = isSameDay(cell.date, today);
                    const isSelected = selectedDate && isSameDay(cell.date, selectedDate);
                    const dateId = `${idPrefix}-date-${toDateKey(cell.date)}`;

                    const tdClassName = [
                      col === 0 ? styles.sun : '',
                      col === 6 ? styles.sat : '',
                      isOverflow ? styles.prev : '',
                      isToday ? styles.today : '',
                    ].filter(Boolean).join(' ');

                    return (
                      <td key={dateId} className={tdClassName || undefined}>
                        <input
                          type="radio"
                          name="date"
                          id={dateId}
                          className={isOverflow ? styles.prev : undefined}
                          disabled={isDisabled}
                          checked={Boolean(isSelected)}
                          onChange={() => handleSelectDate(cell.date)}
                        />
                        <label htmlFor={dateId}>{cell.date.getDate()}</label>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.timetable}>
          <em>시간선택</em>
          <div className={styles.timeGroup}>
            <div className={styles.directGroup}>
              <button type="button" className={styles.prev} onClick={() => scrollTimeList(-1)}>한시간뒤로</button>
              <button type="button" className={styles.next} onClick={() => scrollTimeList(1)}>한시간후로</button>
            </div>
            <ul className={styles.swiperTime} ref={timeListRef}>
              {HOURS.map((hour) => {
                const timeId = `${idPrefix}-time-${hour}`;
                return (
                  <li key={timeId}>
                    <input
                      type="radio"
                      name="time"
                      id={timeId}
                      checked={selectedTime === hour}
                      onChange={() => handleSelectTime(hour)}
                    />
                    <label htmlFor={timeId}>{String(hour).padStart(2, '0')}시</label>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalendarPop;
