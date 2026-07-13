import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '@/features/member/components/Join.module.scss';
import logStyles from '@/features/member/components/Login.module.scss';
import FormGroup from '@/components/common/forms/FormGroup';
import FormInput from '@/components/common/forms/FormInput';
import Button from '@/components/common/forms/Button';

function JoinRequiredInfoPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email ?? '';

  const [authCode, setAuthCode] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCfm, setPasswordCfm] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const isLengthValid = password.length >= 10 && password.length <= 20;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^a-zA-Z0-9]/.test(password);
  const isPasswordValid = isLengthValid && hasLetter && hasNumber && hasSpecial;
  const isPasswordMismatch = password !== passwordCfm;

  const isPasswordError = submitted && !isPasswordValid;
  const isPasswordCfmError = submitted && isPasswordMismatch;

  const canProceed = authCode.length > 0 && password.length > 0 && passwordCfm.length > 0;

  const handleNext = () => {
    setSubmitted(true);
    if (!isPasswordValid || isPasswordMismatch) return;
    navigate('/auth/joinOptionalInfo', { state: { email } });
  };

  return (
    <div className={styles.cptLogin}>
      <div className={styles.loginArea}>
        <div className={styles.loginTop}>
          <strong className={styles.eyebrow}>공항철도 회원가입</strong>
          <h1 className={styles.loginHeadline}>필수 정보 입력</h1>
          <p className={styles.loginHeadText}>가입을 위해 인증번호와 필수 정보를 입력해주세요.</p>
        </div>
        <div className="loginCont">
          <div className={logStyles.comLog}>
            <div className={logStyles.fnTxtCont}>
              <p className={logStyles.fnTxt}>
                고객님 이메일(<em>id@domain.com</em>)로 회원가입을 위한{' '}
                <em>&lsquo;인증번호&rsquo;</em>를 발송했습니다.
                <br />
                인증메일 유효시간은 메일 수신일 기준 <em>30분 이내</em>입니다.
              </p>
            </div>

            <div className={logStyles.fnCont}>
              <div className={logStyles.fnGroup}>
                <div className={logStyles.labelBox}>
                  <label htmlFor="authCodeRe">인증번호</label>
                </div>
                <FormGroup>
                  <FormInput
                    id="authCodeRe"
                    name="authCodeRe"
                    placeholder="인증번호 6자리"
                    value={authCode}
                    onChange={(e) => setAuthCode(e.target.value)}
                  />
                  <Button type="button" variant="dkLine" size="lg">인증번호 재전송</Button>
                </FormGroup>
              </div>

              <div className={logStyles.fnGroup}>
                <div className={logStyles.labelBox}>
                  <label htmlFor="password">비밀번호</label>
                </div>
                <FormGroup>
                  <FormInput
                    type="password"
                    id="password"
                    name="password"
                    placeholder="비밀번호를 입력해주세요."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    isError={isPasswordError}
                    errorMsg="비밀번호를 10~20자, 영문, 숫자, 특수문자 조합으로 입력해주세요."
                  />
                </FormGroup>
                <div className={logStyles.chkGroup}>
                  <div className={`${logStyles.chkItem} ${isLengthValid ? logStyles.chkBlue : logStyles.chkGray}`}>10~20자</div>
                  <div className={`${logStyles.chkItem} ${hasLetter ? logStyles.chkBlue : logStyles.chkGray}`}>영문</div>
                  <div className={`${logStyles.chkItem} ${hasNumber ? logStyles.chkBlue : logStyles.chkGray}`}>숫자</div>
                  <div className={`${logStyles.chkItem} ${hasSpecial ? logStyles.chkBlue : logStyles.chkGray}`}>특수문자</div>
                </div>
              </div>

              <div className={logStyles.fnGroup}>
                <div className={logStyles.labelBox}>
                  <label htmlFor="passwordCfm">비밀번호 확인</label>
                </div>
                <FormGroup>
                  <FormInput
                    type="password"
                    id="passwordCfm"
                    name="passwordCfm"
                    placeholder="비밀번호를 입력해주세요."
                    value={passwordCfm}
                    onChange={(e) => setPasswordCfm(e.target.value)}
                    isError={isPasswordCfmError}
                    errorMsg="비밀번호가 일치하지 않습니다."
                  />
                </FormGroup>
              </div>
            </div>
          </div>

          <div className={styles.btmBtn}>
            <Button variant="dkBlue" size="lg" disabled={!canProceed} onClick={handleNext}>선택정보 입력</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinRequiredInfoPage;
