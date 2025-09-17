import React from 'react';
import { Zap } from 'lucide-react';

const AdBanner: React.FC = () => {
  return (
    <div className="my-6 mx-4 md:mx-6 p-4 rounded-lg bg-gray-100 border border-gray-200 text-center text-gray-500">
      <div className="flex items-center justify-center">
        <Zap size={16} className="mr-2" />
        <span className="text-sm font-semibold">광고 영역</span>
      </div>
      <p className="text-xs mt-1">이곳에 광고가 표시됩니다.</p>
    </div>
  );
};

export default AdBanner;
