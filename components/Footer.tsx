import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold text-primary">Career Momentum</h3>
            <p className="text-sm text-gray-500 mt-1">
              Copyright © {new Date().getFullYear()} Career Momentum. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-primary text-sm">이용약관</a>
            <a href="#" className="text-gray-400 hover:text-primary text-sm">개인정보처리방침</a>
            <a href="#" className="text-gray-400 hover:text-primary text-sm">문의하기</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;