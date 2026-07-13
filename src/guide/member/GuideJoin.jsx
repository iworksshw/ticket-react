//로그인
import Join from '@/features/member/components/Join';

// 가이드 : Join
// 원본 퍼블리싱 파일: docs/html-src/html/component/cptLogin.html
function GuideJoin() {
  return (
    <div style={{ padding: '32px' }}>
      <h3>Join Guide</h3>
      <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/features/member/components/Join.jsx</p>
      <p style={{ margin: '8px 0 24px', color: '#666' }}>로그인 화면 컴포넌트, id : join, password : password</p>

      <Join
        onLogin={(data) => alert(`로그인: ${JSON.stringify(data)}`)}
        onJoin={() => alert('간편회원가입')}
        onCheckJoined={() => alert('회원가입여부 확인')}
        onResetPassword={() => alert('비밀번호 재설정')}
        onSnsLogin={(snsId) => alert(`SNS 로그인: ${snsId}`)}
      />
    </div>
  );
}

export default GuideJoin;
