import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Repeat } from 'lucide-react';
import AdBanner from '../ui/AdBanner';
import SelectModal from '../ui/SelectModal';
import AmountUnit from '../ui/AmountUnit';

const CompoundInterestCalculator: React.FC = () => {
    const { t } = useTranslation();
    const [principal, setPrincipal] = useState('10000000');
    const [rate, setRate] = useState('5');
    const [years, setYears] = useState('10');
    const [compounding, setCompounding] = useState('12'); // Monthly
    const [result, setResult] = useState<{ futureValue: number; totalInterest: number } | null>(null);

    const compoundingOptions = [
        { value: '1', label: t('finance.compound.opt_yearly') },
        { value: '2', label: t('finance.compound.opt_biannually') },
        { value: '4', label: t('finance.compound.opt_quarterly') },
        { value: '12', label: t('finance.compound.opt_monthly') }
    ];

    const formatNumber = (val: string) => {
        const num = Number(val.replace(/,/g, ''));
        if (isNaN(num)) return '';
        return num.toLocaleString('en-US');
    };

    const handleCalculate = () => {
        const P = parseFloat(principal.replace(/,/g, ''));
        const r = parseFloat(rate) / 100;
        const t = parseInt(years, 10);
        const n = parseInt(compounding, 10);

        if (isNaN(P) || isNaN(r) || isNaN(t) || P <= 0 || r < 0 || t <= 0) {
            setResult(null);
            return;
        }

        // A = P(1 + r/n)^(nt)
        const futureValue = P * Math.pow(1 + r / n, n * t);
        const totalInterest = futureValue - P;

        setResult({ futureValue, totalInterest });
    };

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-amber-400 to-amber-600">
                <div className="flex items-center space-x-3">
                    <Repeat size={28} />
                    <h2 className="text-2xl font-bold">{t('tool.compound-interest')} {t('suffix.calculator')}</h2>
                </div>
                <p className="mt-1 opacity-90">{t('finance.compound.desc')}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">{t('finance.compound.label_principal')} ({t('currency.KRW')})</label>
                    <input type="text" value={principal} onChange={e => setPrincipal(formatNumber(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right outline-none focus:ring-2 focus:ring-amber-500" />
                    <AmountUnit value={principal} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">{t('finance.compound.label_rate')} (%)</label>
                        <input type="number" value={rate} onChange={e => setRate(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right outline-none focus:ring-2 focus:ring-amber-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">{t('finance.compound.label_years')}</label>
                        <input type="number" value={years} onChange={e => setYears(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right outline-none focus:ring-2 focus:ring-amber-500" />
                    </div>
                </div>

                <SelectModal
                    label={t('finance.compound.label_compounding')}
                    options={compoundingOptions}
                    value={compounding}
                    onChange={setCompounding}
                    colorClass="text-amber-600"
                />

                <button onClick={handleCalculate} className="w-full p-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg text-lg transition-transform active:scale-95 shadow-md">
                    {t('common.calculate')}
                </button>
            </div>

            <AdBanner />

            {result && (
                <div className="p-6 bg-gray-50 rounded-xl text-left space-y-3 border border-amber-100 animate-in zoom-in-95 duration-300">
                    <h3 className="text-lg font-bold text-center mb-4 text-gray-800">{t('finance.compound.result_header')}</h3>
                    <div className="flex justify-between items-center text-gray-600">
                        <span className="text-sm">{t('finance.compound.result_principal')}</span>
                        <span className="font-semibold text-lg">{parseFloat(principal.replace(/,/g, '')).toLocaleString()} {t('currency.KRW')}</span>
                    </div>
                    <div className="flex justify-between items-center text-emerald-600">
                        <span className="text-sm">{t('finance.compound.result_interest')}</span>
                        <span className="font-semibold text-lg">+ {Math.round(result.totalInterest).toLocaleString()} {t('currency.KRW')}</span>
                    </div>
                    <hr className="my-2 border-gray-200" />
                    <div className="flex justify-between items-center text-blue-600">
                        <span className="font-bold">{t('finance.compound.result_total')}</span>
                        <span className="font-black text-2xl">{Math.round(result.futureValue).toLocaleString()} {t('currency.KRW')}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CompoundInterestCalculator;
