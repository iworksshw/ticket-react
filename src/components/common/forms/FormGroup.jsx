import React from 'react';

//UI Components : frmGroup

const FormGroup = ({ children, isError, errorMsg }) => {
  // 1. 여기서 error 상태에 따라 클래스를 동적으로 생성하고 (trim으로 공백 제거까지 완벽!)
  const groupClass = `frmGroup ${isError ? 'error' : ''}`.trim();

  return (
    // 2. 고정된 문자열 대신 변수(groupClass)를 그대로 넣어줍니다.
    <div className={groupClass}>
      <div className="frmGroupRow">
        {children} {/* 여기에 FormInput들이 들어감 */}
      </div>
      
      {/* 에러 메시지가 있을 때만 렌더링 */}
      {isError && errorMsg && (
        <span className="errMsg line">{errorMsg}</span>
      )}
    </div>
  );
};

export default FormGroup;