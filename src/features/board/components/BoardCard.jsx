import Button from '@/components/common/forms/Button';
import styles from './BoardCard.module.scss';

//UI Components : comBoardCard

/**
 * 카드형 게시판 목록 컴포넌트
 * @param {Array} cards - [{ title, infoList, onDetail, onApply }]
 *   infoList: [{ label, value, note }] - note가 있으면 value 아래 줄에 <em>으로 덧붙는다.
 */
function BoardCard({ cards = [] }) {
  return (
    <div className={styles.comBoardCard}>
      <ul className={styles.cardGroup}>
        {cards.map((card) => (
          <li key={card.title} className={styles.cardItem}>
            <div className={styles.cardBox}>
              <div className={styles.cardTitle}>{card.title}</div>
              {card.infoList.map((info) => (
                <dl key={info.label} className={styles.cardInfo}>
                  <dt>{info.label}</dt>
                  <dd>
                    {info.value}
                    {info.note && (
                      <>
                        <br />
                        <em>{info.note}</em>
                      </>
                    )}
                  </dd>
                </dl>
              ))}
              <div className={styles.btnBox}>
                <Button variant="gLine" onClick={card.onDetail}>상세보기</Button>
                <Button variant="blue" onClick={card.onApply}>신청하기</Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BoardCard;
