import styles from './TicketSearch.module.scss';

//ui components : comTicketSearch

/**
 * 승차권 검색 바 (comTicketSearch)
 * 각 필드는 직접 입력하지 않고, 클릭하면 상위에서 관리하는 팝업(역 선택/시간 선택/인원 선택)이 열리는
 * 읽기전용 트리거로 동작한다. 실제 값/팝업 상태는 상위(TicketSearchPage)가 소유한다.
 * @param {string} departureLabel - 출발역 표시 텍스트
 * @param {string} arrivalLabel - 도착역 표시 텍스트
 * @param {string} dateLabel - 날짜/시간 표시 텍스트
 * @param {string} headcountLabel - 인원 표시 텍스트
 * @param {function} onOpenDeparture - 출발역 필드 클릭 시
 * @param {function} onOpenArrival - 도착역 필드 클릭 시
 * @param {function} onOpenDate - 날짜 필드 클릭 시
 * @param {function} onOpenPassenger - 인원 필드 클릭 시
 * @param {function} onSwap - 출발역/도착역 바꾸기 버튼 클릭 시
 * @param {function} onSearch - 열차 조회 버튼 클릭 시
 * @param {boolean} searchDisabled - 열차 조회 버튼 비활성화 여부
 * @param {boolean} arrivalDisabled - 도착역 필드 비활성화 여부 (출발역 미선택 시 true)
 */
function TicketSearch({
  departureLabel = '',
  arrivalLabel = '',
  dateLabel = '',
  headcountLabel = '',
  onOpenDeparture,
  onOpenArrival,
  onOpenDate,
  onOpenPassenger,
  onSwap,
  onSearch,
  searchDisabled = true,
  arrivalDisabled = false,
}) {
  return (
    <div className={styles.comTicketSearch}>
      <ul className={styles.srhList}>
        <li className={styles.srhItem}>
          <dl className={styles.srhBox}>
            <dt className={styles.tit}><label htmlFor="srh001">출발역</label></dt>
            <dd className={styles.desc}>
              <input
                type="text"
                placeholder="어디서 출발하세요?"
                id="srh001"
                readOnly
                value={departureLabel}
                onClick={onOpenDeparture}
              />
            </dd>
          </dl>
          <button type="button" className={styles.btnChange} onClick={onSwap}>
            출발역/도착역 바꾸기
          </button>
          <dl className={styles.srhBox}>
            <dt className={styles.tit}><label htmlFor="srh002">도착역</label></dt>
            <dd className={styles.desc}>
              <input
                type="text"
                placeholder="어디로 갈까요?"
                id="srh002"
                readOnly
                disabled={arrivalDisabled}
                value={arrivalLabel}
                onClick={onOpenArrival}
              />
            </dd>
          </dl>
        </li>

        <li className={styles.srhItem}>
          <dl className={styles.srhBox}>
            <dt className={styles.tit}><label htmlFor="srh003">날짜</label></dt>
            <dd className={styles.desc}>
              <input
                type="text"
                placeholder="언제 떠나실 건가요?"
                id="srh003"
                readOnly
                value={dateLabel}
                onClick={onOpenDate}
              />
            </dd>
          </dl>
        </li>

        <li className={styles.srhItem}>
          <dl className={styles.srhBox}>
            <dt className={styles.tit}><label htmlFor="srh004">인원</label></dt>
            <dd className={styles.desc}>
              <input
                type="text"
                placeholder="몇명에서 가시나요?"
                id="srh004"
                readOnly
                value={headcountLabel}
                onClick={onOpenPassenger}
              />
            </dd>
          </dl>
          {/* .srhBox + button 선택자(scss)가 적용되도록 dl.srhBox 바로 다음에 button을 둔다 */}
          <button type="button" className={styles.btnSearch} disabled={searchDisabled} onClick={onSearch}>
            열차 조회
          </button>
        </li>
      </ul>
    </div>
  );
}

export default TicketSearch;
