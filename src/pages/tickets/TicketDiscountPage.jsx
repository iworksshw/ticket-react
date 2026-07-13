import { useState } from 'react';
import Popup from '@/components/module/Popup';
import Button from '@/components/common/forms/Button';
import FormTable from '@/components/common/forms/FormTable';
import FormGroup from '@/components/common/forms/FormGroup';
import FormInput from '@/components/common/forms/FormInput';
import FormCheck from '@/components/common/forms/FormCheck';
import Select from '@/components/common/forms/Select';
import SeatDiscount from '@/features/ticket/components/SeatDiscount';
import { parseSeatId } from '@/features/ticket/seatMap';
import {
  ADULT_DISCOUNT_AMOUNT,
  CHILD_DISCOUNT_AMOUNT,
  SENIOR_DISCOUNT_AMOUNT,
  EXCHANGE_DISCOUNT_AMOUNT,
  COUPON_DISCOUNT_AMOUNT,
  AFFILIATE_DISCOUNT_AMOUNT,
} from '@/features/ticket/discountRules';

// docs/html-dist/html/menu01/page_01_01_03_pop06.html 참고
// 신분증/설명만 있는 단순 할인 행(어른/어린이/경로/장애인/국가유공자). 어른은 "할인없음"이라
// discountLabel이 없고(승차권 목록에 아무 뱃지도 안 붙음), 기본 500원만 자동 할인된다.
// (장애인 할인금액은 별도로 안내받지 못해 경로/국가유공자와 같은 3,500원으로 가정했다 — 다르면 알려주세요.)
const SIMPLE_DISCOUNT_ROWS = [
  { id: 'adult', label: '어른', desc: '할인 중복적용 불가', amount: ADULT_DISCOUNT_AMOUNT, discountLabel: null },
  {
    id: 'child',
    label: '어린이',
    desc: '탑승일 기준 만 6세 ~ 만 12세',
    amount: CHILD_DISCOUNT_AMOUNT,
    discountLabel: '어린이할인',
  },
  { id: 'senior', label: '경로', desc: '신분증', amount: SENIOR_DISCOUNT_AMOUNT, discountLabel: '경로할인' },
  {
    id: 'disabled',
    label: '장애인',
    desc: (
      <>
        시·군·구청장 발행 복지카드<br />국가·지방자치단체가 발급한 장애인등록증/장애인증명서
      </>
    ),
    amount: SENIOR_DISCOUNT_AMOUNT,
    discountLabel: '장애인할인',
  },
  {
    id: 'veteran',
    label: '국가유공자',
    desc: (
      <>
        국가보훈처 발행 유공자증<br />국가보훈처 발행 5.18 민주유공자
      </>
    ),
    amount: SENIOR_DISCOUNT_AMOUNT,
    discountLabel: '국가유공자할인',
  },
];

function getDiscountInfo(discountType) {
  const simple = SIMPLE_DISCOUNT_ROWS.find((row) => row.id === discountType);
  if (simple) return { amount: simple.amount, label: simple.discountLabel };
  if (discountType === 'exchange') return { amount: EXCHANGE_DISCOUNT_AMOUNT, label: '교환번호할인' };
  if (discountType === 'coupon-member') return { amount: COUPON_DISCOUNT_AMOUNT, label: '할인쿠폰(회원)할인' };
  if (discountType === 'coupon') return { amount: COUPON_DISCOUNT_AMOUNT, label: '할인쿠폰할인' };
  if (discountType === 'affiliate') return { amount: AFFILIATE_DISCOUNT_AMOUNT, label: '제휴카드할인' };
  return { amount: 0, label: null };
}

function getDiscountType(discountLabel) {
  const simple = SIMPLE_DISCOUNT_ROWS.find((row) => row.discountLabel === discountLabel);
  if (simple) return simple.id;
  if (discountLabel === '교환번호할인') return 'exchange';
  if (discountLabel === '할인쿠폰(회원)할인') return 'coupon-member';
  if (discountLabel === '할인쿠폰할인') return 'coupon';
  if (discountLabel === '제휴카드할인') return 'affiliate';
  return 'adult';
}

function formatWon(amount) {
  return `${amount.toLocaleString()}원`;
}

