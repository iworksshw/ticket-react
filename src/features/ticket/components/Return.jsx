import React from 'react';
import TicketGoods from './TicketGoods';
import styles from './Return.module.scss';

//UI Components : comReturn
/**
 * 상품 반품 컴포넌트
 * @param {string} tit - 안내 문구
 * @param {string} topTit - 상품정보 영역 타이틀
 * @param {Array} goodsList - TicketGoods에 전달할 상품 목록
 * @param {Object} total - TicketGoods에 전달할 합계 정보
 * @param {function} onCountChange - 상품 수량 변경 핸들러
 * @param {function} onRemove - 상품 삭제 핸들러
 */
const Return = ({
  tit = '열차가 출발하면 상품취소를 할 수 없습니다.',
  topTit = '상품정보',
  goodsList = [],
  total,
  onCountChange,
  onRemove,
}) => {
  return (
    <div className={styles.comReturn}>
      <div className={styles.txtBox}>
        <p className={styles.tit}>{tit}</p>
      </div>
      <div className={styles.contBox}>
        <p className={styles.topTit}>{topTit}</p>
        <TicketGoods
          goodsList={goodsList}
          total={total}
          onCountChange={onCountChange}
          onRemove={onRemove}
        />
      </div>
    </div>
  );
};

export default Return;
