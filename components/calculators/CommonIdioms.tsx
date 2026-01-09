import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageSquareText, Search } from 'lucide-react';
import AdBanner from '../ui/AdBanner';

interface Idiom {
  phrase: string;
  meaning: string;
  example: string;
}

const CommonIdioms: React.FC = () => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');

  const idioms: Idiom[] = useMemo(() => [
    { phrase: t('ref.idiom.item.look_for.phrase'), meaning: t('ref.idiom.item.look_for.meaning'), example: t('ref.idiom.item.look_for.example') },
    { phrase: t('ref.idiom.item.wait_for.phrase'), meaning: t('ref.idiom.item.wait_for.meaning'), example: t('ref.idiom.item.wait_for.example') },
    { phrase: t('ref.idiom.item.look_after.phrase'), meaning: t('ref.idiom.item.look_after.meaning'), example: t('ref.idiom.item.look_after.example') },
    { phrase: t('ref.idiom.item.get_along_with.phrase'), meaning: t('ref.idiom.item.get_along_with.meaning'), example: t('ref.idiom.item.get_along_with.example') },
    { phrase: t('ref.idiom.item.give_up.phrase'), meaning: t('ref.idiom.item.give_up.meaning'), example: t('ref.idiom.item.give_up.example') },
    { phrase: t('ref.idiom.item.take_care_of.phrase'), meaning: t('ref.idiom.item.take_care_of.meaning'), example: t('ref.idiom.item.take_care_of.example') },
    { phrase: t('ref.idiom.item.run_out_of.phrase'), meaning: t('ref.idiom.item.run_out_of.meaning'), example: t('ref.idiom.item.run_out_of.example') },
    { phrase: t('ref.idiom.item.find_out.phrase'), meaning: t('ref.idiom.item.find_out.meaning'), example: t('ref.idiom.item.find_out.example') },
  ], [t]);

  const filteredIdioms = idioms.filter(i =>
    i.phrase.toLowerCase().includes(query.toLowerCase()) ||
    i.meaning.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-rose-400 to-rose-600">
        <div className="flex items-center space-x-3">
          <MessageSquareText size={28} />
          <h2 className="text-2xl font-bold">{t('ref.idiom.title')}</h2>
        </div>
        <p className="mt-1 opacity-90">{t('ref.idiom.desc')}</p>
      </div>

      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder={t('ref.idiom.placeholder')}
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
          <p className="text-gray-400 font-bold">{t('common.no_results')}</p>
        </div>
      )}

      <AdBanner />
    </div>
  );
};

export default CommonIdioms;
