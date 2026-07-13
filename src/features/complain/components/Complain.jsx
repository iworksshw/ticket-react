import { useState } from 'react';
import FormGroup from '@/components/common/forms/FormGroup';
import FormInput from '@/components/common/forms/FormInput';
import Button from '@/components/common/forms/Button';
import ButtonGroup from '@/components/common/forms/ButtonGroup';
import GrayBox from '@/components/common/contents/GrayBox';
import styles from './Complain.module.scss';

//UI Components : cptComplain
// 원본 퍼블리싱 파일: docs/html-src/html/component/cptComplain.html

/**
 * 냉난방 간편접수
 * @param {function} onSubmit - '접수하기' 버튼 클릭 시 ({ type, trainNumber })를 인자로 호출
 */
function Complain({ onSubmit }) {
  const [type, setType] = useState('');
  const [trainNumber, setTrainNumber] = useState('');

  return (
    <div className={styles.cptComplain}>
      <p className={styles.pgSubTit}>
        공항철도 이용 중 냉난방 불편사항을
        <br />
        <em>실시간으로 접수</em>하실 수 있습니다.
      </p>

      <div className={styles.imgRadio}>
        <ul>
          <li className={styles.cold}>
            <input
              type="radio"
              id="cold"
              name="complain"
              checked={type === 'cold'}
              onChange={() => setType('cold')}
            />
            <label htmlFor="cold">
              <span>추워요</span>
            </label>
          </li>
          <li className={styles.hot}>
            <input
              type="radio"
              id="hot"
              name="complain"
              checked={type === 'hot'}
              onChange={() => setType('hot')}
            />
            <label htmlFor="hot">
              <span>더워요</span>
            </label>
          </li>
        </ul>
      </div>

      <p className={styles.pgDesc}>
        <span>잠깐! 약냉방칸을 아시나요?</span>
        서울역행 진행방향 4호차, 인천공항 진행방향 3호차는 다른 호차에 비해 2℃ 높게 운영 중에 있습니다.
      </p>

      <div className="comLog">
        <div className="fnCont">
          <div className="fnGroup">
            <div className="labelBox">
              <label htmlFor="trainNumber">칸번호</label>
            </div>
            <FormGroup>
              <FormInput
                id="trainNumber"
                name="trainNumberBox"
                title="칸번호 입력"
                placeholder="예) 2025"
                value={trainNumber}
                onChange={(e) => setTrainNumber(e.target.value)}
              />
            </FormGroup>
          </div>
        </div>
      </div>

      <ButtonGroup>
        <Button variant="blue" size="lg" onClick={() => onSubmit?.({ type, trainNumber })}>
          접수하기
        </Button>
      </ButtonGroup>

      <GrayBox
        title="칸번호는 어디에 있나요?"
        desc="출입문 및 객실안내 표기시 화면 우측 상단 혹은 열차와 열차 사이의 통로 위쪽을 확인해주세요."
        imgList={[
          { src: '/images/contents/cont05_02_001.png', alt: '객차번호 안내 이미지 01' },
          { src: '/images/contents/cont05_02_002.png', alt: '객차번호 안내 이미지 02' },
        ]}
      />
    </div>
  );
}

export default Complain;
