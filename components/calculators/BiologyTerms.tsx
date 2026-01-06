
import React, { useState } from 'react';
import { Dna, Search, X, BookOpen } from 'lucide-react';
import AdBanner from '../ui/AdBanner';

interface Term {
  word: string;
  meaning: string;
  description: string;
}

const biologyTerms: Term[] = [
  { word: '세포 (Cell)', meaning: '생물의 기본 단위', description: '모든 생물체의 구조적, 기능적 기본 단위입니다.' },
  { word: 'DNA', meaning: '유전 정보의 저장소', description: '생명체의 유전 정보를 담고 있는 이중 나선 구조의 고분자 화합물입니다.' },
  { word: '미토콘드리아', meaning: '세포의 발전소', description: '세포 호흡을 통해 에너지를 생성하는 세포 소기관입니다.' },
  { word: '광합성 (Photosynthesis)', meaning: '빛 에너지를 화학 에너지로 전환', description: '식물이 빛 에너지를 이용하여 이산화탄소와 물로부터 유기물을 만드는 과정입니다.' },
  { word: '항상성 (Homeostasis)', meaning: '일정한 상태 유지', description: '생물체가 외부 환경 변화에 대응하여 체내 상태를 일정하게 유지하려는 성질입니다.' },
  { word: '염색체 (Chromosome)', meaning: '유전 물질의 운반체', description: '세포 분열 시 나타나는 실 모양의 구조물로 DNA가 고도로 응축되어 있습니다.' },
  { word: '효소 (Enzyme)', meaning: '생물학적 촉매', description: '생체 내에서 일어나는 화학 반응의 속도를 높여주는 단백질입니다.' },
  { word: '자연 선택 (Natural Selection)', meaning: '적자 생존의 원리', description: '환경에 적응한 개체가 더 많이 살아남아 형질을 전달하는 진화의 주요 원리입니다.' },
];

const BiologyTerms: React.FC = () => {
  const [query, setQuery] = useState('');

  const filteredTerms = biologyTerms.filter(t => 
    t.word.toLowerCase().includes(query.toLowerCase()) || 
    t.meaning.includes(query)
  );

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-rose-400 to-rose-600">
        <div className="flex items-center space-x-3">
          <Dna size={28} />
          <h2 className="text-2xl font-bold">생물 용어</h2>
        </div>
        <p className="mt-1 opacity-90">생명 과학의 기초가 되는 주요 용어들을 익혀보세요.</p>
      </div>

      <div className="relative group mx-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-rose-500 transition-colors" size={20} />
        <input 
          type="text" 
          placeholder="용어 또는 의미 검색..."
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

      <div className="space-y-4">
        {filteredTerms.map((term, idx) => (
          <div key={idx} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:border-rose-200 transition-all group">
             <div className="flex justify-between items-start mb-2">
                <div className="flex flex-col">
                  <span className="text-lg font-black text-gray-900 group-hover:text-rose-600 transition-colors">{term.word}</span>
                  <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-lg mt-1 inline-block w-fit">
                    {term.meaning}
                  </span>
                </div>
                <div className="p-2 bg-gray-50 rounded-xl text-gray-300 group-hover:text-rose-400 transition-colors">
                  <BookOpen size={18} />
                </div>
             </div>
             <p className="text-xs font-medium text-gray-500 leading-relaxed mt-3 border-t border-gray-50 pt-3">
               {term.description}
             </p>
          </div>
        ))}
      </div>

      {filteredTerms.length === 0 && (
        <div className="text-center py-10 bg-gray-50 rounded-3xl border border-gray-100">
          <p className="text-gray-400 font-bold">검색 결과가 없습니다.</p>
        </div>
      )}

      <AdBanner />
    </div>
  );
};

export default BiologyTerms;
