import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MemberType from '@/features/member/components/MemberType';
import Popup from '@/components/module/Popup';
import Button from '@/components/common/forms/Button';

function TicketAuthPage() {
  const navigate = useNavigate();
  const [showNoMemberPopup, setShowNoMemberPopup] = useState(false);

  const handleSelect = (type) => {
    if (type === 'member') navigate('/tickets/login');
    if (type === 'noMember') setShowNoMemberPopup(true);
  };

  const closePopup = () => setShowNoMemberPopup(false);

  return (
    <div className="cptMember">
      <div className="pubTitH3">
        <h3>공항철도 승차권 예약방식을 선택하세요.</h3>
      </div>

      <MemberType onSelect={handleSelect} />

      {/* 비회원 승차권예약 확인 팝업 (docs/html-dist/html/menu01/page_01_01_02_pop01.html) */}
      <Popup
        isOpen={showNoMemberPopup}
        onClose={closePopup}
        size="tini"
        title="비회원 승차권예약 확인"
        footer={
          <>
            <Button variant="dkLine" size="lg" onClick={closePopup}>취소</Button>
            <Button variant="blue" size="lg" onClick={closePopup}>확인</Button>
          </>
        }
      >
        <p className="pubText varTextC">
          비회원으로 예약 하시겠습니까?
          <br />
          비회원 승차권 예약 페이지로 이동합니다.
        </p>
      </Popup>
    </div>
  );
}

export default TicketAuthPage;
