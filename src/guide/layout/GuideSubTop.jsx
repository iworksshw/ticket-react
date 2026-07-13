//서브 탑
import SubTop from '@/components/layout/SubTop';

function GuideSubTop() {
  return (
    <>
      <h3>SubTop Guide</h3>
      <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/components/layout/SubTop.jsx</p>

      <div style={{ marginBottom: '20px' }}>
        <h4>기본 (홈 + 위치이동형 브레드크럼 2단 + 타이틀)</h4>
        <SubTop
          title="나의 쿠폰함"
          crumbs={[
            {
              label: '마이페이지',
              items: [
                { label: '승차권', href: '#' },
                { label: '직통열차', href: '#' },
                { label: '일반열차', href: '#' },
                { label: '고객서비스', href: '#' },
                { label: '고객센터', href: '#' },
              ],
            },
            {
              label: '나의 쿠폰함',
              items: [
                { label: '직통열차 소개', href: '#' },
                { label: '직통열차 시간표', href: '#' },
                { label: '직통열차 운임안내', href: '#' },
                { label: '직통열차 승차권구입 안내', href: '#' },
                { label: '도심공항터미널', href: '#' },
              ],
            },
          ]}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h4>1단 브레드크럼</h4>
        <SubTop
          title="공지사항"
          crumbs={[
            {
              label: '고객센터',
              items: [
                { label: '공지사항', href: '#' },
                { label: '냉난방간편접수', href: '#' },
                { label: '고객의 소리', href: '#' },
                { label: 'VOC', href: '#' },
              ],
            },
          ]}
        />
      </div>

      

      <div style={{ marginBottom: '20px' }}>
        <h4>3단 브레드크럼</h4>
        <SubTop
          title="나의 쿠폰함"
          crumbs={[
            {
              label: '마이페이지',
              items: [
                { label: '승차권', href: '#' },
                { label: '직통열차', href: '#' },
                { label: '일반열차', href: '#' },
                { label: '고객서비스', href: '#' },
                { label: '고객센터', href: '#' },
              ],
            },
            {
              label: '나의 쿠폰함',
              items: [
                { label: '직통열차 소개', href: '#' },
                { label: '직통열차 시간표', href: '#' },
                { label: '직통열차 운임안내', href: '#' },
                { label: '직통열차 승차권구입 안내', href: '#' },
                { label: '도심공항터미널', href: '#' },
              ],
            },
            {
              label: '나의 쿠폰함',
              items: [
                { label: '직통열차 소개', href: '#' },
                { label: '직통열차 시간표', href: '#' },
                { label: '직통열차 운임안내', href: '#' },
                { label: '직통열차 승차권구입 안내', href: '#' },
                { label: '도심공항터미널', href: '#' },
              ],
            },
          ]}
        />
      </div>
    </>
  );
}
export default GuideSubTop;
