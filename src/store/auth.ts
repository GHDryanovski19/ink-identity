import { create } from 'zustand';

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  isAuthenticated: boolean;
  isEmailVerified: boolean;
  hasSubscription: boolean;
  subscriptionPlan?: 'monthly' | 'yearly';
  trialEndsAt?: Date;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  currentStep: 'email' | 'authenticate' | 'testimonials' | 'subscription' | 'payment' | 'complete';
  emailSent: boolean;
  testimonialsShown: boolean;
  error: string | null;
  isInitializing: boolean;
}

export interface AuthActions {
  // Email step
  submitEmail: (email: string) => Promise<void>;
  
  // Authentication step
  authenticateEmail: (token: string) => Promise<void>;
  
  // Testimonials step
  showTestimonials: () => void;
  completeTestimonials: () => void;
  
  // Subscription step
  selectPlan: (plan: 'monthly' | 'yearly') => void;
  skipSubscription: () => void;
  
  // Payment step
  processPayment: (paymentData: any) => Promise<void>;
  
  // General actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState & AuthActions>((set, get) => ({
  // Initial state
  user: null,
  isLoading: false,
  currentStep: 'email',
  emailSent: false,
  testimonialsShown: false,
  error: null,
  isInitializing: true,

  // Email step
  submitEmail: async (email: string) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate email sending
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      set({ 
        emailSent: true, 
        currentStep: 'authenticate',
        isLoading: false 
      });
      
      // In real implementation, this would send a magic link email
      console.log('Magic link email sent to:', email);
      
    } catch (error) {
      set({ 
        error: 'Failed to send email. Please try again.',
        isLoading: false 
      });
    }
  },

  // Authentication step
  authenticateEmail: async (token: string) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate token verification
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create user from email
      const email = 'user@example.com'; // In real app, extract from token
      const user: User = {
        id: 'user_' + Date.now(),
        email,
        isAuthenticated: true,
        isEmailVerified: true,
        hasSubscription: false,
      };
      
      set({ 
        user,
        currentStep: 'testimonials',
        isLoading: false 
      });
      
    } catch (error) {
      set({ 
        error: 'Invalid or expired authentication link.',
        isLoading: false 
      });
    }
  },

  // Testimonials step
  showTestimonials: () => {
    set({ testimonialsShown: true });
  },

  completeTestimonials: () => {
    set({ currentStep: 'subscription' });
  },

  // Subscription step
  selectPlan: (plan: 'monthly' | 'yearly') => {
    set(state => ({
      user: state.user ? { ...state.user, subscriptionPlan: plan } : null,
      currentStep: 'payment'
    }));
  },

  skipSubscription: () => {
    set({ currentStep: 'complete' });
  },

  // Payment step
  processPayment: async (paymentData: any) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate Stripe payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      set(state => ({
        user: state.user ? {
          ...state.user,
          hasSubscription: true,
          trialEndsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
        } : null,
        currentStep: 'complete',
        isLoading: false
      }));
      
    } catch (error) {
      set({ 
        error: 'Payment failed. Please try again.',
        isLoading: false 
      });
    }
  },

  // General actions
  setLoading: (loading: boolean) => set({ isLoading: loading }),
  
  setError: (error: string | null) => set({ error }),
  
  logout: () => {
    set({
      user: null,
      currentStep: 'email',
      emailSent: false,
      testimonialsShown: false,
      error: null
    });
  },

  initialize: async () => {
    set({ isInitializing: true });
    
    try {
      // Check for existing session
      const savedUser = localStorage.getItem('inkid_user');
      const savedStep = localStorage.getItem('inkid_step');
      
      if (savedUser) {
        const user = JSON.parse(savedUser);
        set({ 
          user,
          currentStep: savedStep as any || 'email',
          isInitializing: false
        });
      } else {
        set({ isInitializing: false });
      }
    } catch (error) {
      set({ isInitializing: false });
    }
  }
})); 