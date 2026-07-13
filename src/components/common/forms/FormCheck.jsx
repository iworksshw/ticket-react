import React from 'react';

//UI Components : frmChoBox, frmChoList, frmGroup

/**
 * 공통 체크박스 / 라디오 컴포넌트
 * @param {string} type - 컨트롤 타입 ('checkbox', 'radio')
 * @param {string} name - radio group을 위한 네임 속성
 * @param {string} size - 크기 옵션 (기본값, 'lg', 'sm', 'tiny')
 * @param {boolean} isTextType - 'txt' 클래스 추가 여부 (텍스트추가타입용)
 * @param {boolean} isNoText - 'noText' 클래스 추가 여부 (글자 숨김용)
 * @param {Array} options - 여러 개를 한 번에 렌더링할 때 사용하는 옵션 배열 [{ id, label, checked, disabled }]
 * @param {boolean} isList - ul > li 구조(frmChoList)로 감쌀지 여부
 * @param {boolean} isMultiLine - frmGroup에 multiLine 클래스를 추가할지 여부
 * @param {string} color - 체크박스 색상 모디파이어 (예: 'blue', 'green', 'red', 'black'). 옵션별로 다르면 options[].color로 개별 지정 가능
 */
const FormCheck = ({
  type = 'checkbox',
  id,
  name,
  label,
  checked,
  disabled = false,
  size = '', // '', 'lg', 'sm', 'tiny'
  color = '',
  isTextType = false,
  isNoText = false,
  onChange,
  className = '',
  // 그룹형 처리를 위한 props
  options,
  isList = false,
  isMultiLine = false,
}) => {
  // 인풋 공통 클래스 및 라벨 클래스 빌더
  const inputBaseClass = type === 'radio' ? 'iptRdo' : 'iptChk';
  const inputClass = `${inputBaseClass} ${size} ${isTextType ? 'txt' : ''} ${color}`.trim();
  const labelClass = `iptLbl ${isNoText ? 'noText' : ''}`.trim();

  // 단일 인풋 컴포넌트 렌더링 함수
  const renderCheckItem = (itemProps) => {
    const {
      id: itemId,
      label: itemLabel,
      checked: itemChecked,
      disabled: itemDisabled,
      color: itemColor,
    } = itemProps;
    const itemInputClass = itemColor ? `${inputClass} ${itemColor}`.trim() : inputClass;

    return (
      <>
        <input
          type={type}
          id={itemId}
          name={name}
          className={itemInputClass}
          checked={itemChecked}
          disabled={itemDisabled}
          onChange={onChange}
        />
        <label htmlFor={itemId} className={labelClass}>
          {itemLabel}
        </label>
      </>
    );
  };

  // 1. 단일 컴포넌트로 사용할 경우 (options가 없을 때)
  if (!options) {
    return (
      <div className={`frmChoBox ${className}`.trim()}>
        {renderCheckItem({ id, label, checked, disabled })}
      </div>
    );
  }

  // 2. 그룹 컴포넌트로 사용할 경우 (options 배열이 있을 때)
  const groupClass = `frmGroup ${isMultiLine ? 'multiLine' : ''} ${className}`.trim();

  return (
    <div className={groupClass}>
      {isList ? (
        <ul className="frmChoList">
          {options.map((opt) => (
            <li key={opt.id} className="frmChoBox">
              {renderCheckItem(opt)}
            </li>
          ))}
        </ul>
      ) : (
        options.map((opt) => (
          <div key={opt.id} className="frmChoBox">
            {renderCheckItem(opt)}
          </div>
        ))
      )}
    </div>
  );
};

export default FormCheck;