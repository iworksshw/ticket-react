import { useState } from 'react';
import TicketSelect from '@/features/ticket/components/TicketSelect';

function GuideTicketSelect() {
  const [reservedTrain, setReservedTrain] = useState(null);

  return (
    <div style={{ display: 'grid', gap: '24px' }}>
      <section>
        <h3>Ticket Select Guide</h3>
        <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/features/ticket/components/TicketSelect.jsx</p>
      </section>

      <section>
        <h4>열차 선택 목록</h4>
        {/* trains를 안 넘기면 TicketSelect 내부 기본 샘플 데이터(html 원본과 동일)가 사용된다.
            onReserve는 매진이 아닌 열차의 '예약' 버튼을 눌렀을 때 호출된다. */}
        <TicketSelect onReserve={(train) => setReservedTrain(train)} />

        {reservedTrain && (
          <p style={{ marginTop: '12px', color: '#1d4ed8' }}>
            선택한 열차: {reservedTrain.trainNo} ({reservedTrain.departure.time} {reservedTrain.departure.name} → {reservedTrain.arrival.time} {reservedTrain.arrival.name})
          </p>
        )}
      </section>
    </div>
  );
}

export default GuideTicketSelect;
