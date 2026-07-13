import React from 'react';
import styles from './GrayBox.module.scss';

//UI Components : comGrayBox
/**
 * 회색 정보 박스 컴포넌트
 * @param {string} title - 소제목 (em 강조)
 * @param {string} subTitle - 부제목
 * @param {Array} lines - 안내 텍스트 목록 [{ num, text }]
 * @param {ReactNode} desc - 번호 없는 일반 안내 텍스트 (lines 대신 사용)
 * @param {string} referText - 참고 텍스트 (강조 키워드 앞부분)
 * @param {string} referHighlight - 참고 텍스트 강조 키워드
 * @param {string} referAfter - 참고 텍스트 강조 키워드 뒷부분
 * @param {string} imgSrc - 우측 참고 이미지 경로
 * @param {string} imgAlt - 우측 참고 이미지 alt 텍스트
 * @param {Array} imgList - 본문 아래 세로로 쌓이는 이미지 목록 [{ src, alt }]
 * @param {string} message - 단순 메시지형(중앙 정렬 텍스트)일 때 사용
 * @param {string} className - 추가적인 커스텀 클래스
 */
const GrayBox = ({
  title,
  subTitle,
  lines = [],
  desc,
  referText,
  referHighlight,
  referAfter,
  imgSrc,
  imgAlt,
  imgList = [],
  message,
  className = '',
}) => {
  const wrapClass = `${styles.comGrayBox} ${className}`.trim();

  if (message) {
    return (
      <div className={wrapClass}>
        <p className={`${styles.boxCont} varTextC`}>{message}</p>
      </div>
    );
  }

  return (
    <div className={wrapClass}>
      <dl className={styles.boxGroup}>
        <dt className={styles.boxTitle}>
          <em>{title}</em>
          <span>{subTitle}</span>
        </dt>
        <dd className={styles.boxCont}>
          {desc && <p>{desc}</p>}
          {(lines.length > 0 || referText || imgSrc) && (
            <div className={styles.alignBox}>
              <div className="alignL">
                {lines.map((line, idx) => (
                  <React.Fragment key={idx}>
                    <em>{line.num}</em> {line.text}
                    {idx < lines.length - 1 && <br />}
                  </React.Fragment>
                ))}
                {referText && (
                  <span className="pubRefer bold">
                    {referText}
                    {referHighlight && <span className="yellow">{referHighlight}</span>}
                    {referAfter}
                  </span>
                )}
              </div>
              {imgSrc && (
                <div className="alignR">
                  <img src={imgSrc} alt={imgAlt} />
                </div>
              )}
            </div>
          )}
          {imgList.length > 0 && (
            <div className={styles.imgBox}>
              <ul>
                {imgList.map((img, idx) => (
                  <li key={idx}>
                    <img src={img.src} alt={img.alt} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </dd>
      </dl>
    </div>
  );
};

export default GrayBox;
