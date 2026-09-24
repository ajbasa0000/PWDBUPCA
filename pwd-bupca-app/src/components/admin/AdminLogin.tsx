'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  User, 
  KeyRound, 
  ArrowRight, 
  AlertCircle, 
  Eye, 
  EyeOff,
  Home,
  Lock
} from 'lucide-react';
import { useAccessibility } from '@/context/AccessibilityContext';

export interface AuthUserSession {
  username: string;
  fullName: string;
  role: 'superuser' | 'member_operator' | 'admin';
  email: string;
}

// User Accounts Directory
interface UserCred {
  pass: string;
  fullName: string;
  role: 'superuser' | 'member_operator' | 'admin';
  email: string;
}

const AUTHORIZED_ACCOUNTS: Record<string, UserCred> = {
  // Superuser: Aaron Christian J. Basa
  'grootadmin': {
    pass: 'xiarabasa12',
    fullName: 'Aaron Christian J. Basa',
    role: 'superuser',
    email: 'ajbasa@up.edu.ph'
  },
  'ajbasa@up.edu.ph': {
    pass: 'xiarabasa12',
    fullName: 'Aaron Christian J. Basa',
    role: 'superuser',
    email: 'ajbasa@up.edu.ph'
  },

  // Admin User: Marilyn Morales / Staff Admin
  'admin': {
    pass: 'determination2026',
    fullName: 'Pres. Marilyn Morales',
    role: 'admin',
    email: 'admin@pwd-bupca.org'
  },

  // Basic Users: user1 to user5 (password: determination2026)
  'user1': {
    pass: 'determination2026',
    fullName: 'Artisan User 1 (Elena Santos)',
    role: 'member_operator',
    email: 'user1@pwd-bupca.org'
  },
  'user2': {
    pass: 'determination2026',
    fullName: 'Artisan User 2 (Ramil Bautista)',
    role: 'member_operator',
    email: 'user2@pwd-bupca.org'
  },
  'user3': {
    pass: 'determination2026',
    fullName: 'Artisan User 3 (Carla De Leon)',
    role: 'member_operator',
    email: 'user3@pwd-bupca.org'
  },
  'user4': {
    pass: 'determination2026',
    fullName: 'Artisan User 4 (Nanay Linda)',
    role: 'member_operator',
    email: 'user4@pwd-bupca.org'
  },
  'user5': {
    pass: 'determination2026',
    fullName: 'Artisan User 5 (Kuya Ramon)',
    role: 'member_operator',
    email: 'user5@pwd-bupca.org'
  }
};

interface AdminLoginProps {
  onLoginSuccess: (user: AuthUserSession) => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const { playChime } = useAccessibility();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    const lookupKey = identifier.trim().toLowerCase();
    
    // Check localStorage users first for any dynamic CRUD updates
    let matchedAccount: { pass: string; fullName: string; role: 'superuser' | 'member_operator' | 'admin'; email: string } | null = null;
    
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('pwd_bupca_users');
        if (stored) {
          const parsedUsers = JSON.parse(stored);
          if (Array.isArray(parsedUsers)) {
            const found = parsedUsers.find((u: any) => 
              (u.username && u.username.toLowerCase() === lookupKey) ||
              (u.email && u.email.toLowerCase() === lookupKey)
            );
            if (found) {
              matchedAccount = {
                pass: found.password || 'determination2026',
                fullName: found.fullName,
                role: (found.role === 'customer' ? 'member_operator' : found.role) || 'member_operator',
                email: found.email || `${found.username || 'user'}@pwd-bupca.org`
              };
            }
          }
        }
      } catch (e) {}
    }

    // Fallback to built-in authorized accounts directory
    const account = matchedAccount || AUTHORIZED_ACCOUNTS[lookupKey];

    setTimeout(() => {
      setIsLoading(false);
      if (account && account.pass === password) {
        playChime('success');
        onLoginSuccess({
          username: lookupKey,
          fullName: account.fullName,
          role: account.role,
          email: account.email
        });
      } else {
        playChime('alert');
        if (!account) {
          setErrorMsg('Account not recognized. Please check your username.');
        } else {
          setErrorMsg('Incorrect password. Please try again.');
        }
      }
    }, 350);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12 transition-colors relative overflow-hidden">
      {/* Subtle Ambient Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-to-tr from-blue-500/15 via-indigo-500/10 to-emerald-500/10 dark:from-blue-900/20 dark:via-zinc-900/10 dark:to-emerald-950/20 blur-3xl pointer-events-none -z-10" />

      {/* Return to Public Portal */}
      <div className="absolute top-6 left-6">
        <Link 
          href="/" 
          onClick={() => playChime('click')}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 px-3.5 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-2xs hover:shadow-xs transition"
        >
          <Home className="w-4 h-4" />
          <span>Back to Public Portal</span>
        </Link>
      </div>

      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 p-2 shadow-xl shadow-blue-500/10 mb-1">
            <img
              src="/logo.png"
              alt="PWD BUPCA Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-400 text-xs font-extrabold mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Restricted Administrative Access</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Command Center Login
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-1 font-medium">
              PWD BUPCA Inc. Operations & Enterprise Systems
            </p>
          </div>
        </div>

        {/* Secure Login Card */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-7 sm:p-9 border border-slate-200/90 dark:border-zinc-800 shadow-xl space-y-6">
          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="font-medium leading-relaxed">{errorMsg}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4.5">
            {/* Username / Email */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300">
                Username or Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Enter username"
                  required
                  autoFocus
                  autoComplete="username"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden transition"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••••••"
                  required
                  autoComplete="current-password"
                  className="w-full pl-10 pr-11 py-3 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3.5 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-extrabold text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Security Notice */}
        <div className="text-center text-[11px] text-slate-400 space-y-1">
          <p>Protected under Philippine Data Privacy Act of 2012 (RA 10173).</p>
          <p>Authorized personnel only.</p>
        </div>
      </div>
    </div>
  );
};
