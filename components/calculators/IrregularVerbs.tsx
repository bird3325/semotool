import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { IterationCcw, Search } from 'lucide-react';
import AdBanner from '../ui/AdBanner'; // Keep this import

interface Verb {
  present: string;
  past: string;
  pastParticiple: string;
  meaning: string;
}

const IrregularVerbs: React.FC = () => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');

  const verbs: Verb[] = useMemo(() => [
    { present: 'be', past: 'was/were', pastParticiple: 'been', meaning: t('ref.verbs.item.be') },
    { present: 'become', past: 'became', pastParticiple: 'become', meaning: t('ref.verbs.item.become') },
    { present: 'begin', past: 'began', pastParticiple: 'begun', meaning: t('ref.verbs.item.begin') },
    { present: 'break', past: 'broke', pastParticiple: 'broken', meaning: t('ref.verbs.item.break') },
    { present: 'buy', past: 'bought', pastParticiple: 'bought', meaning: t('ref.verbs.item.buy') },
    { present: 'come', past: 'came', pastParticiple: 'come', meaning: t('ref.verbs.item.come') },
    { present: 'do', past: 'did', pastParticiple: 'done', meaning: t('ref.verbs.item.do') },
    { present: 'drink', past: 'drank', pastParticiple: 'drunk', meaning: t('ref.verbs.item.drink') },
    { present: 'drive', past: 'drove', pastParticiple: 'driven', meaning: t('ref.verbs.item.drive') },
    { present: 'eat', past: 'ate', pastParticiple: 'eaten', meaning: t('ref.verbs.item.eat') },
    { present: 'feel', past: 'felt', pastParticiple: 'felt', meaning: t('ref.verbs.item.feel') },
    { present: 'find', past: 'found', pastParticiple: 'found', meaning: t('ref.verbs.item.find') },
    { present: 'get', past: 'got', pastParticiple: 'got/gotten', meaning: t('ref.verbs.item.get') },
    { present: 'give', past: 'gave', pastParticiple: 'given', meaning: t('ref.verbs.item.give') },
    { present: 'go', past: 'went', pastParticiple: 'gone', meaning: t('ref.verbs.item.go') },
  ], [t]);

  const filteredVerbs = verbs.filter(v =>
    v.present.includes(query.toLowerCase()) ||
    v.meaning.includes(query)
  );

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-rose-400 to-rose-600">
        <div className="flex items-center space-x-3">
          <IterationCcw size={28} />
          <h2 className="text-2xl font-bold">{t('ref.verbs.title')}</h2>
        </div>
        <p className="mt-1 opacity-90">{t('ref.verbs.desc')}</p>
      </div>

      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder={t('ref.verbs.placeholder')}
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
                <th className="px-4 py-3">{t('ref.verbs.col.present')}</th>
                <th className="px-4 py-3">{t('ref.verbs.col.past')}</th>
                <th className="px-4 py-3">{t('ref.verbs.col.pp')}</th>
                <th className="px-4 py-3">{t('ref.verbs.col.meaning')}</th>
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
