import ButtonGroup from '@/components/common/forms/ButtonGroup';
import Button from '@/components/common/forms/Button';
import styles from './Partner.module.scss';

// ui components : comPartner (리스트형)
// 원본 퍼블리싱 파일: docs/html-src/html/common/comPartner.html

/**
 * 제휴서비스 컴포넌트 (리스트형)
 * @param {Array} partners - 제휴사 목록. [{ id, title, benefitLabel, benefitDesc, image, alt }]
 * @param {function} onSelectPartner - 제휴사 항목 클릭 시 (partner)를 인자로 호출
 * @param {function} onConfirm - "확인" 버튼 클릭 시 호출
 */
const Partner = ({ partners = [], onSelectPartner, onConfirm }) => {
  const handleKeyDown = (e, partner) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelectPartner?.(partner);
    }
  };

  return (
    <div className={styles.comPartner}>
      {partners.map((partner) => (
        <div
          key={partner.id}
          className={`${styles.partnerBox} ${styles.partnerList}`}
          role="button"
          tabIndex={0}
          onClick={() => onSelectPartner?.(partner)}
          onKeyDown={(e) => handleKeyDown(e, partner)}
        >
          <div className={styles.boxTxt}>
            <p className={styles.tit}>{partner.title}</p>
            <dl className={styles.listBox}>
              <dt className={styles.listTit}>{partner.benefitLabel}</dt>
              <dd className={styles.listDesc}>{partner.benefitDesc}</dd>
            </dl>
          </div>
          <div className={styles.boxImg}>
            <img src={partner.image} alt={partner.alt} />
          </div>
        </div>
      ))}

      <ButtonGroup align="alignC" isCta>
        <Button variant="blue" size="lg" onClick={onConfirm}>확인</Button>
      </ButtonGroup>
    </div>
  );
};

export default Partner;
