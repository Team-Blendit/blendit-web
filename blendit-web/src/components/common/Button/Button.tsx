import React from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      className,
      children,
      disabled,
      isLoading,
      leftIcon,
      rightIcon,
      ...props
    },
    ref
  ) => {
    // 베이스 스타일
    const baseStyles =
      'inline-flex items-center justify-center gap-[10px] rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed';

    // variant별 스타일
    const variantStyles = {
      // Fill_Main_Btn
      primary: cn(
        'bg-(--accent-primary-default) text-(--text-inverse)',
        'focus:ring-white',
        !isLoading && 'hover:bg-(--accent-primary-hover) active:bg-(--accent-primary-pressed)',
        disabled && !isLoading && 'disabled:bg-(--accent-secondary-disabled) disabled:text-(--text-disabled)'
      ),
      // Fill_Second_Btn
      secondary: cn(
        'bg-[#DBDBDB] text-[#666666]',
        !isLoading && 'hover:bg-[#EEEEEE] active:bg-[#BDBDBD]',
        disabled && !isLoading && 'disabled:bg-[#F2F2F3] disabled:text-[#BDBDBD]',
        'focus:ring-[#DBDBDB]'
      ),
    };

    // size별 스타일 (variant에 따라 padding 다름)
    const sizeStyles = {
      primary: {
        sm: 'h-[48px] px-[22px] py-[15px] text-lg leading-6',      // 48px, 18px text, 24px line-height
        md: 'h-[52px] px-[24px] py-[15px] text-lg leading-6',       // 52px
        lg: 'h-[56px] px-[28px] py-[15px] text-lg leading-6',           // 56px
      },
      secondary: {
        sm: 'h-12 px-[18px] py-[15px] text-lg',      // 48px
        md: 'h-[52px] px-5 py-[15px] text-lg',       // 52px
        lg: 'h-14 px-6 py-[15px] text-lg',           // 56px
      },
    };

    // 로딩 스피너 (24x24)
    const LoadingSpinner = () => (
      <div
        className="animate-spin"
        style={{
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 90deg, currentColor 270deg, transparent 360deg)`,
          mask: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0.86875 11.9687C0.371694 11.9687 -0.0347624 12.3723 0.00247878 12.8679C0.157007 14.9246 0.839642 16.9123 1.99111 18.6356C3.30969 20.609 5.18383 22.1471 7.37655 23.0553C9.56926 23.9636 11.9821 24.2012 14.3098 23.7382C16.6376 23.2752 18.7758 22.1323 20.454 20.454C22.1323 18.7758 23.2752 16.6376 23.7382 14.3098C24.2012 11.9821 23.9636 9.56926 23.0553 7.37655C22.1471 5.18384 20.609 3.30969 18.6356 1.99112C16.9123 0.839643 14.9246 0.157008 12.8679 0.00247898C12.3723 -0.0347623 11.9688 0.371694 11.9688 0.86875C11.9688 1.36581 12.3725 1.76463 12.8676 1.80843C14.5679 1.95883 16.2084 2.53414 17.6356 3.48776C19.3129 4.60855 20.6203 6.20157 21.3923 8.06538C22.1643 9.92919 22.3663 11.9801 21.9728 13.9587C21.5792 15.9373 20.6077 17.7547 19.1812 19.1812C17.7547 20.6077 15.9373 21.5792 13.9587 21.9728C11.9801 22.3663 9.92918 22.1643 8.06538 21.3923C6.20157 20.6203 4.60855 19.3129 3.48776 17.6356C2.53414 16.2084 1.95883 14.5679 1.80843 12.8676C1.76463 12.3725 1.36581 11.9687 0.86875 11.9687Z' fill='white'/%3E%3C/svg%3E")`,
          WebkitMask: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0.86875 11.9687C0.371694 11.9687 -0.0347624 12.3723 0.00247878 12.8679C0.157007 14.9246 0.839642 16.9123 1.99111 18.6356C3.30969 20.609 5.18383 22.1471 7.37655 23.0553C9.56926 23.9636 11.9821 24.2012 14.3098 23.7382C16.6376 23.2752 18.7758 22.1323 20.454 20.454C22.1323 18.7758 23.2752 16.6376 23.7382 14.3098C24.2012 11.9821 23.9636 9.56926 23.0553 7.37655C22.1471 5.18384 20.609 3.30969 18.6356 1.99112C16.9123 0.839643 14.9246 0.157008 12.8679 0.00247898C12.3723 -0.0347623 11.9688 0.371694 11.9688 0.86875C11.9688 1.36581 12.3725 1.76463 12.8676 1.80843C14.5679 1.95883 16.2084 2.53414 17.6356 3.48776C19.3129 4.60855 20.6203 6.20157 21.3923 8.06538C22.1643 9.92919 22.3663 11.9801 21.9728 13.9587C21.5792 15.9373 20.6077 17.7547 19.1812 19.1812C17.7547 20.6077 15.9373 21.5792 13.9587 21.9728C11.9801 22.3663 9.92918 22.1643 8.06538 21.3923C6.20157 20.6203 4.60855 19.3129 3.48776 17.6356C2.53414 16.2084 1.95883 14.5679 1.80843 12.8676C1.76463 12.3725 1.36581 11.9687 0.86875 11.9687Z' fill='white'/%3E%3C/svg%3E")`,
        }}
      />
    );

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[variant][size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <>
            <LoadingSpinner />
            {children}
            <LoadingSpinner />
          </>
        ) : (
          <>
            {leftIcon && <span className="flex items-center justify-center px-[1.5px] py-[2.25px]">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="flex items-center justify-center px-[1.5px] py-[2.25px]">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';