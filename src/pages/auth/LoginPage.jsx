import { useNavigate } from 'react-router-dom';
import Join from '@/features/member/components/Join';
import { useAuth } from '@/contexts/AuthContext';

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = ({ id, rememberId }) => {
    login({ id, rememberId });
    navigate('/');
  };

  return (
    <Join
      onLogin={handleLogin}
      onJoin={() => navigate('/auth/joinTermsPage')}
      onCheckJoined={() => navigate('/auth/accountCheck')}
      onResetPassword={() => navigate('/auth/PwResetRequest')}
    />
  );
}

export default LoginPage;
