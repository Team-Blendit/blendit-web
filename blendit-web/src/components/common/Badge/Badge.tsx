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
    solid: 'bg-(--badge-blue-fill-bg) text-(--badge-blue-fill-text)',
    outline: 'bg-(--badge-blue-outline-bg) border border-(--badge-blue-outline-text) text-(--badge-blue-outline-text)',
  },
  gray: {
    solid: 'bg-(--badge-gray-bg) text-(--badge-gray-text)',
    recruit: 'bg-(--badge-gray-bg) text-(--badge-gray-text)',
  },
  red: {
    solid: 'bg-(--badge-red-bg) text-(--badge-red-text)',
  },
  orange: {
    solid: 'bg-(--badge-orange-bg) text-(--badge-orange-text)',
  },
  green: {
    solid: 'bg-(--badge-green-bg) text-(--badge-green-text)',
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
