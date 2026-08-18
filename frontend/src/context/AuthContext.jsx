import React, { createContext, useContext, useMemo, useState } from 'react';

const USERS_KEY = 'rizen_users';
const AuthContext = createContext(null);

async function hashPassword(password) {
  const data = new TextEncoder().encode(password);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

function readUsers() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); } catch { return []; }
}

export function AuthProvider({ children }) {
  // Authentication starts fresh whenever the app is opened. Registered account
  // records remain available for login, but an old session never bypasses the
  // welcome screen on a new app load.
  const [user, setUser] = useState(null);

  const register = async ({ name, email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();
    const users = readUsers();
    if (users.some((item) => item.email === normalizedEmail)) {
      throw new Error('An account with this email already exists.');
    }
    const newUser = { id: crypto.randomUUID(), name: name.trim(), email: normalizedEmail, passwordHash: await hashPassword(password) };
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
    const session = { id: newUser.id, name: newUser.name, email: newUser.email };
    setUser(session);
    return session;
  };

  const login = async ({ email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();
    const found = readUsers().find((item) => item.email === normalizedEmail);
    if (!found || found.passwordHash !== await hashPassword(password)) {
      throw new Error('Incorrect email or password.');
    }
    const session = { id: found.id, name: found.name, email: found.email };
    setUser(session);
    return session;
  };

  const value = useMemo(() => ({ user, isAuthenticated: Boolean(user), login, register, logout: () => setUser(null) }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
