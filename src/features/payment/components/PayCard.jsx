import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import FormTable from '@/components/common/forms/FormTable';
import FormGroup from '@/components/common/forms/FormGroup';
import FormInput from '@/components/common/forms/FormInput';
import FormCheck from '@/components/common/forms/FormCheck';
import styles from './PayCard.module.scss';

// ui components : comTicketPay
// 원본 퍼블리싱 파일: docs/html-src/html/common/comTicketPay.html

/**
 * 결제 방법 컴포넌트
 *
 * - 신용카드 / 간편결제 라디오로 .cont01 / .cont02 영역을 토글한다.
 * - 카드구분(국내/해외 발급카드)에 따라 표 행을 다르게 보여준다.
 *   국내 발급카드: 카드구분~인증번호 전체 행 노출. 해외 발급카드: 카드번호/유효기간 행만 노출.
 *
 * @param {Array} savedCards - 저장된 카드 슬라이드 목록. [{ id, alias, masked }]
 * @param {Array} easyPayMethods - 간편결제 수단 목록. [{ id, brand, label, sub, iconOnly }]
 *   brand는 scss 아이콘 클래스(kakaopay 등)와 매칭. iconOnly면 label을 blind 텍스트로만 보여준다
 *   (신용/체크카드 두 항목처럼 iconOnly가 아니면 label/sub를 화면에 그대로 보여준다).
 * @param {function} onAgreeChange - 개인정보 수집/이용 동의 체크박스 변경 시 (checked)를 인자로 호출
 */
