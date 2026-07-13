import { useEffect, useId, useRef, useState } from 'react';
import DatePicker from 'tui-date-picker';
import 'tui-date-picker/dist/tui-date-picker.css';
import FormCheck from '@/components/common/forms/FormCheck';
import Button from '@/components/common/forms/Button';
import styles from './Meeting.module.scss';

// ui components : comMeeting (이력조회검색바)
// 원본 퍼블리싱 파일: docs/html-src/html/common/comMeeting.html
// tui-date-picker의 DatePicker.createRangePicker로 시작일/종료일 input + container를 연결한다.
// input의 값은 라이브러리가 직접 DOM을 제어하므로 React에서는 uncontrolled로 두고,
// change:start/change:end 이벤트로 선택된 날짜만 state로 가져와 onSearch에 전달한다.

/**
 * 이력조회검색바 컴포넌트
 * @param {function} onSearch - "조회" 버튼 클릭 시 ({ startDate, endDate, checks })를 인자로 호출
 */
function Meeting({ onSearch }) {
  const idPrefix = useId();
  const startInputRef = useRef(null);
  const startContainerRef = useRef(null);
  const endInputRef = useRef(null);
  const endContainerRef = useRef(null);
  const rangePickerRef = useRef(null);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [checks, setChecks] = useState({ all: false, ticket: false, goods: false });

  useEffect(() => {
    const rangePicker = DatePicker.createRangePicker({
      startpicker: {
        input: startInputRef.current,
        container: startContainerRef.current,
      },
      endpicker: {
        input: endInputRef.current,
        container: endContainerRef.current,
      },
      format: 'yyyy-MM-dd',
    });

    rangePicker.on('change:start', () => setStartDate(rangePicker.getStartDate()));
    rangePicker.on('change:end', () => setEndDate(rangePicker.getEndDate()));
    rangePickerRef.current = rangePicker;

    return () => {
      rangePicker.destroy();
      rangePickerRef.current = null;
    };
  }, []);

  const checkOptions = [
    { id: `${idPrefix}-chk01`, key: 'all', label: '전체(승차권+상품)' },
    { id: `${idPrefix}-chk02`, key: 'ticket', label: '승차권' },
    { id: `${idPrefix}-chk03`, key: 'goods', label: '상품' },
  ].map((item) => ({ ...item, checked: checks[item.key] }));

  const handleCheckChange = (e) => {
    const target = checkOptions.find((opt) => opt.id === e.target.id);
    if (!target) return;
    setChecks((prev) => ({ ...prev, [target.key]: e.target.checked }));
  };

  return (
    <div className={styles.comMeeting}>
      <div className={styles.meetingArea}>
        <div className={`${styles.meetingDate} ${styles.ticket}`}>
          <div className={styles.tit}>조회일</div>
          <div className={styles.fnGroupWrap}>
            <div className={`frmGroup ${styles.frmGroupBe}`}>
              <div className="tui-datepicker-input tui-datetime-input">
                <input ref={startInputRef} id={`${idPrefix}-startpicker-input`} type="text" title="조회일 기간검색 시작일" />
                <div ref={startContainerRef} />
              </div>
            </div>
            <div aria-hidden="true" className={styles.deco}>~</div>
            <div className={`frmGroup ${styles.frmGroupAf}`}>
              <div className="tui-datepicker-input tui-datetime-input">
                <input ref={endInputRef} id={`${idPrefix}-endpicker-input`} type="text" title="조회일 기간검색 종료일" />
                <div ref={endContainerRef} />
              </div>
            </div>
            <FormCheck type="checkbox" size="sm" options={checkOptions} onChange={handleCheckChange} />
          </div>
          <Button
            type="button"
            variant="dkBlue"
            onClick={() => onSearch?.({ startDate, endDate, checks })}
          >
            조회
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Meeting;
