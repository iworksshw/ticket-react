import React from 'react';
import './ButtonGroup.module.scss';

//UI Components : comBtnGroup
// comBtnGroup/alignL/alignC/alignR/cta/moR는 다른 컴포넌트(TicketPriceInfo 등)의 scss에서도
// 전역 클래스로 참조하므로, CSS Module 스코프(styles.xxx) 대신 문자열 그대로 사용한다.
// 실제 :global 처리는 ButtonGroup.module.scss에서 한다.

/**
 * 버튼 그룹 및 정렬 컴포넌트
 *
 * @param {React.ReactNode} children    - 내부 Button 컴포넌트들
 * @param {string}  align               - 정렬 방향 (alignL | alignC | alignR)
 * @param {boolean} isCta               - CTA 버튼 그룹 여부 (버튼 너비 고정)
 * @param {boolean} moR                 - 모바일에서 오른쪽 정렬 유지 여부
 * @param {string}  moCols              - 모바일 컬럼 배치 (1 | 1-2 | 2-1 | 2-2)
 * @param {string}  className           - 추가 커스텀 클래스
 */
const ButtonGroup = ({
    children,
    align = 'alignC',
    isCta = false,
    moR = false,
    moCols,
    className = '',
}) => {
    const innerClasses = [
        align,
        isCta && 'cta',
        moR && 'moR',
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div className={`comBtnGroup ${className}`.trim()}>
            <div className={innerClasses} data-mo-cols={moCols}>
                {children}
            </div>
        </div>
    );
};

export default ButtonGroup;
