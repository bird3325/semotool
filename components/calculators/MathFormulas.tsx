import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
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

const MathFormulas: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('algebra');

  const formulaData: FormulaCategory[] = useMemo(() => [
    {
      id: 'algebra',
      name: t('ref.math.cat.algebra'),
      formulas: [
        { title: t('ref.math.formula.quadratic.title'), latex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}', description: t('ref.math.formula.quadratic.desc') },
        { title: t('ref.math.formula.square.title'), latex: '(a + b)^2 = a^2 + 2ab + b^2', description: t('ref.math.formula.square.desc') },
        { title: t('ref.math.formula.diff_squares.title'), latex: 'a^2 - b^2 = (a - b)(a + b)', description: t('ref.math.formula.diff_squares.desc') },
        { title: t('ref.math.formula.log.title'), latex: '\\log_a(xy) = \\log_ax + \\log_ay', description: t('ref.math.formula.log.desc') },
      ]
    },
    {
      id: 'geometry',
      name: t('ref.math.cat.geometry'),
      formulas: [
        { title: t('ref.math.formula.pythagoras.title'), latex: 'a^2 + b^2 = c^2', description: t('ref.math.formula.pythagoras.desc') },
        { title: t('ref.math.formula.circle_area.title'), latex: 'A = \\pi r^2', description: t('ref.math.formula.circle_area.desc') },
        { title: t('ref.math.formula.sphere_vol.title'), latex: 'V = \\frac{4}{3} \\pi r^3', description: t('ref.math.formula.sphere_vol.desc') },
        { title: t('ref.math.formula.heron.title'), latex: 'A = \\sqrt{s(s-a)(s-b)(s-c)}', description: t('ref.math.formula.heron.desc') },
      ]
    },
    {
      id: 'calculus',
      name: t('ref.math.cat.calculus'),
      formulas: [
        { title: t('ref.math.formula.derivative.title'), latex: "f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}", description: t('ref.math.formula.derivative.desc') },
        { title: t('ref.math.formula.chain_rule.title'), latex: "(f(g(x)))' = f'(g(x)) \\cdot g'(x)", description: t('ref.math.formula.chain_rule.desc') },
        { title: t('ref.math.formula.integral.title'), latex: "\\int_a^b f(x) dx = F(b) - F(a)", description: t('ref.math.formula.integral.desc') },
      ]
    }
  ], [t]);

  const currentCategory = formulaData.find(cat => cat.id === activeTab);

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-rose-400 to-rose-600">
        <div className="flex items-center space-x-3">
          <Sigma size={28} />
          <h2 className="text-2xl font-bold">{t('ref.math.title')}</h2>
        </div>
        <p className="mt-1 opacity-90">{t('ref.math.desc')}</p>
      </div>

      <div className="flex space-x-1 p-1 bg-gray-100 rounded-2xl overflow-x-auto no-scrollbar">
        {formulaData.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-black transition-all whitespace-nowrap ${activeTab === cat.id ? 'bg-white text-rose-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
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
        <p className="text-[11px] text-gray-400 font-bold text-center leading-relaxed whitespace-pre-wrap">
          {t('ref.math.note')}
        </p>
      </div>
    </div>
  );
};

export default MathFormulas;
