import styles from './Footer.module.scss';

//UI Components : cptFooter

const defaultQuickLinks = [
  { label: '공항철도', href: '#' },
  { label: '여객운송약관', href: '#' },
  { label: '누리집 이용약관', href: '#' },
  { label: '개인정보처리방침', href: '#' },
];

const defaultCompanyInfo = {
  address: '(22694) 인천광역시 서구 검바위로 46 (검암동) 공항철도(주)',
  tel: '1599-7788',
  fax: '032-745-8899',
  ceo: '박대수',
  businessNumber: '101-81-68490',
};

const defaultMarks = [
  { src: '/images/common/eprivacy.svg', alt: 'eprivacy mark' },
  { src: '/images/common/wa_mark.svg', alt: 'wa mark' },
];

/**
 * 푸터 컴포넌트
 * @param {Array} quickLinks - 상단 퀵 링크 목록 [{ label, href }]
 * @param {Object} companyInfo - 회사 정보 { address, tel, fax, ceo, businessNumber }
 * @param {string} copyrightText - 저작권 문구
 * @param {Array} marks - 우측 인증 마크 이미지 목록 [{ src, alt }]
 */
const Footer = ({
  quickLinks = defaultQuickLinks,
  companyInfo = defaultCompanyInfo,
  copyrightText = 'Copyright (C) 2025 by AIRPORT RAILROAD Co., Ltd. All rights reserved.',
  marks = defaultMarks,
}) => {
  return (
    <div className={styles.cptFooter}>
      <div className={styles.footArea}>
        <div className={styles.copyArea}>
          <div className={styles.quickGroup}>
            <ul>
              {quickLinks.map((link, index) => (
                <li className={index === 0 ? styles.hglt : ''} key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.copyGroup}>
            <div className={styles.infoArea}>
              <ul>
                <li className={styles.add}>{companyInfo.address}</li>
                <li className={styles.tel}>
                  전화 <span>{companyInfo.tel}</span>
                </li>
                <li className={styles.fax}>
                  팩스 <span>{companyInfo.fax}</span>
                </li>
                <li className={styles.name}>대표자 : {companyInfo.ceo}</li>
                <li className={styles.lcn}>사업자등록번호 : {companyInfo.businessNumber}</li>
              </ul>
            </div>
            <div className={styles.copyBox}>
              <p>{copyrightText}</p>
            </div>
          </div>
        </div>

        <div className={styles.markArea}>
          <ul>
            {marks.map((mark) => (
              <li key={mark.src}>
                <img src={mark.src} alt={mark.alt} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
