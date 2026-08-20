'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Mail, Shield, Eye, EyeOff } from 'lucide-react';
import { useSession, updateUser, changePassword, changeEmail } from '@/lib/auth/auth-client';
import { toast } from 'sonner';

export default function SettingsClient() {
  const { data: session, isPending } = useSession();

  // Profile State
  const [name, setName] = useState('');
  const [isSavingName, setIsSavingName] = useState(false);

  // Email State
  const [email, setEmail] = useState('');
  const [isSavingEmail, setIsSavingEmail] = useState(false);

  // Password State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || '');
      setEmail(session.user.email || '');
    }
  }, [session]);

  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('Name cannot be empty');
      return;
    }
    
    setIsSavingName(true);
    try {
      const { error } = await updateUser({
        name: name.trim()
      });
      if (error) {
        toast.error(error.message || 'Failed to update name');
      } else {
        toast.success('Profile updated successfully');
      }
    } catch (err: any) {
      toast.error(err.message || 'An error occurred');
    } finally {
      setIsSavingName(false);
    }
  };

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSavingEmail(true);
    try {
      const { error } = await changeEmail({
        newEmail: email.trim()
      });
      if (error) {
        toast.error(error.message || 'Failed to update email');
      } else {
        toast.success('Email updated successfully');
      }
    } catch (err: any) {
      toast.error(err.message || 'An error occurred');
    } finally {
      setIsSavingEmail(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentPassword) {
      toast.error('Current password is required');
      return;
    }
    if (!newPassword || newPassword.length < 8) {
      toast.error('New password must be at least 8 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (currentPassword === newPassword) {
      toast.error('New password cannot be the same as current password');
      return;
    }

    setIsSavingPassword(true);
    try {
      const { error } = await changePassword({
        newPassword,
        currentPassword,
        revokeOtherSessions: true // optional security feature
      });
      
      if (error) {
        toast.error(error.message || 'Failed to update password');
      } else {
        toast.success('Password updated successfully');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (err: any) {
      toast.error(err.message || 'An error occurred');
    } finally {
      setIsSavingPassword(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex-1 p-8 max-w-4xl mx-auto w-full">
        <div className="animate-pulse space-y-8">
          <div className="h-10 bg-slate-200 rounded w-1/4"></div>
          <div className="h-48 bg-slate-200 rounded-xl"></div>
          <div className="h-48 bg-slate-200 rounded-xl"></div>
          <div className="h-64 bg-slate-200 rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 md:space-y-8 p-4 md:p-8 pt-6 max-w-4xl mx-auto w-full animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
          Settings
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Manage your account information and security settings.
        </p>
      </div>

      <div className="space-y-6">
        {/* Profile Card */}
        <Card className="border-slate-200/60 shadow-sm">
          <CardHeader className="border-b border-slate-100 pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <User className="w-5 h-5 text-primary" /> Profile Information
            </CardTitle>
            <CardDescription>
              Update your personal details.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleUpdateName} className="space-y-4">
              <div className="space-y-2 max-w-md">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  disabled={isSavingName}
                  required 
                />
              </div>
              <Button type="submit" disabled={isSavingName} className="bg-primary hover:bg-primary/90 text-white min-w-32">
                {isSavingName ? 'Saving...' : 'Save Changes'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Email Card */}
        <Card className="border-slate-200/60 shadow-sm">
          <CardHeader className="border-b border-slate-100 pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Mail className="w-5 h-5 text-primary" /> Email Address
            </CardTitle>
            <CardDescription>
              Update the email address associated with your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleUpdateEmail} className="space-y-4">
              <div className="space-y-2 max-w-md">
                <Label htmlFor="email">Current Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  disabled={isSavingEmail}
                  required 
                />
              </div>
              <Button type="submit" disabled={isSavingEmail} className="bg-primary hover:bg-primary/90 text-white min-w-32">
                {isSavingEmail ? 'Updating...' : 'Update Email'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Password Card */}
        <Card className="border-slate-200/60 shadow-sm">
          <CardHeader className="border-b border-slate-100 pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Shield className="w-5 h-5 text-primary" /> Change Password
            </CardTitle>
            <CardDescription>
              Ensure your account is using a long, random password to stay secure.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleUpdatePassword} className="space-y-5">
              <div className="space-y-2 max-w-md">
                <Label htmlFor="currentPassword">Current Password</Label>
                <div className="relative">
                  <Input 
                    id="currentPassword" 
                    type={showCurrentPassword ? "text" : "password"} 
                    value={currentPassword} 
                    onChange={(e) => setCurrentPassword(e.target.value)} 
                    disabled={isSavingPassword}
                    className="pr-10"
                    required 
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                  >
                    {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              
              <div className="space-y-2 max-w-md">
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative">
                  <Input 
                    id="newPassword" 
                    type={showNewPassword ? "text" : "password"} 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    disabled={isSavingPassword}
                    className="pr-10"
                    required 
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2 max-w-md">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <div className="relative">
                  <Input 
                    id="confirmPassword" 
                    type={showConfirmPassword ? "text" : "password"} 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    disabled={isSavingPassword}
                    className="pr-10"
                    required 
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" disabled={isSavingPassword} className="bg-primary hover:bg-primary/90 text-white min-w-32">
                {isSavingPassword ? 'Updating Password...' : 'Update Password'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}