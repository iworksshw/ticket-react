import React from 'react';
import styles from './StepBox.module.scss';

//UI Components : comStepBox
/**
 * 단계별 절차 박스 컴포넌트
 * @param {Array} steps - 단계 목록 [{ icon, iconAlt, stepLabel, title, desc, descArea }]
 * @param {string} className - 추가적인 커스텀 클래스
 */
const StepBox = ({ steps = [], className = '' }) => {
  return (
    <div className={`${styles.comStepBox} ${className}`.trim()}>
      <div className={styles.stepBoxArea}>
        {steps.map((step, idx) => (
          <div className={styles.cont} key={idx}>
            <div className={styles.icBox}><img src={step.icon} alt={step.iconAlt || ''} /></div>
            <div className={styles.contBox}>
              <dl>
                <dt className={styles.tit}><em>{step.stepLabel}</em> {step.title}</dt>
                <dd className={styles.desc}>
                  {step.desc}
                  {step.descArea?.length > 0 && (
                    <ul className={styles.descArea}>
                      {step.descArea.map((item, i) => (
                        <li className={styles.item} key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                </dd>
              </dl>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepBox;
