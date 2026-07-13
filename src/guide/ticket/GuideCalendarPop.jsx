import { useState } from 'react';
import CalendarPop from '@/features/ticket/components/CalendarPop';

function GuideCalendarPop() {
  const [pickedDate, setPickedDate] = useState(null);
  const [pickedHour, setPickedHour] = useState(null);

  return (
    <div style={{ display: 'grid', gap: '24px' }}>
      <section>
        <h3>Calendar Pop Guide</h3>
        <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/features/ticket/components/CalendarPop.jsx</p>
      </section>

      <section>
        <h4>팝업 달력 + 시간 선택</h4>
        {/* 원본 html은 tui-date-picker/swiper 같은 외부 라이브러리로 동작했지만,
            이 프로젝트엔 그 라이브러리가 없어서 순수 React state로 동일한 동작(달 이동, 날짜/시간 선택,
            시간 목록 가로 스크롤)을 직접 구현했다. */}
        <CalendarPop onSelectDate={setPickedDate} onSelectTime={setPickedHour} />

        {(pickedDate || pickedHour) && (
          <p style={{ marginTop: '12px', color: '#1d4ed8' }}>
            선택한 날짜/시간:{' '}
            {pickedDate ? pickedDate.toLocaleDateString('ko-KR') : '날짜 미선택'}
            {' / '}
            {pickedHour ? `${String(pickedHour).padStart(2, '0')}시` : '시간 미선택'}
          </p>
        )}
      </section>
    </div>
  );
}

export default GuideCalendarPop;
