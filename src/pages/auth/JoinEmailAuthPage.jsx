import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '@/features/member/components/Join.module.scss';
import FormGroup from '@/components/common/forms/FormGroup';
import FormInput from '@/components/common/forms/FormInput';
import Button from '@/components/common/forms/Button';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const snsList = [
  { id: 'naver', label: '네이버' },
  { id: 'google', label: '구글' },
  { id: 'kakao', label: '카카오톡' },
  { id: 'apple', label: '애플' },
];

function JoinEmailAuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);

  const isFormatError = touched && !EMAIL_PATTERN.test(email);
  const isEmptyError = touched && email.length === 0;
  const isError = isEmptyError || isFormatError;
  const errorMsg = isEmptyError ? '아이디(이메일)를 입력해주세요.' : '이메일 형식이 올바르지 않습니다.';

  const handleSend = () => {
    setTouched(true);
    if (!EMAIL_PATTERN.test(email)) return;
    navigate('/auth/joinHistoryStatus', { state: { email } });
  };

  return (
    <div className={styles.cptLogin}>
      <div className={styles.loginArea}>
        <div className={styles.loginTop}>
          <strong className={styles.eyebrow}>공항철도 회원가입</strong>
          <h1 className={styles.loginHeadline}>이메일 인증</h1>
          <p className={styles.loginHeadText}>
            공항철도 회원가입으로 다양한 혜택을 누리세요!
            <br />
            고객님의 ID로 사용하실 <em>&lsquo;이메일 주소&rsquo;</em>를 입력해 주세요.
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

          <div className={styles.loginSns}>
            <dl className={styles.snsGroup}>
              <dt className={styles.snsTitle}>SNS 계정으로 회원가입</dt>
              <dd className={styles.snsCont}>
                <ul className={styles.snsList}>
                  {snsList.map((sns) => (
                    <li className={`${styles.snsItem} ${styles[sns.id]}`} key={sns.id}>
                      <a href="#" className={styles.link} target="_blank" rel="noopener noreferrer" title="새 창 이동">
                        {sns.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinEmailAuthPage;
