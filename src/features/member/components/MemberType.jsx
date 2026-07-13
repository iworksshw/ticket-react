import styles from './MemberType.module.scss';

//UI Components : comMemberSelect
/**
 * 예약방식 선택 컴포넌트
 * @param {function} onSelect - 회원/비회원 선택 시 호출되는 핸들러 ('member' | 'noMember' 전달)
 */
const MemberType = ({ onSelect }) => {
  return (
    <div className={styles.comMemberSelect}>
      <ul className={styles.memberList}>
        <li>
          <button
            type="button"
            className={`${styles.mbBox} ${styles.member} ${styles.icon001}`}
            onClick={() => onSelect?.('member')}
          >
            <span className={styles.memberTxt}>회원 예약</span>
          </button>
        </li>
        <li>
          <button
            type="button"
            className={`${styles.mbBox} ${styles.noMember} ${styles.icon002}`}
            onClick={() => onSelect?.('noMember')}
          >
            <span className={styles.memberTxt}>비회원 예약</span>
          </button>
        </li>
      </ul>

      <div className={styles.mbMsg}>
        <p>
          아직 공항철도 회원 가입하지 않으셨나요?
          <br />
          간단한 회원가입으로 500원 승차권 할인 혜택을 받으세요.
        </p>
      </div>

      <ul className={styles.mbMenu}>
        <li>
          <a href="#" target="_blank" rel="noopener noreferrer" title="새 창 열림">
            신규 회원가입
          </a>
        </li>
      </ul>
    </div>
  );
};

export default MemberType;
