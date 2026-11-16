import { Fragment, useState } from 'react';
import Popup from '@/components/module/Popup';
import Button from '@/components/common/forms/Button';
import FormCheck from '@/components/common/forms/FormCheck';
import TicketInfo from '@/features/ticket/components/TicketInfo';

// docs/html-dist/html/menu01/page_01_01_03_pop09.html 참고 (주소값 없음, 팝업 전용)

/**
 * 승차권 예약정보 확인 팝업 (trainSelection 페이지의 "결제하기" 버튼을 누르면 연다)
 * @param {boolean} isOpen
 * @param {function} onClose
 * @param {string} date - 승차일 텍스트
 * @param {string} trainNo - 열차번호 텍스트
 * @param {Array} stations - [{ name, time }] 출발/도착역 2개
 * @param {string} headcountLabel - 탑승인원 텍스트 (예: '어른 3명, 어린이 2명')
 * @param {string} seatSummary - 열차좌석 텍스트 (예: '5호차 (5D, 6A, 6B, 6C, 6D)')
 * @param {Array<string>} goodsList - 상품 목록 줄 텍스트 (여러 줄이면 줄바꿈으로 이어붙인다)
 * @param {function} onConfirm - 확인 버튼 클릭 시 (paymentType: 'overseas'|'krw')를 인자로 호출
 */
function TicketReserveInfoPage({
  isOpen,
  onClose,
  date,
  trainNo,
  stations = [],
  headcountLabel,
  seatSummary,
  goodsList = [],
  onConfirm,
}) {
  const [paymentType, setPaymentType] = useState('');

  const infoItems = [
    [
      { tit: '탑승인원', desc: headcountLabel },
      { tit: '열차좌석', desc: seatSummary },
    ],
  ];

  if (goodsList.length > 0) {
    infoItems.push([
      {
        tit: '상품',
        desc: goodsList.map((line, index) => (
          <Fragment key={line}>
            {index > 0 && <br />}
            {line}
          </Fragment>
        )),
      },
    ]);
  }

  const handleConfirm = () => {
    if (!paymentType) {
      alert('결제수단을 선택해주세요');
      return;
    }
    onConfirm(paymentType);
    onClose();
  };

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      title="승차권 예약정보 확인"
      footer={
        <>
          <Button variant="dkLine" size="lg" onClick={onClose}>취소</Button>
          <Button variant="blue" size="lg" onClick={handleConfirm}>확인</Button>
        </>
      }
    >
      <TicketInfo variant="view" date={date} trainNo={trainNo} stations={stations} infoItems={infoItems} />

      <em className="pubText varTextC">예약하신 정보로 결제를 진행하시겠습니까?</em>

      <div className="pubCenterChk">
        <div className="frmGroup">
          <FormCheck
            type="radio"
            id="reserveInfoPayOverseas"
            name="reserveInfoPay"
            label="해외통화 결제"
            checked={paymentType === 'overseas'}
            onChange={() => setPaymentType('overseas')}
          />
          <span className="text varColorBlue">*마스터카드만 사용 가능</span>
          <FormCheck
            type="radio"
            id="reserveInfoPayKrw"
            name="reserveInfoPay"
            label="원화(KRW) 결제"
            checked={paymentType === 'krw'}
            onChange={() => setPaymentType('krw')}
          />
        </div>
      </div>
    </Popup>
  );
}

export default TicketReserveInfoPage;
