import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Map, Search, X, Globe2 } from 'lucide-react';
import AdBanner from '../ui/AdBanner'; // Keep this import

interface Country {
  name: string;
  capital: string;
  continent: string;
  description: string;
}

const WorldMapInfo: React.FC = () => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [activeContinentId, setActiveContinentId] = useState('all');

  // Update activeContinent when language changes if it was "All"
  // Actually, keeping text state in different language might be tricky.
  // Better to store key probably, but the original logic used string match.
  // Let's stick to using keys for logic if possible, but here we can just use the translated string for display and logic since tabs change too.

  const continents = [
    { id: 'all', label: t('ref.worldmap.cont.all') },
    { id: 'asia', label: t('ref.worldmap.cont.asia') },
    { id: 'europe', label: t('ref.worldmap.cont.europe') },
    { id: 'na', label: t('ref.worldmap.cont.na') },
    { id: 'sa', label: t('ref.worldmap.cont.sa') },
    { id: 'oceania', label: t('ref.worldmap.cont.oceania') },
    { id: 'africa', label: t('ref.worldmap.cont.africa') }
  ];

  // NOTE: If language changes, activeContinent might get stuck in old language string if we don't reset or keys.
  // For now we assume user stays in one language or reloads.
  // Ideally use IDs. But let's proceed with minimal logic change.

  const countries: Country[] = useMemo(() => [
    { name: t('ref.worldmap.country.korea.name'), capital: t('ref.worldmap.city.seoul'), continent: t('ref.worldmap.cont.asia'), description: t('ref.worldmap.country.korea.desc') },
    { name: t('ref.worldmap.country.usa.name'), capital: t('ref.worldmap.city.washington'), continent: t('ref.worldmap.cont.na'), description: t('ref.worldmap.country.usa.desc') },
    { name: t('ref.worldmap.country.china.name'), capital: t('ref.worldmap.city.beijing'), continent: t('ref.worldmap.cont.asia'), description: t('ref.worldmap.country.china.desc') },
    { name: t('ref.worldmap.country.japan.name'), capital: t('ref.worldmap.city.tokyo'), continent: t('ref.worldmap.cont.asia'), description: t('ref.worldmap.country.japan.desc') },
    { name: t('ref.worldmap.country.uk.name'), capital: t('ref.worldmap.city.london'), continent: t('ref.worldmap.cont.europe'), description: t('ref.worldmap.country.uk.desc') },
    { name: t('ref.worldmap.country.france.name'), capital: t('ref.worldmap.city.paris'), continent: t('ref.worldmap.cont.europe'), description: t('ref.worldmap.country.france.desc') },
    { name: t('ref.worldmap.country.germany.name'), capital: t('ref.worldmap.city.berlin'), continent: t('ref.worldmap.cont.europe'), description: t('ref.worldmap.country.germany.desc') },
    { name: t('ref.worldmap.country.brazil.name'), capital: t('ref.worldmap.city.brasilia'), continent: t('ref.worldmap.cont.sa'), description: t('ref.worldmap.country.brazil.desc') },
    { name: t('ref.worldmap.country.australia.name'), capital: t('ref.worldmap.city.canberra'), continent: t('ref.worldmap.cont.oceania'), description: t('ref.worldmap.country.australia.desc') },
    { name: t('ref.worldmap.country.egypt.name'), capital: t('ref.worldmap.city.cairo'), continent: t('ref.worldmap.cont.africa'), description: t('ref.worldmap.country.egypt.desc') },
  ], [t]);

  const filteredCountries = countries.filter(c =>
    (activeContinentId === 'all' || c.continent === t(`ref.worldmap.cont.${activeContinentId}`)) &&
    (c.name.includes(query) || c.capital.includes(query))
  );

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-rose-400 to-rose-600">
        <div className="flex items-center space-x-3">
          <Map size={28} />
          <h2 className="text-2xl font-bold">{t('ref.worldmap.title')}</h2>
        </div>
        <p className="mt-1 opacity-90">{t('ref.worldmap.desc')}</p>
      </div>

      <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-2">
        {continents.map(cont => (
          <button
            key={cont.id}
            onClick={() => setActiveContinentId(cont.id)}
            className={`px-4 py-2 rounded-full text-xs font-black transition-all whitespace-nowrap border-2 ${activeContinentId === cont.id
                ? 'bg-rose-600 border-rose-600 text-white'
                : 'bg-white border-gray-100 text-gray-500 hover:border-rose-200'
              }`}
          >
            {cont.label}
          </button>
        ))}
      </div>

      <div className="relative group mx-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-rose-500 transition-colors" size={20} />
        <input
          type="text"
          placeholder={t('ref.worldmap.placeholder')}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCountries.map((country, idx) => (
          <div key={idx} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-rose-50 rounded-xl text-rose-500">
                  <Globe2 size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-gray-900 group-hover:text-rose-600 transition-colors">{country.name}</h3>
                  <p className="text-xs font-bold text-gray-400">{country.continent}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">{t('ref.worldmap.capital')}</span>
                <span className="text-sm font-black text-gray-700">{country.capital}</span>
              </div>
            </div>
            <p className="text-xs font-medium text-gray-500 leading-relaxed border-t border-gray-50 pt-3">
              {country.description}
            </p>
          </div>
        ))}
      </div>

      {filteredCountries.length === 0 && (
        <div className="text-center py-10 bg-gray-50 rounded-3xl border border-gray-100">
          <p className="text-gray-400 font-bold">{t('common.no_results')}</p>
        </div>
      )}

      <AdBanner />
    </div>
  );
};

export default WorldMapInfo;
