//버튼
import ButtonGroup from '@/components/common/forms/ButtonGroup';
import Button from '@/components/common/forms/Button';

//폼 input
import FormGroup from '@/components/common/forms/FormGroup';
import FormInput from '@/components/common/forms/FormInput';

function GuideInput() {
  return (
    <>
      <h3>Input Guide</h3>
      <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0' }}>사용 컴포넌트: src/components/common/forms/ButtonGroup.jsx, src/components/common/forms/Button.jsx, src/components/common/forms/FormGroup.jsx, src/components/common/forms/FormInput.jsx</p>

      {/* 다양한 크기의 입력창 */}
      <section style={{ marginBottom: '30px' }}>
        <h4>Input Sizes</h4>
        
        <div style={{ marginBottom: '15px' }}>
          <p style={{ fontSize: '12px', color: '#666' }}>frmTini</p>
          <FormGroup>
            <FormInput className="frmTini" placeholder="기본" title="이름" />
          </FormGroup>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <p style={{ fontSize: '12px', color: '#666' }}>frmXs</p>
          <FormGroup>
            <FormInput  className="frmXs" placeholder="기본" title="이름" />
          </FormGroup>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <p style={{ fontSize: '12px', color: '#666' }}>frmSm</p>
          <FormGroup>
            <FormInput  className="frmSm" placeholder="기본" title="이름" />
          </FormGroup>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <p style={{ fontSize: '12px', color: '#666' }}>frmMd</p>
          <FormGroup>
            <FormInput className="frmMd" placeholder="기본" title="이름" />
          </FormGroup>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <p style={{ fontSize: '12px', color: '#666' }}>frmLg</p>
          <FormGroup>
            <FormInput className="frmLg" placeholder="기본" title="이름" />
          </FormGroup>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <p style={{ fontSize: '12px', color: '#666' }}>frmXL</p>
          <FormGroup>
            <FormInput className="frmXL" placeholder="기본" title="이름" />
          </FormGroup>
        </div>
      </section>

      {/* 기본/비활성화/읽기전용 상태 */}
      <section style={{ marginBottom: '30px' }}>
        <h4>Input States - Normal, Disabled, ReadOnly</h4>
        <FormGroup>
            <FormInput placeholder="Normal" title="텍스트 입력" />
            <FormInput placeholder="Disabled" title="텍스트 입력" disabled />
            <FormInput placeholder="ReadOnly" title="텍스트 입력" readOnly />
        </FormGroup>
      </section>

      {/* 그룹 에러 메시지 */}
      <section style={{ marginBottom: '30px' }}>
        <h4>Form Group with Error Message (Group Level)</h4>
        <FormGroup isError={true} errorMsg="긴 메시지 내용 긴 메시지 내용 긴 메시지 내용 긴 메시지 내용 긴 메시지 내용 긴 메시지 내용 긴 메시지 내용 긴 메시지 내용 긴 메시지 내용 긴 메시지 내용">
          <FormInput placeholder="기본" title="텍스트 입력" />
          <FormInput placeholder="기본" title="텍스트 입력" />
          <FormInput placeholder="기본" title="텍스트 입력" />
        </FormGroup>
      </section>

      {/* 개별 필드 에러 메시지 */}
      <section style={{ marginBottom: '30px' }}>
        <h4>Form Group with Individual Error Messages</h4>
        <FormGroup>
            <FormInput isError errorMsg="에러 메시지 내용" placeholder="기본" title="텍스트 입력" />
            <FormInput isError errorMsg="에러 메시지 내용" placeholder="기본" title="텍스트 입력" />
            <FormInput isError errorMsg="에러 메시지 내용" placeholder="기본" title="텍스트 입력" />
        </FormGroup>
      </section>

      {/* 다중 필드 에러 */}
      <section style={{ marginBottom: '30px' }}>
        <h4>Form Group - Multiple Fields with Group Error</h4>
        <FormGroup isError={true} errorMsg="긴 메시지 내용 긴 메시지 내용 긴 메시지 내용 긴 메시지 내용 긴 메시지 내용 긴 메시지 내용 긴 메시지 내용 긴 메시지 내용 긴 메시지 내용 긴 메시지 내용">
          <FormInput placeholder="기본" title="텍스트 입력" />
          <FormInput placeholder="기본" title="텍스트 입력" />
        </FormGroup>
      </section>

      {/* 단일 필드 에러 */}
      <section style={{ marginBottom: '30px' }}>
        <h4>Single Input with Error</h4>
        <div style={{ marginBottom: '15px' }}>
          <FormGroup isError={true} errorMsg="에러 메시지 내용">
            <FormInput placeholder="에러" title="텍스트 입력" />
          </FormGroup>
        </div>
      </section>
    </>
  );
}
export default GuideInput;