import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HandCoins, Minus, Plus } from 'lucide-react';
import AdBanner from '../ui/AdBanner';
import AmountUnit from '../ui/AmountUnit';

const TipCalculator: React.FC = () => {
    const { t } = useTranslation();
    const [billAmount, setBillAmount] = useState('');
    const [tipPercent, setTipPercent] = useState('15');
    const [numPeople, setNumPeople] = useState(1);
    const [result, setResult] = useState<{ tipAmount: number; totalAmount: number; perPersonAmount: number } | null>(null);

    const formatNumber = (val: string) => {
        const num = Number(val.replace(/,/g, ''));
        if (isNaN(num)) return '';
        return num.toLocaleString('en-US');
    };

    const handleCalculate = () => {
        const bill = parseFloat(billAmount.replace(/,/g, ''));
        const tip = parseFloat(tipPercent);
        if (isNaN(bill) || isNaN(tip) || bill <= 0 || tip < 0 || numPeople < 1) {
            setResult(null);
            return;
        }

        const tipAmount = bill * (tip / 100);
        const totalAmount = bill + tipAmount;
        const perPersonAmount = totalAmount / numPeople;

        setResult({ tipAmount, totalAmount, perPersonAmount });
    };

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-cyan-400 to-cyan-600">
                <div className="flex items-center space-x-3">
                    <HandCoins size={28} />
                    <h2 className="text-2xl font-bold">{t('tool.tip')} {t('suffix.calculator')}</h2>
                </div>
                <p className="mt-1 opacity-90">{t('math.tip.desc')}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('common.total_amount')}</label>
                    <input
                        type="text"
                        inputMode="numeric"
                        value={billAmount}
                        onChange={(e) => setBillAmount(formatNumber(e.target.value))}
                        placeholder="50,000"
                        className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right"
                    />
                    <AmountUnit value={billAmount} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('math.tip.label_tip_percent')}</label>
                    <div className="grid grid-cols-4 gap-2">
                        {['10', '15', '18', '20'].map(p => (
                            <button key={p} onClick={() => setTipPercent(p)} className={`p-2 rounded-lg font-semibold ${tipPercent === p ? 'bg-cyan-500 text-white' : 'bg-gray-100'}`}>{p}%</button>
                        ))}
                    </div>
                    <input
                        type="number"
                        value={tipPercent}
                        onChange={(e) => setTipPercent(e.target.value)}
                        className="w-full p-3 mt-2 border border-gray-300 rounded-lg text-lg text-right"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('common.num_people')}</label>
                    <div className="flex items-center justify-between p-2 border border-gray-300 rounded-lg">
                        <button onClick={() => setNumPeople(p => Math.max(1, p - 1))} className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"><Minus size={20} /></button>
                        <span className="text-2xl font-bold w-16 text-center">{numPeople}{t('unit.people')}</span>
                        <button onClick={() => setNumPeople(p => p + 1)} className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"><Plus size={20} /></button>
                    </div>
                </div>
                <button onClick={handleCalculate} className="w-full p-4 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105">
                    {t('common.calculate')}
                </button>
            </div>

            <AdBanner />

            {result !== null && (
                <div className="p-6 bg-gray-50 rounded-xl text-left space-y-3">
                    <h3 className="text-lg font-bold text-center mb-4">{t('common.calculation_result')}</h3>
                    <div className="flex justify-between items-center text-gray-600">
                        <span>{t('math.tip.result_tip')}</span>
                        <span className="font-semibold">{result.tipAmount.toLocaleString('en-US', { maximumFractionDigits: 0 })} {t('currency.KRW')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span>{t('math.tip.result_total_with_tip')}</span>
                        <span className="font-semibold">{result.totalAmount.toLocaleString('en-US', { maximumFractionDigits: 0 })} {t('currency.KRW')}</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between items-center text-blue-600">
                        <span className="text-lg font-bold">{t('math.tip.result_per_person')}</span>
                        <span className="font-bold text-2xl">{Math.ceil(result.perPersonAmount).toLocaleString()} {t('currency.KRW')}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TipCalculator;
