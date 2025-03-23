
import SignUpForm from '@/components/auth/SignUpForm';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupabase } from '@/hooks/useSupabase';

const SignUp = () => {
  const { user, loading } = useSupabase();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !loading) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-10 flex flex-col items-center">
      <div className="w-full max-w-md">
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUp;
