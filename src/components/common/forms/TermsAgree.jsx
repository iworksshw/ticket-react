import FormGroup from './FormGroup';
import FormCheck from './FormCheck';
import styles from './TermsAgree.module.scss';

// ui components : comAgreement
// 원본 퍼블리싱 파일: docs/html-src/html/common/comAgreement.html
// "내용보기" 클릭 시 열리는 팝업(#sample01 .modPopup)은 별도 범위라 구현하지 않고,
// item.onShowDetail 콜백만 호출한다.

/**
 * 약관 동의 컴포넌트
 *
 * @param {'single'|'group'} variant - 'single'(기본) = 전체동의 없이 항목을 그대로 나열(항목마다 별도 comAgreement).
 *   'group' = 상단에 전체동의 체크박스(.agAll)를 추가하고, layout에 따라 항목을 묶어서 보여준다.
 * @param {'list'|'description'} layout - variant='group'일 때만 의미 있음.
 *   'list'(기본) = 항목마다 체크박스 + "내용보기" 팝업 버튼만 나열(.frmInner).
 *   'description' = 항목마다 체크박스 + 펼쳐진 안내 텍스트(.chkAllInner > .agreeInner 반복).
 * @param {Array} items - 약관 항목 목록. [{ id, label, required, checked, disabled, description, onShowDetail }]
 *   - required: true면 라벨 앞에 [필수], 아니면(group/list에서만) [선택] 뱃지를 붙인다.
 *   - description: 있으면 체크박스 아래/옆에 펼쳐진 안내 텍스트(.descArea)를 보여준다.
 *   - onShowDetail: 있으면 "내용보기" 버튼을 보여주고 클릭 시 (item)을 인자로 호출한다.
 * @param {boolean} agreeAll - variant='group'일 때 전체동의 체크 상태
 * @param {function} onToggleAll - 전체동의 체크박스 변경 시 (checked)를 인자로 호출
 * @param {function} onToggleItem - 개별 항목 체크박스 변경 시 (id, checked)를 인자로 호출
 * @param {string} referText - 하단 안내문구(.pubRefer sm). 없으면 표시하지 않는다.
 */
function TermsAgree({
  variant = 'single',
  layout = 'list',
  items = [],
  agreeAll = false,
  onToggleAll,
  onToggleItem,
  referText,
}) {
  const renderShowDesc = (item) =>
    item.onShowDetail && (
      <div className="showDesc">
        <button type="button" className="btn btnText ico" onClick={() => item.onShowDetail(item)}>
          내용보기
        </button>
      </div>
    );

  if (variant === 'group') {
    return (
      <div className={styles.comAgreement}>
        <div className={styles.agAll}>
          <FormGroup>
            <FormCheck
              type="checkbox"
              id="agreeAll"
              size="lg"
              isTextType
              label="전체동의"
              checked={agreeAll}
              onChange={(e) => onToggleAll?.(e.target.checked)}
            />
          </FormGroup>
        </div>

        {layout === 'description' ? (
          <div className="chkAllInner">
            {items.map((item) => (
              <div key={item.id} className={styles.agreeInner}>
                <div className={styles.checkArea}>
                  <FormGroup>
                    <FormCheck
                      type="checkbox"
                      id={item.id}
                      size="sm"
                      label={
                        item.required ? (
                          <>
                            <em>[필수]</em> {item.label}
                          </>
                        ) : (
                          item.label
                        )
                      }
                      checked={item.checked}
                      disabled={item.disabled}
                      onChange={(e) => onToggleItem?.(item.id, e.target.checked)}
                    />
                  </FormGroup>
                </div>
                {item.description && (
                  <div className={styles.descArea}>
                    <div className={styles.descBox}>{item.description}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.frmInner}>
            <ul>
              {items.map((item) => (
                <li key={item.id}>
                  <FormGroup>
                    <FormCheck
                      type="checkbox"
                      id={item.id}
                      size="tiny"
                      label={
                        <>
                          <span>{item.required ? '[필수]' : '[선택]'}</span> {item.label}
                        </>
                      }
                      checked={item.checked}
                      disabled={item.disabled}
                      onChange={(e) => onToggleItem?.(item.id, e.target.checked)}
                    />
                  </FormGroup>
                  {renderShowDesc(item)}
                </li>
              ))}
            </ul>
          </div>
        )}

        {referText && <p className="pubRefer sm">{referText}</p>}
      </div>
    );
  }

  return (
    <>
      {items.map((item) => (
        <div key={item.id} className={styles.comAgreement}>
          <div className={styles.agreeInner}>
            <div className={styles.checkArea}>
              <FormGroup>
                <FormCheck
                  type="checkbox"
                  id={item.id}
                  size="sm"
                  label={
                    item.required ? (
                      <>
                        <em>[필수]</em> {item.label}
                      </>
                    ) : (
                      item.label
                    )
                  }
                  checked={item.checked}
                  disabled={item.disabled}
                  onChange={(e) => onToggleItem?.(item.id, e.target.checked)}
                />
              </FormGroup>
              {renderShowDesc(item)}
            </div>
            {item.description && (
              <div className={styles.descArea}>
                <div className={styles.descBox}>{item.description}</div>
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
}

export default TermsAgree;
