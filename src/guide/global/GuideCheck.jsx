import React, { useState } from 'react';
import FormCheck from '@/components/common/forms/FormCheck';

function GuideCheck() {
  const [largeState, setLargeState] = useState({
    chk704: false,
    chk705: true,
    chk702: false,
    chk703: true,
  });

  const [textState, setTextState] = useState({
    chk706: false,
    chk707: true,
    chk708: false,
    chk709: true,
  });

  const [defaultState, setDefaultState] = useState({
    chk101: false,
    chk102: false,
    chk103: false,
  });

  const [listState, setListState] = useState({
    chk201: false,
    chk202: false,
    chk203: false,
  });

  const [smallDisabledState] = useState({
    chk301: false,
    chk302: false,
    chk303: true,
  });

  const [smallState, setSmallState] = useState({
    chk401: false,
    chk402: false,
    chk403: false,
  });

  const [smallListState, setSmallListState] = useState({
    chk501: false,
    chk502: false,
    chk503: false,
  });

  const [tinyState, setTinyState] = useState({
    chk601: true,
    chk602: false,
    chk603: false,
  });

  const [multiLineState, setMultiLineState] = useState({
    chk801: false,
    chk802: false,
    chk803: false,
    chk804: false,
    chk805: false,
    chk806: false,
    chk807: false,
    chk808: false,
    chk809: false,
    chk810: false,
    chk811: false,
    chk812: false,
  });

  const [radioDisabledValue] = useState('rdo003');
  const [radioValue, setRadioValue] = useState('rdo103');
  const [radioListValue, setRadioListValue] = useState('rdo201');
  const [radioSmallDisabledValue] = useState('rdo303');
  const [radioSmallValue, setRadioSmallValue] = useState('rdo403');
  const [radioSmallListValue, setRadioSmallListValue] = useState('rdo501');

  const handleCheckboxChange = (state, setState) => (e) => {
    const key = e.target.id;
    setState((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleRadioChange = (setter) => (e) => setter(e.target.id);

  return (
    <div style={{ display: 'grid', gap: '24px' }}>
      <section>
        <h3>Checkbox / Radio Guide</h3>
        <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/components/common/forms/FormCheck.jsx</p>
      </section>

      <section>
        <h4>Large Checkboxes - noText</h4>
        <FormCheck
          type="checkbox"
          name="chkLarge"
          size="lg"
          isNoText
          options={[
            { id: 'chk704', label: '체크박스마다', checked: largeState.chk704 },
            { id: 'chk705', label: '떨어진', checked: largeState.chk705 },
            { id: 'chk702', label: '떨어진', checked: largeState.chk702, disabled: true },
            { id: 'chk703', label: '길이가 같아요', checked: largeState.chk703, disabled: true },
          ]}
          onChange={handleCheckboxChange(largeState, setLargeState)}
        />
      </section>

      <section>
        <h4>Large Checkboxes - Text Type</h4>
        <FormCheck
          type="checkbox"
          name="chkText"
          size="lg"
          isTextType
          options={[
            { id: 'chk706', label: '텍스트추가타입', checked: textState.chk706 },
            { id: 'chk707', label: '텍스트추가타입', checked: textState.chk707 },
            { id: 'chk708', label: '텍스트추가타입', checked: textState.chk708, disabled: true },
            { id: 'chk709', label: '텍스트추가타입', checked: textState.chk709, disabled: true },
          ]}
          onChange={handleCheckboxChange(textState, setTextState)}
        />
      </section>

      <section>
        <h4>Disabled Checkboxes</h4>
        <FormCheck
          type="checkbox"
          name="chkDisabled"
          options={[
            { id: 'chk001', label: '체크박스마다', checked: smallDisabledState.chk301, disabled: true },
            { id: 'chk002', label: '떨어진', checked: smallDisabledState.chk302, disabled: true },
            { id: 'chk003', label: '길이가 같아요', checked: smallDisabledState.chk303, disabled: true },
          ]}
          onChange={() => {}}
        />
      </section>

      <section>
        <h4>Default Checkboxes</h4>
        <FormCheck
          type="checkbox"
          name="chkDefault"
          options={[
            { id: 'chk101', label: '체크박스마다', checked: defaultState.chk101 },
            { id: 'chk102', label: '떨어진', checked: defaultState.chk102 },
            { id: 'chk103', label: '길이가 같아요', checked: defaultState.chk103 },
          ]}
          onChange={handleCheckboxChange(defaultState, setDefaultState)}
        />
      </section>

      <section>
        <h4>List Checkboxes</h4>
        <FormCheck
          type="checkbox"
          name="chkList"
          isList
          options={[
            { id: 'chk201', label: '체크박스의', checked: listState.chk201 },
            { id: 'chk202', label: '너비가 글자수랑 상관없이', checked: listState.chk202 },
            { id: 'chk203', label: '모두 같아요', checked: listState.chk203 },
          ]}
          onChange={handleCheckboxChange(listState, setListState)}
        />
      </section>

      <section>
        <h4>Small Disabled Checkboxes</h4>
        <FormCheck
          type="checkbox"
          name="chkSmallDisabled"
          size="sm"
          options={[
            { id: 'chk301', label: '체크박스마다', checked: smallDisabledState.chk301, disabled: true },
            { id: 'chk302', label: '떨어진', checked: smallDisabledState.chk302, disabled: true },
            { id: 'chk303', label: '길이가 같아요', checked: smallDisabledState.chk303, disabled: true },
          ]}
          onChange={() => {}}
        />
      </section>

      <section>
        <h4>Small Checkboxes</h4>
        <FormCheck
          type="checkbox"
          name="chkSmall"
          size="sm"
          options={[
            { id: 'chk401', label: '체크박스마다', checked: smallState.chk401 },
            { id: 'chk402', label: '떨어진', checked: smallState.chk402 },
            { id: 'chk403', label: '길이가 같아요', checked: smallState.chk403 },
          ]}
          onChange={handleCheckboxChange(smallState, setSmallState)}
        />
      </section>

      <section>
        <h4>Small List Checkboxes</h4>
        <FormCheck
          type="checkbox"
          name="chkSmallList"
          size="sm"
          isList
          options={[
            { id: 'chk501', label: '체크박스의', checked: smallListState.chk501 },
            { id: 'chk502', label: '너비가 글자수랑 상관없이', checked: smallListState.chk502 },
            { id: 'chk503', label: '모두 같아요', checked: smallListState.chk503 },
          ]}
          onChange={handleCheckboxChange(smallListState, setSmallListState)}
        />
      </section>

      <section>
        <h4>Radio Group - Disabled</h4>
        <FormCheck
          type="radio"
          name="rdo001"
          options={[
            { id: 'rdo001', label: '라디오마다', checked: radioDisabledValue === 'rdo001', disabled: true },
            { id: 'rdo002', label: '떨어진', checked: radioDisabledValue === 'rdo002', disabled: true },
            { id: 'rdo003', label: '길이가 같아요', checked: radioDisabledValue === 'rdo003', disabled: true },
          ]}
          onChange={() => {}}
        />
      </section>

      <section>
        <h4>Radio Group</h4>
        <FormCheck
          type="radio"
          name="rdo101"
          options={[
            { id: 'rdo101', label: '라디오마다', checked: radioValue === 'rdo101' },
            { id: 'rdo102', label: '떨어진', checked: radioValue === 'rdo102' },
            { id: 'rdo103', label: '길이가 같아요', checked: radioValue === 'rdo103' },
          ]}
          onChange={handleRadioChange(setRadioValue)}
        />
      </section>

      <section>
        <h4>Radio List</h4>
        <FormCheck
          type="radio"
          name="rdo201"
          isList
          options={[
            { id: 'rdo201', label: '라디오의', checked: radioListValue === 'rdo201' },
            { id: 'rdo202', label: '너비가 글자수랑 상관없이', checked: radioListValue === 'rdo202' },
            { id: 'rdo203', label: '모두 같아요', checked: radioListValue === 'rdo203' },
          ]}
          onChange={handleRadioChange(setRadioListValue)}
        />
      </section>

      <section>
        <h4>Small Disabled Radio</h4>
        <FormCheck
          type="radio"
          name="rdo301"
          size="sm"
          options={[
            { id: 'rdo301', label: '라디오마다', checked: radioSmallDisabledValue === 'rdo301', disabled: true },
            { id: 'rdo302', label: '떨어진', checked: radioSmallDisabledValue === 'rdo302', disabled: true },
            { id: 'rdo303', label: '길이가 같아요', checked: radioSmallDisabledValue === 'rdo303', disabled: true },
          ]}
          onChange={() => {}}
        />
      </section>

      <section>
        <h4>Small Radio Group</h4>
        <FormCheck
          type="radio"
          name="rdo401"
          size="sm"
          options={[
            { id: 'rdo401', label: '라디오마다', checked: radioSmallValue === 'rdo401' },
            { id: 'rdo402', label: '떨어진', checked: radioSmallValue === 'rdo402' },
            { id: 'rdo403', label: '길이가 같아요', checked: radioSmallValue === 'rdo403' },
          ]}
          onChange={handleRadioChange(setRadioSmallValue)}
        />
      </section>

      <section>
        <h4>Small Radio List</h4>
        <FormCheck
          type="radio"
          name="rdo501"
          size="sm"
          isList
          options={[
            { id: 'rdo501', label: '라디오의', checked: radioSmallListValue === 'rdo501' },
            { id: 'rdo502', label: '너비가 글자수랑 상관없이', checked: radioSmallListValue === 'rdo502' },
            { id: 'rdo503', label: '모두 같아요', checked: radioSmallListValue === 'rdo503' },
          ]}
          onChange={handleRadioChange(setRadioSmallListValue)}
        />
      </section>

      <section>
        <h4>Tiny Checkboxes List</h4>
        <FormCheck
          type="checkbox"
          name="chkTiny"
          size="tiny"
          isList
          options={[
            { id: 'chk601', label: '라디오의', checked: tinyState.chk601 },
            { id: 'chk602', label: '너비가 글자수랑 상관없이', checked: tinyState.chk602 },
            { id: 'chk603', label: '모두 같아요', checked: tinyState.chk603 },
          ]}
          onChange={handleCheckboxChange(tinyState, setTinyState)}
        />
      </section>

      <section>
        <h4>Multi-line Checkboxes</h4>
        <FormCheck
          type="checkbox"
          name="chkMultiLine"
          isMultiLine
          options={Object.keys(multiLineState).map((id, index) => ({
            id,
            label: `여러줄은 ${index + 1}`,
            checked: multiLineState[id],
          }))}
          onChange={handleCheckboxChange(multiLineState, setMultiLineState)}
        />
      </section>
    </div>
  );
}

export default GuideCheck;
