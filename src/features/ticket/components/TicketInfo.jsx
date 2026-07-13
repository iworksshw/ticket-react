import Button from '@/components/common/forms/Button';
import styles from './TicketInfo.module.scss';

//ui components : comTicketInfo

/**
 * 티켓 정보 컴포넌트 (예약/승차권 정보를 보여주는 카드형 컨테이너)
 *
 * comTicketInfo.html에는 view/list 형태, 상세·간략보기 토글, 좌석 할인 분석표, 상품 목록 등이
 * 뒤섞인 8가지 변형이 있다. 전부를 boolean prop으로 흉내내면 API가 매우 복잡해지므로,
 * 이 컴포넌트는 "상단 정보(infoTop) + 기본 정보 행(infoItems) + 가격 요약(priceList)"이라는
 * 공통 뼈대만 책임지고, 좌석 할인표(TicketDiscount)나 상품 목록(TicketGoodsList) 같이 화면마다
 * 달라지는 영역은 children으로 그대로 끼워 넣게 한다.
 *
 * @param {'default'|'view'|'list'} variant - 카드 외형. 'view'=티켓 모양(둥근 절취선),
 *   'list'=리스트 카드(테두리+호버), 'default'=기본 사각 카드.
 * @param {string} date - 승차일 텍스트 (예: '2025-10-05'). 없으면 infoName에서 생략.
 * @param {string} trainNo - 열차번호 텍스트 (예: 'A1026'). 없으면 infoName에서 생략.
 * @param {object} dateSelect - { type: 'radio'|'checkbox', id, name, label, checked, onChange }을
 *   넘기면 date/trainNo 텍스트 대신 라디오(다른 승차일로 전환)나 체크박스(이 승차권을 선택)
 *   형태로 보여준다. 예: { type: 'radio', id: 'rdo001', name: 'rdo001', label: '승차일 2025-10-06',
 *   checked, onChange }. 넘기지 않으면(기본) date/trainNo 텍스트로 표시한다.
 *   detailToggle과 함께 넘기면(원본 html처럼 둘이 같은 화면에 같이 쓰이는 경우), 이 컴포넌트가
 *   자동으로 checked를 isOpen에 맞춰서 보여주고 클릭 시 detailToggle.onToggle을 호출한다 —
 *   즉 "상세보기 = 체크됨", "간략보기 = 체크 풀림"이 항상 같이 움직이도록 보장한다. dateSelect만
 *   단독으로 쓸 때는(예: 체크박스로 승차권 자체를 고르는 경우) 넘겨준 checked/onChange가 그대로 쓰인다.
 * @param {Array} stations - [{ name, time }] 출발/도착역 2개를 순서대로 넘긴다.
 * @param {Array} statusList - [{ type: 'goods'|'print', label }] 역 옆에 보여줄 뱃지 목록. 선택.
 * @param {object} detailToggle - { isOpen, onToggle }을 넘기면 "상세보기/간략보기" 버튼이 생기고,
 *   isOpen에 따라 infoItems/children/priceList 영역을 보이거나 숨긴다. 넘기지 않으면 버튼 없이
 *   항상 펼쳐진 상태로 보여준다.
 * @param {Array} infoItems - [[{ tit, desc, colorBlue }]] 그룹별 정보 행. 그룹마다(배열 안의
 *   배열) 점선 구분선이 추가된다. desc는 문자열뿐 아니라 JSX도 넘길 수 있다. colorBlue:true면
 *   desc를 파란색(.colorBlue)으로 강조한다 (예: 할인 금액 "-14,500원").
 * @param {Array} priceList - [{ tit, desc, won, total, colorBlue }] 하단 가격 요약 행.
 *   total:true면 구분선과 함께 굵은 글씨로 강조되고, colorBlue:true면 desc가 파란색으로 표시된다.
 * @param {'default'|'type02'|'minus'} priceListVariant - priceList 영역의 표시 형태.
 * @param {boolean} priceListInBottom - true면 priceList를 infoBtm으로 감싸 카드 맨 아래 별도
 *   영역에 둔다(승차권 취소/반환 화면처럼 priceList가 본문과 분리되어야 할 때 사용).
 * @param {React.ReactNode} children - infoItems 아래, priceList 위에 넣을 추가 영역.
 *   TicketDiscount, TicketGoodsList 같은 컴포넌트를 그대로 끼워 넣으면 된다.
 */
