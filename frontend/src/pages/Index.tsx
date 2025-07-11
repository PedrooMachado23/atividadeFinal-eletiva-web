import { AuthProvider, useAuth } from '../context/AuthContext';
import LoginPage from '../components/LoginPage';
import Dashboard from '../components/Dashboard';

const AppContent = () => {
  const { user } = useAuth();
  
  return user ? <Dashboard /> : <LoginPage />;
};

const Index = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default Index;
