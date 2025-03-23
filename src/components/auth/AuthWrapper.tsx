
import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupabase } from '@/hooks/useSupabase';

interface AuthWrapperProps {
  children: ReactNode;
  requireAuth?: boolean;
}

const AuthWrapper = ({ children, requireAuth = true }: AuthWrapperProps) => {
  const { user, loading } = useSupabase();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && requireAuth && !user) {
      navigate('/signin');
    }
  }, [user, loading, navigate, requireAuth]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (requireAuth && !user) {
    return null;
  }

  return <>{children}</>;
};

export default AuthWrapper;
