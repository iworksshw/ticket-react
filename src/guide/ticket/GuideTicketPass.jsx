import { useState } from 'react';
import TicketPass from '@/features/ticket/components/TicketPass';

function GuideTicketPass() {
  const [passengers, setPassengers] = useState({ adult: 0, child: 0 });

  return (
    <div style={{ display: 'grid', gap: '24px' }}>
      <section>
        <h3>Ticket Pass Guide</h3>
        <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/features/ticket/components/TicketPass.jsx</p>
      </section>

      <section>
        <h4>탑승인원선택</h4>
        <TicketPass onChange={(value) => setPassengers(value)} />

        <p style={{ marginTop: '12px', color: '#1d4ed8' }}>
          어른 {passengers.adult}명 / 어린이 {passengers.child}명
        </p>
      </section>
    </div>
  );
}

export default GuideTicketPass;
