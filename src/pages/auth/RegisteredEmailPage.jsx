import { useLocation, useNavigate } from 'react-router-dom';
import styles from '@/features/member/components/Join.module.scss';
import Complete from '@/components/common/contents/Complete';
import Button from '@/components/common/forms/Button';

function RegisteredEmailPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email || 'id@domain.com';

  return (
    <div className={styles.cptLogin}>
      <div className={styles.loginArea}>
        <div className="loginCont">
          <Complete
            chkIco={false}
            title={
              <>
                등록하신 이메일(<em>{email}</em>)은
                <br />
                회원으로 등록되어 있습니다.
              </>
            }
            desc={
              <>
                아래 버튼을 통해 로그인하시거나,
                <br />
                비밀번호를 잊으셨다면 재설정을 진행해 주시기 바랍니다.
              </>
            }
          />

          <div className={styles.btmBtn}>
            <Button variant="dkLine" size="lg" onClick={() => navigate('/auth/PwResetRequest')}>비밀번호 재설정</Button>
            <Button variant="dkBlue" size="lg" onClick={() => navigate('/tickets/login')}>로그인</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisteredEmailPage;
