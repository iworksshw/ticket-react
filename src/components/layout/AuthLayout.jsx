import { Outlet } from 'react-router-dom';
import Dropdown from '@/components/common/forms/Dropdown';

function AuthLayout() {
  return (
    <>
      <div className="skip">
        <a className="quickBtn" href="#container">본문바로가기</a>
      </div>

      <div className="wrap">
        <div className="lytMember">
          <div className="memberArea">

            {/* 상단영역 */}
            <div className="memberTop">
              <div className="topArea">
                <div className="logoArea">
                  <a href="/">
                    <img src="/images/common/ic_142_logo.svg" alt="arex 로고" />
                  </a>
                </div>
                <div className="langArea">
                  <Dropdown
                    trigger="한국어"
                    items={[
                      { label: '영어' },
                      { label: '중국어' },
                      { label: '일본어' },
                    ]}
                  />
                  <button className="closeBtn" type="button">
                    <span className="blind">전체메뉴 닫기</span>
                  </button>
                </div>
              </div>
            </div>
            {/* //상단영역 */}

            {/* 중단영역 */}
            <div className="memberContainer" id="container">
              <div className="memberSubCont">
                <Outlet />
              </div>
            </div>
            {/* //중단영역 */}

          </div>
        </div>
      </div>
    </>
  );
}

export default AuthLayout;
