import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Users, Minus, Plus } from 'lucide-react';
import AdBanner from '../ui/AdBanner';
import AmountUnit from '../ui/AmountUnit';

const DutchPayCalculator: React.FC = () => {
    const { t } = useTranslation();
    const [totalAmount, setTotalAmount] = useState('');
    const [numPeople, setNumPeople] = useState(2);
    const [perPersonAmount, setPerPersonAmount] = useState<number | null>(null);

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/,/g, '');
        if (!isNaN(Number(value)) && value.length <= 15) {
            setTotalAmount(Number(value).toLocaleString('en-US'));
        } else if (value === '') {
            setTotalAmount('');
        }
    };

    const handleCalculate = () => {
        const total = parseFloat(totalAmount.replace(/,/g, ''));
        if (!isNaN(total) && total > 0 && numPeople > 0) {
            setPerPersonAmount(total / numPeople);
        } else {
            setPerPersonAmount(null);
        }
    }

    const incrementPeople = () => setNumPeople(p => p + 1);
    const decrementPeople = () => setNumPeople(p => Math.max(1, p - 1));

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-cyan-400 to-cyan-600">
                <div className="flex items-center space-x-3">
                    <Users size={28} />
                    <h2 className="text-2xl font-bold">{t('tool.dutch_pay')} {t('suffix.calculator')}</h2>
                </div>
                <p className="mt-1 opacity-90">{t('math.dutch_pay.desc')}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
                <div>
                    <label htmlFor="totalAmount" className="block text-sm font-medium text-gray-700 mb-2">{t('common.total_amount')} ({t('currency.KRW')})</label>
                    <input
                        type="text"
                        id="totalAmount"
                        inputMode="numeric"
                        value={totalAmount}
                        onChange={handleAmountChange}
                        placeholder="50,000"
                        className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right"
                    />
                    <AmountUnit value={totalAmount} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('common.num_people')}</label>
                    <div className="flex items-center justify-between p-2 border border-gray-300 rounded-lg">
                        <button onClick={decrementPeople} className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"><Minus size={20} /></button>
                        <span className="text-2xl font-bold w-16 text-center">{numPeople}{t('unit.people')}</span>
                        <button onClick={incrementPeople} className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"><Plus size={20} /></button>
                    </div>
                </div>

                <button onClick={handleCalculate} className="w-full p-4 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105">
                    {t('common.calculate')}
                </button>
            </div>

            <AdBanner />

            {perPersonAmount !== null && (
                <div className="p-6 bg-gray-50 rounded-xl text-center">
                    <p className="text-sm text-gray-600">{t('math.dutch_pay.result_per_person')}</p>
                    <p className="text-4xl font-bold text-blue-600 my-2">
                        {Math.ceil(perPersonAmount).toLocaleString()}{t('currency.KRW')}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                        {t('math.dutch_pay.msg_detail', { total: totalAmount, count: numPeople })}
                    </p>
                </div>
            )}
        </div>
    );
};

export default DutchPayCalculator;
