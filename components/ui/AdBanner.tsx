import React, { useEffect } from 'react';
import { Zap } from 'lucide-react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const AdBanner: React.FC = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense error', e);
    }
  }, []);

  return (
    <div className="my-6 mx-4 md:mx-6 p-4 rounded-lg bg-gray-100 border border-gray-200 text-center text-gray-500 overflow-hidden">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-4223979990517628"
        data-ad-slot="1448444134"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      <div className="text-xs text-gray-400 mt-2">
        {/* 광고가 로드되지 않을 때만 보일 수 있는 영역 또는 개발 가이드용 주석 */}
        광고 로드 중... (Client ID와 Slot ID를 설정해주세요)
      </div>
    </div>
  );
};

export default AdBanner;
