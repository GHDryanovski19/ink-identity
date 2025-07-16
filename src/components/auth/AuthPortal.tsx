import React, { useState, useEffect } from 'react';
import { SocialLoginButtons } from './SocialLoginButtons';
import styles from './AuthPortal.module.scss';

export const AuthPortal: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isBackgroundBlurred, setIsBackgroundBlurred] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Start both blur and form animation simultaneously after a shorter delay
    const timer = setTimeout(() => {
      setIsBackgroundBlurred(true);
      setIsFormVisible(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Email validation
  const validateEmail = (email: string): string => {
    if (!email) return '';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    
    if (email.length > 254) {
      return 'Email address is too long';
    }
    
    const [localPart, domain] = email.split('@');
    if (localPart.length > 64 || domain.length > 253) {
      return 'Email address format is invalid';
    }
    
    return '';
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    
    // Set typing state for blur effect
    setIsTyping(newEmail.length > 0);
    
    // Clear error when user starts typing
    if (emailError) {
      setEmailError('');
    }
  };

  const handleEmailSubmit = async () => {
    if (!email.trim()) {
      setEmailError('Please enter your email address');
      return;
    }

    const error = validateEmail(email);
    if (error) {
      setEmailError(error);
      return;
    }

    try {
      // Simulate email submission
      console.log('Magic link email sent to:', email);
      // In real implementation, this would send a magic link email
      // await sendMagicLink(email);
    } catch (error) {
      setEmailError('Failed to send email. Please try again.');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && email.trim()) {
      handleEmailSubmit();
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      // In real implementation, this would integrate with Google OAuth
      console.log('Google sign-in initiated');
      // await signInWithGoogle();
    } catch (error) {
      console.error('Google sign-in failed:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <div className={`${styles.backgroundImage} ${isBackgroundBlurred ? styles.blurred : ''}`} />
      </div>
      
      <div className={`${styles.content} ${isFormVisible ? styles.visible : ''}`}>
        <div className={`${styles.header} ${isTyping ? styles.blurred : ''}`}>
          <h1 className={styles.title}>
            Login to <span className={styles.titleBrand}>InkID</span>
          </h1>
          <p className={styles.subtitle}>
            If you gained access to InkID, you can enter your email or login with your Google account.
          </p>
        </div>

        <div className={styles.form}>
          <div className={styles.emailInput}>
            <div className={`${styles.inputWrapper} ${isFocused ? styles.focused : ''} ${emailError ? styles.error : ''}`}>
              <input
                type="email"
                className={styles.input}
                placeholder="account email"
                value={email}
                onChange={handleEmailChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyPress={handleKeyPress}
              />
              <button
                className={styles.submitButton}
                onClick={handleEmailSubmit}
                disabled={!email.trim() || !!emailError}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
            {emailError && (
              <div className={styles.errorMessage}>
                {emailError}
              </div>
            )}
          </div>

          <div className={`${styles.socialLoginContainer} ${isTyping ? styles.blurred : ''}`}>
            <SocialLoginButtons onGoogleSignIn={handleGoogleSignIn} />
          </div>
        </div>
      </div>

      <div className={`${styles.bottomContainer} ${isFormVisible ? styles.visible : ''}`}>
        <div className={styles.separator}></div>
        <div className={styles.footer}>
          <p className={styles.footerText}>
            Don't have an account yet? <a href="#" className={styles.footerLink}>Sign up.</a>
          </p>
        </div>
      </div>
    </div>
  );
}; 