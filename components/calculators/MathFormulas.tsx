
import React, { useState } from 'react';
import { Sigma, BookOpen, ChevronRight } from 'lucide-react';
import AdBanner from '../ui/AdBanner';

interface Formula {
  title: string;
  latex: string;
  description: string;
}

interface FormulaCategory {
  id: string;
  name: string;
  formulas: Formula[];
}

const formulaData: FormulaCategory[] = [
  {
    id: 'algebra',
    name: '대수학',
    formulas: [
      { title: '이차방정식의 근의 공식', latex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}', description: '이차방정식 ax² + bx + c = 0의 해를 구하는 공식' },
      { title: '완전제곱식', latex: '(a + b)^2 = a^2 + 2ab + b^2', description: '두 항의 합의 제곱을 전개한 공식' },
      { title: '합차 공식', latex: 'a^2 - b^2 = (a - b)(a + b)', description: '두 제곱수의 차를 인수분해하는 공식' },
      { title: '로그의 기본 성질', latex: '\\log_a(xy) = \\log_ax + \\log_ay', description: '로그의 진수 곱은 로그의 합과 같다' },
    ]
  },
  {
    id: 'geometry',
    name: '기하학',
    formulas: [
      { title: '피타고라스의 정리', latex: 'a^2 + b^2 = c^2', description: '직각삼각형의 세 변의 길이 사이의 관계' },
      { title: '원의 넓이', latex: 'A = \\pi r^2', description: '반지름이 r인 원의 면적' },
      { title: '구의 부피', latex: 'V = \\frac{4}{3} \\pi r^3', description: '반지름이 r인 구의 전체 부피' },
      { title: '삼각형의 넓이 (헤론의 공식)', latex: 'A = \\sqrt{s(s-a)(s-b)(s-c)}', description: '세 변의 길이를 알 때 삼각형의 넓이를 구함 (s는 반둘레)' },
    ]
  },
  {
    id: 'calculus',
    name: '미적분학',
    formulas: [
      { title: '미분의 정의', latex: "f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}", description: '함수의 순간 변화율을 구하는 극한 식' },
      { title: '연쇄 법칙 (Chain Rule)', latex: "(f(g(x)))' = f'(g(x)) \\cdot g'(x)", description: '합성함수를 미분할 때 사용하는 법칙' },
      { title: '적분의 기본 정리', latex: "\\int_a^b f(x) dx = F(b) - F(a)", description: '정적분과 부정적분의 관계를 나타내는 정리' },
    ]
  }
];

const MathFormulas: React.FC = () => {
  const [activeTab, setActiveTab] = useState(formulaData[0].id);

  const currentCategory = formulaData.find(cat => cat.id === activeTab);

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-rose-400 to-rose-600">
        <div className="flex items-center space-x-3">
          <Sigma size={28} />
          <h2 className="text-2xl font-bold">수학 공식</h2>
        </div>
        <p className="mt-1 opacity-90">잊어버리기 쉬운 주요 수학 공식을 분야별로 확인하세요.</p>
      </div>

      <div className="flex space-x-1 p-1 bg-gray-100 rounded-2xl overflow-x-auto no-scrollbar">
        {formulaData.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-black transition-all whitespace-nowrap ${
              activeTab === cat.id ? 'bg-white text-rose-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {currentCategory?.formulas.map((formula, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:border-rose-200 transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 bg-rose-50 rounded-lg text-rose-500">
                   <BookOpen size={16} />
                </div>
                <h4 className="font-black text-gray-900">{formula.title}</h4>
              </div>
              <ChevronRight size={16} className="text-gray-300 group-hover:text-rose-400 transition-colors" />
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
           ※ 수식은 표준 LaTeX 형식을 기반으로 표현되었습니다. <br/>
           기초 교육 과정에서 가장 많이 활용되는 핵심 공식을 우선 수록했습니다.
        </p>
      </div>
    </div>
  );
};

export default MathFormulas;
