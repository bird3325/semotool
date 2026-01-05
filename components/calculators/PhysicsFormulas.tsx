
import React, { useState } from 'react';
import { Zap, BookOpen, ChevronRight } from 'lucide-react';
import AdBanner from '../ui/AdBanner';

interface Formula {
  title: string;
  latex: string;
  description: string;
}

interface PhysicsCategory {
  id: string;
  name: string;
  formulas: Formula[];
}

const physicsData: PhysicsCategory[] = [
  {
    id: 'mechanics',
    name: '고전 역학',
    formulas: [
      { title: '뉴턴의 운동 제2법칙', latex: 'F = m a', description: '힘(F)은 질량(m)과 가속도(a)의 곱과 같다.' },
      { title: '운동 에너지', latex: 'K = \\frac{1}{2} m v^2', description: '움직이는 물체가 가지는 에너지 (v는 속도)' },
      { title: '위치 에너지 (중력)', latex: 'U = m g h', description: '높이(h)에 있는 물체가 가지는 잠재적 에너지' },
      { title: '만유인력의 법칙', latex: 'F = G \\frac{m_1 m_2}{r^2}', description: '두 질량 사이의 끌어당기는 힘 (r은 거리)' },
    ]
  },
  {
    id: 'electromagnetism',
    name: '전자기학',
    formulas: [
      { title: '옴의 법칙', latex: 'V = I R', description: '전압(V)은 전류(I)와 저항(R)의 곱과 같다.' },
      { title: '전력 공식', latex: 'P = V I = I^2 R', description: '단위 시간당 소비되는 전기 에너지' },
      { title: '쿨롱의 법칙', latex: 'F = k \\frac{q_1 q_2}{r^2}', description: '두 전하 사이의 상호작용하는 힘' },
    ]
  },
  {
    id: 'modern',
    name: '현대 물리학',
    formulas: [
      { title: '질량-에너지 등가 원리', latex: 'E = m c^2', description: '질량과 에너지는 서로 변환될 수 있다 (c는 광속)' },
      { title: '광전 효과 (광자 에너지)', latex: 'E = h f', description: '빛의 에너지는 진동수(f)에 비례한다' },
    ]
  }
];

const PhysicsFormulas: React.FC = () => {
  const [activeTab, setActiveTab] = useState(physicsData[0].id);
  const currentCategory = physicsData.find(cat => cat.id === activeTab);

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-indigo-400 to-indigo-600">
        <div className="flex items-center space-x-3">
          <Zap size={28} />
          <h2 className="text-2xl font-bold">물리 공식</h2>
        </div>
        <p className="mt-1 opacity-90">세상을 움직이는 물리 법칙의 정수를 확인하세요.</p>
      </div>

      <div className="flex space-x-1 p-1 bg-gray-100 rounded-2xl overflow-x-auto no-scrollbar">
        {physicsData.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-black transition-all whitespace-nowrap ${
              activeTab === cat.id ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {currentCategory?.formulas.map((formula, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:border-indigo-200 transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 bg-indigo-50 rounded-lg text-indigo-500">
                   <BookOpen size={16} />
                </div>
                <h4 className="font-black text-gray-900">{formula.title}</h4>
              </div>
              <ChevronRight size={16} className="text-gray-300 group-hover:text-indigo-400 transition-colors" />
            </div>
            
            <div className="py-8 bg-gray-50 rounded-2xl text-center mb-4 overflow-x-auto no-scrollbar">
               <code className="text-xl md:text-2xl font-mono text-gray-800 px-4 whitespace-nowrap">
                 {formula.latex}
               </code>
            </div>
            
            <p className="text-xs font-bold text-gray-500 leading-relaxed px-1">
              {formula.description}
            </p>
          </div>
        ))}
      </div>

      <AdBanner />
      
      <div className="p-5 bg-gray-900 rounded-3xl">
        <p className="text-[11px] text-gray-400 font-bold text-center leading-relaxed">
           ※ 물리 수식은 SI 단위를 기준으로 합니다. <br/>
           기초 물리 및 일반 물리 교육 과정에서 필수적으로 다루는 공식들입니다.
        </p>
      </div>
    </div>
  );
};

export default PhysicsFormulas;