/**
 * 할인선택 팝업 (trainSelection 페이지의 승차권 목록에서 "할인선택" 버튼을 누르면 연다)
 * @param {boolean} isOpen
 * @param {function} onClose
 * @param {{ seatId: string, oldPrice: number, discountLabel: string|null, discountAmount: number }} ticket
 *   - 할인을 변경할 좌석(승차권) 데이터. 팝업을 열 때 이 좌석의 현재 할인이 미리 선택되어 있다.
 * @param {function} onConfirm - 확인 버튼 클릭 시 ({ discountLabel, discountAmount })를 인자로 호출.
 */
function TicketDiscountPage({ isOpen, onClose, ticket, onConfirm }) {
  const [discountType, setDiscountType] = useState(() => getDiscountType(ticket?.discountLabel));
  const [exchangeCode, setExchangeCode] = useState('');
  const [exchangeVerified, setExchangeVerified] = useState(false);
  const [memberCouponOption, setMemberCouponOption] = useState('');
  const [memberCouponCode, setMemberCouponCode] = useState('');
  const [memberCouponVerified, setMemberCouponVerified] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponVerified, setCouponVerified] = useState(false);
  const [affCardRegistered, setAffCardRegistered] = useState(false);
  const [cardNumber, setCardNumber] = useState('');

  // 팝업이 새로 열릴 때마다(닫힘->열림) 그 좌석의 현재 할인상태로 폼을 다시 맞춘다.
  // 렌더링 중 상태를 맞추는 React 공식 패턴이라 useEffect를 쓰지 않는다.
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setDiscountType(getDiscountType(ticket?.discountLabel));
      setExchangeCode('');
      setExchangeVerified(false);
      setMemberCouponOption('');
      setMemberCouponCode('');
      setMemberCouponVerified(false);
      setCouponCode('');
      setCouponVerified(false);
      setAffCardRegistered(false);
      setCardNumber('');
    }
  }

  if (!ticket) return null;

  const parsed = parseSeatId(ticket.seatId);
  const { amount: discountAmount } = getDiscountInfo(discountType);

  const handleExchangeToggle = () => {
    if (exchangeVerified) {
      setExchangeVerified(false);
      setExchangeCode('');
    } else {
      setExchangeVerified(true);
    }
  };

  const handleCouponToggle = () => {
    if (couponVerified) {
      setCouponVerified(false);
      setCouponCode('');
    } else {
      setCouponVerified(true);
    }
  };

  const handleMemberCouponToggle = () => {
    if (memberCouponVerified) {
      setMemberCouponVerified(false);
      setMemberCouponCode('');
    } else {
      setMemberCouponVerified(true);
    }
  };

  const handleConfirm = () => {
    if (discountType === 'exchange' && !exchangeVerified) {
      alert('인증이 필요합니다');
      return;
    }
    if (discountType === 'coupon' && !couponVerified) {
      alert('인증이 필요합니다');
      return;
    }
    if (discountType === 'coupon-member') {
      if (!memberCouponOption) {
        alert('쿠폰을 선택해주세요');
        return;
      }
      if (memberCouponOption === 'direct' && !memberCouponVerified) {
        alert('인증이 필요합니다');
        return;
      }
    }

    const { amount, label } = getDiscountInfo(discountType);
    onConfirm({ discountLabel: label, discountAmount: amount });
    onClose();
  };

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      title="할인선택"
      footer={
        <Button variant="blue" size="lg" onClick={handleConfirm}>확인</Button>
      }
    >
      <SeatDiscount
        carNum={parsed ? `${parsed.car}호차` : ''}
        seatNum={parsed?.label ?? ''}
        regularPrice={formatWon(ticket.oldPrice)}
        discountPrice={formatWon(discountAmount)}
        finalPrice={formatWon(ticket.oldPrice - discountAmount)}
      />

      <FormTable
        caption="할인선택_어른(할인없음), 어린이, 경로, 장애인, 국가유공자, 교환번호, 할인쿠폰(회원), 할인쿠폰, 제휴카드로 구성된 표"
        colWidths={['200px', 'auto']}
      >
        {SIMPLE_DISCOUNT_ROWS.map((row) => {
          // 어른으로 예약된 좌석은 어린이할인을 받을 수 없다.
          const isDisabled = row.id === 'child' && ticket.passengerType === 'adult';
          return (
            <tr key={row.id}>
              <th className="left">
                <FormCheck
                  type="radio"
                  id={row.id}
                  name="discount"
                  label={row.label}
                  checked={discountType === row.id}
                  disabled={isDisabled}
                  onChange={() => setDiscountType(row.id)}
                />
              </th>
              <td className="left">{row.desc}</td>
            </tr>
          );
        })}

        {/* 교환번호: 13자리 입력 후 인증을 누르면 인증버튼이 취소버튼으로 바뀐다 */}
        <tr>
          <th className="left">
            <FormCheck
              type="radio"
              id="exchange"
              name="discount"
              label="교환번호"
              checked={discountType === 'exchange'}
              onChange={() => setDiscountType('exchange')}
            />
          </th>
          <td className="left">
            <FormGroup>
              <FormInput
                title="교환번호"
                placeholder="교환번호 13자리를 입력해 주세요."
                value={exchangeCode}
                onChange={(e) => setExchangeCode(e.target.value)}
                disabled={exchangeVerified}
                maxLength={13}
              />
              <button type="button" className="fncBtn" onClick={handleExchangeToggle}>
                {exchangeVerified ? '취소' : '인증'}
              </button>
            </FormGroup>
          </td>
        </tr>

        {/* 할인쿠폰(회원): 쿠폰 선택 또는 "직접 입력" 선택 시 8자리 교환번호 입력+인증 표출 */}
        <tr>
          <th className="left">
            <FormCheck
              type="radio"
              id="coupon-member"
              name="discount"
              label="할인쿠폰(회원)"
              checked={discountType === 'coupon-member'}
              onChange={() => setDiscountType('coupon-member')}
            />
          </th>
          <td className="left">
            <FormGroup>
              <Select
                title="쿠폰 선택"
                placeholder="쿠폰 선택"
                value={memberCouponOption}
                onChange={(e) => {
                  setMemberCouponOption(e.target.value);
                  setMemberCouponVerified(false);
                  setMemberCouponCode('');
                }}
                options={[
                  { value: 'opt1', label: '옵션1' },
                  { value: 'direct', label: '직접 입력' },
                ]}
              />
            </FormGroup>
            {memberCouponOption === 'direct' && (
              <FormGroup>
                <FormInput
                  title="교환번호"
                  placeholder="교환번호 8자리를 입력해 주세요."
                  value={memberCouponCode}
                  onChange={(e) => setMemberCouponCode(e.target.value)}
                  disabled={memberCouponVerified}
                  maxLength={8}
                />
                <button type="button" className="fncBtn" onClick={handleMemberCouponToggle}>
                  {memberCouponVerified ? '취소' : '인증'}
                </button>
              </FormGroup>
            )}
          </td>
        </tr>

        {/* 할인쿠폰: 8자리 입력 후 인증을 누르면 인증버튼이 취소버튼으로 바뀐다 */}
        <tr>
          <th className="left">
            <FormCheck
              type="radio"
              id="coupon"
              name="discount"
              label="할인쿠폰"
              checked={discountType === 'coupon'}
              onChange={() => setDiscountType('coupon')}
            />
          </th>
          <td className="left">
            <FormGroup>
              <FormInput
                title="교환번호"
                placeholder="교환번호 8자리를 입력해 주세요."
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                disabled={couponVerified}
                maxLength={8}
              />
              <button type="button" className="fncBtn" onClick={handleCouponToggle}>
                {couponVerified ? '취소' : '인증'}
              </button>
            </FormGroup>
          </td>
        </tr>

        {/* 제휴카드: 정보입력은 추후 제작이라 지금은 라디오 선택만으로 할인이 적용된다 */}
        <tr>
          <th className="left">
            <FormCheck
              type="radio"
              id="affiliate"
              name="discount"
              label="제휴카드"
              checked={discountType === 'affiliate'}
              onChange={() => setDiscountType('affiliate')}
            />
            <button type="button" className="affList" title="새 창 열림">제휴카드목록</button>
          </th>
          <td className="left">
            {affCardRegistered ? (
              <FormGroup>
                <FormInput
                  title="카드번호"
                  placeholder="000-****-****-0000 (MM/YY)"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
                <button
                  type="button"
                  className="fncBtn"
                  onClick={() => {
                    setAffCardRegistered(false);
                    setCardNumber('');
                  }}
                >
                  취소
                </button>
              </FormGroup>
            ) : (
              <FormGroup>
                <button type="button" className="affCardInfo" onClick={() => setAffCardRegistered(true)}>
                  제휴카드 정보 입력
                </button>
              </FormGroup>
            )}
          </td>
        </tr>
      </FormTable>
    </Popup>
  );
}

export default TicketDiscountPage;
