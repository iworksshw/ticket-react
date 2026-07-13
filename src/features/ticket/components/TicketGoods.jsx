import NumberInput from '@/components/common/forms/NumberInput';
import styles from './TicketGoods.module.scss';

//ui components : comTicketGoods

function TicketGoods({ goodsList = [], total, onCountChange, onRemove }) {
  if (goodsList.length === 0) {
    return (
      <div className={styles.comTicketGoods}>
        <ul className={styles.goodsList}>
          <li className={styles.item}>
            <p className={styles.noMsg}>선택된 상품이 없습니다.</p>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className={styles.comTicketGoods}>
      <ul className={styles.goodsList}>
        {goodsList.map((goods) => (
          <li key={goods.id} className={styles.item}>
            <dl className={styles.info}>
              <dt className={styles.tit}>
                <span>{goods.name}</span>
                <button
                  type="button"
                  className={styles.btnDel}
                  onClick={() => onRemove?.(goods.id)}
                >
                  상품삭제
                </button>
              </dt>
              <dd className={styles.desc}>
                <NumberInput
                  value={goods.count}
                  min={0}
                  max={goods.max}
                  unit="개"
                  onChange={(value) => onCountChange?.(goods.id, value)}
                />
                <div className={styles.priceBox}>
                  {goods.oldPrice && <span className={styles.oldPrice}>{goods.oldPrice}</span>}
                  <span className={styles.price}>
                    <span className={styles.bold}>{goods.price}</span>
                    {goods.won && <span className={styles.won}>{goods.won}</span>}
                  </span>
                </div>
              </dd>
            </dl>
          </li>
        ))}
      </ul>

      {total && (
        <div className={styles.totalPrice}>
          <dl className={styles.info}>
            <dt className={styles.tit}>
              <span>상품</span>
            </dt>
            <dd className={styles.desc}>
              {total.oldPrice && <span className={styles.oldPrice}>{total.oldPrice}</span>}
              <span className={styles.price}>
                <span className={styles.bold}>{total.price}</span>
                {total.won && <span className={styles.won}>{total.won}</span>}
              </span>
            </dd>
          </dl>
        </div>
      )}
    </div>
  );
}

export default TicketGoods;
