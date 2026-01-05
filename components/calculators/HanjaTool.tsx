
import React, { useState } from 'react';
import { Languages, Search, X } from 'lucide-react';
import AdBanner from '../ui/AdBanner';

interface Hanja {
  character: string;
  meaning: string;
  sound: string;
  radical: string;
  level: string;
}

const hanjaData: Hanja[] = [
  { character: '大', meaning: '클', sound: '대', radical: '大', level: '8급' },
  { character: '中', meaning: '가운데', sound: '중', radical: '丨', level: '8급' },
  { character: '小', meaning: '작을', sound: '소', radical: '小', level: '8급' },
  { character: '日', meaning: '날', sound: '일', radical: '日', level: '8급' },
  { character: '月', meaning: '달', sound: '월', radical: '月', level: '8급' },
  { character: '火', meaning: '불', sound: '화', radical: '火', level: '8급' },
  { character: '水', meaning: '물', sound: '수', radical: '水', level: '8급' },
  { character: '木', meaning: '나무', sound: '목', radical: '木', level: '8급' },
  { character: '金', meaning: '쇠', sound: '금', radical: '金', level: '8급' },
  { character: '土', meaning: '흙', sound: '토', radical: '土', level: '8급' },
  { character: '學', meaning: '배울', sound: '학', radical: '子', level: '7급' },
  { character: '校', meaning: '학교', sound: '교', radical: '木', level: '7급' },
  { character: '先', meaning: '먼저', sound: '선', radical: '儿', level: '7급' },
  { character: '生', meaning: '날', sound: '생', radical: '生', level: '7급' },
  { character: '民', meaning: '백성', sound: '민', radical: '氏', level: '6급' },
  { character: '國', meaning: '나라', sound: '국', radical: '囗', level: '6급' },
];

const HanjaTool: React.FC = () => {
  const [query, setQuery] = useState('');

  const filteredHanja = hanjaData.filter(h => 
    h.character.includes(query) || 
    h.meaning.includes(query) || 
    h.sound.includes(query)
  );

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-rose-400 to-rose-600">
        <div className="flex items-center space-x-3">
          <Languages size={28} />
          <h2 className="text-2xl font-bold">필수 한자</h2>
        </div>
        <p className="mt-1 opacity-90">기초 급수 한자들을 학습하고 검색하세요.</p>
      </div>

      <div className="relative group mx-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-rose-500 transition-colors" size={20} />
        <input 
          type="text" 
          placeholder="한자, 뜻, 음 검색..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full py-4 pl-12 pr-12 bg-white border-2 border-gray-100 rounded-2xl outline-none focus:border-rose-400 transition-all font-bold text-gray-800 shadow-sm"
        />
        {query && (
          <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredHanja.map((h, idx) => (
          <div key={idx} className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-rose-300 transition-all text-center flex flex-col items-center">
            <span className="text-4xl font-serif text-gray-900 mb-2">{h.character}</span>
            <span className="text-lg font-black text-rose-600">{h.meaning} {h.sound}</span>
            <div className="mt-2 flex space-x-2">
               <span className="text-[10px] font-bold px-2 py-0.5 bg-gray-100 rounded-full text-gray-500">부수: {h.radical}</span>
               <span className="text-[10px] font-bold px-2 py-0.5 bg-rose-50 rounded-full text-rose-500">{h.level}</span>
            </div>
          </div>
        ))}
      </div>

      {filteredHanja.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-400 font-bold">검색 결과가 없습니다.</p>
        </div>
      )}

      <AdBanner />
    </div>
  );
};

export default HanjaTool;
