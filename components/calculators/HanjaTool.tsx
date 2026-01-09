import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Languages, Search, X } from 'lucide-react';
import AdBanner from '../ui/AdBanner'; // Keep this import

interface Hanja {
  character: string;
  meaning: string;
  sound: string;
  radical: string;
  level: string;
}

const HanjaTool: React.FC = () => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');

  const hanjaData: Hanja[] = useMemo(() => [
    { character: '大', meaning: t('ref.hanja.items.big.meaning'), sound: t('ref.hanja.items.big.sound'), radical: '大', level: t('ref.hanja.items.big.level') },
    { character: '中', meaning: t('ref.hanja.items.middle.meaning'), sound: t('ref.hanja.items.middle.sound'), radical: '丨', level: t('ref.hanja.items.middle.level') },
    { character: '小', meaning: t('ref.hanja.items.small.meaning'), sound: t('ref.hanja.items.small.sound'), radical: '小', level: t('ref.hanja.items.small.level') },
    { character: '日', meaning: t('ref.hanja.items.day.meaning'), sound: t('ref.hanja.items.day.sound'), radical: '日', level: t('ref.hanja.items.day.level') },
    { character: '月', meaning: t('ref.hanja.items.moon.meaning'), sound: t('ref.hanja.items.moon.sound'), radical: '月', level: t('ref.hanja.items.moon.level') },
    { character: '火', meaning: t('ref.hanja.items.fire.meaning'), sound: t('ref.hanja.items.fire.sound'), radical: '火', level: t('ref.hanja.items.fire.level') },
    { character: '水', meaning: t('ref.hanja.items.water.meaning'), sound: t('ref.hanja.items.water.sound'), radical: '水', level: t('ref.hanja.items.water.level') },
    { character: '木', meaning: t('ref.hanja.items.tree.meaning'), sound: t('ref.hanja.items.tree.sound'), radical: '木', level: t('ref.hanja.items.tree.level') },
    { character: '金', meaning: t('ref.hanja.items.gold.meaning'), sound: t('ref.hanja.items.gold.sound'), radical: '金', level: t('ref.hanja.items.gold.level') },
    { character: '土', meaning: t('ref.hanja.items.earth.meaning'), sound: t('ref.hanja.items.earth.sound'), radical: '土', level: t('ref.hanja.items.earth.level') },
    { character: '學', meaning: t('ref.hanja.items.learn.meaning'), sound: t('ref.hanja.items.learn.sound'), radical: '子', level: t('ref.hanja.items.learn.level') },
    { character: '校', meaning: t('ref.hanja.items.school.meaning'), sound: t('ref.hanja.items.school.sound'), radical: '木', level: t('ref.hanja.items.school.level') },
    { character: '先', meaning: t('ref.hanja.items.first.meaning'), sound: t('ref.hanja.items.first.sound'), radical: '儿', level: t('ref.hanja.items.first.level') },
    { character: '生', meaning: t('ref.hanja.items.birth.meaning'), sound: t('ref.hanja.items.birth.sound'), radical: '生', level: t('ref.hanja.items.birth.level') },
    { character: '民', meaning: t('ref.hanja.items.people.meaning'), sound: t('ref.hanja.items.people.sound'), radical: '氏', level: t('ref.hanja.items.people.level') },
    { character: '國', meaning: t('ref.hanja.items.country.meaning'), sound: t('ref.hanja.items.country.sound'), radical: '囗', level: t('ref.hanja.items.country.level') },
  ], [t]);

  const filteredHanja = hanjaData.filter(h =>
    h.character.includes(query) ||
    h.meaning.includes(query) ||
    h.sound.includes(query)
  );

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-rose-400 to-rose-600">
        <div className="flex items-center space-x-3">
          <Languages size={28} />
          <h2 className="text-2xl font-bold">{t('ref.hanja.title')}</h2>
        </div>
        <p className="mt-1 opacity-90">{t('ref.hanja.desc')}</p>
      </div>

      <div className="relative group mx-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-rose-500 transition-colors" size={20} />
        <input
          type="text"
          placeholder={t('ref.hanja.placeholder')}
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

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredHanja.map((h, idx) => (
          <div key={idx} className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-rose-300 transition-all text-center flex flex-col items-center">
            <span className="text-4xl font-serif text-gray-900 mb-2">{h.character}</span>
            <span className="text-lg font-black text-rose-600">{h.meaning} {h.sound}</span>
            <div className="mt-2 flex space-x-2">
              <span className="text-[10px] font-bold px-2 py-0.5 bg-gray-100 rounded-full text-gray-500">{t('ref.hanja.radical')}: {h.radical}</span>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-rose-50 rounded-full text-rose-500">{h.level}</span>
            </div>
          </div>
        ))}
      </div>

      {filteredHanja.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-400 font-bold">{t('common.no_results')}</p>
        </div>
      )}

      <AdBanner />
    </div>
  );
};

export default HanjaTool;
