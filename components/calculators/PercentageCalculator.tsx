import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PercentCircle } from 'lucide-react';
import AdBanner from '../ui/AdBanner';

const PercentageCalculator: React.FC = () => {
    const { t } = useTranslation();
    const [totalValue, setTotalValue] = useState('');
    const [percentage, setPercentage] = useState('');
    const [result, setResult] = useState<string | null>(null);

    const formatNumber = (val: string) => {
        const num = val.replace(/,/g, '');
        // Allow decimal points
        if (/^\d*\.?\d*$/.test(num)) {
            return num;
        }
        return val.slice(0, -1);
    };

    const displayFormatted = (val: string) => {
        const num = parseFloat(val);
        if (isNaN(num)) return '';
        return num.toLocaleString('en-US');
    }

    const handleCalculate = () => {
        const total = parseFloat(totalValue.replace(/,/g, ''));
        const percent = parseFloat(percentage);

        if (isNaN(total) || isNaN(percent)) {
            setResult(null);
            return;
        }

        const calculatedValue = (total * percent) / 100;
        setResult(calculatedValue.toLocaleString('en-US', { maximumFractionDigits: 5 }));
    };

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-rose-400 to-rose-600">
                <div className="flex items-center space-x-3">
                    <PercentCircle size={28} />
                    <h2 className="text-2xl font-bold">{t('tool.percentage')} {t('suffix.calculator')}</h2>
                </div>
                <p className="mt-1 opacity-90">{t('math.percentage.desc')}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('math.percentage.label_total')}</label>
                        <input
                            type="text"
                            inputMode="decimal"
                            value={displayFormatted(totalValue)}
                            onChange={(e) => setTotalValue(formatNumber(e.target.value))}
                            className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right outline-none focus:border-rose-500 transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('math.percentage.label_rate')}</label>
                        <input
                            type="text"
                            inputMode="decimal"
                            value={displayFormatted(percentage)}
                            onChange={(e) => setPercentage(formatNumber(e.target.value))}
                            className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right outline-none focus:border-rose-500 transition-colors"
                        />
                    </div>
                </div>

                <button onClick={handleCalculate} className="w-full p-4 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105 shadow-md shadow-rose-100">
                    {t('common.calculate')}
                </button>
            </div>

            <AdBanner />

            {result !== null && (
                <div className="p-6 bg-gray-50 rounded-xl text-center border border-gray-100 shadow-inner">
                    <p className="text-sm text-gray-500">{t('common.calculation_result')}</p>
                    <p className="text-4xl font-bold text-blue-600 my-2">
                        {result}
                    </p>
                </div>
            )}
        </div>
    );
};

export default PercentageCalculator;