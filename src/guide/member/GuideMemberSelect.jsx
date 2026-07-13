import { useState } from 'react';
import MemberType from '@/features/member/components/MemberType';

function GuideMemberSelect() {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ display: 'grid', gap: '24px' }}>
      <section>
        <h3>Member Select Guide</h3>
        <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/features/member/components/MemberType.jsx</p>
      </section>

      <section>
        <h4>예약방식</h4>
        <MemberType onSelect={(value) => setSelected(value)} />

        {selected && (
          <p style={{ marginTop: '12px', color: '#1d4ed8' }}>
            선택한 예약방식: {selected === 'member' ? '회원 예약' : '비회원 예약'}
          </p>
        )}
      </section>
    </div>
  );
}

export default GuideMemberSelect;
