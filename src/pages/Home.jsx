//버튼
import ButtonGroup from '@/components/common/forms/ButtonGroup';
import Button from '@/components/common/forms/Button';

//폼 input
import FormGroup from '@/components/common/forms/FormGroup';
import FormInput from '@/components/common/forms/FormInput';

function Home() {
  return (
    <>
      <h3>어서오세요! 메인 홈 화면입니다.</h3>
      <Button variant="blue" size="lg">서명하기</Button>
      <ButtonGroup align="alignC" isCta="true">
        <Button variant="blue" size="lg">서명하기</Button>
      </ButtonGroup>

      <FormGroup isError={true} errorMsg="긴 메시지 내용 긴 메시지 내용...">
        <FormInput placeholder="이름" title="이름 입력" />
        <FormInput placeholder="전화번호" title="전화번호 입력" />
        <FormInput placeholder="이메일" title="이메일 입력" />
      </FormGroup>
    </>
  );
}
export default Home;