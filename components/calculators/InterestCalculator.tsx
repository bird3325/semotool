
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Percent } from 'lucide-react';
import AdBanner from '../ui/AdBanner';
import SelectModal from '../ui/SelectModal';
import AmountUnit from '../ui/AmountUnit';



const InterestCalculator: React.FC = () => {
  const { t } = useTranslation();
  const [principal, setPrincipal] = useState('10000000');
  const [rate, setRate] = useState('3.5');
  const [period, setPeriod] = useState('12');
  const [isCompound, setIsCompound] = useState(false);
  const [result, setResult] = useState<{ totalInterest: number; tax: number; netInterest: number; totalAmount: number; } | null>(null);

  const interestOptions = [
    { value: 'simple', label: t('finance.interest.opt_simple') },
    { value: 'compound', label: t('finance.interest.opt_compound') }
  ];

  const formatNumber = (val: string) => {
    const num = Number(val.replace(/,/g, ''));
    if (isNaN(num)) return '';
    return num.toLocaleString('en-US');
  };

  const handleCalculate = () => {
    const p = parseFloat(principal.replace(/,/g, ''));
    const r = parseFloat(rate) / 100;
    const n = parseInt(period, 10);

    if (isNaN(p) || isNaN(r) || isNaN(n) || p <= 0 || r <= 0 || n <= 0) {
      setResult(null);
      return;
    }

    let totalInterest = 0;
    const years = n / 12;

    if (isCompound) {
      // 월 복리
      totalInterest = p * (Math.pow(1 + r / 12, n)) - p;
    } else {
      // 단리
      totalInterest = p * r * years;
    }

    const tax = totalInterest * 0.154; // 이자소득세 15.4%
    const netInterest = totalInterest - tax;
    const totalAmount = p + netInterest;

    setResult({ totalInterest, tax, netInterest, totalAmount });
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-amber-400 to-amber-600">
        <div className="flex items-center space-x-3">
          <Percent size={28} />
          <h2 className="text-2xl font-bold">{t('tool.interest')} {t('suffix.calculator')}</h2>
        </div>
        <p className="mt-1 opacity-90">{t('finance.desc.interest')}</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">{t('finance.label.principal')}</label>
          <input type="text" value={principal} onChange={e => setPrincipal(formatNumber(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
          <AmountUnit value={principal} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">{t('finance.label.rate_year')}</label>
          <input type="number" value={rate} onChange={e => setRate(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">{t('finance.label.period_month')}</label>
          <input type="number" value={period} onChange={e => setPeriod(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
        </div>

        <SelectModal
          label={t('finance.label.interest_method')}
          options={interestOptions}
          value={isCompound ? 'compound' : 'simple'}
          onChange={(val) => setIsCompound(val === 'compound')}
          colorClass="text-amber-600"
        />

        <button onClick={handleCalculate} className="w-full p-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105">
          {t('common.calculate')}
        </button>
      </div>

      <AdBanner />

      {result && (
        <div className="p-6 bg-gray-50 rounded-xl text-left space-y-3">
          <h3 className="text-lg font-bold text-center mb-4">{t('finance.result.title_calc_result')}</h3>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">{t('finance.result.pre_tax_interest')}</span>
            <span className="font-bold text-lg">{result.totalInterest.toLocaleString('en-US', { maximumFractionDigits: 0 })} {t('currency.KRW')}</span>
          </div>
          <div className="flex justify-between items-center text-red-600">
            <span >{t('finance.result.tax_amount_rate')}</span>
            <span className="font-bold text-lg">- {result.tax.toLocaleString('en-US', { maximumFractionDigits: 0 })} {t('currency.KRW')}</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between items-center text-blue-600">
            <span className="font-semibold">{t('finance.result.after_tax_interest')}</span>
            <span className="font-bold text-xl">{result.netInterest.toLocaleString('en-US', { maximumFractionDigits: 0 })} {t('currency.KRW')}</span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="font-semibold">{t('finance.result.final_payout')}</span>
            <span className="font-bold text-2xl">{result.totalAmount.toLocaleString('en-US', { maximumFractionDigits: 0 })} {t('currency.KRW')}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterestCalculator;
