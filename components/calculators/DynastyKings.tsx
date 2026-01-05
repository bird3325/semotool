
import React, { useState } from 'react';
import { Crown, ChevronRight, BookOpen, Search, X } from 'lucide-react';
import AdBanner from '../ui/AdBanner';

interface King {
  name: string;
  reign: string;
  achievement: string;
}

interface Dynasty {
  id: string;
  name: string;
  kings: King[];
}

const dynastyData: Dynasty[] = [
  {
    id: 'joseon',
    name: '조선',
    kings: [
      { name: '태조 (이성계)', reign: '1392~1398', achievement: '조선의 건국자. 한양으로 천도.' },
      { name: '태종 (이방원)', reign: '1400~1418', achievement: '왕권 강화 및 6조 직계제 실시.' },
      { name: '세종 (이도)', reign: '1418~1450', achievement: '훈민정음 창제 및 과학 기술 비약적 발전.' },
      { name: '세조 (이유)', reign: '1455~1468', achievement: '경국대전 편찬 시작 및 중앙 집권 강화.' },
      { name: '성종 (이혈)', reign: '1469~1494', achievement: '경국대전 완성 및 유교적 통치 규범 확립.' },
      { name: '선조 (이연)', reign: '1567~1608', achievement: '임진왜란 발생 및 전후 복구 시도.' },
      { name: '광해군 (이혼)', reign: '1608~1623', achievement: '중립 외교 실시 및 대동법 시행.' },
      { name: '정조 (이산)', reign: '1776~1800', achievement: '규장각 설치 및 수원 화성 축조.' },
      { name: '고종 (이희)', reign: '1863~1907', achievement: '대한제국 선포 및 황제 즉위.' },
    ]
  },
  {
    id: 'goryeo',
    name: '고려',
    kings: [
      { name: '태조 (왕건)', reign: '918~943', achievement: '고려 건국 및 북진 정책 실시.' },
      { name: '광종 (왕소)', reign: '949~975', achievement: '노비안검법 및 과거제 실시.' },
      { name: '성종 (왕치)', reign: '981~997', achievement: '유교 정치 체제 정비.' },
      { name: '공민왕 (왕전)', reign: '1351~1374', achievement: '반원 자주 정책 및 전민변정도감 설치.' },
    ]
  }
];

const DynastyKings: React.FC = () => {
  const [activeTab, setActiveTab] = useState(dynastyData[0].id);
  const [query, setQuery] = useState('');

  const currentDynasty = dynastyData.find(d => d.id === activeTab);
  const filteredKings = currentDynasty?.kings.filter(k => 
    k.name.includes(query) || k.achievement.includes(query)
  ) || [];

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-amber-600 to-amber-800">
        <div className="flex items-center space-x-3">
          <Crown size={28} />
          <h2 className="text-2xl font-bold">왕조 계보</h2>
        </div>
        <p className="mt-1 opacity-90">역대 왕들의 계보와 주요 업적을 탐색하세요.</p>
      </div>

      <div className="flex space-x-1 p-1 bg-gray-100 rounded-2xl">
        {dynastyData.map(dyn => (
          <button
            key={dyn.id}
            onClick={() => { setActiveTab(dyn.id); setQuery(''); }}
            className={`flex-1 py-2.5 rounded-xl text-sm font-black transition-all ${
              activeTab === dyn.id ? 'bg-white text-amber-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {dyn.name}
          </button>
        ))}
      </div>

      <div className="relative group mx-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-amber-500 transition-colors" size={20} />
        <input 
          type="text" 
          placeholder={`${currentDynasty?.name} 왕 또는 업적 검색...`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full py-4 pl-12 pr-12 bg-white border-2 border-gray-100 rounded-2xl outline-none focus:border-amber-400 transition-all font-bold text-gray-800 shadow-sm"
        />
        {query && (
          <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        )}
      </div>

      <div className="space-y-4">
        {filteredKings.map((king, idx) => (
          <div key={idx} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:border-amber-200 transition-all group">
             <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-3">
                   <div className="p-2 bg-amber-50 rounded-xl text-amber-600">
                      <Crown size={18} />
                   </div>
                   <div>
                      <h3 className="text-lg font-black text-gray-900 group-hover:text-amber-600 transition-colors">{king.name}</h3>
                      <p className="text-xs font-bold text-gray-400">재위: {king.reign}</p>
                   </div>
                </div>
                <div className="p-1.5 bg-gray-50 rounded-lg text-gray-300 group-hover:text-amber-400 transition-colors">
                   <BookOpen size={16} />
                </div>
             </div>
             <p className="text-sm font-medium text-gray-600 leading-relaxed border-t border-gray-50 pt-3 italic">
               {king.achievement}
             </p>
          </div>
        ))}
      </div>

      {filteredKings.length === 0 && (
        <div className="text-center py-10 bg-gray-50 rounded-3xl border border-gray-100">
          <p className="text-gray-400 font-bold">검색 결과가 없습니다.</p>
        </div>
      )}

      <AdBanner />
    </div>
  );
};

export default DynastyKings;
