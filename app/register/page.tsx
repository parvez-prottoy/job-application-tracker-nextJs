'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authClient } from '@/lib/auth/auth-client';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const { id, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    if (!formData.termsAccepted) {
      setError('You must accept the Terms of Service and Privacy Policy.');
      return;
    }
    setIsLoading(true);
    //
    try {
      const { error: authError } = await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
      });

      if (authError) {
        setError(authError.message || 'An error occurred during registration.');
        setIsLoading(false);
        return;
      }
      // On success, redirect
      router.push('/dashboard');
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.log(err);
    } finally {
      setIsLoading(false);
    }

    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      termsAccepted: false,
    });
  };
  const handleSocialLogin = async (provider: 'google' | 'github') => {
    setIsLoading(true);
    setError(null);
    try {
      const { error: authError } = await authClient.signIn.social({
        provider,
        callbackURL: '/dashboard',
      });
      if (authError) {
        setError(
          authError.message || `An error occurred during ${provider} login.`
        );
        setIsLoading(false);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50/50 selection:bg-primary/10 selection:text-primary">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
      <div className="absolute left-1/2 top-0 h-150 w-200 -translate-x-1/2 -translate-y-1/2 opacity-20 blur-[100px] rounded-full bg-primary/30 pointer-events-none"></div>
      <div className="absolute right-0 bottom-0 h-125 w-125 opacity-10 blur-[80px] rounded-full bg-indigo-500/30 pointer-events-none"></div>

      <div className="w-full max-w-110 space-y-6 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Back to Home Navigation */}
        <div>
          <Link
            href="/"
            className="group inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
        </div>

        {/* Main Card Container */}
        <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60 relative overflow-hidden">
          {/* Subtle Top Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-blue-500 to-indigo-500"></div>

          {/* Header Section */}
          <div className="text-center mb-8">
            <Link
              href="/"
              className="flex items-center justify-center gap-2.5 group mb-8"
            >
              <div className="w-10 h-10 rounded-xl bg-primary shadow-sm flex items-center justify-center transition-transform group-hover:scale-105">
                <span className="text-primary-foreground font-bold text-2xl leading-none">
                  C
                </span>
              </div>
              <span className="font-bold text-2xl tracking-tight text-slate-900 transition-colors group-hover:text-slate-700">
                Career<span className="text-primary">Flow</span>
              </span>
            </Link>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-2">
              Create an account
            </h1>
            <p className="text-sm text-slate-500 max-w-70 mx-auto text-balance">
              Start tracking your applications and land offers faster.
            </p>
          </div>
          {error && (
            <div className="mb-6 p-3 rounded-lg bg-red-50 border border-red-100 flex items-start gap-3 animate-in fade-in zoom-in-95 duration-300">
              <AlertCircle
                className="h-5 w-5 text-red-500 shrink-0 mt-0.5"
                strokeWidth={2}
              />
              <p className="text-sm text-red-600 font-medium leading-relaxed mb-0">
                {error}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div className="space-y-1.5">
              <Label
                htmlFor="name"
                className="text-sm font-semibold text-slate-700"
              >
                Full Name
              </Label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                  <User className="h-4.5 w-4.5" strokeWidth={2.5} />
                </div>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="pl-10 h-11 bg-white border-slate-200 hover:border-slate-300 focus-visible:ring-4 focus-visible:ring-primary/10 focus-visible:border-primary transition-all rounded-lg text-[15px] shadow-sm placeholder:text-slate-400"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <Label
                htmlFor="email"
                className="text-sm font-semibold text-slate-700"
              >
                Email Address
              </Label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                  <Mail className="h-4.5 w-4.5" strokeWidth={2.5} />
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="pl-10 h-11 bg-white border-slate-200 hover:border-slate-300 focus-visible:ring-4 focus-visible:ring-primary/10 focus-visible:border-primary transition-all rounded-lg text-[15px] shadow-sm placeholder:text-slate-400"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label
                htmlFor="password"
                className="text-sm font-semibold text-slate-700"
              >
                Password
              </Label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                  <Lock className="h-4.5 w-4.5" strokeWidth={2.5} />
                </div>
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="pl-10 pr-11 h-11 bg-white border-slate-200 hover:border-slate-300 focus-visible:ring-4 focus-visible:ring-primary/10 focus-visible:border-primary transition-all rounded-lg text-[15px] shadow-sm placeholder:text-slate-400"
                  title={showPassword ? 'Hide password' : 'Show password'}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Eye className="h-4.5 w-4.5" strokeWidth={2} />
                  ) : (
                    <EyeOff className="h-4.5 w-4.5" strokeWidth={2} />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <Label
                htmlFor="confirmPassword"
                className="text-sm font-semibold text-slate-700"
              >
                Confirm Password
              </Label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                  <Lock className="h-4.5 w-4.5" strokeWidth={2.5} />
                </div>
                <Input
                  id="confirmPassword"
                  type={confirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="pl-10 pr-11 h-11 bg-white border-slate-200 hover:border-slate-300 focus-visible:ring-4 focus-visible:ring-primary/10 focus-visible:border-primary transition-all rounded-lg text-[15px] shadow-sm placeholder:text-slate-400"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                  onClick={() => setConfirmPassword(!confirmPassword)}
                >
                  {confirmPassword ? (
                    <Eye className="h-4.5 w-4.5" strokeWidth={2} />
                  ) : (
                    <EyeOff className="h-4.5 w-4.5" strokeWidth={2} />
                  )}
                </button>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="pt-2 pb-1">
              <div className="flex items-start gap-2.5">
                <Checkbox
                  id="termsAccepted"
                  checked={formData.termsAccepted}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, termsAccepted: checked }))
                  }
                  disabled={isLoading}
                  className="mt-0.5 border-slate-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <Label
                  htmlFor="terms"
                  className="text-[13px] font-medium text-slate-600 leading-tight cursor-pointer"
                >
                  I agree to the{' '}
                  <Link
                    href="/terms"
                    className="text-primary hover:text-primary/80 hover:underline transition-colors"
                  >
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link
                    href="/privacy"
                    className="text-primary hover:text-primary/80 hover:underline transition-colors"
                  >
                    Privacy Policy
                  </Link>
                  .
                </Label>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-11 text-[15px] font-bold bg-primary hover:bg-primary/95 text-white rounded-lg shadow-sm hover:shadow-[0_4px_14px_0_rgba(37,99,235,0.2)] transition-all flex items-center justify-center group"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4.5 w-4.5 animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight
                    className="ml-2 h-4.5 w-4.5 transition-transform group-hover:translate-x-0.5"
                    strokeWidth={2.5}
                  />
                </>
              )}
            </Button>
          </form>
          {/* Social Auth Divider */}
          <div className="mt-8 flex items-center">
            <div className="grow border-t border-slate-200"></div>
            <span className="shrink-0 px-4 text-[13px] text-slate-500 font-medium">
              Or continue with
            </span>
            <div className="grow border-t border-slate-200"></div>
          </div>

          {/* Social Auth Buttons */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              type="button"
              onClick={() => handleSocialLogin('google')}
              className="w-full h-11 rounded-lg border-slate-200 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer"
              disabled={isLoading}
            >
              <svg
                className="w-5 h-5 mr-2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </Button>
            <Button
              variant="outline"
              type="button"
              onClick={() => handleSocialLogin('github')}
              className="w-full h-11 rounded-lg border-slate-200 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer"
              disabled={isLoading}
            >
              <svg
                className="w-5 h-5 mr-2 text-slate-900"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              GitHub
            </Button>
          </div>

          {/* Login Section */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-[14px] text-slate-600 font-medium">
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-primary font-semibold hover:text-primary/80 hover:underline transition-colors inline-flex items-center"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
