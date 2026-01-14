import React from 'react';
import { cn } from '@/lib/utils';

type SocialProvider = 'kakao' | 'naver' | 'google';

export interface SocialLoginButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  provider: SocialProvider;
  className?: string;
}

// 카카오 로고
const KakaoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 1.7998C18.2959 1.79996 23.3994 5.5611 23.3994 10.2002C23.3991 14.8391 18.2957 18.5995 12 18.5996C11.6839 18.5996 11.3707 18.5893 11.061 18.5702C10.8487 18.5572 10.6367 18.607 10.4555 18.7186L6.6318 21.0724C5.90748 21.5183 4.99256 20.9138 5.11861 20.0727L5.45248 17.8446C5.5164 17.418 5.29701 17.0021 4.92452 16.7846C2.29022 15.2462 0.599774 12.8694 0.599609 10.2002C0.599609 5.561 5.70395 1.7998 12 1.7998Z"
      fill="#191600"
    />
  </svg>
);

// 네이버 로고
const NaverIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 21V3H9.42857L14.5714 12V3H21V21H14.5714L9.42857 12V21H3Z" fill="white" />
  </svg>
);

// 구글 로고
const GoogleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5.74102 9.80824L2.1543 7.05996C3.0506 5.25097 4.44853 3.72399 6.18911 2.65271C7.92969 1.58142 9.94307 1.00881 12.0002 1C14.7664 0.999599 17.4282 2.03191 19.441 3.8857L16.3184 6.96377C15.1245 5.93847 13.5899 5.37198 12.0002 5.36977C10.6133 5.37903 9.26412 5.81196 8.14168 6.60789C7.01925 7.40382 6.17982 8.52287 5.74102 9.80824Z"
      fill="#EA4335"
    />
    <path
      d="M19.3718 20.1689C17.3667 21.9886 14.7312 22.9999 11.9944 22.9996C9.92933 22.9862 7.91003 22.404 6.1684 21.3199C4.42677 20.2358 3.03344 18.6938 2.14844 16.8709L5.77036 14.2051C6.20972 15.489 7.04967 16.6062 8.17231 17.3998C9.29495 18.1934 10.6438 18.6236 12.0295 18.6298C13.386 18.6305 14.7087 18.2173 15.8132 17.4481L19.3718 20.1689Z"
      fill="#34A853"
    />
    <path
      d="M5.36156 12.0211C5.36175 12.7644 5.48768 13.5027 5.73428 14.2059L2.14756 16.8718C1.39231 15.3465 1 13.6742 1 11.9798C1 10.2855 1.39231 8.61313 2.14756 7.08789L5.73428 9.83617C5.48989 10.54 5.36403 11.2779 5.36156 12.0211Z"
      fill="#FBBC05"
    />
    <path
      d="M23.0001 12.0138C23.0062 13.5446 22.6867 15.0599 22.062 16.4638C21.4374 17.8677 20.521 19.1295 19.3712 20.1693L15.7774 17.4211C16.9385 16.6077 17.8092 15.4591 18.267 14.1369H12.0781V10.248H22.8665C22.9581 10.8323 23.0028 11.4227 23.0001 12.0138Z"
      fill="#4285F4"
    />
  </svg>
);

const providerConfig = {
  kakao: {
    label: '카카오 로그인',
    icon: KakaoIcon,
    bgColor: 'bg-[#FEE500]',
    textColor: 'text-(--text-primary)',
    hoverBg: 'hover:bg-[#FDD835]',
    activeBg: 'active:bg-[#F9A825]',
    border: '',
  },
  naver: {
    label: '네이버 로그인',
    icon: NaverIcon,
    bgColor: 'bg-[#03C759]',
    textColor: 'text-(--text-inverse)',
    hoverBg: 'hover:bg-[#02B350]',
    activeBg: 'active:bg-[#029F47]',
    border: '',
  },
  google: {
    label: '구글 로그인',
    icon: GoogleIcon,
    bgColor: 'bg-white',
    textColor: 'text-(--text-primary)',
    hoverBg: 'hover:bg-gray-50',
    activeBg: 'active:bg-gray-100',
    border: 'border border-(--border-default)',
  },
};

export const SocialLoginButton = React.forwardRef<HTMLButtonElement, SocialLoginButtonProps>(
  ({ provider, className, ...props }, ref) => {
    const config = providerConfig[provider];
    const Icon = config.icon;

    return (
      <button
        ref={ref}
        className={cn(
          'flex items-center justify-between w-full h-[68px] px-[16px] py-[14px] rounded-lg',
          'font-semibold text-[22px] leading-7 text-center',
          'transition-colors',
          'disabled:cursor-not-allowed disabled:opacity-50',
          config.bgColor,
          config.textColor,
          config.hoverBg,
          config.activeBg,
          config.border,
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-center">
          <Icon />
        </div>
        <span className="flex-1">{config.label}</span>
        <div className="w-[24px]" aria-hidden="true" />
      </button>
    );
  }
);

SocialLoginButton.displayName = 'SocialLoginButton';
