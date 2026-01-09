import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PiggyBank } from 'lucide-react';
import AdBanner from '../ui/AdBanner';
import DatePicker from '../ui/DatePicker';
import AmountUnit from '../ui/AmountUnit';

const getDaysBetween = (date1: string, date2: string) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return 0;
  return Math.round((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)) + 1;
};

const RetirementCalculator: React.FC = () => {
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState('2020-01-01');
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [last3MonthsSalary, setLast3MonthsSalary] = useState('10000000');
  const [annualBonus, setAnnualBonus] = useState('5000000');
  const [result, setResult] = useState<{ employmentDays: number; dailyWage: number; severancePay: number } | null>(null);

  const formatNumber = (val: string) => {
    const num = Number(val.replace(/,/g, ''));
    if (isNaN(num)) return '';
    return num.toLocaleString('en-US');
  };

  const handleCalculate = () => {
    const salary = parseFloat(last3MonthsSalary.replace(/,/g, ''));
    const bonus = parseFloat(annualBonus.replace(/,/g, ''));

    if (!startDate || !endDate || isNaN(salary)) {
      setResult(null);
      return;
    }

    const employmentDays = getDaysBetween(startDate, endDate);
    if (employmentDays < 365) {
      setResult({ employmentDays, dailyWage: 0, severancePay: 0 });
      return;
    }

    const daysInLast3Months = 90;
    const proratedBonus = (bonus || 0) * (3 / 12);
    const totalWagesFor3Months = salary + proratedBonus;

    const dailyWage = totalWagesFor3Months / daysInLast3Months;
    const severancePay = dailyWage * 30 * (employmentDays / 365);

    setResult({ employmentDays, dailyWage, severancePay });
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-amber-400 to-amber-600">
        <div className="flex items-center space-x-3">
          <PiggyBank size={28} />
          <h2 className="text-2xl font-bold">{t('tool.retirement')} {t('suffix.calculator')}</h2>
        </div>
        <p className="mt-1 opacity-90">{t('finance.retirement.desc')}</p>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-md border border-gray-100 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DatePicker label={t('finance.retirement.label_start_date')} value={startDate} onChange={setStartDate} colorClass="text-amber-600" />
          <DatePicker label={t('finance.retirement.label_end_date')} value={endDate} onChange={setEndDate} colorClass="text-amber-600" />
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-black text-gray-500 uppercase tracking-wider mb-2">{t('finance.retirement.label_salary_3m')}</label>
            <div className="relative group">
              <input type="text" value={last3MonthsSalary} onChange={e => setLast3MonthsSalary(formatNumber(e.target.value))} className="w-full py-4 bg-gray-50/50 border-b-2 border-gray-100 focus:border-amber-500 outline-none text-right font-black text-2xl text-gray-900 pr-10" />
              <span className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-lg">{t('currency.KRW')}</span>
            </div>
            <AmountUnit value={last3MonthsSalary} />
          </div>
          <div>
            <label className="block text-sm font-black text-gray-500 uppercase tracking-wider mb-2">{t('finance.retirement.label_bonus')}</label>
            <div className="relative group">
              <input type="text" value={annualBonus} onChange={e => setAnnualBonus(formatNumber(e.target.value))} className="w-full py-4 bg-gray-50/50 border-b-2 border-gray-100 focus:border-amber-500 outline-none text-right font-black text-2xl text-gray-900 pr-10" />
              <span className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-lg">{t('currency.KRW')}</span>
            </div>
            <AmountUnit value={annualBonus} />
          </div>
        </div>

        <button onClick={handleCalculate} className="w-full py-5 bg-amber-500 hover:bg-amber-600 text-white font-black rounded-2xl text-xl shadow-lg shadow-amber-100 transition-all active:scale-[0.98]">
          {t('common.calculate')}
        </button>
      </div>

      <AdBanner />

      {result && (
        <div className="p-8 bg-white border border-amber-100 rounded-3xl shadow-xl space-y-6 animate-in zoom-in-95 duration-500">
          <h3 className="text-[12px] font-black text-amber-600 uppercase tracking-[0.2em] text-center">{t('common.calculation_result')}</h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <span className="text-[10px] font-black text-gray-400 uppercase">{t('finance.retirement.result_days')}</span>
              <p className="font-black text-lg text-gray-900">{result.employmentDays.toLocaleString()} {t('unit.day')}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <span className="text-[10px] font-black text-gray-400 uppercase">{t('finance.retirement.result_daily_wage')}</span>
              <p className="font-black text-lg text-gray-900">{Math.round(result.dailyWage).toLocaleString()} {t('currency.KRW')}</p>
            </div>
          </div>

          <div className="p-6 bg-amber-50 rounded-3xl border border-amber-100 text-center">
            <span className="text-xs font-bold text-amber-600">{t('finance.retirement.result_severance')}</span>
            <p className="font-black text-4xl text-gray-900 mt-2">{Math.round(result.severancePay).toLocaleString()} <span className="text-xl">{t('currency.KRW')}</span></p>
          </div>
          <p className="text-[11px] text-gray-400 font-medium text-center leading-relaxed">
            {t('finance.retirement.msg_disclaimer')}
          </p>
        </div>
      )}
    </div>
  );
};

export default RetirementCalculator;
