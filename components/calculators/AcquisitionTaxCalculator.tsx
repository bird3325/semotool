
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FileText } from 'lucide-react';
import AdBanner from '../ui/AdBanner';
import SelectModal from '../ui/SelectModal';
import AmountUnit from '../ui/AmountUnit';

const AcquisitionTaxCalculator: React.FC = () => {
  const { t } = useTranslation();
  const [price, setPrice] = useState('');
  const [isPrimaryHome, setIsPrimaryHome] = useState(true);
  const [result, setResult] = useState<{ tax: number; total: number } | null>(null);

  const homeOptions = [
    { value: 'primary', label: t('finance.acquisition.opt_primary_home') },
    { value: 'multi', label: t('finance.acquisition.opt_multi_home') }
  ];

  const formatNumber = (val: string) => {
    const num = Number(val.replace(/,/g, ''));
    if (isNaN(num)) return '';
    return num.toLocaleString('en-US');
  };

  const handleCalculate = () => {
    const p = parseFloat(price.replace(/,/g, ''));
    if (isNaN(p) || p <= 0) {
      setResult(null);
      return;
    }

    let rate = 0;
    if (isPrimaryHome) {
      if (p <= 600000000) rate = 0.01;
      else if (p <= 900000000) rate = 0.01 + (p / 100000000 * 2 / 300 - 2); // Simplified progressive rate
      else rate = 0.03;
    } else {
      rate = 0.08; // Simplified rate for multi-home owners
    }

    rate = Math.max(0.01, Math.min(0.03, rate)); // Clamp rate for primary homes

    const tax = p * rate;
    const localEducationTax = tax * 0.1;
    const specialTaxForRuralDev = p > 0 ? 200000 : 0; // Simplified

    const total = tax + localEducationTax + specialTaxForRuralDev;

    setResult({ tax, total });
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-violet-400 to-violet-600">
        <div className="flex items-center space-x-3">
          <FileText size={28} />
          <h2 className="text-2xl font-bold">{t('tool.acquisition-tax')} {t('suffix.calculator')}</h2>
        </div>
        <p className="mt-1 opacity-90">{t('finance.desc.acquisition_tax')}</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">{t('finance.label.acquisition_price')}</label>
          <input type="text" value={price} onChange={e => setPrice(formatNumber(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
          <AmountUnit value={price} />
        </div>

        <SelectModal
          label={t('finance.label.home_count')}
          options={homeOptions}
          value={isPrimaryHome ? 'primary' : 'multi'}
          onChange={(val) => setIsPrimaryHome(val === 'primary')}
          colorClass="text-violet-600"
        />

        <button onClick={handleCalculate} className="w-full p-4 bg-violet-500 hover:bg-violet-600 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105">
          {t('common.calculate')}
        </button>
      </div>

      <AdBanner />

      {result && (
        <div className="p-6 bg-gray-50 rounded-xl text-center">
          <p className="text-sm text-gray-500">{t('finance.result.expected_acquisition_tax')}</p>
          <p className="text-4xl font-bold text-blue-600 my-2">
            {Math.round(result.total).toLocaleString()} {t('currency.KRW')}
          </p>
          <p className="text-xs text-gray-500 text-center pt-2">{t('finance.msg.simple_calc_warning')}</p>
        </div>
      )}
    </div>
  );
};

export default AcquisitionTaxCalculator;
