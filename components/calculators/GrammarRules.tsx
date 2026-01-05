
import React, { useState } from 'react';
import { FilePenLine, BookOpen, ChevronRight } from 'lucide-react';
import AdBanner from '../ui/AdBanner';

interface Rule {
  title: string;
  usage: string;
  example: string;
}

interface GrammarCategory {
  id: string;
  name: string;
  rules: Rule[];
}

const grammarData: GrammarCategory[] = [
  {
    id: 'tenses',
    name: '시제',
    rules: [
      { title: '현재 진행형', usage: '지금 일어나고 있는 일 (am/are/is + V-ing)', example: 'I am reading a book now.' },
      { title: '현재 완료형', usage: '과거에 시작되어 현재까지 영향을 주는 일 (have/has + p.p)', example: 'I have lived here for 10 years.' },
      { title: '과거 진행형', usage: '과거 특정 시점에 진행 중이던 일 (was/were + V-ing)', example: 'They were playing soccer at 5 PM.' },
    ]
  },
  {
    id: 'modals',
    name: '조동사',
    rules: [
      { title: 'Can', usage: '능력 (~할 수 있다) / 허가 (~해도 된다)', example: 'She can speak three languages.' },
      { title: 'Should', usage: '의무, 조언 (~해야 한다)', example: 'You should see a doctor.' },
      { title: 'Must', usage: '강한 의무 (~해야만 한다) / 확신 (~임에 틀림없다)', example: 'He must be tired after work.' },
    ]
  }
];

const GrammarRules: React.FC = () => {
  const [activeTab, setActiveTab] = useState(grammarData[0].id);
  const currentCategory = grammarData.find(cat => cat.id === activeTab);

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-rose-400 to-rose-600">
        <div className="flex items-center space-x-3">
          <FilePenLine size={28} />
          <h2 className="text-2xl font-bold">영문법 기초</h2>
        </div>
        <p className="mt-1 opacity-90">꼭 알아야 할 필수 영문법 핵심 규칙입니다.</p>
      </div>

      <div className="flex space-x-1 p-1 bg-gray-100 rounded-2xl">
        {grammarData.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`flex-1 py-2 rounded-xl text-sm font-black transition-all ${
              activeTab === cat.id ? 'bg-white text-rose-600 shadow-sm' : 'text-gray-500'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {currentCategory?.rules.map((rule, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:border-rose-200 transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <BookOpen size={16} className="text-rose-500" />
                <h4 className="font-black text-gray-900">{rule.title}</h4>
              </div>
              <ChevronRight size={16} className="text-gray-300" />
            </div>
            
            <div className="space-y-3">
              <p className="text-sm font-bold text-gray-700 bg-gray-50 p-3 rounded-xl">{rule.usage}</p>
              <div className="flex items-start space-x-2 p-3 bg-rose-50/50 rounded-xl">
                 <span className="text-[10px] font-black text-rose-500 uppercase mt-0.5">Example</span>
                 <p className="text-sm font-medium text-gray-600 italic">"{rule.example}"</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AdBanner />
    </div>
  );
};

export default GrammarRules;
