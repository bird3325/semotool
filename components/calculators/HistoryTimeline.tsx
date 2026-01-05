
import React, { useState } from 'react';
import { History, Search, X, Calendar } from 'lucide-react';
import AdBanner from '../ui/AdBanner';

interface Event {
  year: string;
  title: string;
  description: string;
  category: string;
}

const historyEvents: Event[] = [
  { year: 'BC 2333', title: '고조선 건국', description: '단군왕검이 아사달에 고조선을 세움.', category: '고대' },
  { year: 'BC 57', title: '신라 건국', description: '박혁거세가 경주 지역에 신라를 세움.', category: '고대' },
  { year: 'BC 37', title: '고구려 건국', description: '주몽이 졸본 지역에 고구려를 세움.', category: '고대' },
  { year: 'BC 18', title: '백제 건국', description: '온조가 위례성에 백제를 세움.', category: '고대' },
  { year: '676', title: '신라의 삼국 통일', description: '당나라 세력을 몰아내고 대동강 이남의 통일을 완수함.', category: '남북국' },
  { year: '698', title: '발해 건국', description: '대조영이 동모산에서 발해를 세움.', category: '남북국' },
  { year: '918', title: '고려 건국', description: '왕건이 태봉을 무너뜨리고 고려를 세움.', category: '고려' },
  { year: '936', title: '고려의 후삼국 통일', description: '후백제를 멸망시키고 민족 재통일을 달성함.', category: '고려' },
  { year: '1392', title: '조선 건국', description: '이성계가 위화도 회군 이후 조선을 세움.', category: '조선' },
  { year: '1443', title: '훈민정음 창제', description: '세종대왕이 우리글 한글을 창제함.', category: '조선' },
  { year: '1592', title: '임진왜란 발발', description: '일본의 침략으로 7년간의 전쟁이 시작됨.', category: '조선' },
  { year: '1897', title: '대한제국 선포', description: '고종이 황제로 즉위하며 근대적 국가 체제를 지향함.', category: '근대' },
  { year: '1910', title: '경술국치', description: '한일 합병 조약으로 일제 강점기가 시작됨.', category: '일제강점기' },
  { year: '1919', title: '3·1 운동 & 임시 정부 수립', description: '전국적인 만세 운동이 일어나고 상해에 임시 정부가 수립됨.', category: '일제강점기' },
  { year: '1945', title: '8·15 광복', description: '일본의 항복으로 민족의 해방을 맞이함.', category: '현대' },
  { year: '1948', title: '대한민국 정부 수립', description: '제헌 국회가 구성되고 대한민국 정부가 공식 출범함.', category: '현대' },
  { year: '1950', title: '6·25 전쟁 발발', description: '북한의 남침으로 동족상잔의 비극이 시작됨.', category: '현대' },
  { year: '1960', title: '4·19 혁명', description: '부정 선거에 항거하여 민주주의를 지켜낸 학생 혁명.', category: '현대' },
  { year: '1987', title: '6월 민주 항쟁', description: '대통령 직선제 개헌을 이끌어낸 범국민적 민주화 운동.', category: '현대' },
];

const HistoryTimeline: React.FC = () => {
  const [query, setQuery] = useState('');

  const filteredEvents = historyEvents.filter(e => 
    e.title.includes(query) || 
    e.year.includes(query) ||
    e.description.includes(query)
  );

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-indigo-500 to-indigo-700">
        <div className="flex items-center space-x-3">
          <History size={28} />
          <h2 className="text-2xl font-bold">역사 연표</h2>
        </div>
        <p className="mt-1 opacity-90">한국사의 흐름을 관통하는 주요 사건들을 살펴보세요.</p>
      </div>

      <div className="relative group mx-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
        <input 
          type="text" 
          placeholder="사건명, 연도, 내용 검색..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full py-4 pl-12 pr-12 bg-white border-2 border-gray-100 rounded-2xl outline-none focus:border-indigo-400 transition-all font-bold text-gray-800 shadow-sm"
        />
        {query && (
          <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        )}
      </div>

      <div className="relative pl-8 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-indigo-100">
        {filteredEvents.map((event, idx) => (
          <div key={idx} className="relative group">
            <div className="absolute -left-8 top-1.5 w-6 h-6 bg-white border-4 border-indigo-500 rounded-full z-10 group-hover:scale-125 transition-transform" />
            <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:border-indigo-200 transition-all">
               <div className="flex justify-between items-start mb-2">
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-lg w-fit mb-1">
                        {event.year}
                    </span>
                    <h3 className="text-lg font-black text-gray-900">{event.title}</h3>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{event.category}</span>
               </div>
               <p className="text-sm font-medium text-gray-500 leading-relaxed">
                 {event.description}
               </p>
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-10 bg-gray-50 rounded-3xl border border-gray-100">
          <p className="text-gray-400 font-bold">검색 결과가 없습니다.</p>
        </div>
      )}

      <AdBanner />
    </div>
  );
};

export default HistoryTimeline;
