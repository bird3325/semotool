
import React, { useEffect } from 'react';

const AdBanner: React.FC = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense error', e);
    }
  }, []);

  return (
    <div className="my-4 text-center overflow-hidden">
      {/* Responsive Ad Unit */}
      <ins className="adsbygoogle block"
        data-ad-client="ca-pub-4223979990517628"
        data-ad-slot="1448444134"
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
      <div className="text-[10px] text-gray-300 mt-1">Advertisement</div>
    </div>
  );
};

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default AdBanner;
