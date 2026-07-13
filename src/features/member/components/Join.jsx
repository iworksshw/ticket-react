import { useState } from 'react';
import styles from './Join.module.scss';
import Button from '@/components/common/forms/Button';
import FormGroup from '@/components/common/forms/FormGroup';
import FormInput from '@/components/common/forms/FormInput';
import FormCheck from '@/components/common/forms/FormCheck';

//UI Components : cptLogin
// 원본 퍼블리싱 파일: docs/html-src/html/component/cptLogin.html

const snsList = [
  { id: 'naver', label: '네이버' },
  { id: 'google', label: '구글' },
  { id: 'kakao', label: '카카오톡' },
  { id: 'apple', label: '애플' },
];

/**
 * 로그인 화면
 * @param {function} onLogin - 로그인 성공(아이디/비밀번호 일치) 시 ({ id, password, rememberId })를 인자로 호출
 * @param {function} onJoin - '간편회원가입' 클릭 핸들러
 * @param {function} onCheckJoined - '회원가입여부 확인' 클릭 핸들러
 * @param {function} onResetPassword - '비밀번호 재설정' 클릭 핸들러
 * @param {function} onSnsLogin - SNS 로그인 클릭 시 (snsId)를 인자로 호출
 * @param {string} validId - 데모/테스트용 정답 아이디 (기본값 'join')
 * @param {string} validPassword - 데모/테스트용 정답 비밀번호 (기본값 'password')
 */
function Join({ onLogin, onJoin, onCheckJoined, onResetPassword, onSnsLogin, validId = 'join', validPassword = 'password' }) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberId, setRememberId] = useState(false);
  const [touched, setTouched] = useState(false);
  const [isMismatch, setIsMismatch] = useState(false);

  const isIdEmpty = touched && id.length === 0;
  const isPasswordEmpty = touched && password.length === 0;
  const isIdError = isIdEmpty || isMismatch;
  const isPasswordError = isPasswordEmpty || isMismatch;
  const canSubmit = id.length > 0 && password.length > 0;

  const idErrorMsg = isMismatch ? '아이디 또는 비밀번호가 일치하지 않습니다.' : '아이디(이메일)를 입력해주세요.';
  const passwordErrorMsg = isMismatch
    ? '아이디 또는 비밀번호가 일치하지 않습니다.'
    : '비밀번호를 입력해주세요.(영문, 숫자 조합 10~20자)';

  const handleIdChange = (e) => {
    setId(e.target.value);
    setIsMismatch(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsMismatch(false);
  };

  const handleLogin = () => {
    setTouched(true);
    if (!canSubmit) return;

    if (id !== validId || password !== validPassword) {
      setIsMismatch(true);
      return;
    }

    setIsMismatch(false);
    onLogin?.({ id, password, rememberId });
  };

  const handleLinkClick = (e, handler) => {
    e.preventDefault();
    handler?.();
  };

  return (
    <div className={styles.cptLogin}>
      <div className={styles.loginArea}>
        <div className={styles.loginTop}>
          <h1 className={styles.loginHeadline}>로그인</h1>
        </div>
        <div className={styles.loginCont}>
          <div className={styles.loginIptGroup}>
            <FormGroup>
              <label htmlFor="loginId" className="blind">아이디(이메일)</label>
              <FormInput
                id="loginId"
                title="아이디(이메일) 입력"
                placeholder="아이디(이메일)를 입력해주세요."
                value={id}
                onChange={handleIdChange}
                isError={isIdError}
                errorMsg={idErrorMsg}
              />
            </FormGroup>

            <FormGroup>
              <label htmlFor="loginPw" className="blind">비밀번호</label>
              <FormInput
                type="password"
                id="loginPw"
                title="비밀번호 입력"
                placeholder="비밀번호를 입력해주세요."
                value={password}
                onChange={handlePasswordChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleLogin();
                }}
                isError={isPasswordError}
                errorMsg={passwordErrorMsg}
              />
            </FormGroup>

            <FormGroup>
              <FormCheck
                type="checkbox"
                id="chk001"
                label="아이디 저장"
                checked={rememberId}
                onChange={(e) => setRememberId(e.target.checked)}
              />
            </FormGroup>

            <div className={styles.loginBtn}>
              <Button variant="dkBlue" size="lg" disabled={!canSubmit} onClick={handleLogin}>
                로그인
              </Button>
            </div>

            <div className={styles.loginBtmMenu}>
              <ul className={styles.btmMenuList}>
                <li className={styles.btmItem}>
                  <a href="#" className={styles.link} onClick={(e) => handleLinkClick(e, onJoin)}>간편회원가입</a>
                </li>
                <li className={styles.btmItem}>
                  <a href="#" className={styles.link} onClick={(e) => handleLinkClick(e, onCheckJoined)}>회원가입여부 확인</a>
                </li>
                <li className={styles.btmItem}>
                  <a href="#" className={styles.link} onClick={(e) => handleLinkClick(e, onResetPassword)}>비밀번호 재설정</a>
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.loginSns}>
            <dl className={styles.snsGroup}>
              <dt className={styles.snsTitle}>SNS 계정으로 로그인</dt>
              <dd className={styles.snsCont}>
                <ul className={styles.snsList}>
                  {snsList.map((sns) => (
                    <li className={`${styles.snsItem} ${styles[sns.id]}`} key={sns.id}>
                      <a
                        href="#"
                        className={styles.link}
                        title="새 창 열림"
                        onClick={(e) => handleLinkClick(e, () => onSnsLogin?.(sns.id))}
                      >
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

export default Join;
