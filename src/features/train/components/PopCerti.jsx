import Button from '@/components/common/forms/Button';
import ButtonGroup from '@/components/common/forms/ButtonGroup';
import styles from './PopCerti.module.scss';

//UI Components : cptPopCerti
// 원본 퍼블리싱 파일: docs/html-src/html/component/cptPopCerti.html
// modPopup(팝업 껍데기)은 Popup 컴포넌트가 담당하므로, 여기서는 popCont 안에 들어가는
// cptPopCerti 콘텐츠(로고+인쇄버튼, 본문, 하단 안내+신청버튼)만 그린다.

/**
 * 간편지연증명서 팝업 콘텐츠
 * @param {string} time - 지연 시간대 (예: '09시~13시')
 * @param {string} lineName - 지연 노선명 (예: '공항방면 일반열차')
 * @param {ReactNode} date - 발급일자 + 발급처 (줄바꿈 포함 가능)
 * @param {Array<ReactNode>} referList - 하단 안내 문구(pubRefer) 목록
 * @param {function} onPrint - '간편지연증명서 인쇄' 버튼 클릭 핸들러
 * @param {function} onRequest - '지연증명서 신청' 버튼 클릭 핸들러
 */
function PopCerti({
  time,
  lineName,
  date,
  referList = [],
  onPrint,
  onRequest,
}) {
  return (
    <div className={styles.cptPopCerti}>
      <div className={styles.contHeader}>
        <div className={styles.logoBox}>
          <div className={styles.logo}>
            <a href="#"></a>
          </div>
        </div>
        <ButtonGroup>
          <Button variant="blue" onClick={onPrint}>
            간편지연증명서 인쇄
          </Button>
        </ButtonGroup>
      </div>

      <div className={styles.contBody}>
        <div className="pubTitH2">
          <h2>간편 지연증명서</h2>
        </div>
        <div className={styles.cont}>
          <div>
            <p className={styles.time}>{time}</p>
          </div>
          <div>
            <p className={styles.txt}>
              열차이용에 불편을 드려 대단히 죄송합니다.
              <br />
              귀하께서 이용하신 <span>&quot;{lineName}&quot;</span>가 지연운행 되었음을 증명합니다.
            </p>
          </div>
          <div>
            <p className={styles.date}>{date}</p>
          </div>
        </div>
      </div>

      <div className={styles.contFooter}>
        {referList.map((refer, index) => (
          <span className="pubRefer dark" key={index}>
            {refer}
          </span>
        ))}
        <ButtonGroup>
          <Button variant="dkLine" size="lg" onClick={onRequest}>
            지연증명서 신청
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

export default PopCerti;
