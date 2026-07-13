import { Fragment } from 'react';
import styles from './AgreePop.module.scss';

// ui components : comAgreePop
// 원본 퍼블리싱 파일: docs/html-src/html/common/comAgreePop.html
// modPopup + modTab 내부 약관 본문 영역에서 쓰인다(팝업/탭 자체는 이 컴포넌트 범위 밖).

/**
 * 이용약관 팝업 본문 컴포넌트
 * @param {node} title - 약관 제목 (pubTitH3)
 * @param {Array} sections - 조항 목록. [{ title, body }]
 *   title은 조항 제목(pubTitH4), body는 조항 본문(agText)에 들어갈 내용(ReactNode, <br/> 포함 가능)
 */
const AgreePop = ({ title, sections = [] }) => {
  return (
    <div className={styles.comAgreePop}>
      <div className="pubTitH3">
        <h3>{title}</h3>
      </div>
      {sections.map((section, index) => (
        <Fragment key={index}>
          <div className="pubTitH4">
            <h4>{section.title}</h4>
          </div>
          <div className={styles.agText}>{section.body}</div>
        </Fragment>
      ))}
    </div>
  );
};

export default AgreePop;
