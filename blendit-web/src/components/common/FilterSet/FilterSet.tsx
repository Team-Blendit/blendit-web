'use client';

import FilterChip from '@/components/common/FilterChip';
import SelectChip from '@/components/common/SelectChip';
import { cn } from '@/lib/utils';

type FilterItem = {
  type: 'dropdown' | 'select' | 'reset';
  label: string;
  options?: string[];
  value?: string | string[];
  selected?: boolean;
  onChange?: (value: string | string[] | boolean) => void;
  onClick?: () => void;
  multiSelect?: boolean;
  maxSelection?: number;
};

type FilterSetProps = {
  filters: FilterItem[];
  className?: string;
};

export default function FilterSet({ filters, className }: FilterSetProps) {
  return (
    <div className={cn('flex gap-4 items-center', className)}>
      {filters.map((filter, index) => {
        if (filter.type === 'dropdown' && filter.options) {
          return (
            <FilterChip
              key={index}
              label={filter.label}
              options={filter.options}
              value={filter.value}
              onChange={filter.onChange as (value: string | string[]) => void}
              multiSelect={filter.multiSelect}
              maxSelection={filter.maxSelection}
            />
          );
        } else if (filter.type === 'select') {
          return (
            <SelectChip
              key={index}
              label={filter.label}
              selected={filter.selected}
              size="large"
              variant="line"
              onClick={() => {
                if (filter.onChange) {
                  filter.onChange(!filter.selected);
                }
              }}
            />
          );
        } else if (filter.type === 'reset') {
          return (
            <button
              key={index}
              onClick={filter.onClick}
              className="px-[16px] py-[10px] text-[16px] font-medium leading-[22px] text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
            >
              {filter.label}
            </button>
          );
        }
        return null;
      })}
    </div>
  );
}
