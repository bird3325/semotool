
import React from 'react';
import { Zap } from 'lucide-react';

const AdBanner: React.FC = () => {
  // 실제 AdMob/AdSense 연동 시에는 index.html에 스크립트 추가 후 
  // 아래와 같은 호출이 필요할 수 있습니다.
  // React.useEffect(() => {
  //   try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
  // }, []);
  
  return (
    <div className="my-6 mx-4 md:mx-6 overflow-hidden">
      <div className="relative group">
        <div className="flex flex-col items-center justify-center p-4 min-h-[100px] rounded-xl bg-gray-50 border-2 border-dashed border-gray-200 hover:border-blue-300 transition-colors duration-200">
          {/* AdMob Label Tag */}
          <div className="absolute top-1 right-2">
            <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">AdMob</span>
          </div>
          
          <div className="flex items-center text-gray-400 mb-1">
            <Zap size={14} className="mr-1.5 fill-current opacity-70 text-amber-500" />
            <span className="text-[10px] font-bold uppercase tracking-tighter">Sponsored Ad</span>
          </div>
          
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent my-2" />
          
          <p className="text-[11px] text-gray-400 font-medium text-center">
            이곳에 AdMob 맞춤형 광고가 송출됩니다.
          </p>
          
          {/* AdMob / Google Adsense Slot Placeholder */}
          <div className="w-full mt-2 flex justify-center">
            <ins className="adsbygoogle"
                 style={{ display: 'block', width: '100%', height: 'auto' }}
                 data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                 data-ad-slot="XXXXXXXXXX"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdBanner;
