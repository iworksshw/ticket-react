import React, { useState } from 'react';
import styles from './Login.module.scss';
import Button from '@/components/common/forms/Button';
import FormGroup from '@/components/common/forms/FormGroup';
import FormInput from '@/components/common/forms/FormInput';
import Select from '@/components/common/forms/Select';

//UI Components : comLog
/**
 * 로그인(회원가입 인증) 폼 컴포넌트
 * @param {function} onResendAuthCode - 인증번호 재전송 버튼 클릭 핸들러
 */
const Login = ({ onResendAuthCode }) => {
  const [authCodeRe, setAuthCodeRe] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCfm, setPasswordCfm] = useState('');
  const [nation1, setNation1] = useState('');
  const [nation2, setNation2] = useState('');
  const [birth, setBirth] = useState('');
  const [gender, setGender] = useState('');
  const [nationCode, setNationCode] = useState('');
  const [phoneNum, setPhoneNum] = useState('');

  const isLengthValid = password.length >= 10 && password.length <= 20;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const isPasswordMismatch = passwordCfm.length > 0 && password !== passwordCfm;

  return (
    <div className={styles.comLog}>
      <div className={styles.fnTxtCont}>
        <p className={styles.fnTxt}>
          고객님 이메일(<em>id@domain.com</em>)로 회원가입을 위한<br />
          <em>‘인증번호’</em>를 발송했습니다.<br />
          인증메일 유효시간은 메일 수신일 기준 <em>30분 이내</em>입니다.
        </p>
      </div>

      <div className={styles.fnCont}>
        <div className={styles.fnGroup}>
          <div className={styles.labelBox}>
            <label htmlFor="authCodeRe">인증번호</label>
          </div>
          <FormGroup>
            <FormInput
              id="authCodeRe"
              name="authCodeRe"
              placeholder="인증번호 6자리"
              value={authCodeRe}
              onChange={(e) => setAuthCodeRe(e.target.value)}
            />
            <Button type="button" variant="dkLine" size="lg" onClick={onResendAuthCode}>인증번호 재전송</Button>
          </FormGroup>
        </div>

        <div className={styles.fnGroup}>
          <div className={styles.labelBox}>
            <label htmlFor="authCode">인증번호</label>
          </div>
          <FormGroup>
            <FormInput
              id="authCode"
              name="authCode"
              placeholder="인증번호 6자리"
              value={authCode}
              onChange={(e) => setAuthCode(e.target.value)}
            />
          </FormGroup>
        </div>

        <div className={styles.fnGroup}>
          <div className={styles.labelBox}>
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
            />
          </FormGroup>
          <div className={styles.chkGroup}>
            <div className={`${styles.chkItem} ${isLengthValid ? styles.chkBlue : styles.chkGray}`}>10~20자</div>
            <div className={`${styles.chkItem} ${hasLetter ? styles.chkBlue : styles.chkGray}`}>영문</div>
            <div className={`${styles.chkItem} ${hasNumber ? styles.chkBlue : styles.chkGray}`}>숫자</div>
          </div>
        </div>

        <div className={styles.fnGroup}>
          <div className={styles.labelBox}>
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
              isError={isPasswordMismatch}
              errorMsg="비밀번호가 일치하지 않습니다."
            />
          </FormGroup>
        </div>
      </div>

      <div className={styles.fnCont}>
        <div className={styles.fnGroup}>
          <div className={styles.labelBox}>
            <label htmlFor="nation1">국적</label>
          </div>
          <FormGroup>
            <Select
              id="nation1"
              name="nation1"
              aria-label="첫 번째 국적"
              placeholder="국적을 선택해주세요."
              value={nation1}
              onChange={(e) => setNation1(e.target.value)}
              options={[
                { value: 'ne-asia', label: '동북아시아' },
                { value: 'se-asia', label: '동남아시아' },
              ]}
            />
            <Select
              id="nation2"
              name="nation2"
              aria-label="두 번째 국적"
              placeholder="국적을 선택해주세요."
              value={nation2}
              onChange={(e) => setNation2(e.target.value)}
              options={[
                { value: 'kr', label: '대한민국' },
                { value: 'th', label: '태국' },
              ]}
            />
          </FormGroup>
        </div>

        <div className={styles.fnGroup}>
          <div className={styles.labelBox}>
            <label htmlFor="birth">출생년도</label>
          </div>
          <FormGroup>
            <Select
              id="birth"
              name="birth"
              placeholder=""
              value={birth}
              onChange={(e) => setBirth(e.target.value)}
              options={[
                { value: '2000', label: '2000' },
                { value: '1999', label: '1999' },
              ]}
            />
          </FormGroup>
        </div>

        <div className={styles.fnGroup}>
          <div className={styles.labelBox} id="genderLabel">성별</div>
          <div className={styles.fnChoGroup} aria-labelledby="genderLabel">
            <div className="frmChoBox">
              <input id="rdo301" type="radio" className="iptRdo" name="gender" checked={gender === 'rdo301'} onChange={() => setGender('rdo301')} />
              <label htmlFor="rdo301" className="iptLbl">남자</label>
            </div>
            <div className="frmChoBox">
              <input id="rdo302" type="radio" className="iptRdo" name="gender" checked={gender === 'rdo302'} onChange={() => setGender('rdo302')} />
              <label htmlFor="rdo302" className="iptLbl">여자</label>
            </div>
          </div>
        </div>

        <div className={styles.fnGroup}>
          <div className={styles.labelBox}>
            <label htmlFor="nationCode">전화번호</label>
          </div>
          <FormGroup>
            <Select
              id="nationCode"
              name="nationCode"
              placeholder="국가코드를 선택하세요."
              value={nationCode}
              onChange={(e) => setNationCode(e.target.value)}
              options={[
                { value: '82-1', label: '+82 대한민국' },
                { value: '82-2', label: '+82 대한민국' },
              ]}
            />
            <FormInput
              type="tel"
              id="phoneNum"
              name="phoneNum"
              aria-label="전화번호 입력"
              placeholder="전화번호를 숫자만 입력해 주세요."
              value={phoneNum}
              onChange={(e) => setPhoneNum(e.target.value)}
            />
          </FormGroup>
        </div>
      </div>
    </div>
  );
};

export default Login;
