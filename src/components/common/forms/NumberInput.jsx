import React from 'react';

//UI Components : pubIncDec
/**
 * 공통 증감 버튼 컴포넌트
 * @param {number} value - 현재 값
 * @param {number} min - 최소값
 * @param {number} max - 최대값
 * @param {string} unit - 단위 텍스트 (blind 처리)
 * @param {function} onChange - 값 변경 이벤트 핸들러 (변경된 값 전달)
 * @param {function} onMaxReached - max에 도달해 더 이상 증가할 수 없을 때 호출되는 핸들러
 * @param {string} className - 추가적인 커스텀 클래스
 */
const NumberInput = ({
  value = 0,
  min = 0,
  max,
  unit = "명",
  onChange,
  onMaxReached,
  className = ""
}) => {
  const isMinusDisabled = value <= min;
  const isPlusDisabled = max !== undefined && value >= max;

  const handleDecrease = () => {
    if (isMinusDisabled) return;
    onChange(value - 1);
  };

  const handleIncrease = () => {
    if (isPlusDisabled) {
      onMaxReached?.(max);
      return;
    }
    onChange(value + 1);
  };

  // 가이드라인에 따른 클래스 조합: pubIncDec [커스텀]
  const numberInputClass = `pubIncDec ${className}`.trim();

  return (
    <div className={numberInputClass}>
      <button
        type="button"
        className="btnNum minus"
        disabled={isMinusDisabled}
        onClick={handleDecrease}
      >
        -1
      </button>
      <span className="textNum">
        {value}
        <span className="blind">{unit}</span>
      </span>
      <button
        type="button"
        className="btnNum plus"
        disabled={isPlusDisabled}
        onClick={handleIncrease}
      >
        +1
      </button>
    </div>
  );
};

export default NumberInput;
