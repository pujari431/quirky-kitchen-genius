
import SignUpForm from '@/components/auth/SignUpForm';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupabase } from '@/hooks/useSupabase';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

const SignUp = () => {
  const { user, loading, isSupabaseConfigured } = useSupabase();
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
        {!isSupabaseConfigured && (
          <Alert variant="destructive" className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Supabase Not Configured</AlertTitle>
            <AlertDescription>
              Authentication requires Supabase configuration. This is a demo mode with limited functionality.
            </AlertDescription>
          </Alert>
        )}
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUp;
