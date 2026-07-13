import React from 'react';
import styles from './InfoBox.module.scss';

//UI Components : comInfoBox
/**
 * 콘텐츠 내 정보 상자 컴포넌트
 * @param {string} icon - 아이콘 클래스명 (예: icon001 ~ icon024)
 * @param {string} imgSrc - 이미지 포함형(comInfoBoxImg)일 때 사용할 이미지 경로
 * @param {string} imgAlt - 이미지 alt 텍스트
 * @param {React.ReactNode} title - 정보 제목 (em 강조로 표시)
 * @param {string} desc - 정보 설명 텍스트
 * @param {Array} textList - 항목형 설명 목록 [{ label, content }]
 * @param {string} className - 추가적인 커스텀 클래스
 */
const InfoBox = ({
  icon,
  imgSrc,
  imgAlt,
  title,
  desc,
  textList = [],
  className = '',
}) => {
  const wrapClass = `${styles.comInfoBox} ${imgSrc ? styles.comInfoBoxImg : ''} ${className}`.trim();
  const boxAreaClass = `${styles.boxArea} ${icon ? styles[icon] : ''}`.trim();

  return (
    <div className={wrapClass}>
      <div className={boxAreaClass}>
        {imgSrc && (
          <div className={styles.imgGroup}>
            <div className={styles.imgArea}>
              <img src={imgSrc} alt={imgAlt} />
            </div>
          </div>
        )}
        <div className={styles.infoCont}>
          <dl className={styles.infoBox}>
            <dt className={styles.tit}><em>{title}</em></dt>
            <dd className={styles.desc}>
              {textList.length > 0 ? (
                <ul className="pubTextList">
                  {textList.map((item, idx) => (
                    <li className="textListItem" key={idx}>
                      <em>{item.label}</em> : {item.content}
                    </li>
                  ))}
                </ul>
              ) : (
                desc
              )}
            </dd>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default InfoBox;
