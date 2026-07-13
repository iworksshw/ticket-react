import React from 'react';
import styles from './ImgWrap.module.scss';

//UI Components : comImgWrap
/**
 * 이미지 그룹 래퍼 컴포넌트
 * @param {Array} items - 이미지 목록 [{ srcPc, srcMo, alt, caption, link, noBdr }]
 * @param {number} cols - 한 줄에 보일 이미지 수 (2,3,4,5). 미지정 시 1장(기본)
 * @param {boolean} abBder - 항상 테두리를 적용하는 모디파이어
 * @param {string} imgTit - 이미지 그룹 상단 타이틀
 * @param {Array} imgTxtList - 하단 불릿 목록 [{ text, caption }]
 * @param {string} imgTxtB - 하단 일반 텍스트
 * @param {string} className - 추가적인 커스텀 클래스
 */
const ImgWrap = ({
  items = [],
  cols,
  abBder = false,
  imgTit,
  imgTxtList = [],
  imgTxtB,
  className = '',
}) => {
  const colClass = cols ? styles[`col${cols}`] : '';
  const wrapClass = `${styles.comImgWrap} ${colClass} ${abBder ? styles.abBder : ''} ${className}`.trim();

  return (
    <div className={wrapClass}>
      {imgTit && <p className={styles.imgTit}>{imgTit}</p>}

      <div className={styles.imgGroup}>
        {items.map((item, idx) => (
          <div className={`${styles.imgArea} ${item.noBdr ? styles.noBdr : ''}`.trim()} key={idx}>
            {item.srcMo ? (
              <>
                <img className={styles.imgPC} src={item.srcPc} alt={item.alt} />
                <img className={styles.imgMO} src={item.srcMo} alt={item.alt} />
              </>
            ) : (
              <img src={item.srcPc} alt={item.alt} />
            )}
            {item.caption && (
              <p className={styles.imgTxt}>
                {item.link ? (
                  <a href={item.link} target="_blank" rel="noopener noreferrer">{item.caption}</a>
                ) : (
                  item.caption
                )}
              </p>
            )}
          </div>
        ))}
      </div>

      {imgTxtList.length > 0 && (
        <ul className={styles.imgTxtList}>
          {imgTxtList.map((desc, idx) => (
            <li key={idx}>
              {desc.text}
              {desc.caption && (
                <p className={`pubCaption ${styles.pubCaption}`}>{desc.caption}</p>
              )}
            </li>
          ))}
        </ul>
      )}

      {imgTxtB && <p className={styles.imgTxtB}>{imgTxtB}</p>}
    </div>
  );
};

export default ImgWrap;
