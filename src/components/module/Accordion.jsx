import React, { useState } from 'react';
import styles from './Accordion.module.scss';

//UI Components : modAccordion
/**
 * 아코디언 컴포넌트
 * @param {Array} items - 아코디언 목록
 *   - question {ReactNode} 질문 영역
 *   - answer {ReactNode} 답변 영역
 * @param {string} variant - 동작 방식 ('' 기본(다중 토글) | 'allOpen' 전체 열림 고정 | 'upDown' 1개만 열림)
 * @param {Array} defaultOpenIndexes - variant=''(기본) 일 때, 최초 열려있는 항목 인덱스 목록
 * @param {number} defaultOpenIndex - variant='upDown' 일 때, 최초 열려있는 항목 인덱스 (없으면 전부 닫힘)
 */
const Accordion = ({ items = [], variant = '', defaultOpenIndexes = [], defaultOpenIndex = null }) => {
  // [기본 모드 전용 state]
  // 여러 항목이 동시에 열릴 수 있어야 하므로, "열려있는 인덱스들의 모음"을 Set으로 관리한다.
  // 배열 대신 Set을 쓰는 이유: 특정 인덱스가 열려있는지(has), 추가(add), 제거(delete)가
  // 배열의 includes/filter 조합보다 코드가 짧고 의도가 분명해지기 때문.
  const [openIndexes, setOpenIndexes] = useState(new Set(defaultOpenIndexes));

  // [upDown 모드 전용 state]
  // upDown은 "동시에 최대 1개만 열림"이 규칙이므로, 여러 개를 담을 수 있는 Set이 아니라
  // 열려있는 항목의 인덱스 "단 하나"만 저장하면 된다. 아무것도 안 열려있으면 null.
  const [openIndex, setOpenIndex] = useState(defaultOpenIndex);

  // variant 문자열을 매번 비교하지 않도록 boolean으로 미리 뽑아둔다. (가독성 목적)
  const isAllOpen = variant === 'allOpen';
  const isUpDown = variant === 'upDown';

  // 특정 인덱스가 "현재 열려있는 상태인지" 판단하는 함수.
  // 모드별로 열림 여부를 저장하는 state가 다르기 때문에(Set vs 단일값 vs 무조건 true)
  // 렌더링 쪽에서 매번 분기하지 않도록 여기서 한 번에 정리한다.
  const isOpen = (index) => {
    if (isAllOpen) return true; // allOpen은 클릭과 무관하게 항상 열린 것으로 취급
    if (isUpDown) return openIndex === index; // upDown은 저장된 인덱스와 같을 때만 열림
    return openIndexes.has(index); // 기본 모드는 Set에 포함되어 있으면 열림
  };

  // 질문(dt)을 클릭했을 때 실행되는 토글 로직.
  const handleToggle = (index) => {
    // allOpen은 "항상 열려있는 고정 상태"이므로 클릭해도 아무 동작을 하지 않는다.
    // (참고: scss에서도 allOpen일 때 question에 cursor:default를 줘서 클릭 가능한 것처럼 보이지 않게 처리함)
    if (isAllOpen) return;

    if (isUpDown) {
      // 같은 항목을 다시 클릭하면 닫고(null), 다른 항목을 클릭하면 그 인덱스로 "교체"한다.
      // 교체하는 방식이기 때문에 기존에 열려있던 항목은 자동으로 닫히는 효과가 생긴다.
      setOpenIndex((prev) => (prev === index ? null : index));
      return;
    }

    // 기본 모드: 클릭한 인덱스만 Set에서 추가/제거한다. 다른 인덱스는 건드리지 않으므로
    // 여러 항목이 각자 독립적으로 열리고 닫힐 수 있다.
    // useState의 이전 값(prev)을 기반으로 새 Set을 "복사해서" 만드는 이유:
    // 리액트는 state가 "새로운 객체(참조)"로 바뀌어야 변경을 감지하고 재렌더링하기 때문에,
    // 기존 Set을 직접 수정(prev.add(...))하면 참조가 그대로라 화면이 갱신되지 않을 수 있다.
    setOpenIndexes((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  // allOpen일 때만 최상위에 allOpen 클래스를 추가한다.
  // 이 클래스는 scss에서 화살표 아이콘 숨김 + cursor:default 처리에 쓰인다.
  const accoClass = `${styles.modAccordion} ${isAllOpen ? styles.allOpen : ''}`.trim();

  return (
    <div className={accoClass}>
      <div className={styles.accoArea}>
        {items.map((item, index) => {
          const on = isOpen(index);

          // 열림 상태에 따라 on 클래스를 붙여준다.
          // - question의 on 클래스: scss에서 화살표(::after)를 180도 회전시켜 방향을 바꾸는 데 사용
          // - answer의 on 클래스: scss에서 grid-template-rows를 0fr → 1fr로 바꿔
          //   높이가 부드럽게 늘어나며 열리는 애니메이션을 만드는 데 사용 (height:auto는 transition이 안 되기 때문)
          const questionClass = `${styles.question} ${on ? styles.on : ''}`.trim();
          const answerClass = `${styles.answer} ${on ? styles.on : ''}`.trim();

          return (
            // key는 index를 사용한다. items 배열의 순서가 바뀌거나 항목이 중간에서
            // 추가/삭제되지 않는 정적인 목록이라는 전제이므로 index key로도 문제되지 않는다.
            <dl className={styles.qnaBox} key={index}>
              {/*
                aria-expanded: 스크린 리더 등 보조기기가 "이 항목이 펼쳐져 있는지"를 알 수 있게 해주는
                접근성 속성. 열림 상태(on)를 그대로 boolean으로 넘겨주면 된다.
              */}
              <dt className={questionClass} aria-expanded={on} onClick={() => handleToggle(index)}>
                {item.question}
              </dt>
              {/*
                dd(answer)는 항상 DOM에 존재하고, display:none 대신 높이(grid-template-rows)로
                열고 닫는다. display:none을 쓰면 즉시 사라져서 transition 애니메이션이 적용되지 않기 때문.
              */}
              <dd className={answerClass}>
                <div className={styles.answerText}>{item.answer}</div>
              </dd>
            </dl>
          );
        })}
      </div>
    </div>
  );
};

export default Accordion;
