
import React, { useState } from 'react';
import { IterationCcw, Search } from 'lucide-react';
import AdBanner from '../ui/AdBanner';

interface Verb {
  present: string;
  past: string;
  pastParticiple: string;
  meaning: string;
}

const verbs: Verb[] = [
  { present: 'be', past: 'was/were', pastParticiple: 'been', meaning: '이다, 있다' },
  { present: 'become', past: 'became', pastParticiple: 'become', meaning: '되다' },
  { present: 'begin', past: 'began', pastParticiple: 'begun', meaning: '시작하다' },
  { present: 'break', past: 'broke', pastParticiple: 'broken', meaning: '부수다' },
  { present: 'buy', past: 'bought', pastParticiple: 'bought', meaning: '사다' },
  { present: 'come', past: 'came', pastParticiple: 'come', meaning: '오다' },
  { present: 'do', past: 'did', pastParticiple: 'done', meaning: '하다' },
  { present: 'drink', past: 'drank', pastParticiple: 'drunk', meaning: '마시다' },
  { present: 'drive', past: 'drove', pastParticiple: 'driven', meaning: '운전하다' },
  { present: 'eat', past: 'ate', pastParticiple: 'eaten', meaning: '먹다' },
  { present: 'feel', past: 'felt', pastParticiple: 'felt', meaning: '느끼다' },
  { present: 'find', past: 'found', pastParticiple: 'found', meaning: '찾다' },
  { present: 'get', past: 'got', pastParticiple: 'got/gotten', meaning: '얻다, 되다' },
  { present: 'give', past: 'gave', pastParticiple: 'given', meaning: '주다' },
  { present: 'go', past: 'went', pastParticiple: 'gone', meaning: '가다' },
];

const IrregularVerbs: React.FC = () => {
  const [query, setQuery] = useState('');

  const filteredVerbs = verbs.filter(v => 
    v.present.includes(query.toLowerCase()) || 
    v.meaning.includes(query)
  );

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-rose-400 to-rose-600">
        <div className="flex items-center space-x-3">
          <IterationCcw size={28} />
          <h2 className="text-2xl font-bold">불규칙 동사</h2>
        </div>
        <p className="mt-1 opacity-90">필수 영어 불규칙 동사의 3단 변화를 확인하세요.</p>
      </div>

      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input 
          type="text" 
          placeholder="동사 원형 또는 뜻 검색..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full py-3 pl-12 pr-4 bg-white border border-gray-200 rounded-xl outline-none focus:border-rose-400"
        />
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                <th className="px-4 py-3">Present</th>
                <th className="px-4 py-3">Past</th>
                <th className="px-4 py-3">P.P</th>
                <th className="px-4 py-3">Meaning</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredVerbs.map((v, idx) => (
                <tr key={idx} className="hover:bg-rose-50/30 transition-colors">
                  <td className="px-4 py-4 font-black text-gray-900">{v.present}</td>
                  <td className="px-4 py-4 font-bold text-rose-500">{v.past}</td>
                  <td className="px-4 py-4 font-bold text-rose-700">{v.pastParticiple}</td>
                  <td className="px-4 py-4 text-xs font-medium text-gray-500">{v.meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AdBanner />
    </div>
  );
};

export default IrregularVerbs;
