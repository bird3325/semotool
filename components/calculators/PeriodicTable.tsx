import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Atom, Search, X } from 'lucide-react';
import AdBanner from '../ui/AdBanner';

interface Element {
  number: number;
  symbol: string;
  name: string;
  weight: string;
  category: string;
}

const categoryColors: Record<string, string> = {
  'non-metal': 'bg-emerald-50 border-emerald-200 text-emerald-700',
  'noble-gas': 'bg-purple-50 border-purple-200 text-purple-700',
  'alkali-metal': 'bg-rose-50 border-rose-200 text-rose-700',
  'alkaline-earth': 'bg-orange-50 border-orange-200 text-orange-700',
  'metalloid': 'bg-cyan-50 border-cyan-200 text-cyan-700',
  'halogen': 'bg-yellow-50 border-yellow-200 text-yellow-700',
  'transition-metal': 'bg-blue-50 border-blue-200 text-blue-700',
  'post-transition': 'bg-slate-50 border-slate-200 text-slate-700',
  'actinide': 'bg-pink-50 border-pink-200 text-pink-700',
};

const PeriodicTable: React.FC = () => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');

  const elements: Element[] = useMemo(() => [
    { number: 1, symbol: 'H', name: t('ref.periodic.name.H'), weight: '1.008', category: 'non-metal' },
    { number: 2, symbol: 'He', name: t('ref.periodic.name.He'), weight: '4.0026', category: 'noble-gas' },
    { number: 3, symbol: 'Li', name: t('ref.periodic.name.Li'), weight: '6.94', category: 'alkali-metal' },
    { number: 4, symbol: 'Be', name: t('ref.periodic.name.Be'), weight: '9.0122', category: 'alkaline-earth' },
    { number: 5, symbol: 'B', name: t('ref.periodic.name.B'), weight: '10.81', category: 'metalloid' },
    { number: 6, symbol: 'C', name: t('ref.periodic.name.C'), weight: '12.011', category: 'non-metal' },
    { number: 7, symbol: 'N', name: t('ref.periodic.name.N'), weight: '14.007', category: 'non-metal' },
    { number: 8, symbol: 'O', name: t('ref.periodic.name.O'), weight: '15.999', category: 'non-metal' },
    { number: 9, symbol: 'F', name: t('ref.periodic.name.F'), weight: '18.998', category: 'halogen' },
    { number: 10, symbol: 'Ne', name: t('ref.periodic.name.Ne'), weight: '20.180', category: 'noble-gas' },
    { number: 11, symbol: 'Na', name: t('ref.periodic.name.Na'), weight: '22.990', category: 'alkali-metal' },
    { number: 12, symbol: 'Mg', name: t('ref.periodic.name.Mg'), weight: '24.305', category: 'alkaline-earth' },
    { number: 13, symbol: 'Al', name: t('ref.periodic.name.Al'), weight: '26.982', category: 'post-transition' },
    { number: 14, symbol: 'Si', name: t('ref.periodic.name.Si'), weight: '28.085', category: 'metalloid' },
    { number: 15, symbol: 'P', name: t('ref.periodic.name.P'), weight: '30.974', category: 'non-metal' },
    { number: 16, symbol: 'S', name: t('ref.periodic.name.S'), weight: '32.06', category: 'non-metal' },
    { number: 17, symbol: 'Cl', name: t('ref.periodic.name.Cl'), weight: '35.45', category: 'halogen' },
    { number: 18, symbol: 'Ar', name: t('ref.periodic.name.Ar'), weight: '39.948', category: 'noble-gas' },
    { number: 19, symbol: 'K', name: t('ref.periodic.name.K'), weight: '39.098', category: 'alkali-metal' },
    { number: 20, symbol: 'Ca', name: t('ref.periodic.name.Ca'), weight: '40.078', category: 'alkaline-earth' },
    { number: 26, symbol: 'Fe', name: t('ref.periodic.name.Fe'), weight: '55.845', category: 'transition-metal' },
    { number: 29, symbol: 'Cu', name: t('ref.periodic.name.Cu'), weight: '63.546', category: 'transition-metal' },
    { number: 47, symbol: 'Ag', name: t('ref.periodic.name.Ag'), weight: '107.87', category: 'transition-metal' },
    { number: 79, symbol: 'Au', name: t('ref.periodic.name.Au'), weight: '196.97', category: 'transition-metal' },
    { number: 80, symbol: 'Hg', name: t('ref.periodic.name.Hg'), weight: '200.59', category: 'transition-metal' },
    { number: 82, symbol: 'Pb', name: t('ref.periodic.name.Pb'), weight: '207.2', category: 'post-transition' },
    { number: 92, symbol: 'U', name: t('ref.periodic.name.U'), weight: '238.03', category: 'actinide' },
  ], [t]);

  const filteredElements = elements.filter(el =>
    el.name.toLowerCase().includes(query.toLowerCase()) ||
    el.symbol.toLowerCase().includes(query.toLowerCase()) ||
    el.number.toString().includes(query)
  );

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-rose-400 to-rose-600">
        <div className="flex items-center space-x-3">
          <Atom size={28} />
          <h2 className="text-2xl font-bold">{t('ref.periodic.title')}</h2>
        </div>
        <p className="mt-1 opacity-90">{t('ref.periodic.desc')}</p>
      </div>

      <div className="relative group mx-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-rose-500 transition-colors" size={20} />
        <input
          type="text"
          placeholder={t('ref.periodic.placeholder')}
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

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredElements.map(el => (
          <div key={el.number} className={`p-4 rounded-2xl border-2 ${categoryColors[el.category]} transition-all hover:scale-105 hover:shadow-md cursor-default flex flex-col items-center justify-center text-center`}>
            <span className="text-[10px] font-black opacity-60 self-start">{el.number}</span>
            <span className="text-2xl font-black tracking-tighter mb-1">{el.symbol}</span>
            <span className="text-sm font-bold truncate w-full">{el.name}</span>
            <span className="text-[10px] font-medium opacity-70 mt-1">{el.weight}</span>
          </div>
        ))}
      </div>

      {filteredElements.length === 0 && (
        <div className="text-center py-10 bg-gray-50 rounded-3xl border border-gray-100">
          <p className="text-gray-400 font-bold">{t('common.no_results')}</p>
        </div>
      )}

      <AdBanner />

      <div className="p-6 bg-white border border-rose-100 rounded-3xl shadow-sm">
        <h3 className="text-sm font-black text-rose-600 uppercase tracking-widest mb-4">{t('ref.periodic.cat_info')}</h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(categoryColors).map(([cat, color]) => (
            <span key={cat} className={`text-[10px] font-bold px-2 py-1 rounded-full border ${color}`}>
              {t(`ref.periodic.cat.${cat.replace('-', '_')}`)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PeriodicTable;
