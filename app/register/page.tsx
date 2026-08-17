'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { useState } from 'react';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [isLoading, seIsLoading] = useState(false);
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
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      termsAccepted: false,
    });
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
                CareerFlow <span className="text-primary">AI</span>
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
