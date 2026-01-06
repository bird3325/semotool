
import React, { useState } from 'react';
import { Files } from 'lucide-react';
import AdBanner from '../ui/AdBanner';
import AmountUnit from '../ui/AmountUnit';

const IncomeTaxCalculator: React.FC = () => {
    const [taxableIncome, setTaxableIncome] = useState('70000000');
    const [result, setResult] = useState<{ tax: number; effectiveRate: number } | null>(null);

    const formatNumber = (val: string) => {
        const num = Number(val.replace(/,/g, ''));
        if (isNaN(num)) return '';
        return num.toLocaleString('en-US');
    };

    const getCalculatedTax = (income: number) => {
        if (income <= 14000000) return income * 0.06;
        if (income <= 50000000) return 840000 + (income - 14000000) * 0.15;
        if (income <= 88000000) return 6240000 + (income - 50000000) * 0.24;
        if (income <= 150000000) return 15360000 + (income - 88000000) * 0.35;
        if (income <= 300000000) return 37060000 + (income - 150000000) * 0.38;
        if (income <= 500000000) return 94060000 + (income - 300000000) * 0.40;
        if (income <= 1000000000) return 174060000 + (income - 500000000) * 0.42;
        return 384060000 + (income - 1000000000) * 0.45;
    }

    const handleCalculate = () => {
        const income = parseFloat(taxableIncome.replace(/,/g, ''));
        if (isNaN(income) || income < 0) {
            setResult(null);
            return;
        }

        const tax = getCalculatedTax(income);
        const effectiveRate = (tax / income) * 100;

        setResult({ tax, effectiveRate });
    };

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-2xl text-white shadow-lg bg-gradient-to-br from-amber-400 to-amber-600">
                <div className="flex items-center space-x-3">
                    <Files size={28} />
                    <h2 className="text-2xl font-bold">종합소득세 계산기</h2>
                </div>
                <p className="mt-1 opacity-90">과세표준에 따른 예상 세금을 계산합니다.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">과세표준 금액 (원)</label>
                    <input type="text" value={taxableIncome} onChange={e => setTaxableIncome(formatNumber(e.target.value))} className="w-full p-3 border border-gray-300 rounded-lg text-lg text-right" />
                    <AmountUnit value={taxableIncome} />
                </div>
                <button onClick={handleCalculate} className="w-full p-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg text-lg transition-transform hover:scale-105">
                    계산하기
                </button>
            </div>

            <AdBanner />

            {result && (
                <div className="p-6 bg-gray-50 rounded-xl text-center">
                    <p className="text-sm text-gray-500">예상 산출세액</p>
                    <p className="text-4xl font-bold text-blue-600 my-2">
                        {Math.round(result.tax).toLocaleString()} 원
                    </p>
                    <p className="text-md text-gray-700">
                        유효세율: {result.effectiveRate.toFixed(2)}%
                    </p>
                    <p className="text-xs text-gray-500 text-center pt-2">※ 지방소득세 10% 별도. 각종 공제 미반영.</p>
                </div>
            )}
        </div>
    );
};

export default IncomeTaxCalculator;
