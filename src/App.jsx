// src/App.jsx
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { AuthProvider } from './contexts/AuthContext';
import { ReservationProvider } from './contexts/ReservationContext';
import './styles/style.scss'; // 글로벌 스타일이 필요하다면 유지

function App() {
  return (
    <AuthProvider>
      <ReservationProvider>
        <RouterProvider router={router} />
      </ReservationProvider>
    </AuthProvider>
  );
}

export default App;