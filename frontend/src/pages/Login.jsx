import React, { useState } from 'react';
import { ArrowRight, Heart, LockKeyhole, Mail, ShieldCheck, UserRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Login() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isBusy, setIsBusy] = useState(false);

  const update = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));
  const submit = async (event) => {
    event.preventDefault();
    setError('');
    if (mode === 'register' && form.name.trim().length < 2) return setError('Please enter your full name.');
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return setError('Please enter a valid email address.');
    if (form.password.length < 6) return setError('Password must contain at least 6 characters.');
    setIsBusy(true);
    try {
      if (mode === 'login') await login(form);
      else await register(form);
    } catch (submitError) { setError(submitError.message); }
    finally { setIsBusy(false); }
  };

  return (
    <main className="min-h-screen bg-[#07090E] text-slate-100 flex items-center justify-center p-4 overflow-hidden relative">
      <div className="absolute -top-32 -left-20 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="absolute -bottom-40 -right-20 w-[30rem] h-[30rem] rounded-full bg-purple-600/15 blur-3xl" />
      <div className="relative w-full max-w-5xl grid lg:grid-cols-[1.05fr_.95fr] rounded-[2rem] overflow-hidden border border-[#24304A] bg-[#0D111A]/95 shadow-[0_20px_100px_rgba(0,0,0,.55)]">
        <section className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-[#101D35] via-[#101426] to-[#181229]">
          <div className="flex items-center gap-3"><div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center"><Heart className="w-5 h-5 text-cyan-300 fill-cyan-300/20" /></div><div><p className="font-extrabold tracking-widest">RIZEN CARE</p><p className="text-[10px] text-cyan-400 tracking-[.25em]">AI HEALTH ASSISTANT</p></div></div>
          <div className="max-w-md space-y-5"><span className="inline-flex items-center gap-2 text-xs text-emerald-300 bg-emerald-500/10 border border-emerald-400/20 rounded-full px-3 py-1.5"><ShieldCheck className="w-3.5 h-3.5" /> Private wellness workspace</span><h1 className="text-4xl font-extrabold leading-tight">Care guidance that feels personal.</h1><p className="text-sm text-slate-300 leading-7">Organize your health journey, find nearby care, understand medicines, and get everyday nutrition support in one calm, connected space.</p></div>
          <p className="text-xs text-slate-500">Educational health information only. Consult a qualified professional for medical decisions.</p>
        </section>
        <section className="p-6 sm:p-10 lg:p-12">
          <div className="lg:hidden flex items-center gap-3 mb-9"><div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center"><Heart className="w-5 h-5 text-cyan-300" /></div><div><p className="font-extrabold tracking-widest">RIZEN CARE</p><p className="text-[9px] text-cyan-400 tracking-widest">AI HEALTH ASSISTANT</p></div></div>
          <div className="mb-7"><h2 className="text-2xl font-bold text-white">{mode === 'login' ? 'Welcome back' : 'Create your account'}</h2><p className="text-sm text-slate-400 mt-2">{mode === 'login' ? 'Sign in to continue to your health workspace.' : 'Start your personalized wellness journey today.'}</p></div>
          <div className="flex gap-1 p-1 bg-[#121622] rounded-xl mb-6"><button onClick={() => { setMode('login'); setError(''); }} className={`flex-1 py-2.5 rounded-lg text-xs font-semibold transition-all ${mode === 'login' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'text-slate-400'}`}>Login</button><button onClick={() => { setMode('register'); setError(''); }} className={`flex-1 py-2.5 rounded-lg text-xs font-semibold transition-all ${mode === 'register' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'text-slate-400'}`}>Create Account</button></div>
          <form onSubmit={submit} className="space-y-4">
            {mode === 'register' && <label className="block"><span className="field-label">Full name</span><div className="field-wrap"><UserRound /><input value={form.name} onChange={update('name')} placeholder="Your name" autoComplete="name" /></div></label>}
            <label className="block"><span className="field-label">Email / Gmail</span><div className="field-wrap"><Mail /><input value={form.email} onChange={update('email')} placeholder="you@example.com" type="email" autoComplete="email" /></div></label>
            <label className="block"><span className="field-label">Password</span><div className="field-wrap"><LockKeyhole /><input value={form.password} onChange={update('password')} placeholder="At least 6 characters" type="password" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} /></div></label>
            {error && <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2.5 text-xs text-red-300">{error}</p>}
            <button disabled={isBusy} className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-60">{isBusy ? 'Please wait…' : mode === 'login' ? 'Sign In' : 'Create Account'} {!isBusy && <ArrowRight className="w-4 h-4" />}</button>
          </form>
          <p className="text-[11px] text-slate-500 text-center mt-6 flex items-center justify-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Passwords are stored as one-way hashes in this browser.</p>
        </section>
      </div>
    </main>
  );
}
