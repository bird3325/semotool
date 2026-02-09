import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Crown, BookOpen, Search, X } from 'lucide-react';
import AdBanner from '../ui/AdBanner';

interface King {
  name: string;
  reign: string;
  achievement: string;
}

interface Dynasty {
  id: string;
  name: string;
  kings: King[];
}

const DynastyKings: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('joseon');
  const [query, setQuery] = useState('');

  const dynastyData: Dynasty[] = useMemo(() => [
    {
      id: 'joseon',
      name: t('ref.dynasty.joseon'),
      kings: [
        { name: t('ref.dynasty.kings.joseon.taejo.name'), reign: '1392~1398', achievement: t('ref.dynasty.kings.joseon.taejo.achievement') },
        { name: t('ref.dynasty.kings.joseon.taejong.name'), reign: '1400~1418', achievement: t('ref.dynasty.kings.joseon.taejong.achievement') },
        { name: t('ref.dynasty.kings.joseon.sejong.name'), reign: '1418~1450', achievement: t('ref.dynasty.kings.joseon.sejong.achievement') },
        { name: t('ref.dynasty.kings.joseon.sejo.name'), reign: '1455~1468', achievement: t('ref.dynasty.kings.joseon.sejo.achievement') },
        { name: t('ref.dynasty.kings.joseon.seongjong.name'), reign: '1469~1494', achievement: t('ref.dynasty.kings.joseon.seongjong.achievement') },
        { name: t('ref.dynasty.kings.joseon.seonjo.name'), reign: '1567~1608', achievement: t('ref.dynasty.kings.joseon.seonjo.achievement') },
        { name: t('ref.dynasty.kings.joseon.gwanghaegun.name'), reign: '1608~1623', achievement: t('ref.dynasty.kings.joseon.gwanghaegun.achievement') },
        { name: t('ref.dynasty.kings.joseon.jeongjo.name'), reign: '1776~1800', achievement: t('ref.dynasty.kings.joseon.jeongjo.achievement') },
        { name: t('ref.dynasty.kings.joseon.gojong.name'), reign: '1863~1907', achievement: t('ref.dynasty.kings.joseon.gojong.achievement') },
      ]
    },
    {
      id: 'goryeo',
      name: t('ref.dynasty.goryeo'),
      kings: [
        { name: t('ref.dynasty.kings.goryeo.taejo.name'), reign: '918~943', achievement: t('ref.dynasty.kings.goryeo.taejo.achievement') },
        { name: t('ref.dynasty.kings.goryeo.gwhangjong.name'), reign: '949~975', achievement: t('ref.dynasty.kings.goryeo.gwhangjong.achievement') },
        { name: t('ref.dynasty.kings.goryeo.seongjong.name'), reign: '981~997', achievement: t('ref.dynasty.kings.goryeo.seongjong.achievement') },
        { name: t('ref.dynasty.kings.goryeo.gongmin.name'), reign: '1351~1374', achievement: t('ref.dynasty.kings.goryeo.gongmin.achievement') },
      ]
    }
  ], [t]);

  const currentDynasty = dynastyData.find(d => d.id === activeTab);
  const filteredKings = currentDynasty?.kings.filter(k =>
    k.name.includes(query) || k.achievement.includes(query)
  ) || [];

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-rose-400 to-rose-600">
        <div className="flex items-center space-x-3">
          <Crown size={28} />
          <h2 className="text-2xl font-bold">{t('ref.dynasty.title')}</h2>
        </div>
        <p className="mt-1 opacity-90">{t('ref.dynasty.desc')}</p>
      </div>

      <div className="flex space-x-1 p-1 bg-gray-100 rounded-2xl">
        {dynastyData.map(dyn => (
          <button
            key={dyn.id}
            onClick={() => { setActiveTab(dyn.id); setQuery(''); }}
            className={`flex-1 py-2.5 rounded-xl text-sm font-black transition-all ${activeTab === dyn.id ? 'bg-white text-rose-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            {dyn.name}
          </button>
        ))}
      </div>

      <div className="relative group mx-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-rose-500 transition-colors" size={20} />
        <input
          type="text"
          placeholder={t('ref.dynasty.placeholder')}
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
        {filteredKings.map((king, idx) => (
          <div key={idx} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:border-rose-200 transition-all group">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-rose-50 rounded-xl text-rose-600">
                  <Crown size={18} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-gray-900 group-hover:text-rose-600 transition-colors">{king.name}</h3>
                  <p className="text-xs font-bold text-gray-400">재위: {king.reign}</p>
                </div>
              </div>
              <div className="p-1.5 bg-gray-50 rounded-lg text-gray-300 group-hover:text-rose-400 transition-colors">
                <BookOpen size={16} />
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 leading-relaxed border-t border-gray-50 pt-3 italic">
              {king.achievement}
            </p>
          </div>
        ))}
      </div>

      {filteredKings.length === 0 && (
        <div className="text-center py-10 bg-gray-50 rounded-3xl border border-gray-100">
          <p className="text-gray-400 font-bold">{t('common.no_results')}</p>
        </div>
      )}

      <AdBanner />
    </div>
  );
};

export default DynastyKings;
