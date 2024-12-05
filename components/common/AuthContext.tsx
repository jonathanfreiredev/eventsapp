import { useStorageState } from '@/hooks/useStorageState';
import { UserInfo, UserSession } from '@/types/users';
import { Href, router } from 'expo-router';
import { createContext, useContext, type PropsWithChildren } from 'react';

export const AuthContext = createContext<{
  signIn: (token: UserSession, href?: Href) => void;
  signOut: () => void;
  updateSession: (data: UserInfo) => void;
  session?: UserSession | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  updateSession: () => null,
  session: null,
  isLoading: false,
});

export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession, updateToken] = useStorageState('session');

  return (
    <AuthContext.Provider
      value={{
        signIn: (data: UserSession) => {
          setSession(data);

          router.navigate('/(tabs)?category=music');
        },
        signOut: () => {
          setSession(null);

          router.navigate("/(auth)/login");
        },
        updateSession: (data: UserInfo) => {
          updateToken(data);
        },
        session,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
