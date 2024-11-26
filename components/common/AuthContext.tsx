import { UserSession } from '@/api/mutations/users';
import { useStorageState } from '@/hooks/useStorageState';
import { router } from 'expo-router';
import { createContext, useContext, type PropsWithChildren } from 'react';

const AuthContext = createContext<{
  signIn: (token: UserSession) => void;
  signOut: () => void;
  session?: UserSession | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
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
  const [[isLoading, session], setSession] = useStorageState('session');

  return (
    <AuthContext.Provider
      value={{
        signIn: (data: UserSession) => {
          setSession(data);

          router.navigate("/(tabs)?category=music");
        },
        signOut: () => {
          setSession(null);

          router.navigate("/(auth)/login");
        },
        session,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
