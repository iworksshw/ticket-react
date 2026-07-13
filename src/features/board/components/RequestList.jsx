import React, { useState } from 'react';
import styles from './RequestList.module.scss';

const STATUS_LABELS = {
  ing: '접수중',
  comp: '답변완료',
};

//UI Components : comRequestList
/**
 * 문의내역 목록 컴포넌트
 * @param {Array} items - 문의 목록 [{ id, status, title, date, detail, defaultOpen, answer: { label, text, date } }]
 *   status: 'ing' | 'comp'
 * @param {string} emptyText - 목록이 없을 때 표시할 문구
 * @param {function} onDelete - 삭제 버튼 클릭 시 호출되는 핸들러 (id 전달)
 */
const RequestList = ({ items = [], emptyText = '문의하신 내역이 없습니다.', onDelete }) => {
  const [openIds, setOpenIds] = useState(
    () => new Set(items.filter((item) => item.defaultOpen).map((item) => item.id))
  );

  const toggleOpen = (id) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  if (items.length === 0) {
    return (
      <div className={styles.comRequestList}>
        <ul className={styles.noList}>
          <li>
            <p>{emptyText}</p>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className={styles.comRequestList}>
      <ul className={styles.hasList}>
        {items.map((item) => {
          const isOpen = openIds.has(item.id);
          return (
            <li className={isOpen ? styles.on : ''} key={item.id}>
              <button
                type="button"
                className={styles.trig}
                aria-expanded={isOpen}
                onClick={() => toggleOpen(item.id)}
              >
                <span className={styles.left}>
                  <span className={`${styles.stat} ${styles[item.status] || ''}`.trim()}>{STATUS_LABELS[item.status]}</span>
                  <span className={styles.tit}>{item.title}</span>
                </span>
                <span className={styles.right}>
                  <span className={styles.date}>{item.date}</span>
                  <span className={styles.trigIco}><span className="blind">{isOpen ? '접기' : '열기'}</span></span>
                </span>
              </button>
              <div className={styles.listCont}>
                <div className={styles.inner}>
                  <p className={styles.detail}>{item.detail}</p>
                  <div className={styles.opt}>
                    <button type="button" onClick={() => onDelete?.(item.id)}>삭제</button>
                  </div>
                  {item.answer && (
                    <div className={styles.answerBox}>
                      <div className={styles.area}>
                        <span className={`${styles.stat} ${styles.answer}`}>{item.answer.label || '답변'}</span>
                        <div className={styles.txt}>
                          <p className={styles.tit}>{item.answer.text}</p>
                          <p className={styles.date}>답변 등록일: <span>{item.answer.date}</span></p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RequestList;
