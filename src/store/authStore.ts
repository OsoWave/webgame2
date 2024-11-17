import { create } from 'zustand';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { AuthState, User } from '../types/auth';

interface AuthStore extends AuthState {
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  handleRedirectResult: () => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  resendVerificationEmail: () => Promise<void>;
  initialize: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,
  error: null,

  signUp: async (email: string, password: string, username: string) => {
    try {
      set({ loading: true, error: null });
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName: username });
      await sendEmailVerification(result.user);
      
      const user: User = {
        id: result.user.uid,
        email: result.user.email!,
        username,
        role: 'user',
        emailVerified: false
      };
      set({ user, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  signIn: async (email: string, password: string) => {
    try {
      set({ loading: true, error: null });
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user: User = {
        id: result.user.uid,
        email: result.user.email!,
        username: result.user.displayName || 'Player',
        role: 'user',
        emailVerified: result.user.emailVerified
      };
      set({ user, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  signInWithGoogle: async () => {
    try {
      set({ loading: true, error: null });
      const provider = new GoogleAuthProvider();
      await signInWithRedirect(auth, provider);
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  handleRedirectResult: async () => {
    try {
      set({ loading: true, error: null });
      const result = await getRedirectResult(auth);
      if (result) {
        const user: User = {
          id: result.user.uid,
          email: result.user.email!,
          username: result.user.displayName || 'Player',
          role: 'user',
          emailVerified: result.user.emailVerified
        };
        set({ user, loading: false });
      } else {
        set({ loading: false });
      }
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  signOut: async () => {
    try {
      await firebaseSignOut(auth);
      set({ user: null });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  resetPassword: async (email: string) => {
    try {
      set({ loading: true, error: null });
      await sendPasswordResetEmail(auth, email);
      set({ loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  resendVerificationEmail: async () => {
    try {
      set({ loading: true, error: null });
      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
      }
      set({ loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  initialize: () => {
    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const user: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email!,
          username: firebaseUser.displayName || 'Player',
          role: 'user',
          emailVerified: firebaseUser.emailVerified
        };
        set({ user, loading: false });
      } else {
        set({ user: null, loading: false });
      }
    });
  }
}));