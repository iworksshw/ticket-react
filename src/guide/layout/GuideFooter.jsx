//푸터
import Footer from '@/components/layout/Footer';

function GuideFooter() {
  return (
    <>
      <h3>Footer Guide</h3>
      <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/components/layout/Footer.jsx</p>

      <div style={{ marginBottom: '20px' }}>
        <h4>기본</h4>
        <Footer />
      </div>

      {/* quickLinks / companyInfo / copyrightText / marks 는 모두 props로 교체 가능 */}
      <div style={{ marginBottom: '20px' }}>
        <h4>props 커스텀 (다른 회사/약관 정보)</h4>
        <Footer
          quickLinks={[
            { label: '이용약관', href: '#' },
            { label: '개인정보처리방침', href: '#' },
          ]}
          companyInfo={{
            address: '서울특별시 강남구 테헤란로 1',
            tel: '1588-0000',
            fax: '02-000-0000',
            ceo: '홍길동',
            businessNumber: '000-00-00000',
          }}
          copyrightText="Copyright (C) 2026 by Sample Co., Ltd. All rights reserved."
        />
      </div>
    </>
  );
}
export default GuideFooter;
