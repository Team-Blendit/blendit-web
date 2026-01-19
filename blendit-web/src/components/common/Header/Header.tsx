'use client';

import React from 'react';
import { Button } from '@/components/common/Button';

export const Header: React.FC = () => {
  return (
    <header className="bg-transparent">
      <div className="max-w-[1440px] mx-auto px-[30px] py-[25px] flex items-center justify-between">
        {/* Logo */}
        <div className="bg-[#DEDEDE] w-[170px] h-[50px] rounded flex items-center justify-center">
          <span className="text-lg font-semibold text-[#999999]">LOGO</span>
        </div>

        {/* Login Button */}
        <Button variant="primary" size="md">
          로그인 / 회원가입
        </Button>
      </div>
    </header>
  );
};