function TicketInfo({
  variant = 'default',
  date,
  trainNo,
  dateSelect,
  stations = [],
  statusList = [],
  detailToggle,
  infoItems = [],
  priceList = [],
  priceListVariant = 'default',
  priceListInBottom = false,
  children,
}) {
  const rootClassName =
    variant === 'default' ? styles.comTicketInfo : `${styles.comTicketInfo} ${styles[variant]}`;
  const isOpen = detailToggle ? detailToggle.isOpen : true;
  // dateSelect와 detailToggle이 같이 쓰이면(원본 html에서 둘이 항상 짝을 이루는 경우), 체크
  // 상태를 isOpen에서 직접 끌어와서 "상세보기=체크됨, 간략보기=체크 풀림"이 항상 맞도록 강제한다.
  const resolvedDateSelect =
    dateSelect && detailToggle
      ? { ...dateSelect, checked: isOpen, onChange: detailToggle.onToggle }
      : dateSelect;
  const priceListClassName =
    priceListVariant === 'default'
      ? styles.priceList
      : `${styles.priceList} ${styles[priceListVariant]}`;

  const priceListBlock = priceList.length > 0 && (
    <div className={priceListClassName}>
      {priceList.map((row) => (
        <dl key={row.tit} className={row.total ? `${styles.info} ${styles.total}` : styles.info}>
          <dt className={styles.tit}>{row.tit}</dt>
          <dd className={styles.desc}>
            {row.colorBlue ? <span className={styles.colorBlue}>{row.desc}</span> : row.desc}
            {row.won && <span className={styles.won}>{row.won}</span>}
          </dd>
        </dl>
      ))}
    </div>
  );

  return (
    <div className={rootClassName}>
      <div className={styles.infoTop}>
        <div className={styles.infoL}>
          {resolvedDateSelect ? (
            // dateSelect가 있으면 날짜를 라디오/체크박스로 선택하는 형태로 바뀐다.
            // frmGroup/frmChoBox/iptChk/iptLbl은 전역 폼 클래스라서 styles.xxx가 아니라
            // 문자열 그대로 사용한다(Button의 .btn과 같은 이유).
            <div className={styles.infoRadio}>
              <div className="frmGroup">
                <div className="frmChoBox">
                  <input
                    id={resolvedDateSelect.id}
                    type={resolvedDateSelect.type}
                    name={resolvedDateSelect.name}
                    className="iptChk"
                    checked={resolvedDateSelect.checked}
                    onChange={resolvedDateSelect.onChange}
                  />
                  <label htmlFor={resolvedDateSelect.id} className="iptLbl">
                    {resolvedDateSelect.label}
                  </label>
                </div>
              </div>
            </div>
          ) : (
            <ul className={styles.infoName}>
              {date && (
                <li className={styles.item}>
                  <span>승차일</span>
                  <span className={styles.em}>{date}</span>
                </li>
              )}
              {trainNo && (
                <li className={styles.item}>
                  <span>열차번호</span>
                  <span className={styles.em}>{trainNo}</span>
                </li>
              )}
            </ul>
          )}
          <div className={styles.stationBox}>
            {stations.map((station) => (
              <div key={station.name} className={styles.station}>
                <span className={styles.name}>{station.name}</span>
                <span className={styles.time}>{station.time}</span>
              </div>
            ))}
            {statusList.length > 0 && (
              <div className={styles.statusGroup}>
                {statusList.map((status) => (
                  <span key={status.type} className={`${styles.status} ${styles[status.type]}`}>
                    {status.label}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 상세보기/간략보기 표시 자체는 isOpen 상태(React)로 직접 제어한다. 원본 scss는
            라디오 :checked나 .btn.on 클래스를 CSS :has()로 감지해 보이고 숨기는데, 이 컴포넌트는
            그 대신 React 조건부 렌더링으로 같은 결과를 더 단순하게 만든다. .on 클래스는
            토글 버튼의 화살표 아이콘 회전 같은 순수 시각 효과를 위해서만 남겨둔다. */}
        {detailToggle && (
          <div className={styles.infoR}>
            <Button variant="gLine" className={isOpen ? styles.on : ''} onClick={detailToggle.onToggle}>
              {isOpen ? '간략보기' : '상세보기'}
            </Button>
          </div>
        )}
      </div>

      {isOpen && (
        <div className={styles.infoCont}>
          {infoItems.length > 0 && (
            <ul className={styles.infoList}>
              {infoItems.map((group, groupIndex) => (
                <li key={groupIndex} className={styles.item}>
                  {group.map((row) => (
                    <dl key={row.tit} className={styles.info}>
                      <dt className={styles.tit}>{row.tit}</dt>
                      <dd className={styles.desc}>
                        {row.colorBlue ? (
                          <span className={styles.colorBlue}>{row.desc}</span>
                        ) : (
                          row.desc
                        )}
                      </dd>
                    </dl>
                  ))}
                </li>
              ))}
            </ul>
          )}

          {children}

          {!priceListInBottom && priceListBlock}
        </div>
      )}

      {priceListInBottom && isOpen && <div className={styles.infoBtm}>{priceListBlock}</div>}
    </div>
  );
}

export default TicketInfo;
