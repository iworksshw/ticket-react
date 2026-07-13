import { useNavigate } from 'react-router-dom';
import styles from '@/features/member/components/Join.module.scss';
import Complete from '@/components/common/contents/Complete';
import Button from '@/components/common/forms/Button';

function PwResetCompletePage() {
  const navigate = useNavigate();

  return (
    <div className={styles.cptLogin}>
      <div className={styles.loginArea}>
        <div className="loginCont">
          <Complete
            title="비밀번호 재설정이 완료되었습니다."
            desc={
              <>
                고객님의 회원계정에 SNS 연동으로 편리한 로그인을 하실 수 있습니다.
                <br />
                마이페이지에서 SNS로그인 연동 설정을 해주세요.
              </>
            }
          />

          <div className={styles.btmBtn}>
            <Button variant="dkLine" size="lg" onClick={() => navigate('/')}>메인화면으로 이동</Button>
            <Button variant="dkBlue" size="lg" onClick={() => navigate('/tickets/login')}>로그인</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PwResetCompletePage;
