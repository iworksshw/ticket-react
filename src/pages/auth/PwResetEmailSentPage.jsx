import { useLocation, useNavigate } from 'react-router-dom';
import styles from '@/features/member/components/Join.module.scss';
import Button from '@/components/common/forms/Button';

function PwResetEmailSentPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email || 'id@domain.com';

  return (
    <div className={styles.cptLogin}>
      <div className={styles.loginArea}>
        <div className={styles.loginTop}>
          <h1 className={styles.loginHeadline}>비밀번호 재설정</h1>
        </div>
        <div className="loginCont">
          <div className={styles.loginBox}>
            <p className={styles.boxTxt}>
              고객님 이메일(<em>{email}</em>)로 &lsquo;인증번호&rsquo;를 발송했습니다.
              <br />
              비밀번호를 재설정하려면 이메일에 있는 <em>[비밀번호 재설정]</em> 버튼을 클릭해 주세요.
            </p>
          </div>

          <div className={styles.loginOther}>
            <div className={styles.helpMsg}>
              수신된 이메일이 없나요? <button type="button" className={styles.btnText}>이메일 재전송</button>
            </div>
            <p className={styles.text}>이메일 주소를 잘못 입력하지 않았는지 확인해 주시고, 스팸 폴더도 점검해주세요.</p>
          </div>

          <div className={styles.btmBtn}>
            <Button
              variant="dkBlue"
              size="lg"
              onClick={() => navigate('/auth/PwResetForm', { state: { email } })}
            >
              확인
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PwResetEmailSentPage;
