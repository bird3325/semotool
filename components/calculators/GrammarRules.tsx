
import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FilePenLine, BookOpen, ChevronRight } from 'lucide-react';
import AdBanner from '../ui/AdBanner'; // Keep this import

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

const GrammarRules: React.FC = () => {
  const { t } = useTranslation();

  const grammarData: GrammarCategory[] = useMemo(() => [
    {
      id: 'tenses',
      name: t('ref.grammar.cat.tenses'),
      rules: [
        { title: t('ref.grammar.rule.present_continuous.title'), usage: t('ref.grammar.rule.present_continuous.usage'), example: t('ref.grammar.rule.present_continuous.example') },
        { title: t('ref.grammar.rule.present_perfect.title'), usage: t('ref.grammar.rule.present_perfect.usage'), example: t('ref.grammar.rule.present_perfect.example') },
        { title: t('ref.grammar.rule.past_continuous.title'), usage: t('ref.grammar.rule.past_continuous.usage'), example: t('ref.grammar.rule.past_continuous.example') },
      ]
    },
    {
      id: 'modals',
      name: t('ref.grammar.cat.modals'),
      rules: [
        { title: t('ref.grammar.rule.can.title'), usage: t('ref.grammar.rule.can.usage'), example: t('ref.grammar.rule.can.example') },
        { title: t('ref.grammar.rule.should.title'), usage: t('ref.grammar.rule.should.usage'), example: t('ref.grammar.rule.should.example') },
        { title: t('ref.grammar.rule.must.title'), usage: t('ref.grammar.rule.must.usage'), example: t('ref.grammar.rule.must.example') },
      ]
    }
  ], [t]);

  const [activeTab, setActiveTab] = useState('tenses');
  const currentCategory = grammarData.find(cat => cat.id === activeTab);

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-rose-400 to-rose-600">
        <div className="flex items-center space-x-3">
          <FilePenLine size={28} />
          <h2 className="text-2xl font-bold">{t('ref.grammar.title')}</h2>
        </div>
        <p className="mt-1 opacity-90">{t('ref.grammar.desc')}</p>
      </div>

      <div className="flex space-x-1 p-1 bg-gray-100 rounded-2xl">
        {grammarData.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`flex-1 py-2 rounded-xl text-sm font-black transition-all ${activeTab === cat.id ? 'bg-white text-rose-600 shadow-sm' : 'text-gray-500'
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
