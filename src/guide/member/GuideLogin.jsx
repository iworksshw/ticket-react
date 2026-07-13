import { useState } from 'react';
import Login from '@/features/member/components/Login';

function GuideLogin() {
  const [resendCount, setResendCount] = useState(0);

  return (
    <div style={{ display: 'grid', gap: '24px' }}>
      <section>
        <h3>Login Guide</h3>
        <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/features/member/components/Login.jsx</p>
      </section>

      <section>
        <h4>기본 - 회원가입 인증 폼</h4>
        <Login onResendAuthCode={() => setResendCount((prev) => prev + 1)} />
        <p style={{ marginTop: '12px', color: '#1d4ed8' }}>
          인증번호 재전송 클릭 횟수: {resendCount}
        </p>
      </section>
    </div>
  );
}

export default GuideLogin;
