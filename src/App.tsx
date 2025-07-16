import React, { useEffect, useState } from 'react';
import { useAuthStore } from './store/auth';
import { useTheme } from './hooks/useTheme';
import { LoadingScreen } from './components/auth/LoadingScreen';
import { AuthPortal } from './components/auth/AuthPortal';
import { TestimonialsStep } from './components/auth/TestimonialsStep';
import { SubscriptionStep } from './components/auth/SubscriptionStep';
import { ThemeToggle } from './components/ui/ThemeToggle';
import styles from './App.module.scss';

function App() {
  const { theme, toggleTheme } = useTheme();
  const { currentStep, isInitializing, initialize } = useAuthStore();
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    // Set theme to dark for Fey-style experience
    if (theme !== 'dark') {
      toggleTheme();
    }
  }, []);

  const handleLoadingComplete = () => {
    setShowLoading(false);
  };

  if (isInitializing || showLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'email':
      case 'authenticate':
        return <AuthPortal />;
      case 'testimonials':
        return <TestimonialsStep />;
      case 'subscription':
        return <SubscriptionStep />;
      case 'payment':
        return <div>Payment (Coming Soon)</div>;
      case 'complete':
        return <div>Welcome to InkID!</div>;
      default:
        return <AuthPortal />;
    }
  };

  return (
    <div className={styles.app} data-theme={theme}>
      {currentStep !== 'testimonials' && currentStep !== 'subscription' && (
        <div className={styles.themeToggle}>
          <ThemeToggle />
        </div>
      )}
      {renderCurrentStep()}
    </div>
  );
}

export default App; 