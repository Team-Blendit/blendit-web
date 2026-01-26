import React from 'react';
import { cn } from '@/lib/utils';

type BadgeColor = 'blue' | 'gray' | 'red' | 'orange' | 'green';
type BadgeStyle = 'solid' | 'outline' | 'recruit';

export interface BadgeProps {
  color?: BadgeColor;
  style?: BadgeStyle;
  text?: string;
  currentNum?: number;
  totalNum?: number;
  className?: string;
}

const colorStyles = {
  blue: {
    solid: 'bg-[var(--badge-blue-fill-bg)] text-[var(--badge-blue-fill-text)]',
    outline: 'border border-[var(--badge-blue-outline-text)] text-[var(--badge-blue-outline-text)]',
  },
  gray: {
    solid: 'bg-[var(--badge-gray-bg)] text-[var(--badge-gray-text)]',
    recruit: 'bg-[var(--badge-gray-bg)] text-[var(--badge-gray-text)]',
  },
  red: {
    solid: 'bg-[var(--badge-red-bg)] text-[var(--badge-red-text)]',
    outline: 'border border-[var(--border-error)] text-[var(--border-error)]',
  },
  orange: {
    solid: 'bg-[var(--badge-orange-bg)] text-[var(--badge-orange-text)]',
  },
  green: {
    solid: 'bg-[var(--badge-green-bg)] text-[var(--badge-green-text)]',
  },
};

export const Badge: React.FC<BadgeProps> = ({
  color = 'blue',
  style = 'solid',
  text = 'Badge',
  currentNum = 0,
  totalNum = 0,
  className,
}) => {
  const isRecruit = style === 'recruit';
  const styleKey = style === 'recruit' ? 'recruit' : style;
  const colorStyle = colorStyles[color]?.[styleKey as keyof typeof colorStyles[typeof color]];

  return (
    <div
      className={cn(
        'inline-flex items-center justify-center px-[12px] py-[4px] rounded-full',
        'font-medium text-base leading-[22px]',
        colorStyle,
        className
      )}
    >
      {isRecruit ? (
        <div className="flex items-center justify-center gap-0.5">
          <span>{currentNum}</span>
          <span>/</span>
          <span>{totalNum}</span>
        </div>
      ) : (
        <span>{text}</span>
      )}
    </div>
  );
};
