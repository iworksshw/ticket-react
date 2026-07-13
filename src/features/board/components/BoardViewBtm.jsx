import React from 'react';
import styles from './BoardViewBtm.module.scss';

//ui components : comNextPrev

const BoardViewBtm = ({
  // 이전글 제목 (없으면 '이전글이 없습니다.' 표시)
  prevTitle = '',

  // 이전글 등록일
  prevDate = '',

  // 이전글 실제 주소 - 접근성을 위해 href에 실제 이동 경로를 넣어준다
  prevHref = '#',

  // 다음글 제목 (없으면 '다음글이 없습니다.' 표시)
  nextTitle = '',

  // 다음글 등록일
  nextDate = '',

  // 다음글 실제 주소 - 접근성을 위해 href에 실제 이동 경로를 넣어준다
  nextHref = '#',

  // 이전글 클릭 시 호출되는 콜백 - SPA 라우팅을 쓰는 경우 기본 이동을 막고 직접 처리
  onPrevClick,

  // 다음글 클릭 시 호출되는 콜백
  onNextClick,

  // 추가로 적용할 className
  className = '',
}) => {
  // onPrevClick/onNextClick이 있으면 기본 페이지 이동(새로고침)을 막고 콜백으로 위임하고,
  // 콜백이 없으면 href로 그대로 이동하게 둔다.
  const handleClick = (event, callback) => {
    if (!callback) return;
    event.preventDefault();
    callback();
  };

  return (
    <div className={`${styles.comNextPrev} ${className}`.trim()}>
      <dl className={styles.npGroup}>
        <dt className={styles.npTitle}>이전글</dt>
        {prevTitle ? (
          <dd className={styles.npCont}>
            <span className={styles.text}>
              <a href={prevHref} onClick={(event) => handleClick(event, onPrevClick)}>{prevTitle}</a>
            </span>
            <i className={styles.date}>{prevDate}</i>
          </dd>
        ) : (
          <dd className={`${styles.npCont} ${styles.noText}`}>
            <span className={styles.text}>이전글이 없습니다.</span>
          </dd>
        )}
      </dl>
      <dl className={styles.npGroup}>
        <dt className={styles.npTitle}>다음글</dt>
        {nextTitle ? (
          <dd className={styles.npCont}>
            <span className={styles.text}>
              <a href={nextHref} onClick={(event) => handleClick(event, onNextClick)}>{nextTitle}</a>
            </span>
            <i className={styles.date}>{nextDate}</i>
          </dd>
        ) : (
          <dd className={`${styles.npCont} ${styles.noText}`}>
            <span className={styles.text}>다음글이 없습니다.</span>
          </dd>
        )}
      </dl>
    </div>
  );
};

export default BoardViewBtm;
