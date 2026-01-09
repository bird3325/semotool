import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { History, Search, X } from 'lucide-react';
import AdBanner from '../ui/AdBanner';

interface Event {
  year: string;
  title: string;
  description: string;
  category: string;
}

const HistoryTimeline: React.FC = () => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');

  const historyEvents: Event[] = useMemo(() => [
    { year: 'BC 2333', title: t('ref.history.event.gojoseon.title'), description: t('ref.history.event.gojoseon.desc'), category: t('ref.history.cat.ancient') },
    { year: 'BC 57', title: t('ref.history.event.silla.title'), description: t('ref.history.event.silla.desc'), category: t('ref.history.cat.ancient') },
    { year: 'BC 37', title: t('ref.history.event.goguryeo.title'), description: t('ref.history.event.goguryeo.desc'), category: t('ref.history.cat.ancient') },
    { year: 'BC 18', title: t('ref.history.event.baekje.title'), description: t('ref.history.event.baekje.desc'), category: t('ref.history.cat.ancient') },
    { year: '676', title: t('ref.history.event.silla_update.title'), description: t('ref.history.event.silla_update.desc'), category: t('ref.history.cat.nambukguk') },
    { year: '698', title: t('ref.history.event.balhae.title'), description: t('ref.history.event.balhae.desc'), category: t('ref.history.cat.nambukguk') },
    { year: '918', title: t('ref.history.event.goryeo_found.title'), description: t('ref.history.event.goryeo_found.desc'), category: t('ref.history.cat.goryeo') },
    { year: '936', title: t('ref.history.event.goryeo_unify.title'), description: t('ref.history.event.goryeo_unify.desc'), category: t('ref.history.cat.goryeo') },
    { year: '1392', title: t('ref.history.event.joseon_found.title'), description: t('ref.history.event.joseon_found.desc'), category: t('ref.history.cat.joseon') },
    { year: '1443', title: t('ref.history.event.hunminjeongeum.title'), description: t('ref.history.event.hunminjeongeum.desc'), category: t('ref.history.cat.joseon') },
    { year: '1592', title: t('ref.history.event.imjin.title'), description: t('ref.history.event.imjin.desc'), category: t('ref.history.cat.joseon') },
    { year: '1897', title: t('ref.history.event.empire.title'), description: t('ref.history.event.empire.desc'), category: t('ref.history.cat.modern_era') },
    { year: '1910', title: t('ref.history.event.annexation.title'), description: t('ref.history.event.annexation.desc'), category: t('ref.history.cat.colonial') },
    { year: '1919', title: t('ref.history.event.march_first.title'), description: t('ref.history.event.march_first.desc'), category: t('ref.history.cat.colonial') },
    { year: '1945', title: t('ref.history.event.liberation.title'), description: t('ref.history.event.liberation.desc'), category: t('ref.history.cat.modern') },
    { year: '1948', title: t('ref.history.event.gov_est.title'), description: t('ref.history.event.gov_est.desc'), category: t('ref.history.cat.modern') },
    { year: '1950', title: t('ref.history.event.korean_war.title'), description: t('ref.history.event.korean_war.desc'), category: t('ref.history.cat.modern') },
    { year: '1960', title: t('ref.history.event.april_rev.title'), description: t('ref.history.event.april_rev.desc'), category: t('ref.history.cat.modern') },
    { year: '1987', title: t('ref.history.event.june_struggle.title'), description: t('ref.history.event.june_struggle.desc'), category: t('ref.history.cat.modern') },
  ], [t]);

  const filteredEvents = historyEvents.filter(e =>
    e.title.toLowerCase().includes(query.toLowerCase()) ||
    e.year.includes(query) ||
    e.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-rose-400 to-rose-600">
        <div className="flex items-center space-x-3">
          <History size={28} />
          <h2 className="text-2xl font-bold">{t('ref.history.title')}</h2>
        </div>
        <p className="mt-1 opacity-90">{t('ref.history.desc')}</p>
      </div>

      <div className="relative group mx-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-rose-500 transition-colors" size={20} />
        <input
          type="text"
          placeholder={t('ref.history.placeholder')}
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

      <div className="relative pl-8 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-rose-100">
        {filteredEvents.map((event, idx) => (
          <div key={idx} className="relative group">
            <div className="absolute -left-8 top-1.5 w-6 h-6 bg-white border-4 border-rose-500 rounded-full z-10 group-hover:scale-125 transition-transform" />
            <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:border-rose-200 transition-all">
              <div className="flex justify-between items-start mb-2">
                <div className="flex flex-col">
                  <span className="text-xs font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded-lg w-fit mb-1">
                    {event.year}
                  </span>
                  <h3 className="text-lg font-black text-gray-900">{event.title}</h3>
                </div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{event.category}</span>
              </div>
              <p className="text-sm font-medium text-gray-500 leading-relaxed">
                {event.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-10 bg-gray-50 rounded-3xl border border-gray-100">
          <p className="text-gray-400 font-bold">{t('common.no_results')}</p>
        </div>
      )}

      <AdBanner />
    </div>
  );
};

export default HistoryTimeline;
