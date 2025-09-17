import React, { useEffect } from 'react';
import { Zap } from 'lucide-react';

const AdBanner: React.FC = () => {
  const isDevelopment = process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost';

  useEffect(() => {
    // 개발 환경에서는 애드센스 실행하지 않음
    if (isDevelopment) {
      return;
    }

    const pushAd = () => {
      try {
        const adsbygoogle = (window as any).adsbygoogle;
        if (adsbygoogle) {
          adsbygoogle.push({});
        }
      } catch (e) {
        console.error('AdSense error:', e);
      }
    };

    // 애드센스 스크립트가 로드될 때까지 체크
    const interval = setInterval(() => {
      if ((window as any).adsbygoogle) {
        pushAd();
        clearInterval(interval);
      }
    }, 300);

    // 컴포넌트 언마운트 시 interval 정리
    return () => {
      clearInterval(interval);
    };
  }, [isDevelopment]);

  // 개발 환경에서는 플레이스홀더 표시
  if (isDevelopment) {
    return (
      <div className="my-6 mx-4 md:mx-6 p-4 rounded-lg bg-gray-100 border border-gray-200 text-center text-gray-500">
        <div className="flex items-center justify-center">
          <Zap size={16} className="mr-2" />
          <span className="text-sm font-semibold">광고 영역 (개발 환경)</span>
        </div>
        <p className="text-xs mt-1">프로덕션에서는 구글 애드센스 광고가 표시됩니다.</p>
      </div>
    );
  }

  // 프로덕션 환경에서는 실제 애드센스 광고 표시
  return (
    <div className="my-6 mx-4 md:mx-6">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-4223979990517628"
        data-ad-slot="3995879199"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdBanner;
