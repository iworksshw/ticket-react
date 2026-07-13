import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '@/features/member/components/Join.module.scss';
import FormGroup from '@/components/common/forms/FormGroup';
import FormInput from '@/components/common/forms/FormInput';
import Button from '@/components/common/forms/Button';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function PwResetRequestPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);

  const isEmptyError = touched && email.length === 0;
  const isFormatError = touched && !EMAIL_PATTERN.test(email);
  const isError = isEmptyError || isFormatError;
  const errorMsg = isEmptyError ? '아이디(이메일)를 입력해주세요.' : '이메일 형식이 올바르지 않습니다.';

  const handleSend = () => {
    setTouched(true);
    if (!EMAIL_PATTERN.test(email)) return;
    navigate('/auth/PwResetEmailSent', { state: { email } });
  };

  return (
    <div className={styles.cptLogin}>
      <div className={styles.loginArea}>
        <div className={styles.loginTop}>
          <h1 className={styles.loginHeadline}>비밀번호 재설정</h1>
          <p className={styles.loginHeadText}>
            공항철도 서비스에 가입하신 이메일 주소를 입력해 주세요.
            <br />
            수신하신 <em>이메일에 포함된 링크를 통해 새로운 &lsquo;비밀번호&rsquo;로 변경</em>해 주세요.
          </p>
        </div>
        <div className="loginCont">
          <div className={styles.loginIptGroup}>
            <FormGroup>
              <FormInput
                title="아이디(이메일) 입력"
                placeholder="아이디(이메일)를 입력해주세요."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isError={isError}
                errorMsg={errorMsg}
              />
            </FormGroup>

            <div className={styles.loginBtn}>
              <Button variant="dkBlue" size="lg" disabled={email.length === 0} onClick={handleSend}>인증번호 발송</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PwResetRequestPage;
