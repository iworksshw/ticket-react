import { useLocation, useNavigate } from 'react-router-dom';
import styles from '@/features/member/components/Join.module.scss';
import Button from '@/components/common/forms/Button';

function JoinHistoryStatusPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email ?? '';

  return (
    <div className={styles.cptLogin}>
      <div className={styles.loginArea}>
        <div className={styles.loginTop}>
          <strong className={styles.eyebrow}>공항철도 회원가입</strong>
          <h1 className={styles.loginHeadline}>비회원 데이터 이전 안내</h1>
          <p className={styles.loginHeadText}>
            가입하신 이메일로 고객님의 &lsquo;비회원 승차권이용 실적&rsquo;이 있습니다.
            <br />
            고객님의 회원계정으로 이전되어 관리됩니다.
          </p>
        </div>
        <div className="loginCont">
          <div className="comTableBasic">
            <table className="basic">
              <caption>비회원 데이터 이전 목록_승차일자, 열차, 출발, 도착, 탑승인원을 포함한 표</caption>
              <colgroup>
                <col />
                <col />
                <col />
                <col />
                <col />
              </colgroup>
              <thead>
                <tr>
                  <th>승차일자</th>
                  <th>열차</th>
                  <th>출발</th>
                  <th>도착</th>
                  <th>탑승인원</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>YYYY-<br />MM-DD</td>
                  <td>A1023</td>
                  <td>서울역 (tt:mm)</td>
                  <td>인천국제공항 1터미널 (tt:mm)</td>
                  <td>어른 0명, 어린이 0명</td>
                </tr>
                <tr>
                  <td>YYYY-<br />MM-DD</td>
                  <td>A1023</td>
                  <td>인천국제공항 1터미널 (tt:mm)</td>
                  <td>서울역 (tt:mm)</td>
                  <td>어른 0명, 어린이 0명</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="pubRefer sm">
            이전 대상은 <em className="colorBlue">최근 48시간 전 및 이후 계획된 승차권 예약 정보</em>입니다.
          </div>

          <div className={styles.btmBtn}>
            <Button variant="dkLine" size="lg">취소</Button>
            <Button
              variant="dkBlue"
              size="lg"
              onClick={() => navigate('/auth/joinIdConfirmPage', { state: { email } })}
            >
              확인
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinHistoryStatusPage;
