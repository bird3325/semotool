import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Target } from 'lucide-react';
import AdBanner from '../ui/AdBanner';
import AmountUnit from '../ui/AmountUnit';

const FinancialGoalCalculator: React.FC = () => {
    const { t } = useTranslation();
    const [targetAmount, setTargetAmount] = useState('100000000');
    const [initialAmount, setInitialAmount] = useState('10000000');
    const [years, setYears] = useState('5');
    const [rate, setRate] = useState('5');
    const [result, setResult] = useState<{ monthlySaving: number } | null>(null);

    const formatNumber = (val: string) => {
        const num = Number(val.replace(/,/g, ''));
        if (isNaN(num)) return '';
        return num.toLocaleString('en-US');
    };

    const handleCalculate = () => {
        const FV = parseFloat(targetAmount.replace(/,/g, ''));
        const PV = parseFloat(initialAmount.replace(/,/g, ''));
        const t = parseInt(years, 10);
        const r_annual = parseFloat(rate) / 100;

        if (isNaN(FV) || isNaN(PV) || isNaN(t) || isNaN(r_annual) || FV <= PV) {
            setResult(null);
            return;
        }

        const n = t * 12;
        const r_monthly = r_annual / 12;

        const futureValueOfInitial = PV * Math.pow(1 + r_monthly, n);
        const neededFromContributions = FV - futureValueOfInitial;

        let monthlySaving;
        if (r_monthly === 0) {
            monthlySaving = neededFromContributions / n;
        } else {
            monthlySaving = neededFromContributions / ((Math.pow(1 + r_monthly, n) - 1) / r_monthly);
        }

        setResult({ monthlySaving });
    };

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-amber-400 to-amber-600">
                <div className="flex items-center space-x-3">
                    <Target size={28} />
                    <h2 className="text-2xl font-bold">{t('tool.financial-goal')} {t('suffix.calculator')}</h2>
                </div>
                <p className="mt-1 opacity-90">{t('finance.goal.desc')}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">{t('finance.goal.label_target')} ({t('currency.KRW')})</label>
                    <input type="text" value={targetAmount} onChange={e => setTargetAmount(formatNumber(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
                    <AmountUnit value={targetAmount} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">{t('finance.goal.label_initial')} ({t('currency.KRW')})</label>
                    <input type="text" value={initialAmount} onChange={e => setInitialAmount(formatNumber(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
                    <AmountUnit value={initialAmount} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">{t('finance.goal.label_years')}</label>
                    <input type="number" value={years} onChange={e => setYears(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">{t('finance.goal.label_rate')}</label>
                    <input type="number" value={rate} onChange={e => setRate(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
                </div>
                <button onClick={handleCalculate} className="w-full p-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105">
                    {t('common.calculate')}
                </button>
            </div>

            <AdBanner />

            {result && (
                <div className="p-6 bg-gray-50 rounded-xl text-center">
                    <p className="text-sm text-gray-500">{t('finance.goal.result_monthly_saving')}</p>
                    <p className="text-4xl font-bold text-blue-600 my-2">
                        {Math.round(result.monthlySaving).toLocaleString()} {t('currency.KRW')}
                    </p>
                </div>
            )}
        </div>
    );
};

export default FinancialGoalCalculator;
