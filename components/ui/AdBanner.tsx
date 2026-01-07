
import React, { useEffect } from 'react';

const AdBanner: React.FC = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense error', e);
    }
  }, []);

  // UIUX 관점에서 사용자의 집중력을 흐리는 광고 영역을 숨김 처리합니다.
  // null을 반환함으로써 레이아웃에서 해당 공간을 차지하지 않도록 합니다.
  return null;
};

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default AdBanner;
