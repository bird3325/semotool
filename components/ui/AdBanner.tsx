import React, { useEffect } from 'react';

const AdBanner: React.FC = () => {
  useEffect(() => {
    // 개발 환경에서는 애드센스 실행하지 않음
    if (process.env.NODE_ENV === 'development') {
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
  }, []);

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
