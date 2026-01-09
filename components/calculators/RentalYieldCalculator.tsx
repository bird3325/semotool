import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LineChart } from 'lucide-react';
import AdBanner from '../ui/AdBanner';
import AmountUnit from '../ui/AmountUnit';

const RentalYieldCalculator: React.FC = () => {
    const { t } = useTranslation();
    const [purchasePrice, setPurchasePrice] = useState('500000000');
    const [deposit, setDeposit] = useState('50000000');
    const [monthlyRent, setMonthlyRent] = useState('1500000');
    const [expenses, setExpenses] = useState('1000000'); // Annual
    const [result, setResult] = useState<{ yield: number; netIncome: number } | null>(null);

    const formatNumber = (val: string) => {
        const num = Number(val.replace(/,/g, ''));
        if (isNaN(num)) return '';
        return num.toLocaleString('en-US');
    };

    const handleCalculate = () => {
        const price = parseFloat(purchasePrice.replace(/,/g, ''));
        const dep = parseFloat(deposit.replace(/,/g, ''));
        const rent = parseFloat(monthlyRent.replace(/,/g, ''));
        const exp = parseFloat(expenses.replace(/,/g, ''));

        if (isNaN(price) || isNaN(dep) || isNaN(rent) || isNaN(exp)) {
            setResult(null);
            return;
        }

        const actualInvestment = price - dep;
        if (actualInvestment <= 0) {
            setResult(null);
            return;
        }

        const annualRentIncome = rent * 12;
        const netIncome = annualRentIncome - exp;
        const rentalYield = (netIncome / actualInvestment) * 100;

        setResult({ yield: rentalYield, netIncome });
    };

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-violet-400 to-violet-600">
                <div className="flex items-center space-x-3">
                    <LineChart size={28} />
                    <h2 className="text-2xl font-bold">{t('tool.rental_yield')} {t('suffix.calculator')}</h2>
                </div>
                <p className="mt-1 opacity-90">{t('finance.rental_yield.desc')}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">{t('finance.rental_yield.label_purchase_price')}</label>
                    <input type="text" value={purchasePrice} onChange={e => setPurchasePrice(formatNumber(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
                    <AmountUnit value={purchasePrice} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">{t('finance.rental_yield.label_deposit')}</label>
                    <input type="text" value={deposit} onChange={e => setDeposit(formatNumber(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
                    <AmountUnit value={deposit} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">{t('finance.rental_yield.label_monthly_rent')}</label>
                    <input type="text" value={monthlyRent} onChange={e => setMonthlyRent(formatNumber(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
                    <AmountUnit value={monthlyRent} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">{t('finance.rental_yield.label_expenses')}</label>
                    <input type="text" value={expenses} onChange={e => setExpenses(formatNumber(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
                    <AmountUnit value={expenses} />
                </div>
                <button onClick={handleCalculate} className="w-full p-4 bg-violet-500 hover:bg-violet-600 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105">
                    {t('common.calculate')}
                </button>
            </div>

            <AdBanner />

            {result && (
                <div className="p-6 bg-gray-50 rounded-xl text-center">
                    <p className="text-sm text-gray-500">{t('finance.rental_yield.result_yield')}</p>
                    <p className="text-4xl font-bold text-blue-600 my-2">
                        {result.yield.toFixed(2)} %
                    </p>
                    <p className="text-md text-gray-700">
                        {t('finance.rental_yield.result_net_income')}: {Math.round(result.netIncome).toLocaleString()} {t('currency.KRW')}
                    </p>
                </div>
            )}
        </div>
    );
};

export default RentalYieldCalculator;
