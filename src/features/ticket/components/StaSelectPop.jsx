import styles from './StaSelectPop.module.scss';

// ui components : comStaSelect
// 원본 퍼블리싱 파일: docs/html-src/html/common/comStaSelect.html

/**
 * 역 선택(팝업용) 컴포넌트
 *
 * @param {Array} stations - 상단 라디오로 보여줄 역/터미널 목록. [{ id, label, disabled }]
 * @param {string} selectedStation - 현재 선택된 station id
 * @param {function} onSelectStation - 라디오 선택 또는 하단 터미널 박스의 항공사 버튼 클릭 시 (id)를 인자로 호출
 * @param {string} caption - 라디오 아래 안내 문구. 기본값은 원본 html 텍스트.
 * @param {Array} terminals - 항공사 로고로 터미널을 찾을 수 있게 보여주는 박스 목록.
 *   [{ id, stationId, title, airlines: [{ id, name, image, alt }] }]
 *   stationId는 해당 박스 클릭 시 onSelectStation에 전달될 station id.
 * @param {string} name - 라디오 그룹 name 속성. 기본값 'staGroup'
 * @param {Array<string>} disabledStationIds - 선택할 수 없게 막을 station id 목록 (예: 이미 반대쪽에서 선택된 역)
 */
function StaSelectPop({
  stations = [],
  selectedStation,
  onSelectStation,
  caption = '항공권에 표시된 터미널 정보를 확인하여 선택하시기 바랍니다',
  terminals = [],
  name = 'staGroup',
  disabledStationIds = [],
}) {
  return (
    <div className={styles.comStaSelect}>
      <ul className={styles.staGroup}>
        {stations.map((station) => (
          <li key={station.id} className={styles.staItem}>
            <input
              type="radio"
              id={station.id}
              name={name}
              checked={selectedStation === station.id}
              disabled={station.disabled || disabledStationIds.includes(station.id)}
              onChange={() => onSelectStation?.(station.id)}
            />
            <label htmlFor={station.id}>{station.label}</label>
          </li>
        ))}
      </ul>

      <span className="pubCaption">{caption}</span>

      <ul className={styles.terminalList}>
        {terminals.map((terminal) => (
          <li key={terminal.id} className={styles.tmlItem}>
            <div className={styles.tmlTitle}>{terminal.title}</div>
            <div className={styles.tmlBox}>
              <div className={styles.tmlScroll}>
                <button
                  type="button"
                  className={styles.airBtn}
                  title={`열차역이 ${terminal.title}로 선택됩니다`}
                  disabled={disabledStationIds.includes(terminal.stationId)}
                  onClick={() => onSelectStation?.(terminal.stationId)}
                >
                  <ul className={styles.airList}>
                    {terminal.airlines.map((airline) => (
                      <li key={airline.id} className={styles.airItem}>
                        <span>{airline.name}</span>
                        <div className={styles.imgBox}>
                          <img src={airline.image} alt={airline.alt} />
                        </div>
                      </li>
                    ))}
                  </ul>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StaSelectPop;
