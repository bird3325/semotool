
import React, { useState } from 'react';
import { MessageSquareText, Search } from 'lucide-react';
import AdBanner from '../ui/AdBanner';

interface Idiom {
  phrase: string;
  meaning: string;
  example: string;
}

const idioms: Idiom[] = [
  { phrase: 'Look for', meaning: '~을 찾다', example: 'I am looking for my glasses.' },
  { phrase: 'Wait for', meaning: '~을 기다리다', example: 'She is waiting for the bus.' },
  { phrase: 'Look after', meaning: '~을 돌보다', example: 'Could you look after my cat?' },
  { phrase: 'Get along with', meaning: '~와 잘 지내다', example: 'I get along with my coworkers.' },
  { phrase: 'Give up', meaning: '포기하다', example: 'Never give up on your dreams.' },
  { phrase: 'Take care of', meaning: '~을 처리하다, 돌보다', example: 'I will take care of the bill.' },
  { phrase: 'Run out of', meaning: '~이 다 떨어지다', example: 'We ran out of milk.' },
  { phrase: 'Find out', meaning: '알아내다', example: 'I need to find out the truth.' },
];

const CommonIdioms: React.FC = () => {
  const [query, setQuery] = useState('');

  const filteredIdioms = idioms.filter(i => 
    i.phrase.toLowerCase().includes(query.toLowerCase()) || 
    i.meaning.includes(query)
  );

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-rose-400 to-rose-600">
        <div className="flex items-center space-x-3">
          <MessageSquareText size={28} />
          <h2 className="text-2xl font-bold">필수 숙어</h2>
        </div>
        <p className="mt-1 opacity-90">일상에서 가장 많이 쓰이는 영어 숙어들입니다.</p>
      </div>

      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input 
          type="text" 
          placeholder="숙어 또는 뜻 검색..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full py-3 pl-12 pr-4 bg-white border border-gray-200 rounded-xl outline-none focus:border-rose-400 shadow-sm"
        />
      </div>

      <div className="space-y-3">
        {filteredIdioms.map((i, idx) => (
          <div key={idx} className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm group hover:border-rose-200 transition-all">
             <div className="flex justify-between items-start mb-2">
                <span className="text-lg font-black text-gray-900 group-hover:text-rose-600 transition-colors">{i.phrase}</span>
                <span className="text-xs font-bold text-rose-500 bg-rose-50 px-2 py-1 rounded-lg">{i.meaning}</span>
             </div>
             <p className="text-xs font-medium text-gray-500 italic">" {i.example} "</p>
          </div>
        ))}
      </div>

      {filteredIdioms.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-400 font-bold">검색 결과가 없습니다.</p>
        </div>
      )}

      <AdBanner />
    </div>
  );
};

export default CommonIdioms;
