import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AreaChart } from 'lucide-react';
import AdBanner from '../ui/AdBanner';
import SelectModal from '../ui/SelectModal';

const InvestmentCalculator: React.FC = () => {
  const { t } = useTranslation();
  const [initialAmount, setInitialAmount] = useState('1000000');
  const [monthlyContribution, setMonthlyContribution] = useState('100000');
  const [period, setPeriod] = useState('10');
  const [annualRate, setAnnualRate] = useState('7');
  const [isCompound, setIsCompound] = useState(true); // Default to monthly compound
  const [result, setResult] = useState<{ futureValue: number; totalPrincipal: number; totalInterest: number; } | null>(null);

  const interestOptions = [
    { value: 'simple', label: t('finance.investment.opt_simple') },
    { value: 'compound', label: t('finance.investment.opt_compound') }
  ];

  const formatNumber = (val: string) => {
    const num = Number(val.replace(/,/g, ''));
    if (isNaN(num)) return '';
    return num.toLocaleString('en-US');
  };

  const handleCalculate = () => {
    const P = parseFloat(initialAmount.replace(/,/g, ''));
    const PMT = parseFloat(monthlyContribution.replace(/,/g, ''));
    const years = parseInt(period, 10);
    const r_annual = parseFloat(annualRate) / 100;

    if (isNaN(P) || isNaN(PMT) || isNaN(years) || isNaN(r_annual)) {
      setResult(null);
      return;
    }

    const n = years * 12; // total months
    const r_monthly = r_annual / 12; // monthly rate

    let futureValue = 0;

    if (isCompound) {
      // Compound interest calculation
      const futureValueOfInitial = P * Math.pow(1 + r_monthly, n);
      const futureValueOfContributions = PMT * ((Math.pow(1 + r_monthly, n) - 1) / r_monthly);
      futureValue = futureValueOfInitial + futureValueOfContributions;
    } else {
      // Simple interest calculation
      const totalInterestOnInitial = P * r_annual * years;
      // Simple interest on contributions is more complex, let's estimate
      const totalContribution = PMT * n;
      const avgInterest = totalContribution * r_annual * (years / 2); // Approximation
      futureValue = P + totalInterestOnInitial + totalContribution + avgInterest;
    }

    const totalPrincipal = P + (PMT * n);
    const totalInterest = futureValue - totalPrincipal;

    setResult({ futureValue, totalPrincipal, totalInterest });
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-amber-400 to-amber-600">
        <div className="flex items-center space-x-3">
          <AreaChart size={28} />
          <h2 className="text-2xl font-bold">{t('tool.investment')} {t('suffix.calculator')}</h2>
        </div>
        <p className="mt-1 opacity-90">{t('finance.investment.desc')}</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">{t('finance.investment.label_initial')} ({t('currency.KRW')})</label>
          <input type="text" value={initialAmount} onChange={e => setInitialAmount(formatNumber(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">{t('finance.investment.label_monthly')} ({t('currency.KRW')})</label>
          <input type="text" value={monthlyContribution} onChange={e => setMonthlyContribution(formatNumber(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">{t('finance.investment.label_years')}</label>
          <input type="number" value={period} onChange={e => setPeriod(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">{t('finance.investment.label_rate')}</label>
          <input type="number" value={annualRate} onChange={e => setAnnualRate(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
        </div>

        <SelectModal
          label={t('finance.investment.label_type')}
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
          <h3 className="text-lg font-bold text-center mb-4">{t('finance.investment.result_header', { years: period })}</h3>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">{t('finance.investment.result_total_principal')}</span>
            <span className="font-semibold">{Math.round(result.totalPrincipal).toLocaleString()} {t('currency.KRW')}</span>
          </div>
          <div className="flex justify-between items-center text-green-600">
            <span className="text-gray-600">{t('finance.investment.result_total_interest')}</span>
            <span className="font-semibold">+ {Math.round(result.totalInterest).toLocaleString()} {t('currency.KRW')}</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between items-center text-blue-600">
            <span className="text-lg font-bold">{t('finance.investment.result_final')}</span>
            <span className="font-bold text-2xl">{Math.round(result.futureValue).toLocaleString()} {t('currency.KRW')}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestmentCalculator;
