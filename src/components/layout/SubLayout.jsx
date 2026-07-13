import { Outlet, useLocation } from 'react-router-dom';
import Gnb from '@/components/layout/Gnb';
import Footer from '@/components/layout/Footer';
import SubTop from '@/components/layout/SubTop';
import { getBreadcrumbCrumbs } from '@/data/navigation';

function SubLayout() {
  const { pathname } = useLocation();
  const crumbs = getBreadcrumbCrumbs(pathname);
  const title = crumbs.at(-1)?.label ?? '';

  return (
    <>
      <div className="skip">
        <a className="quickBtn" href="#container">본문바로가기</a>
      </div>

      <div className="wrap">
        <div className="lytLayout">
          <div className="layoutArea">

            {/* 상단영역 */}
            <div className="layoutTop">
              <Gnb />
            </div>

            {/* 중단영역 */}
            <div className="layoutContainer" id="container">
              <div className="layoutSubCont">
                <SubTop title={title} crumbs={crumbs} />
                <div className="layoutContArea">
                  <Outlet />
                </div>
              </div>
            </div>

            {/* 하단영역 */}
            <div className="layoutFooter">
              <Footer />
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default SubLayout;