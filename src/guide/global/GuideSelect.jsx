import { useState } from 'react';
import Select from '@/components/common/forms/Select';

import FormGroup from '@/components/common/forms/FormGroup';

function GuideSelect() {
  const [basicValue, setBasicValue] = useState('2025');
  const [halfValue, setHalfValue] = useState('2025');
  const [thrdValue, setThrdValue] = useState('2025');
  const [frthValue, setFrthValue] = useState('2025');
  const [defaultValue, setDefaultValue] = useState('2025');
  const [largeValue, setLargeValue] = useState('2025');
  const [smallValue, setSmallValue] = useState('2025');

  const options = [
    { value: '2025', label: '2025' },
    { value: '2026', label: '2026' },
    { value: '2027', label: '2027' },
  ];

  return (
    <div style={{ display: 'grid', gap: '24px' }}>
      <section>
        <h3>Select Guide</h3>
        <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/components/common/forms/Select.jsx, src/components/common/forms/FormGroup.jsx</p>
      </section>

      <section>
        <h4>Size Variants</h4>
        <FormGroup>
          <Select
            title="년도"
            value={basicValue}
            onChange={(e) => setBasicValue(e.target.value)}
            options={options}
            size="xs"
          />
          <Select
            title="년도"
            value={basicValue}
            onChange={(e) => setBasicValue(e.target.value)}
            options={options}
            size="sm"
          />
          <Select
            title="년도"
            value={basicValue}
            onChange={(e) => setBasicValue(e.target.value)}
            options={options}
            size="md"
          />
          <Select
            title="년도"
            value={basicValue}
            onChange={(e) => setBasicValue(e.target.value)}
            options={options}
            size="lg"
          />
        </FormGroup>
      </section>

      <section>
        <h4>Half Width</h4>
        <Select
          title="년도"
          value={halfValue}
          onChange={(e) => setHalfValue(e.target.value)}
          options={options}
          size="half"
        />
      </section>

      <section>
        <h4>Third / Fourth Width</h4>
        <FormGroup>
          <Select
            title="년도"
            value={thrdValue}
            onChange={(e) => setThrdValue(e.target.value)}
            options={options}
            size="thrd"
          />
          <Select
            title="년도"
            value={frthValue}
            onChange={(e) => setFrthValue(e.target.value)}
            options={options}
            size="frth"
          />
        </FormGroup>
      </section>

      <section>
        <h4>Default Width</h4>
        <Select
          title="년도"
          value={defaultValue}
          onChange={(e) => setDefaultValue(e.target.value)}
          options={options}
        />
      </section>

      <section>
        <h4>Large / Default / Small</h4>
        <FormGroup>
          <Select
            title="년도"
            value={largeValue}
            onChange={(e) => setLargeValue(e.target.value)}
            options={options}
            size="lg"
          />
          <Select
            title="년도"
            value={defaultValue}
            onChange={(e) => setDefaultValue(e.target.value)}
            options={options}
          />
          <Select
            title="년도"
            value={smallValue}
            onChange={(e) => setSmallValue(e.target.value)}
            options={options}
            size="sm"
          />
        </FormGroup>
      </section>
    </div>
  );
}

export default GuideSelect;
