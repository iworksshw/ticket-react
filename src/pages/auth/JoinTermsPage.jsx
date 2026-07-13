import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '@/features/member/components/Join.module.scss';
import TermsAgree from '@/components/common/forms/TermsAgree';
import Button from '@/components/common/forms/Button';

const TERMS_ITEMS = [
  { id: 'chk01', label: '홈페이지 이용약관 동의', required: true },
  { id: 'chk02', label: '개인정보 수집/이용 동의', required: true },
  { id: 'chk03', label: '개인정보 수집/이용 동의', required: false },
  { id: 'chk04', label: '마케팅 활용 및 광고성 정보 수신', required: false },
];

function JoinTermsPage() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState({});

  const agreeAll = TERMS_ITEMS.every((item) => checked[item.id]);
  const canProceed = TERMS_ITEMS.filter((item) => item.required).every((item) => checked[item.id]);

  const handleToggleAll = (value) => {
    setChecked(Object.fromEntries(TERMS_ITEMS.map((item) => [item.id, value])));
  };

  const handleToggleItem = (id, value) => {
    setChecked((prev) => ({ ...prev, [id]: value }));
  };

  const items = TERMS_ITEMS.map((item) => ({
    ...item,
    checked: !!checked[item.id],
    onShowDetail: () => {},
  }));

  return (
    <div className={styles.cptLogin}>
      <div className={styles.loginArea}>
        <div className={styles.loginTop}>
          <strong className={styles.eyebrow}>공항철도 회원가입</strong>
          <h1 className={styles.loginHeadline}>서비스 약관동의</h1>
          <p className={styles.loginHeadText}>
            공항철도 회원가입을 위해 &lsquo;이용약관&rsquo;을 확인해주세요.
            <br />
            만 14세 미만 고객은 회원가입 서비스를 제공하지 않습니다.
          </p>
        </div>
        <div className="loginCont">
          <TermsAgree
            variant="group"
            layout="list"
            items={items}
            agreeAll={agreeAll}
            onToggleAll={handleToggleAll}
            onToggleItem={handleToggleItem}
            referText="전체 동의에는 필수 및 선택 정보수집에 대한 동의가 포함되어 있으며, 개별적인 동의 선택도 가능합니다. 선택항목에 대한 동의를 거부하시더라도 필수 서비스 이용은 가능합니다."
          />

          <div className={styles.btmBtn}>
            <Button
              variant="dkBlue"
              size="lg"
              disabled={!canProceed}
              onClick={() => navigate('/auth/joinEmailAuth')}
            >
              다음
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinTermsPage;
