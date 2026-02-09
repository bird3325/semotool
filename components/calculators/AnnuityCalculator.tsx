
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CalendarClock } from 'lucide-react';
import AdBanner from '../ui/AdBanner';
import AmountUnit from '../ui/AmountUnit';

const AnnuityCalculator: React.FC = () => {
    const { t } = useTranslation();
    const [totalAnnuity, setTotalAnnuity] = useState('300000000');
    const [rate, setRate] = useState('4');
    const [years, setYears] = useState('20');
    const [result, setResult] = useState<{ monthlyPayout: number; totalPayout: number } | null>(null);

    const formatNumber = (val: string) => {
        const num = Number(val.replace(/,/g, ''));
        if (isNaN(num)) return '';
        return num.toLocaleString('en-US');
    };

    const handleCalculate = () => {
        const PV = parseFloat(totalAnnuity.replace(/,/g, ''));
        const r_annual = parseFloat(rate) / 100;
        const t = parseInt(years, 10);

        if (isNaN(PV) || isNaN(r_annual) || isNaN(t) || PV <= 0 || r_annual < 0 || t <= 0) {
            setResult(null);
            return;
        }

        const n = t * 12;
        const r_monthly = r_annual / 12;

        let monthlyPayout;
        if (r_monthly === 0) {
            monthlyPayout = PV / n;
        } else {
            monthlyPayout = PV * (r_monthly * Math.pow(1 + r_monthly, n)) / (Math.pow(1 + r_monthly, n) - 1);
        }

        const totalPayout = monthlyPayout * n;

        setResult({ monthlyPayout, totalPayout });
    };

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-amber-400 to-amber-600">
                <div className="flex items-center space-x-3">
                    <CalendarClock size={28} />
                    <h2 className="text-2xl font-bold">{t('tool.annuity')}</h2>
                </div>
                <p className="mt-1 opacity-90">{t('finance.annuity.desc')}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">{t('finance.annuity.label_total_annuity')} ({t('currency.symbol')})</label>
                    <input type="text" value={totalAnnuity} onChange={e => setTotalAnnuity(formatNumber(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
                    <AmountUnit value={totalAnnuity} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">{t('finance.annuity.label_rate')} ({t('unit.percent')})</label>
                    <input type="number" value={rate} onChange={e => setRate(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">{t('finance.annuity.label_years')} ({t('unit.year')})</label>
                    <input type="number" value={years} onChange={e => setYears(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
                </div>
                <button onClick={handleCalculate} className="w-full p-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105">
                    {t('common.calculate')}
                </button>
            </div>

            <AdBanner />

            {
                result && (
                    <div className="p-6 bg-gray-50 rounded-xl text-center">
                        <p className="text-sm text-gray-500">{t('finance.annuity.result_monthly_payout')}</p>
                        <p className="text-4xl font-bold text-blue-600 my-2">
                            {Math.round(result.monthlyPayout).toLocaleString()} {t('currency.symbol')}
                        </p>
                        <p className="text-md text-gray-700">
                            {t('finance.annuity.result_total_payout')}: {Math.round(result.totalPayout).toLocaleString()} {t('currency.symbol')}
                        </p>
                    </div>
                )
            }
        </div >
    );
};

export default AnnuityCalculator;
