import React, { useState, useEffect } from 'react';

//UI Components : frmBox, iptText

const FormInput = ({ placeholder, title, value: propsValue, onChange, className, isError, errorMsg , ...rest }) => {
  const [value, setValue] = useState(propsValue || '');

  // 부모 컴포넌트에서 value가 변경되었을 때 내부 state도 동기화
  useEffect(() => {
    setValue(propsValue || '');
  }, [propsValue]);

  const handleInputChange = (e) => {
    setValue(e.target.value);
    if (onChange) onChange(e);
  };

  const handleReset = () => {
    setValue('');
    // 리셋 시 부모의 onChange나 state도 초기화하고 싶다면 가상 이벤트나 콜백을 호출할 수 있습니다.
    if (onChange) {
      onChange({ target: { value: '' } });
    }
  };

  // 기존 frmBox에 외부에서 넘겨준 클래스(frmTini, frmXs 등)를 합칩니다.
  const combinedClassName = `frmBox ${isError ? 'error' : ''} ${className || ''}`.trim();

  return (
    <div className={combinedClassName}>
      <input 
        type="text" 
        className="iptText" 
        placeholder={placeholder} 
        title={title} 
        value={value}
        onChange={handleInputChange}
        {...rest}
      />
      {/* 글자가 있을 때만 지우기 버튼 노출 */}
      {value && (
        <button type="button" className="btnReset" onClick={handleReset}>
          텍스트 지우기
        </button>
      )}
      {/* 에러 메시지가 있을 때만 렌더링 */}
      {isError && errorMsg && (
        <span className="errMsg">{errorMsg}</span>
      )}
    </div>
  );
};

export default FormInput;