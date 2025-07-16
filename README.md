# InkID - Enterprise Authentication Portal

A production-ready, enterprise-grade authentication portal for Inkblot Studio and Ink-Verse applications. Built with modern React, TypeScript, and Framer Motion for a premium user experience.

## 🚀 Features

### Authentication Flows
- **Login/Signup Toggle** - Smooth animated transitions between modes
- **Email/Password Authentication** - Secure login with validation
- **Social Login** - Google, Meta (Facebook), and Apple integration
- **Passwordless Authentication** - Magic link email verification
- **2FA Support** - TOTP setup with QR codes and backup codes
- **Password Reset** - Secure forgot password flow

### Design & UX
- **2025 Enterprise UI** - Clean, minimal design following latest trends
- **Cinematic Animations** - Framer Motion-powered smooth transitions
- **Dark/Light Mode** - Built-in theme switching with system preference detection
- **Mobile-First** - Responsive design from mobile to ultra-wide desktop
- **Accessibility** - Full keyboard navigation, focus states, and ARIA attributes
- **Premium Feel** - High-end design similar to Linear, Vercel, and Apple

### Technical Features
- **TypeScript** - Full type safety throughout the application
- **SCSS Modules** - Centralized design tokens and component styles
- **Zustand State Management** - Lightweight, performant state management
- **React Hook Form** - Form validation with Zod schema validation
- **Mock Authentication** - Ready for backend integration
- **Vercel Optimized** - Built for static hosting deployment

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite
- **Language**: TypeScript
- **Styling**: SCSS Modules with CSS Custom Properties
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ink-identity
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── ThemeToggle.tsx
│   ├── auth/              # Authentication components
│   │   ├── AuthPortal.tsx
│   │   ├── LoginForm.tsx
│   │   ├── SignupForm.tsx
│   │   ├── ForgotPasswordForm.tsx
│   │   └── SocialLoginButtons.tsx
│   └── Dashboard.tsx      # Authenticated user dashboard
├── hooks/
│   └── useTheme.ts        # Theme management hook
├── lib/
│   └── utils.ts           # Utility functions
├── store/
│   └── auth.ts            # Authentication state management
├── styles/
│   ├── tokens.scss        # Design system tokens
│   └── global.scss        # Global styles
└── App.tsx                # Main application component
```

## 🎨 Design System

The application uses a comprehensive design system with:

- **Color Palette**: Primary, neutral, and semantic colors
- **Typography**: Consistent font sizes and weights
- **Spacing**: 8px grid system with semantic spacing tokens
- **Shadows**: Multiple elevation levels
- **Border Radius**: Consistent corner radius values
- **Transitions**: Standardized animation durations and easing

All design tokens are defined in `src/styles/tokens.scss` and automatically support dark/light mode.

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Application
VITE_APP_NAME=InkID
VITE_APP_URL=https://id.inkverse.vercel.app

# Authentication (for future backend integration)
VITE_AUTH_API_URL=https://api.inkverse.com/auth
VITE_AUTH_REDIRECT_URL=https://id.inkverse.vercel.app/callback

# Social Login Providers
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_META_APP_ID=your_meta_app_id
VITE_APPLE_CLIENT_ID=your_apple_client_id

# Feature Flags
VITE_ENABLE_2FA=true
VITE_ENABLE_MAGIC_LINKS=true
VITE_ENABLE_SOCIAL_LOGIN=true
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**
   - Push your code to GitHub
   - Import the repository in Vercel
   - Vercel will automatically detect the Vite configuration

2. **Environment Variables**
   - Add your environment variables in the Vercel dashboard
   - Set the production domain to `id.inkverse.vercel.app`

3. **Deploy**
   - Vercel will automatically build and deploy on every push

### Manual Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔌 Backend Integration

The application is designed to be easily integrated with various authentication providers:

### Clerk.dev
```typescript
// Replace mock auth service with Clerk
import { useAuth } from '@clerk/clerk-react';

const { signIn, signUp, user } = useAuth();
```

### Auth0
```typescript
// Replace mock auth service with Auth0
import { useAuth0 } from '@auth0/auth0-react';

const { loginWithRedirect, user } = useAuth0();
```

### Firebase
```typescript
// Replace mock auth service with Firebase
import { signInWithEmailAndPassword } from 'firebase/auth';

const userCredential = await signInWithEmailAndPassword(auth, email, password);
```

### Custom OAuth2 Server
```typescript
// Replace mock auth service with custom implementation
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});
```

## 🧪 Testing

```bash
# Run type checking
npm run type-check

# Run linting
npm run lint

# Build for production
npm run build
```

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🔒 Security Features

- **XSS Protection**: Content Security Policy headers
- **CSRF Protection**: Secure token-based authentication
- **Frame Protection**: X-Frame-Options headers
- **Content Sniffing**: X-Content-Type-Options headers
- **Referrer Policy**: Strict referrer policy
- **Permissions Policy**: Restricted permissions for enhanced privacy

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

Built with ❤️ by the Inkblot Studio team 