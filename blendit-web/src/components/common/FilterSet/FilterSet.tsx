'use client';

import FilterChip from '@/components/common/FilterChip';
import SelectChip from '@/components/common/SelectChip';
import { cn } from '@/lib/utils';

type FilterItem = {
  type: 'dropdown' | 'select';
  label: string;
  options?: string[];
  value?: string;
  selected?: boolean;
  onChange?: (value: string | boolean) => void;
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
              onChange={filter.onChange as (value: string) => void}
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
        }
        return null;
      })}
    </div>
  );
}
