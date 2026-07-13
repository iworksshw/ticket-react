import styles from './DashBoard.module.scss';
import InTicket from './InTicket';
import InUse from './InUse';
import InMy from './InMy';
import InBasicInfo from './InBasicInfo';

//UI Components : cptMypage
/**
 * 마이페이지 대시보드 (컨테이너)
 * @param {object} ticket - InTicket에 전달할 탑승예정 승차권 정보
 * @param {Array} useInfo - InUse에 전달할 AREX 이용정보 목록
 * @param {Array} myInfo - InMy에 전달할 신청정보 목록
 * @param {object} basicInfo - InBasicInfo에 전달할 회원 기본정보 { email, sns, nationality, onMemberClick }
 */
function DashBoard({ ticket, useInfo, myInfo, basicInfo }) {
  return (
    <div className={styles.cptMypage}>
      <div className={styles.boardingBox}>
        <InTicket styles={styles} ticket={ticket} />
        <InUse styles={styles} items={useInfo} />
        <InMy styles={styles} items={myInfo} />
      </div>
      <InBasicInfo styles={styles} {...basicInfo} />
    </div>
  );
}

export default DashBoard;
