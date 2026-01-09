import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
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

const PhysicsFormulas: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('mechanics');

  const physicsData: PhysicsCategory[] = useMemo(() => [
    {
      id: 'mechanics',
      name: t('ref.physics.cat.mechanics'),
      formulas: [
        { title: t('ref.physics.formula.newton2.title'), latex: 'F = m a', description: t('ref.physics.formula.newton2.desc') },
        { title: t('ref.physics.formula.kinetic.title'), latex: 'K = \\frac{1}{2} m v^2', description: t('ref.physics.formula.kinetic.desc') },
        { title: t('ref.physics.formula.potential.title'), latex: 'U = m g h', description: t('ref.physics.formula.potential.desc') },
        { title: t('ref.physics.formula.gravity.title'), latex: 'F = G \\frac{m_1 m_2}{r^2}', description: t('ref.physics.formula.gravity.desc') },
      ]
    },
    {
      id: 'electromagnetism',
      name: t('ref.physics.cat.electromagnetism'),
      formulas: [
        { title: t('ref.physics.formula.ohm.title'), latex: 'V = I R', description: t('ref.physics.formula.ohm.desc') },
        { title: t('ref.physics.formula.power.title'), latex: 'P = V I = I^2 R', description: t('ref.physics.formula.power.desc') },
        { title: t('ref.physics.formula.coulomb.title'), latex: 'F = k \\frac{q_1 q_2}{r^2}', description: t('ref.physics.formula.coulomb.desc') },
      ]
    },
    {
      id: 'modern',
      name: t('ref.physics.cat.modern'),
      formulas: [
        { title: t('ref.physics.formula.mass_energy.title'), latex: 'E = m c^2', description: t('ref.physics.formula.mass_energy.desc') },
        { title: t('ref.physics.formula.photoelectric.title'), latex: 'E = h f', description: t('ref.physics.formula.photoelectric.desc') },
      ]
    }
  ], [t]);

  const currentCategory = physicsData.find(cat => cat.id === activeTab);

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-rose-400 to-rose-600">
        <div className="flex items-center space-x-3">
          <Zap size={28} />
          <h2 className="text-2xl font-bold">{t('ref.physics.title')}</h2>
        </div>
        <p className="mt-1 opacity-90">{t('ref.physics.desc')}</p>
      </div>

      <div className="flex space-x-1 p-1 bg-gray-100 rounded-2xl overflow-x-auto no-scrollbar">
        {physicsData.map(cat => (
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
          {t('ref.physics.note')}
        </p>
      </div>
    </div>
  );
};

export default PhysicsFormulas;
