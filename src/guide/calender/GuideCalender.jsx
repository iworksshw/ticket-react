import { useState } from 'react';
import Calender from '@/features/calender/components/Calender';

function pad2(n) {
  return String(n).padStart(2, '0');
}

function dateKey(date) {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
}

function addDays(base, offset) {
  const d = new Date(base);
  d.setDate(d.getDate() + offset);
  return d;
}

function isWeekend(date) {
  const day = date.getDay();
  return day === 0 || day === 6;
}

// 버튼 색상이 td.weekday/td.weekend(부모 셀)에서 정해지기 때문에, "단체예약"은 반드시 평일에,
// "개별예약"은 반드시 주말에 배치되도록 날짜를 직접 찾는다.
function findWeekdayOffset(base, count) {
  const step = count >= 0 ? 1 : -1;
  let d = base;
  let found = 0;
  while (found < Math.abs(count)) {
    d = addDays(d, step);
    if (!isWeekend(d)) found += 1;
  }
  return d;
}

function findWeekendOffset(base, count) {
  const step = count >= 0 ? 1 : -1;
  let d = base;
  let found = 0;
  while (found < Math.abs(count)) {
    d = addDays(d, step);
    if (isWeekend(d)) found += 1;
  }
  return d;
}

function GuideCalender() {
  const [now] = useState(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  });

  const pastWeekday = findWeekdayOffset(now, -1);
  const pastWeekend = findWeekendOffset(now, -1);
  const futureWeekday = findWeekdayOffset(now, 1);
  const futureWeekend = findWeekendOffset(now, 1);
  const closedWeekend = findWeekendOffset(now, 2);

  // '오늘' 칸은 평일/주말 여부에 따라 코스 표시 방식(시간형/인원형)도 달라져야 자연스럽다.
  const todayFin = isWeekend(now)
    ? [{ courseNo: 5, capacity: { current: 30, total: 30, highlight: true } }]
    : [
        { courseNo: 3, time: '10:10', status: '마감' },
        { courseNo: 3, time: '10:10', status: '마감' },
      ];

  const data = {
    [dateKey(pastWeekday)]: {
      finList: [{ courseNo: 3, time: '10:10', status: '마감' }],
    },
    [dateKey(pastWeekend)]: {
      finList: [{ courseNo: 5, capacity: { current: 30, total: 30 } }],
    },
    [dateKey(now)]: {
      modifiers: ['end'],
      finList: todayFin,
      button: { label: '마감' },
    },
    [dateKey(futureWeekday)]: {
      finList: [{ courseNo: 3, time: '10:10', status: '마감' }],
      button: { label: '단체예약' },
    },
    [dateKey(futureWeekend)]: {
      finList: [{ courseNo: 5, capacity: { current: 15, total: 30, highlight: true } }],
      button: { label: '개별예약' },
    },
    [dateKey(closedWeekend)]: {
      modifiers: ['end'],
      finList: [{ courseNo: 5, capacity: { current: 30, total: 30, highlight: true } }],
      button: { label: '마감' },
    },
  };

  return (
    <>
      <h3>Calender Guide</h3>
      <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/features/calender/components/Calender.jsx</p>

      {/* 기본 */}
      <div style={{ marginBottom: '20px' }}>
        <h4>기본</h4>
        <Calender
          year={now.getFullYear()}
          month={now.getMonth() + 1}
          count={158}
          data={data}
        />
      </div>
    </>
  );
}
export default GuideCalender;
