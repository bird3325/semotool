
import React, { useState } from 'react';
import { Map, Search, X, Globe2 } from 'lucide-react';
import AdBanner from '../ui/AdBanner';

interface Country {
  name: string;
  capital: string;
  continent: string;
  description: string;
}

const countries: Country[] = [
  { name: '대한민국', capital: '서울', continent: '아시아', description: '동북아시아의 반도국가로 IT 강국이자 한류의 중심지.' },
  { name: '미국', capital: '워싱턴 D.C.', continent: '북아메리카', description: '북미 대륙의 연방 공화국으로 세계 최대의 경제 대국.' },
  { name: '중국', capital: '베이징', continent: '아시아', description: '세계 최대 인구 보유국이자 동아시아의 거대 경제체.' },
  { name: '일본', capital: '도쿄', continent: '아시아', description: '동아시아의 섬나라로 고도의 기술력과 독특한 문화를 보유.' },
  { name: '영국', capital: '런던', continent: '유럽', description: '유럽 서북부의 섬나라로 산업 혁명의 발상지.' },
  { name: '프랑스', capital: '파리', continent: '유럽', description: '예술과 미식의 나라로 유럽 역사와 문화의 중심.' },
  { name: '독일', capital: '베를린', continent: '유럽', description: '유럽 경제의 견인차 역할을 하는 제조 및 기술 강국.' },
  { name: '브라질', capital: '브라질리아', continent: '남아메리카', description: '남미 최대 국가로 아마존 열대 우림과 삼바 축제가 유명.' },
  { name: '호주', capital: '캔버라', continent: '오세아니아', description: '대륙 전체가 한 나라인 오세아니아의 대표 국가.' },
  { name: '이집트', capital: '카이로', continent: '아프리카', description: '피라미드와 스핑크스로 상징되는 고대 문명의 발상지.' },
];

const WorldMapInfo: React.FC = () => {
  const [query, setQuery] = useState('');
  const [activeContinent, setActiveContinent] = useState('전체');

  const continents = ['전체', '아시아', '유럽', '북아메리카', '남아메리카', '오세아니아', '아프리카'];

  const filteredCountries = countries.filter(c => 
    (activeContinent === '전체' || c.continent === activeContinent) &&
    (c.name.includes(query) || c.capital.includes(query))
  );

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-rose-400 to-rose-600">
        <div className="flex items-center space-x-3">
          <Map size={28} />
          <h2 className="text-2xl font-bold">세계 지도 정보</h2>
        </div>
        <p className="mt-1 opacity-90">주요 국가의 위치와 핵심 정보를 학습하세요.</p>
      </div>

      <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-2">
        {continents.map(cont => (
          <button
            key={cont}
            onClick={() => setActiveContinent(cont)}
            className={`px-4 py-2 rounded-full text-xs font-black transition-all whitespace-nowrap border-2 ${
              activeContinent === cont 
                ? 'bg-rose-600 border-rose-600 text-white' 
                : 'bg-white border-gray-100 text-gray-500 hover:border-rose-200'
            }`}
          >
            {cont}
          </button>
        ))}
      </div>

      <div className="relative group mx-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-rose-500 transition-colors" size={20} />
        <input 
          type="text" 
          placeholder="국가명, 수도 검색..."
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCountries.map((country, idx) => (
          <div key={idx} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
             <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-3">
                   <div className="p-2 bg-rose-50 rounded-xl text-rose-500">
                      <Globe2 size={20} />
                   </div>
                   <div>
                      <h3 className="text-lg font-black text-gray-900 group-hover:text-rose-600 transition-colors">{country.name}</h3>
                      <p className="text-xs font-bold text-gray-400">{country.continent}</p>
                   </div>
                </div>
                <div className="text-right">
                   <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Capital</span>
                   <span className="text-sm font-black text-gray-700">{country.capital}</span>
                </div>
             </div>
             <p className="text-xs font-medium text-gray-500 leading-relaxed border-t border-gray-50 pt-3">
               {country.description}
             </p>
          </div>
        ))}
      </div>

      {filteredCountries.length === 0 && (
        <div className="text-center py-10 bg-gray-50 rounded-3xl border border-gray-100">
          <p className="text-gray-400 font-bold">검색 결과가 없습니다.</p>
        </div>
      )}

      <AdBanner />
    </div>
  );
};

export default WorldMapInfo;
