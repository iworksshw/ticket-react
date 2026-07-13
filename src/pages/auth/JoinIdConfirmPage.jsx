import { useLocation, useNavigate } from 'react-router-dom';
import styles from '@/features/member/components/Join.module.scss';
import FormGroup from '@/components/common/forms/FormGroup';
import FormInput from '@/components/common/forms/FormInput';
import Button from '@/components/common/forms/Button';

function JoinIdConfirmPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email ?? '';

  return (
    <div className={styles.cptLogin}>
      <div className={styles.loginArea}>
        <div className={styles.loginTop}>
          <strong className={styles.eyebrow}>공항철도 회원가입</strong>
          <h1 className={styles.loginHeadline}>회원ID 확인</h1>
          <p className={styles.loginHeadText}>
            공항철도 회원가입으로 다양한 혜택을 누리세요!
            <br />
            고객님의 ID로 사용하실 <em>&lsquo;이메일 주소&rsquo;</em>를 확인해 주세요.
          </p>
        </div>
        <div className="loginCont">
          <div className={styles.loginIptGroup}>
            <FormGroup>
              <FormInput
                title="아이디(이메일) 입력"
                placeholder="아이디(이메일)를 입력해주세요."
                value={email}
                disabled
              />
            </FormGroup>
          </div>

          <div className={styles.btmBtn}>
            <Button variant="dkLine" size="lg">취소</Button>
            <Button
              variant="dkBlue"
              size="lg"
              onClick={() => navigate('/auth/joinRequiredInfo', { state: { email } })}
            >
              확인
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinIdConfirmPage;
