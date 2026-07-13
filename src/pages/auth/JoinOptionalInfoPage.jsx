import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '@/features/member/components/Join.module.scss';
import logStyles from '@/features/member/components/Login.module.scss';
import FormGroup from '@/components/common/forms/FormGroup';
import FormInput from '@/components/common/forms/FormInput';
import Select from '@/components/common/forms/Select';
import Button from '@/components/common/forms/Button';

function JoinOptionalInfoPage() {
  const navigate = useNavigate();
  const goToComplete = () => navigate('/auth/joinComplete');

  const [nation1, setNation1] = useState('');
  const [nation2, setNation2] = useState('');
  const [birth, setBirth] = useState('');
  const [gender, setGender] = useState('');
  const [nationCode, setNationCode] = useState('');
  const [phoneNum, setPhoneNum] = useState('');

  return (
    <div className={styles.cptLogin}>
      <div className={styles.loginArea}>
        <div className={styles.loginTop}>
          <strong className={styles.eyebrow}>공항철도 회원가입</strong>
          <h1 className={styles.loginHeadline}>선택 정보 입력</h1>
          <p className={styles.loginHeadText}>고객님의 편리한 서비스 이용을 위해 회원정보를 등록하세요.</p>
        </div>
        <div className="loginCont">
          <div className={logStyles.comLog}>
            <div className={logStyles.fnCont}>
              <div className={logStyles.fnGroup}>
                <div className={logStyles.labelBox}>
                  <label htmlFor="nation1">국적</label>
                </div>
                <FormGroup>
                  <Select
                    id="nation1"
                    name="nation1"
                    placeholder="대륙 정보를 선택해 주세요."
                    value={nation1}
                    onChange={(e) => setNation1(e.target.value)}
                    options={[
                      { value: 'ne-asia', label: '동북아시아' },
                      { value: 'se-asia', label: '동남아시아' },
                    ]}
                  />
                </FormGroup>
                <FormGroup>
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

              <div className={logStyles.fnGroup}>
                <div className={logStyles.labelBox}>
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

              <div className={logStyles.fnGroup}>
                <div className={logStyles.labelBox} id="genderLabel">성별</div>
                <div className={logStyles.fnChoGroup} role="radiogroup" aria-labelledby="genderLabel">
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

              <div className={logStyles.fnGroup}>
                <div className={logStyles.labelBox}>
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

          <div className={styles.btmBtn}>
            <Button variant="dkLine" size="lg" onClick={goToComplete}>다음에 등록</Button>
            <Button variant="dkBlue" size="lg" onClick={goToComplete}>등록완료</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinOptionalInfoPage;
