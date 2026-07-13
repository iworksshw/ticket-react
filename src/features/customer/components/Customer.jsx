import ImgWrap from '@/components/common/contents/ImgWrap';
import InfoBox from '@/components/common/contents/InfoBox';
import styles from './Customer.module.scss';

//UI Components : cptCustomer
// 원본 퍼블리싱 파일: docs/html-src/html/component/cptCustomer.html

const effectList = [
  {
    icon: '/images/common/ic_120_box_017.png',
    num: '01',
    title: '소비자',
    titleEn: 'Consumer',
    desc: '상품 및 서비스의 선택기준이 되는 정보를 제공받고, 소비자문제 발생 시 신속하고 합리적인 해결이 가능합니다.',
  },
  {
    icon: '/images/common/ic_120_box_018.png',
    num: '02',
    title: '기업',
    titleEn: 'company',
    desc: '상품과 서비스 수준을 소비자 관점으로 끊임없이 개선함으로써 대·내외 경쟁력을 강화할 수 있습니다.',
  },
  {
    icon: '/images/common/ic_120_box_019.png',
    num: '03',
    title: '공공',
    titleEn: 'Public',
    desc: '소비자 중심의 선순환 시장을 조성함으로써 기업·소비자 간의 상생문화 확산에 기여합니다.',
  },
];

function Customer() {
  return (
    <div className={styles.cptCustomer}>
      <div className={styles.customerImg}>
        <img
          className={styles.imgPc}
          src="/images/contents/cont_04_11_01.jpg"
          alt="고객 서비스 헌장"
          aria-describedby="cont_04_11_01"
        />
        <img
          className={styles.imgMo}
          src="/images/contents/cont_04_11_02.jpg"
          alt=""
          aria-describedby="cont_04_11_01"
        />
        <p id="cont_04_11_01" className="blind">
          고객 서비스 헌장 "공항철도는 고객에게 가장 안전하고 편리한 철도 서비스를 제공하는 것을 최대의 사명이자
          보람으로 여기며, 세계 1등 공항철도로 거듭나기 위해 최선을 다하겠습니다." arex 공항철도주식회사
        </p>
      </div>

      <div className="pubTitH3">
        <h3>소비자중심경영(CCM) 인증 이란?</h3>
      </div>
      <p className="pubText">
        기업이 수행하는 모든 활동을 소비자 관점에서 소비자 중심으로 구성하고 관련 경영활동을 지속적으로 개선하고
        있는지를 심사하여 인증하는 제도입니다.
      </p>

      <ImgWrap
        className={styles.ccmImg}
        items={[
          {
            srcPc: '/images/contents/cont_04_11_02_01.jpg',
            srcMo: '/images/contents/cont_04_11_02_02.jpg',
            alt: '소비자중심경영(ccm) 설명',
          },
        ]}
      />

      <div className="pubTitH4">
        <h4>인증 및 운영기관</h4>
      </div>
      <div className={styles.logoArea}>
        <div className={styles.logoList}>
          <img src="/images/common/logo_kftc.svg" alt="공정거래위원회 로고" />
          <p className={styles.logoTxt}>
            <a href="https://www.ftc.go.kr/www/index.do" target="_blank" rel="noopener noreferrer" title="새 창 열림">
              인증기관
            </a>
          </p>
        </div>
        <div className={styles.logoList}>
          <img src="/images/common/logo_kca.svg" alt="한국소비자원 로고" />
          <p className={styles.logoTxt}>
            <a href="https://www.kca.go.kr" target="_blank" rel="noopener noreferrer" title="새 창 열림">
              운영기관
            </a>
          </p>
        </div>
      </div>
      <ul className="pubTextList">
        <li className="textListItem">
          <em>소비자분쟁해결 기준안내 접속주소</em> : https://www.kca.go.kr/odr/cm/in/rsltnCrtral.do{' '}
          <a
            href="https://www.kca.go.kr/odr/cm/in/rsltnCrtral.do"
            target="_blank"
            rel="noopener noreferrer"
            title="새 창 열림"
            className="goLink"
          >
            바로가기
          </a>
        </li>
      </ul>

      <div className="pubTitH4">
        <h4>기대효과</h4>
      </div>
      <div className={styles.effectArea}>
        <ul>
          {effectList.map((item) => (
            <li key={item.num}>
              <ul className={styles.effectBox}>
                <li>
                  <img src={item.icon} alt="" />
                </li>
                <li>{item.num}</li>
                <li>{item.title}</li>
                <li>{item.titleEn}</li>
                <li>{item.desc}</li>
              </ul>
            </li>
          ))}
        </ul>
      </div>

      <div className="pubTitH2">
        <h2>CCM 인증 및 수상 현황</h2>
      </div>
      <InfoBox
        className={styles.certiArea}
        imgSrc="/images/contents/cont_04_11_03_09.jpg"
        imgAlt="CCM 도입 선포식 행사에서 단체로 화이팅 자세를 취하고 있는 모습"
        desc={
          <ul className="pubTextList">
            <li className="textListItem">
              <b className="varColorBlue">'12.08.01</b> CCM 인증 도입신고
            </li>
            <li className="textListItem">
              <b className="varColorBlue">'13. 12월</b> CCM 신규인증 획득
            </li>
            <li className="textListItem">
              <b className="varColorBlue">'23. 12월</b> CCM 재인증(6차), '올해의 CCM' 국무총리 표창
            </li>
          </ul>
        }
      />

      <div className="pubTitH3">
        <h3>소비자중심경영(CCM) 인증서(국문/영문)</h3>
      </div>
      <ImgWrap
        items={[
          {
            srcPc: '/images/contents/cont_04_11_03_01.jpg',
            srcMo: '/images/contents/cont_04_11_03_02.jpg',
            alt: '소비자중심경영(ccm) 인증서(국문/영문)',
          },
        ]}
      />
    </div>
  );
}

export default Customer;
