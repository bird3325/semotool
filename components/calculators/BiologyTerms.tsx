import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Dna, Search, X, BookOpen } from 'lucide-react';
import AdBanner from '../ui/AdBanner';

interface Term {
  word: string;
  meaning: string;
  description: string;
}

const BiologyTerms: React.FC = () => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');

  const biologyTerms: Term[] = useMemo(() => [
    { word: t('ref.bio.term.cell.word'), meaning: t('ref.bio.term.cell.meaning'), description: t('ref.bio.term.cell.desc') },
    { word: t('ref.bio.term.dna.word'), meaning: t('ref.bio.term.dna.meaning'), description: t('ref.bio.term.dna.desc') },
    { word: t('ref.bio.term.mitochondria.word'), meaning: t('ref.bio.term.mitochondria.meaning'), description: t('ref.bio.term.mitochondria.desc') },
    { word: t('ref.bio.term.photosynthesis.word'), meaning: t('ref.bio.term.photosynthesis.meaning'), description: t('ref.bio.term.photosynthesis.desc') },
    { word: t('ref.bio.term.homeostasis.word'), meaning: t('ref.bio.term.homeostasis.meaning'), description: t('ref.bio.term.homeostasis.desc') },
    { word: t('ref.bio.term.chromosome.word'), meaning: t('ref.bio.term.chromosome.meaning'), description: t('ref.bio.term.chromosome.desc') },
    { word: t('ref.bio.term.enzyme.word'), meaning: t('ref.bio.term.enzyme.meaning'), description: t('ref.bio.term.enzyme.desc') },
    { word: t('ref.bio.term.natural_selection.word'), meaning: t('ref.bio.term.natural_selection.meaning'), description: t('ref.bio.term.natural_selection.desc') },
  ], [t]);

  const filteredTerms = biologyTerms.filter(t =>
    t.word.toLowerCase().includes(query.toLowerCase()) ||
    t.meaning.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-rose-400 to-rose-600">
        <div className="flex items-center space-x-3">
          <Dna size={28} />
          <h2 className="text-2xl font-bold">{t('ref.bio.title')}</h2>
        </div>
        <p className="mt-1 opacity-90">{t('ref.bio.desc')}</p>
      </div>

      <div className="relative group mx-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-rose-500 transition-colors" size={20} />
        <input
          type="text"
          placeholder={t('ref.bio.placeholder')}
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
        {filteredTerms.map((term, idx) => (
          <div key={idx} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:border-rose-200 transition-all group">
            <div className="flex justify-between items-start mb-2">
              <div className="flex flex-col">
                <span className="text-lg font-black text-gray-900 group-hover:text-rose-600 transition-colors">{term.word}</span>
                <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-lg mt-1 inline-block w-fit">
                  {term.meaning}
                </span>
              </div>
              <div className="p-2 bg-gray-50 rounded-xl text-gray-300 group-hover:text-rose-400 transition-colors">
                <BookOpen size={18} />
              </div>
            </div>
            <p className="text-xs font-medium text-gray-500 leading-relaxed mt-3 border-t border-gray-50 pt-3">
              {term.description}
            </p>
          </div>
        ))}
      </div>

      {filteredTerms.length === 0 && (
        <div className="text-center py-10 bg-gray-50 rounded-3xl border border-gray-100">
          <p className="text-gray-400 font-bold">{t('common.no_results')}</p>
        </div>
      )}

      <AdBanner />
    </div>
  );
};

export default BiologyTerms;
