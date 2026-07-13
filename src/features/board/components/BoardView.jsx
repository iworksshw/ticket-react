import React from 'react';
import styles from './BoardView.module.scss';

//ui components : comBoardView

const BoardView = ({
  // 게시글 제목
  title = '',

  // 등록일 (예: '2025.08.20')
  date = '',

  // 조회수
  view = 0,

  // 게시글 본문 - 이미지 등을 포함한 HTML 문자열
  content = '',

  // 추가로 적용할 className
  className = '',
}) => {
  return (
    <div className={`${styles.comBoardView} ${className}`.trim()}>
      <div className={styles.boardArea}>
        <div className={styles.boardTop}>
          {/* <div className={styles.boardType}>Type Area</div> */}
          <h2 className={styles.boardTitle}>{title}</h2>
          <ul className={styles.boardState}>
            <li className={`${styles.item} ${styles.info}`}>등록일 : {date}</li>
            <li className={`${styles.item} ${styles.info}`}>조회수 : {view}</li>
          </ul>
        </div>
        <div className={styles.boardBody}>
          {/* content는 DB/에디터에서 내려오는 HTML 문자열이라 boardCont 내부 클래스(예: .center)는
              모듈 해시 대상이 아니므로 BoardView.module.scss에서 :global(.center)로 처리되어 있다. */}
          <div className={styles.boardCont} dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </div>
  );
};

export default BoardView;
