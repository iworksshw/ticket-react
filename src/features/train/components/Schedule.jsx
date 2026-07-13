import React, { useState } from 'react';
import FormCheck from '@/components/common/forms/FormCheck';
import styles from './Schedule.module.scss';

// 좌/우 한쪽 방면 시간표 (체크박스 on/off, 전체 체크박스 동기화는 이 컴포넌트가 독립적으로 관리)
const ScheduleTable = ({ position, stnName, caption, directions, rows }) => {
  const [onMap, setOnMap] = useState(() =>
    directions.reduce((acc, d) => ({ ...acc, [d.id]: true }), {})
  );

  const allOn = directions.every((d) => onMap[d.id]);
  const allId = `${position}All`;

  const colorOnMap = directions.reduce(
    (acc, d) => ({ ...acc, [d.color]: onMap[d.id] }),
    {}
  );

  const handleChange = (e) => {
    const targetId = e.target.id;
    if (targetId === allId) {
      const next = !allOn;
      setOnMap(directions.reduce((acc, d) => ({ ...acc, [d.id]: next }), {}));
    } else {
      setOnMap((prev) => ({ ...prev, [targetId]: !prev[targetId] }));
    }
  };

  // 시간 열은 left에서만 PC 화면에서 숨김(pcBlind) 처리한다. right는 PC에서도 항상 노출되어
  // 좌측 방면 / 시간 / 우측 방면이 한 줄로 나란히 보이는 레이아웃을 만든다.
  const timeColClass = position === 'left' ? styles.pcBlind : '';

  return (
    <div className={`comTableBasic ${styles.comTableBasic} ${styles[position]}`.trim()}>
      <table>
        <caption>{caption}</caption>
        <colgroup>
          <col style={{ width: '100px' }} className={timeColClass} />
          <col style={{ width: 'auto' }} />
        </colgroup>
        <thead>
          <tr>
            <th className={timeColClass}>시간</th>
            <th><span>{stnName}</span> 방면</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={timeColClass}>종착</td>
            <td>
              <FormCheck
                type="checkbox"
                name={`sched-${position}`}
                size="sm"
                options={[
                  ...directions.map((d) => ({
                    id: d.id,
                    label: d.label,
                    checked: onMap[d.id],
                    color: d.color,
                  })),
                  { id: allId, label: '전체', checked: allOn, color: 'black' },
                ]}
                onChange={handleChange}
              />
            </td>
          </tr>
          {rows.map((row) => (
            <tr key={row.hour}>
              <td className={timeColClass}>{row.hour}</td>
              <td className={styles.arg01}>
                <div className={styles.minCov}>
                  {row.items.map((item, idx) => (
                    <span
                      key={idx}
                      className={`${styles[item.color]} ${colorOnMap[item.color] ? styles.on : ''}`.trim()}
                    >
                      {item.value}
                    </span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

//UI Components : comSchedule
/**
 * 열차 시각표 컴포넌트
 * @param {Object} left - 좌측 방면 시간표 { stnName, caption, directions, rows }
 * @param {Object} right - 우측 방면 시간표 { stnName, caption, directions, rows }
 * @param {function} onSchedClick - '전체열차 시간표' 버튼 클릭 핸들러
 * @param {function} onPrintClick - '프린트' 버튼 클릭 핸들러
 * @param {string} className - 추가적인 커스텀 클래스
 *
 * directions: [{ id, color('blue'|'green'|'red'), label }] (id는 좌/우 통틀어 고유해야 함)
 * rows: [{ hour, items: [{ value, color }] }] (items는 분 오름차순으로 미리 정렬해서 전달)
 */
const Schedule = ({ left, right, onSchedClick, onPrintClick, className = '' }) => {
  return (
    <div className={`${styles.comSchedule} ${className}`.trim()}>
      <div className={styles.optButton}>
        <div className={styles.buttons}>
          <button type="button" className={styles.sched} onClick={onSchedClick}>전체열차 시간표</button>
          <button type="button" className={styles.print} onClick={onPrintClick}>프린트</button>
        </div>
      </div>

      <div className={styles.schedTable}>
        {left && <ScheduleTable position="left" {...left} />}
        {right && <ScheduleTable position="right" {...right} />}
      </div>
    </div>
  );
};

export default Schedule;
