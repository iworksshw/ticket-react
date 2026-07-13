const SNS_LABELS = {
  naver: 'Naver',
  google: 'Google',
  kakao: 'Kakao',
  apple: 'Apple',
};

//UI Components : infoBox (나의 기본정보)
/**
 * 나의 기본정보 영역 (마이페이지 대시보드)
 * @param {object} styles - 상위 DashBoard.module.scss에서 내려받는 스타일 객체
 * @param {string} email - 아이디(이메일)
 * @param {Array} sns - 연결된 SNS 간편로그인 목록. 'naver' | 'google' | 'kakao' | 'apple'
 * @param {string} nationality - 국적
 * @param {function} onMemberClick - '회원정보' 버튼 클릭 핸들러
 */
function InBasicInfo({ styles, email, sns = [], nationality, onMemberClick }) {
  return (
    <div className={styles.infoBox}>
      <div className={styles.infoArea}>
        <p className={styles.topTit}>
          <span className={styles.infoTxt}>나의 기본정보</span>
          <button type="button" className={styles.memberTxt} onClick={onMemberClick}>회원정보</button>
        </p>
        <div className={styles.box}>
          <p className={styles.subTit}>아이디(이메일)</p>
          <p className={styles.desc}>{email}</p>
        </div>
        <div className={styles.box}>
          <p className={styles.subTit}>SNS 간편로그인</p>
          <p className={styles.desc}>
            {sns.map((type) => (
              <span key={type} className={styles[type]}>{SNS_LABELS[type]}</span>
            ))}
          </p>
        </div>
        <div className={styles.box}>
          <p className={styles.subTit}>국적</p>
          <p className={styles.desc}>{nationality}</p>
        </div>
      </div>
      <div className={styles.boxArea}>
        <a href="#">
          <p className={styles.topTit}>서울역 도심공항터미널<br />리워드 프로그램</p>
          <p className={styles.baseTit}>도심공항터미널 이용실적을 기준으로<br />리워드 할인쿠폰을 드립니다.</p>
        </a>
      </div>
    </div>
  );
}

export default InBasicInfo;
