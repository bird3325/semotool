
import React, { useState } from 'react';
import { Gavel, BookOpen, ChevronRight, Scale } from 'lucide-react';
import AdBanner from '../ui/AdBanner';

interface Article {
  number: string;
  title: string;
  content: string;
}

const articles: Article[] = [
  { number: '제1조 1항', title: '민주공화국', content: '대한민국은 민주공화국이다.' },
  { number: '제1조 2항', title: '국민주권', content: '대한민국의 주권은 국민에게 있고, 모든 권력은 국민으로부터 나온다.' },
  { number: '제3조', title: '영토', content: '대한민국의 영토는 한반도와 그 부속도서로 한다.' },
  { number: '제10조', title: '인간의 존엄과 가치', content: '모든 국민은 인간으로서의 존엄과 가치를 가지며, 행복을 추구할 권리를 가진다.' },
  { number: '제11조 1항', title: '평등권', content: '모든 국민은 법 앞에 평등하다. 누구든지 성별·종교 또는 사회적 신분에 의하여 차별을 받지 아니한다.' },
  { number: '제21조 1항', title: '자유권', content: '모든 국민은 언론·출판의 자유와 집회·결사의 자유를 가진다.' },
  { number: '제24조', title: '선거권', content: '모든 국민은 법률이 정하는 바에 의하여 선거권을 가진다.' },
  { number: '제31조 1항', title: '교육을 받을 권리', content: '모든 국민은 능력에 따라 균등하게 교육을 받을 권리를 가진다.' },
  { number: '제34조 1항', title: '인간다운 생활', content: '모든 국민은 인간다운 생활을 할 권리를 가진다.' },
  { number: '제37조 2항', title: '기본권 제한의 한계', content: '국민의 모든 자유와 권리는 국가안전보장·질서유지 또는 공공복리를 위하여 필요한 경우에 한하여 법률로써 제한할 수 있으며, 제한하는 경우에도 자유와 권리의 본질적인 내용을 침해할 수 없다.' },
];

const ConstitutionSummary: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-slate-600 to-slate-800">
        <div className="flex items-center space-x-3">
          <Gavel size={28} />
          <h2 className="text-2xl font-bold">헌법 개요</h2>
        </div>
        <p className="mt-1 opacity-90">대한민국의 근간이 되는 헌법의 핵심 조항들입니다.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {articles.map((art, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:border-slate-300 transition-all group">
             <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                   <div className="p-1.5 bg-slate-50 rounded-lg text-slate-500">
                      <Scale size={16} />
                   </div>
                   <span className="text-xs font-black text-slate-500 uppercase tracking-tighter">{art.number}</span>
                </div>
                <h4 className="font-black text-gray-900 text-lg">{art.title}</h4>
             </div>
             
             <div className="p-5 bg-slate-50/50 rounded-2xl border border-slate-100 relative overflow-hidden">
                <p className="text-sm font-bold text-gray-700 leading-relaxed z-10 relative">
                  "{art.content}"
                </p>
                <div className="absolute -right-4 -bottom-4 opacity-5 text-slate-900 transform rotate-12">
                   <Gavel size={80} />
                </div>
             </div>
          </div>
        ))}
      </div>

      <AdBanner />
      
      <div className="p-5 bg-gray-900 rounded-3xl">
        <p className="text-[11px] text-gray-400 font-bold text-center leading-relaxed">
           ※ 위 내용은 헌법 전문 중 일반 국민이 꼭 알아야 할 핵심 내용을 선별한 것입니다. <br/>
           전체 조문은 국가법령정보센터에서 확인할 수 있습니다.
        </p>
      </div>
    </div>
  );
};

export default ConstitutionSummary;
