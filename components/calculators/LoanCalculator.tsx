
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Home } from 'lucide-react';
import AdBanner from '../ui/AdBanner';
import SelectModal from '../ui/SelectModal';
import AmountUnit from '../ui/AmountUnit';

type RepaymentMethod = 'equal-principal-interest' | 'equal-principal';


const LoanCalculator: React.FC = () => {
  const { t } = useTranslation();
  const [loanAmount, setLoanAmount] = useState('100000000');
  const [interestRate, setInterestRate] = useState('4.5');
  const [loanPeriod, setLoanPeriod] = useState('30');
  const [repaymentMethod, setRepaymentMethod] = useState<RepaymentMethod>('equal-principal-interest');
  const [result, setResult] = useState<{ monthlyPayment: string; totalInterest: number; totalRepayment: number } | null>(null);

  const repaymentOptions = [
    { value: 'equal-principal-interest', label: t('finance.loan.opt_equal_principal_interest') },
    { value: 'equal-principal', label: t('finance.loan.opt_equal_principal') }
  ];

  const formatNumber = (val: string) => {
    const num = Number(val.replace(/,/g, ''));
    if (isNaN(num)) return '';
    return num.toLocaleString('en-US');
  };

  const handleCalculate = () => {
    const P = parseFloat(loanAmount.replace(/,/g, ''));
    const annualRate = parseFloat(interestRate) / 100;
    const years = parseInt(loanPeriod, 10);

    if (isNaN(P) || isNaN(annualRate) || isNaN(years) || P <= 0 || annualRate <= 0 || years <= 0) {
      setResult(null);
      return;
    }

    const r = annualRate / 12; // Monthly interest rate
    const n = years * 12; // Total number of payments

    let monthlyPayment = "";
    let totalRepayment = 0;
    let totalInterest = 0;

    if (repaymentMethod === 'equal-principal-interest') { // 원리금균등
      const M = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      monthlyPayment = Math.round(M).toLocaleString();
      totalRepayment = M * n;
      totalInterest = totalRepayment - P;
    } else { // 원금균등
      const principalPayment = P / n;
      const firstMonthInterest = P * r;
      const firstMonthPayment = principalPayment + firstMonthInterest;
      const lastMonthInterest = (P * r) / n;
      const lastMonthPayment = principalPayment + lastMonthInterest;

      monthlyPayment = `${Math.round(firstMonthPayment).toLocaleString()} ~ ${Math.round(lastMonthPayment).toLocaleString()}`;
      totalInterest = (P * r * (n + 1)) / 2;
      totalRepayment = P + totalInterest;
    }

    setResult({ monthlyPayment, totalInterest: Math.round(totalInterest), totalRepayment: Math.round(totalRepayment) });
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-amber-400 to-amber-600">
        <div className="flex items-center space-x-3">
          <Home size={28} />
          <h2 className="text-2xl font-bold">{t('tool.loan')} {t('suffix.calculator')}</h2>
        </div>
        <p className="mt-1 opacity-90">{t('finance.desc.loan')}</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">{t('finance.label.loan_principal')}</label>
          <input type="text" value={loanAmount} onChange={e => setLoanAmount(formatNumber(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
          <AmountUnit value={loanAmount} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">{t('finance.label.rate_year')}</label>
          <input type="number" value={interestRate} onChange={e => setInterestRate(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">{t('finance.label.period_year')}</label>
          <input type="number" value={loanPeriod} onChange={e => setLoanPeriod(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
        </div>

        <SelectModal
          label={t('finance.label.repayment_method')}
          options={repaymentOptions}
          value={repaymentMethod}
          onChange={setRepaymentMethod}
        />

        <button onClick={handleCalculate} className="w-full p-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105">
          {t('common.calculate')}
        </button>
      </div>

      <AdBanner />

      {result && (
        <div className="p-6 bg-gray-50 rounded-xl text-left space-y-3">
          <h3 className="text-lg font-bold text-center mb-4">{t('finance.result.title_expected_repayment')}</h3>
          <div className="flex justify-between items-center text-blue-600">
            <span className="font-semibold">{t('finance.result.monthly_payment')}</span>
            <span className="font-bold text-xl">{result.monthlyPayment} {t('currency.KRW')}</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between items-center">
            <span className="text-gray-600">{t('finance.result.total_loan_principal')}</span>
            <span className="font-semibold text-lg">{parseFloat(loanAmount.replace(/,/g, '')).toLocaleString()} {t('currency.KRW')}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">{t('finance.result.total_interest')}</span>
            <span className="font-semibold text-lg">{result.totalInterest.toLocaleString()} {t('currency.KRW')}</span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="font-semibold">{t('finance.result.total_repayment')}</span>
            <span className="font-bold text-2xl">{result.totalRepayment.toLocaleString()} {t('currency.KRW')}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanCalculator;
