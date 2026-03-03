import React, { useState, ReactNode } from 'react';
import { useSignIn, useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/state/useAuthStore';
import { apiClient } from '@/lib/api/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AuthFormProps {
  mode: 'signin' | 'signup';
  onSuccess?: () => void;
  children?: ReactNode;
}

export const AuthForm: React.FC<AuthFormProps> = ({ mode, onSuccess }) => {
  const { isLoaded: isSignInLoaded, signIn } = useSignIn();
  const { isLoaded: isSignUpLoaded, signUp } = useSignUp();
  const router = useRouter();
  const { setClerkAuth, setBackendToken, setUser, setError, setIsLoading } = useAuthStore();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setErrorLocal] = useState('');

  const handleClerkAuth = async (clerkEmail: string, clerkUserId: string, clerkName: string) => {
    try {
      setIsLoading(true);
      
      // Sync with backend
      const response = await apiClient.post('/auth/sync-user', {
        email: clerkEmail,
        name: clerkName,
      });

      if (response.success) {
        // Store auth tokens and user info
        setClerkAuth(clerkUserId, clerkEmail);
        setBackendToken(response.token);
        setUser(response.user);
        
        router.push('/dashboard');
        onSuccess?.();
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Auth sync failed';
      setError(errorMsg);
      setErrorLocal(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorLocal('');

    try {
      if (mode === 'signin') {
        if (!isSignInLoaded) return;
        
        const response = await signIn.create({
          identifier: email,
          password,
        });

        if (response.status === 'complete') {
          const userId = response.createdSessionId;
          await handleClerkAuth(email, userId || email, email.split('@')[0]);
        }
      } else {
        if (!isSignUpLoaded) return;
        
        const response = await signUp.create({
          emailAddress: email,
          password,
        });

        if (response.status === 'complete') {
          const userId = response.createdUserId;
          
          // Also create account in backend directly for email/password auth
          const backendResponse = await apiClient.post('/auth/register', {
            name,
            email,
            password,
            picturePath: '',
          });

          if (backendResponse.success) {
            setClerkAuth(userId || email, email);
            setBackendToken(backendResponse.token);
            setUser(backendResponse.user);
            
            router.push('/dashboard');
            onSuccess?.();
          }
        }
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : `${mode === 'signin' ? 'Sign in' : 'Sign up'} failed`;
      setErrorLocal(errorMsg);
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleEmailAuth} className="space-y-4 w-full max-w-md">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {mode === 'signup' && (
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Full Name
          </label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            required
            disabled={loading}
          />
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1">
          Password
        </label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          disabled={loading}
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full"
      >
        {loading ? 'Loading...' : mode === 'signin' ? 'Sign In' : 'Sign Up'}
      </Button>
    </form>
  );
};
