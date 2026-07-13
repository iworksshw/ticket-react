import { useState } from 'react';
import NumberInput from '@/components/common/forms/NumberInput';
import styles from './TicketPass.module.scss';

//ui components : comTicketPass

const passengerTypes = [
  { key: 'adult', label: '어른', desc: '(13세 이상)' },
  { key: 'child', label: '어린이', desc: '(만6세 ~ 만12세)' },
];

function TicketPass({ onChange }) {
  const [counts, setCounts] = useState({ adult: 0, child: 0 });

  const handleChange = (key, value) => {
    const next = { ...counts, [key]: value };
    setCounts(next);
    onChange?.(next);
  };

  return (
    <div className={styles.comTicketPass}>
      <ul className={styles.passengersList}>
        {passengerTypes.map(({ key, label, desc }) => (
          <li key={key}>
            <div className={styles.alignL}>
              <span>{label}<i>{desc}</i></span>
            </div>
            <div>
              <NumberInput
                value={counts[key]}
                min={0}
                onChange={(value) => handleChange(key, value)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TicketPass;
