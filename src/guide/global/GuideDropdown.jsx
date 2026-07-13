//드롭다운
import Dropdown from '@/components/common/forms/Dropdown';

function GuideDropdown() {
  return (
    <>
      <h3>Dropdown Guide</h3>
      <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/components/common/forms/Dropdown.jsx</p>

      {/* 기본형 */}
      <div style={{ marginBottom: '20px' }}>
        <h4>기본</h4>
        <Dropdown
          trigger="메뉴 선택"
          items={[
            { label: '승차권', href: '#' },
            { label: '직통열차', href: '#' },
            { label: '일반열차', href: '#' },
          ]}
        />
      </div>

      {/* 위치이동형 (breadcrumb 등) */}
      <div style={{ marginBottom: '20px' }}>
        <h4>comDropdownLocn (위치 이동형)</h4>
        <Dropdown
          variant="comDropdownLocn"
          trigger="마이페이지"
          items={[
            { label: '승차권', href: '#' },
            { label: '직통열차', href: '#' },
            { label: '일반열차', href: '#' },
            { label: '고객서비스', href: '#' },
            { label: '고객센터', href: '#' },
          ]}
        />
      </div>

      {/* 회원 정보형 (gnb 등, 아이콘 트리거 + 첫 항목은 링크 없는 안내 텍스트) */}
      <div style={{ marginBottom: '20px' }}>
        <h4>comMyDrop (회원 정보형)</h4>
        <Dropdown
          variant="comMyDrop"
          triggerClassName="infoBtn"
          trigger={
            <>
              <img src="/images/common/ic_26_info.svg" alt="" />
              <span className="blind">개인정보</span>
            </>
          }
          items={[
            { label: '나의 AREX' },
            { label: '체험학습 예약내역', href: '#' },
            { label: '회의실 예약내역', href: '#' },
            { label: '나의 쿠폰함', href: '#' },
            { label: '회원정보', href: '#' },
          ]}
        />
      </div>
    </>
  );
}
export default GuideDropdown;
