import React from 'react';

//UI Components : btn
/**
 * 공통 버튼 컴포넌트
 * @param {string} children - 버튼 내부 텍스트 및 요소
 * @param {string} type - 버튼 타입 (button, submit, reset)
 * @param {string} variant - 색상 옵션 (blue, dkLine, gLine)
 * @param {string} size - 크기 옵션 (lg, md, sm, xl)
 * @param {boolean} disabled - 비활성화 여부
 * @param {function} onClick - 클릭 이벤트 핸들러
 * @param {string} className - 추가적인 커스텀 클래스
 */
const Button = ({ 
  children, 
  type = "button", 
  variant = "blue", 
  size = "md", 
  disabled = false, 
  onClick,
  className = ""
}) => {
  // 가이드라인에 따른 클래스 조합: btn [색상] [크기] [커스텀]
  const buttonClass = `btn ${variant} ${size} ${className}`.trim();

  return (
    <button 
      type={type} 
      className={buttonClass} 
      disabled={disabled} 
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;