function PayCard({
  savedCards = [
    { id: 'card01', alias: '카드별명', masked: '1234-****-****-5678' },
    { id: 'card02', alias: '카드별명', masked: '1234-****-****-5678' },
  ],
  easyPayMethods = [
    { id: 'easy01', brand: 'kakaopay', label: '카카오페이', iconOnly: true },
    { id: 'easy02', brand: 'paycopay', label: '페이코페이', iconOnly: true },
    { id: 'easy03', brand: 'creditCard01', label: '신용/체크카드', sub: '(해외 발급카드)' },
    { id: 'easy04', brand: 'creditCard02', label: '신용/체크카드', sub: '(국내 발급카드)' },
    { id: 'easy05', brand: 'alipay', label: '알리페이', iconOnly: true },
    { id: 'easy06', brand: 'wechatpay', label: '위챗페이', iconOnly: true },
    { id: 'easy07', brand: 'kbpay', label: '케이비 페이', iconOnly: true },
    { id: 'easy08', brand: 'samsungpay', label: '삼성페이', iconOnly: true },
  ],
  onAgreeChange,
}) {
  const [payMethod, setPayMethod] = useState('credit'); // 'credit' | 'easy'
  const [selectedCard, setSelectedCard] = useState(null); // savedCards의 id 또는 'direct'
  const [cardType, setCardType] = useState('domestic'); // 'domestic' | 'overseas'
  const [cardNumber, setCardNumber] = useState(['1234', '', '', '']);
  const [expiry, setExpiry] = useState({ month: '', year: '' });
  const [cardPassword, setCardPassword] = useState('');
  const [cardKind, setCardKind] = useState('personal'); // 'personal' | 'corporate'
  const [authCode, setAuthCode] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [selectedEasyPay, setSelectedEasyPay] = useState(null);
  const swiperRef = useRef(null);

  const handleCardNumberChange = (index, value) => {
    setCardNumber((prev) => prev.map((part, i) => (i === index ? value : part)));
  };

  const handleAgreeChange = (e) => {
    setAgreed(e.target.checked);
    onAgreeChange?.(e.target.checked);
  };

  return (
    <div className={styles.comTicketPay}>
      <div className={styles.payOption}>
        <ul>
          <li>
            <div className={styles.radCov}>
              <div className={styles.inner}>
                <input
                  type="radio"
                  name="pay"
                  id="pay01"
                  checked={payMethod === 'credit'}
                  onChange={() => setPayMethod('credit')}
                />
                <label htmlFor="pay01">신용카드</label>
              </div>
            </div>
          </li>
          <li>
            <div className={styles.radCov}>
              <div className={styles.inner}>
                <input
                  type="radio"
                  name="pay"
                  id="pay02"
                  checked={payMethod === 'easy'}
                  onChange={() => setPayMethod('easy')}
                />
                <label htmlFor="pay02">간편결제</label>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div className={styles.payInfoBox}>
        <div className={`${styles.cont01} ${payMethod === 'credit' ? styles.on : ''}`.trim()}>
          <div className={styles.cardList}>
            <div className={styles.slideOption}>
              <button
                type="button"
                className={styles.prev}
                onClick={() => swiperRef.current?.slidePrev()}
                aria-label="이전 슬라이드"
              >
                이전보기
              </button>
              <button
                type="button"
                className={styles.next}
                onClick={() => swiperRef.current?.slideNext()}
                aria-label="다음 슬라이드"
              >
                다음보기
              </button>
            </div>
            <Swiper
              className={styles.cardSlide}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              slidesPerView="auto"
              spaceBetween={12}
            >
              {savedCards.map((card) => (
                <SwiperSlide key={card.id}>
                  <input
                    type="radio"
                    name="card"
                    id={card.id}
                    checked={selectedCard === card.id}
                    onChange={() => setSelectedCard(card.id)}
                  />
                  <label htmlFor={card.id}>
                    <span className={styles.cardInfo}>
                      <span>{card.alias}</span>
                      <span>{card.masked}</span>
                    </span>
                  </label>
                </SwiperSlide>
              ))}
              <SwiperSlide className={styles.directType}>
                <input
                  type="radio"
                  name="card"
                  id="direct"
                  checked={selectedCard === 'direct'}
                  onChange={() => setSelectedCard('direct')}
                />
                <label htmlFor="direct">
                  <span className={styles.direct}>
                    <span>직접입력</span>
                  </span>
                </label>
              </SwiperSlide>
            </Swiper>
          </div>

          <FormTable
            caption="결제 방법 목록_카드구분, 카드번호, 유효기간, 카드비밀번호, 카드종류, 인증번호로 구성된 표"
            colWidths={['200px', 'auto']}
          >
            <tr>
              <th className="left">카드구분</th>
              <td className="left">
                <FormCheck
                  type="radio"
                  name="rdo001"
                  options={[
                    { id: 'rdo001', label: '국내 발급카드', checked: cardType === 'domestic' },
                    { id: 'rdo002', label: '해외 발급카드', checked: cardType === 'overseas' },
                  ]}
                  onChange={(e) => setCardType(e.target.id === 'rdo001' ? 'domestic' : 'overseas')}
                />
              </td>
            </tr>
            <tr>
              <th className="left">카드번호</th>
              <td className="left">
                <div className="frmGroup gap04">
                  <FormInput
                    title="카드번호 첫번째"
                    value={cardNumber[0]}
                    onChange={(e) => handleCardNumberChange(0, e.target.value)}
                    disabled
                  />
                  <span>-</span>
                  <FormInput
                    title="카드번호 두번째"
                    value={cardNumber[1]}
                    onChange={(e) => handleCardNumberChange(1, e.target.value)}
                  />
                  <span>-</span>
                  <FormInput
                    title="카드번호 세번째"
                    value={cardNumber[2]}
                    onChange={(e) => handleCardNumberChange(2, e.target.value)}
                  />
                  <span>-</span>
                  <FormInput
                    title="카드번호 네번째"
                    value={cardNumber[3]}
                    onChange={(e) => handleCardNumberChange(3, e.target.value)}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th className="left">유효기간</th>
              <td className="left">
                {/* scss(.frmGroup .frmBox span)가 frmBox 안에 있는 span을 기준으로 스타일을 주기 때문에
                    FormInput 아톰(후행 텍스트 슬롯 없음) 대신 원본 마크업 구조를 그대로 사용한다. */}
                <div className="frmGroup">
                  <div className="frmBox frmTini">
                    <input
                      type="text"
                      className="iptText"
                      title="유효기간 월 입력"
                      value={expiry.month}
                      onChange={(e) => setExpiry((prev) => ({ ...prev, month: e.target.value }))}
                    />
                    <span>월</span>
                  </div>
                  <div className="frmBox frmTini">
                    <input
                      type="text"
                      className="iptText"
                      title="유효기간 년 입력"
                      value={expiry.year}
                      onChange={(e) => setExpiry((prev) => ({ ...prev, year: e.target.value }))}
                    />
                    <span>년</span>
                  </div>
                </div>
              </td>
            </tr>

            {cardType === 'domestic' && (
              <>
                <tr>
                  <th className="left">카드 비밀번호</th>
                  <td className="left">
                    <div className="frmGroup gap08 moFull">
                      <FormInput
                        className="frmTini"
                        title="카드 비밀번호 입력"
                        value={cardPassword}
                        onChange={(e) => setCardPassword(e.target.value)}
                      />
                    </div>
                    <div className="infoText">※ 비밀번호 앞 2자리 입력</div>
                  </td>
                </tr>
                <tr>
                  <th className="left">카드종류</th>
                  <td className="left">
                    <FormCheck
                      type="radio"
                      name="rdo002"
                      options={[
                        { id: 'rdo003', label: '개인', checked: cardKind === 'personal' },
                        { id: 'rdo004', label: '법인', checked: cardKind === 'corporate' },
                      ]}
                      onChange={(e) => setCardKind(e.target.id === 'rdo003' ? 'personal' : 'corporate')}
                    />
                  </td>
                </tr>
                <tr>
                  <th className="left">인증번호</th>
                  <td className="left">
                    <div className="frmGroup gap08 moFull">
                      <FormInput
                        className="frmTini"
                        title="인증번호 입력"
                        value={authCode}
                        onChange={(e) => setAuthCode(e.target.value)}
                      />
                    </div>
                    <div className="infoText">※ 생년월일 6자리 입력</div>
                  </td>
                </tr>
              </>
            )}
          </FormTable>

          <div className={styles.comAgreement}>
            <div className="agreeInner">
              <div className={styles.checkArea}>
                <FormGroup>
                  <FormCheck
                    type="checkbox"
                    id="chk401"
                    size="sm"
                    label={
                      <>
                        <em>[필수]</em> 개인정보 수집/이용 동의
                      </>
                    }
                    checked={agreed}
                    onChange={handleAgreeChange}
                  />
                </FormGroup>
              </div>
              <div className="descArea">
                <div className="descBox">
                  [개인정보의 수집 및 이용 목적]
                  <br />
                  승차권 예약발매서비스 이용
                  <br />
                  <br />
                  [개인정보 수집 항목]
                  <br />
                  카드번호, 유효기간
                  <br />
                  <br />
                  ▶개인정보 수집 및 이용 동의 거부
                  <br />
                  개인정보 수집 및 이용 동의를 거부하실 수 있습니다. 다만, 이 경우 승차권 예약 서비스 이용이
                  제한될 수 있습니다.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.cont02} ${payMethod === 'easy' ? styles.on : ''}`.trim()}>
          <div className={styles.easyPayBox}>
            <ul>
              {easyPayMethods.map((method) => (
                <li key={method.id} className={styles[method.brand]}>
                  <input
                    type="radio"
                    name="easyPay"
                    id={method.id}
                    checked={selectedEasyPay === method.id}
                    onChange={() => setSelectedEasyPay(method.id)}
                  />
                  <label htmlFor={method.id}>
                    {method.iconOnly ? (
                      <span className="blind">{method.label}</span>
                    ) : (
                      <>
                        <span>{method.label}</span>
                        {method.sub && <span>{method.sub}</span>}
                      </>
                    )}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PayCard;
